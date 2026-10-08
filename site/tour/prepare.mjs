// Przygotowanie danych i mediów dla apartment tour (uruchamiane lokalnie, nie w CI).
//
//   node tour/prepare.mjs [--drive "/ścieżka/do/pobranego/folderu Łokietka"]
//
// Źródła: tour.config.json (pomieszczenia, obrysy, przypisane pliki), vault (ścieżki względne od repo)
// oraz pobrany folder z Dysku Google (prefiks „drive:”). Wynik trafia do site/tour/media, site/tour/files
// i site/tour/data.json – te pliki są commitowane, a build.mjs tylko je kopiuje.
// Wymaga: ImageMagick (magick), poppler (pdftoppm).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const HERE = import.meta.dirname, ROOT = path.resolve(HERE, '../..');
const MEDIA = path.join(HERE, 'media'), FILES = path.join(HERE, 'files');
const argDrive = process.argv.indexOf('--drive');
const DRIVE = argDrive > 0 ? path.resolve(process.argv[argDrive + 1]) : process.env.DRIVE_DIR || null;
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'tour.config.json'), 'utf8'));

fs.mkdirSync(MEDIA, { recursive: true });
fs.mkdirSync(FILES, { recursive: true });
const used = new Set();
const warn = m => console.warn('  ⚠ ' + m);

function resolve(src) {
  if (src.startsWith('drive:')) {
    if (!DRIVE) return null;
    const p = path.join(DRIVE, src.slice(6));
    return fs.existsSync(p) ? p : null;
  }
  const p = path.join(ROOT, src);
  return fs.existsSync(p) ? p : null;
}
const fresh = (out, src) => fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
const run = (cmd, args) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const dims = f => run('magick', ['identify', '-format', '%w %h', f]).trim().split(' ').map(Number);

// render: przycięcie białego marginesu, max 2000 px, JPEG progresywny + miniatura
function image(src, slug, { trim = true, size = 2000 } = {}) {
  const abs = resolve(src);
  if (!abs) { warn(`brak pliku: ${src}`); return null; }
  const out = path.join(MEDIA, `${slug}.jpg`), th = path.join(MEDIA, `${slug}-t.jpg`);
  used.add(out); used.add(th);
  if (!fresh(out, abs)) {
    const base = [abs, '-auto-orient', '-background', 'white', '-alpha', 'remove', '-alpha', 'off'];
    const tr = trim ? ['-fuzz', '3%', '-trim', '+repage', '-bordercolor', 'white', '-border', '2%'] : [];
    run('magick', [...base, ...tr, '-resize', `${size}x${size}>`, '-strip', '-quality', '80', '-sampling-factor', '4:2:0', '-interlace', 'JPEG', out]);
    run('magick', [out, '-resize', '640x640>', '-quality', '72', th]);
  }
  const [w, h] = dims(out);
  return { src: `tour/media/${slug}.jpg`, thumb: `tour/media/${slug}-t.jpg`, w, h };
}

// para do porównania (suwak): oba obrazy przycięte do wspólnego obrysu i w tym samym rozmiarze
function pair(srcA, srcB, slug) {
  const A = resolve(srcA), B = resolve(srcB);
  if (!A || !B) { warn(`brak pliku pary: ${!A ? srcA : srcB}`); return null; }
  const outs = ['a', 'b'].map(k => path.join(MEDIA, `${slug}${k}.jpg`));
  outs.forEach(o => { used.add(o); used.add(o.replace('.jpg', '-t.jpg')); });
  if (!fresh(outs[0], A) || !fresh(outs[1], B)) {
    const box = f => { const m = run('magick', [f, '-fuzz', '3%', '-format', '%@', 'info:']).match(/(\d+)x(\d+)\+(\d+)\+(\d+)/).slice(1).map(Number); return { x0: m[2], y0: m[3], x1: m[2] + m[0], y1: m[3] + m[1] }; };
    const [ba, bb] = [box(A), box(B)];
    const u = { x0: Math.min(ba.x0, bb.x0), y0: Math.min(ba.y0, bb.y0), x1: Math.max(ba.x1, bb.x1), y1: Math.max(ba.y1, bb.y1) };
    const pad = Math.round(0.02 * (u.x1 - u.x0));
    const geo = `${u.x1 - u.x0 + 2 * pad}x${u.y1 - u.y0 + 2 * pad}+${Math.max(0, u.x0 - pad)}+${Math.max(0, u.y0 - pad)}`;
    [A, B].forEach((src, i) => {
      run('magick', [src, '-background', 'white', '-alpha', 'remove', '-alpha', 'off', '-crop', geo, '+repage', '-resize', '1800x1800>', '-strip', '-quality', '80', '-interlace', 'JPEG', outs[i]]);
      run('magick', [outs[i], '-resize', '640x640>', '-quality', '72', outs[i].replace('.jpg', '-t.jpg')]);
    });
  }
  return outs.map(o => { const [w, h] = dims(o); const rel = `tour/media/${path.basename(o)}`; return { src: rel, thumb: rel.replace('.jpg', '-t.jpg'), w, h }; });
}

// rysunek PDF: kopia + miniatura pierwszej strony
function drawing(src, slug) {
  const abs = resolve(src);
  if (!abs) { warn(`brak pliku: ${src}`); return null; }
  const pdf = path.join(FILES, `${slug}.pdf`), th = path.join(MEDIA, `${slug}-pdf.jpg`);
  used.add(pdf); used.add(th);
  if (!fresh(pdf, abs)) fs.copyFileSync(abs, pdf);
  if (!fresh(th, abs)) {
    const tmp = path.join(MEDIA, `${slug}-tmp`);
    run('pdftoppm', ['-r', '60', '-png', '-singlefile', abs, tmp]);
    run('magick', [`${tmp}.png`, '-fuzz', '2%', '-trim', '+repage', '-resize', '640x640>', '-quality', '75', th]);
    fs.rmSync(`${tmp}.png`);
  }
  return { href: `tour/files/${slug}.pdf`, thumb: `tour/media/${slug}-pdf.jpg` };
}

// rzut: wycinek PDF renderowany w 2× dpi (ostry na ekranach retina), współrzędne obrysów w 1× dpi
function plan(level) {
  const { pdf, dpi, crop } = level.plan, abs = resolve(pdf);
  if (!abs) { warn(`brak rzutu: ${pdf}`); return null; }
  const out = path.join(MEDIA, `plan-${level.id}.png`);
  used.add(out);
  if (!fresh(out, abs)) {
    const tmp = path.join(MEDIA, `plan-${level.id}-tmp`);
    run('pdftoppm', ['-r', String(dpi * 2), '-x', String(crop[0] * 2), '-y', String(crop[1] * 2), '-W', String(crop[2] * 2), '-H', String(crop[3] * 2), '-png', '-singlefile', abs, tmp]);
    run('magick', [`${tmp}.png`, '-colors', '64', '-strip', out]);
    fs.rmSync(`${tmp}.png`);
  }
  return { src: `tour/media/plan-${level.id}.png`, w: crop[2], h: crop[3] };
}

// ── produkty: Zestawienie.xlsx (pełne dane) albo próbka ──────────
const TIER = s => { const t = String(s ?? '').trim().toLowerCase().replace('ś', 's'); return ['tani', 'sredni', 'premium'].includes(t) ? t : null; };
function price(v) {
  if (v == null || v === '') return undefined;
  if (typeof v === 'number') return v;
  const s = String(v).replace(/zł|\s/g, '');
  if (!/\d/.test(s) || /#/.test(s)) return null;
  const n = Number(s.includes(',') && !s.includes('.') ? s.replace(',', '.') : s.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}
function opt(link, pr) {
  const o = {}, p = price(pr);
  if (link) { if (/^https?:\/\//i.test(String(link).trim())) o.link = String(link).trim(); else o.note = String(link).trim(); }
  if (p !== undefined) o.price = p;
  if (p === null && pr) o.note = [o.note, String(pr).trim()].filter(Boolean).join(' – ');
  return Object.keys(o).length ? o : null;
}
async function products() {
  const xlsxPath = resolve(cfg.products.xlsx);
  if (xlsxPath) {
    const XLSX = (await import('xlsx')).default;
    const wb = XLSX.read(fs.readFileSync(xlsxPath));
    const out = {};
    for (const name of wb.SheetNames) {
      if (name === 'Zestawienie') continue;
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: null, raw: true });
      out[name] = rows.slice(1).filter(r => r[1] && String(r[1]).trim()).map(r => {
        const options = {};
        for (const [t, li, pi] of [['tani', 4, 5], ['sredni', 7, 8], ['premium', 10, 11]]) { const o = opt(r[li], r[pi]); if (o) options[t] = o; }
        const qty = price(r[2]);
        return { name: String(r[1]).trim(), qty: qty || 1, rec: TIER(r[3]), decision: TIER(r[13]), options };
      });
    }
    return { source: 'xlsx', data: out };
  }
  warn('brak Zestawienie.xlsx – używam próbki products.sample.json');
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, cfg.products.fallback), 'utf8'));
  delete data._info;
  return { source: 'sample', data };
}

// ── składanie danych ───────────────────────────────────────────
console.log(`Apartment tour – źródła: repo${DRIVE ? ` + Dysk (${DRIVE})` : ' (bez folderu z Dysku)'}`);
const prod = await products();
const levels = cfg.levels.map(l => ({ id: l.id, name: l.name, plan: plan(l), outOfScope: l.outOfScope || [] }));
const rooms = cfg.rooms.map(r => {
  const renders = (r.renders || []).map((x, i) => { const im = image(x.src, `${r.id}-${i + 1}`); return im && { ...im, title: x.title }; }).filter(Boolean);
  const compare = (r.compare || []).map((c, i) => {
    const p = pair(c.a, c.b, `${r.id}-cmp${i + 1}`);
    return p && { title: c.title, kind: c.kind || 'variant', a: { ...p[0], label: c.aLabel }, b: { ...p[1], label: c.bLabel } };
  }).filter(Boolean);
  const drawings = (r.drawings || []).map((d, i) => { const x = drawing(d.src, `${r.id}-rys${i + 1}`); return x && { ...x, title: d.title }; }).filter(Boolean);
  const items = r.sheet ? (prod.data[r.sheet] || []).map((p, i) => ({ id: `${r.id}-p${i + 1}`, ...p })) : [];
  return { id: r.id, name: r.name, level: r.level, poly: r.poly, intro: r.intro || '', links: r.links || [], renders, compare, drawings, products: items, tasks: r.tasks || [] };
});

// sprzątanie mediów, które nie są już używane
for (const dir of [MEDIA, FILES]) for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  if (!used.has(p)) { fs.rmSync(p); console.log(`  – usunięto ${path.relative(HERE, p)}`); }
}

const data = { generated: new Date().toISOString(), productsSource: prod.source, project: cfg.project, tiers: cfg.tiers, levels, rooms };
fs.writeFileSync(path.join(HERE, 'data.json'), JSON.stringify(data, null, 1));
const size = [...used].reduce((s, f) => s + fs.statSync(f).size, 0);
console.log(`Gotowe: ${rooms.length} pomieszczeń, ${rooms.reduce((s, r) => s + r.renders.length, 0)} wizualizacji, ` +
  `${rooms.reduce((s, r) => s + r.drawings.length, 0)} rysunków, produkty: ${prod.source}, media ${(size / 1e6).toFixed(1)} MB`);
