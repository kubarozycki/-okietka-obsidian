// Buduje stronę GitHub Pages z plików vaulta → ../_site
// Źródła zostają w vaulcie (markdown + modele HTML); tu tylko je składamy i dodajemy nawigację.
import { marked } from 'marked';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '_site');
const SCHODY = '02 Konstrukcja/schody';
const SITE_TITLE = 'Łokietka · schody';

const PAGES = [
  { slug: 'warianty', nav: 'Warianty', kind: 'md', src: `${SCHODY}/Warianty schodów – porównanie.md`,
    desc: 'Stal, drewno, mur czy żelbet – porównanie ciężaru, wykonania i ryzyka dla stropu.' },
  { slug: 'projekt-drewniany', nav: 'Projekt drewniany', kind: 'md', src: `${SCHODY}/Schody drewniane – projekt.md`,
    desc: 'Wybrany wariant: elementy, przekroje, obliczenia wstępne, kolejność robót, koszty, pytania do konstruktora.' },
  { slug: 'model-drewno', nav: 'Model 3D – drewno', kind: 'model', src: `${SCHODY}/schody-drewno.html`,
    desc: 'Interaktywny model szkieletu drewnianego z listą cięć, stopnicami i zestawieniem materiałów do druku.' },
  { slug: 'model-stal', nav: 'Model 3D – stal', kind: 'model', src: `${SCHODY}/schody.html`,
    desc: 'Model wariantu z projektu EKR: stopnie 1–8 murowane, 9–21 na stalowej konstrukcji samonośnej.' },
];
const FILES = [
  { src: `${SCHODY}/EKR schody (2).pdf`, out: 'pliki/ekr-schody-rzut.pdf', name: 'EKR – rzut schodów (PDF)' },
  { src: `${SCHODY}/EKR schody przekroj.pdf`, out: 'pliki/ekr-schody-przekroj.pdf', name: 'EKR – przekrój schodów (PDF)' },
];

// Odnośniki [[...]] i `plik.html` z notatek → adresy na stronie
const LINKS = new Map([
  ...PAGES.map(p => [path.basename(p.src).replace(/\.md$/, ''), `${p.slug}.html`]),
  ...PAGES.map(p => [path.basename(p.src), `${p.slug}.html`]),
  ...FILES.map(f => [path.basename(f.src), f.out]),
]);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = s => s.toLowerCase().normalize('NFC').replace(/<[^>]+>/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');

function navHtml(current) {
  const items = [['index', 'Start'], ...PAGES.map(p => [p.slug, p.nav])];
  return `<nav class="site-nav" aria-label="Nawigacja">
  <a class="brand" href="index.html">${SITE_TITLE}</a>
  <ul>${items.map(([slug, label]) => `<li><a href="${slug}.html"${slug === current ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
</nav>`;
}

function layout({ slug, title, body, toc = '' }) {
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} – ${SITE_TITLE}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${navHtml(slug)}
<div class="page${toc ? ' has-toc' : ''}">
  <main class="content">
${body}
  </main>
  ${toc}
</div>
<footer class="site-foot">Koncepcja robocza – wszystkie wymiary do weryfikacji na budowie, konstrukcja do sprawdzenia przez konstruktora.</footer>
</body>
</html>
`;
}

// ── Markdown (Obsidian) → HTML ────────────────────────────────
marked.use({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      return `<h${depth} id="${slugify(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
    table(token) {   // tabele przewijane na wąskich ekranach; pusty nagłówek (| | |) pomijamy
      let html = marked.Renderer.prototype.table.call(this, token);
      if (token.header.every(c => !c.text.trim())) html = html.replace(/<thead>[\s\S]*?<\/thead>/, '');
      return `<div class="table-wrap">${html}</div>\n`;
    },
  },
});

function obsidian(md) {
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '');                                  // frontmatter
  md = md.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
    const href = LINKS.get(target.trim()), label = alias || target.replace(/\.(md|pdf)$/, '');
    return href ? `[${label}](${encodeURI(href)})` : label;
  });
  md = md.replace(/`([^`]+\.html)`/g, (m, f) => LINKS.has(f) ? `[${f}](${LINKS.get(f)})` : m);
  md = md.replace(/(^|\s)#([\p{L}][\p{L}\p{N}_-]*)/gu, '$1<span class="tag">#$2</span>');  // tagi
  // callouty > [!typ] Tytuł
  const lines = md.split('\n'), out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^> \[!(\w+)\]\s*(.*)$/);
    if (!m) { out.push(lines[i]); continue; }
    const bodyLines = [];
    while (i + 1 < lines.length && lines[i + 1].startsWith('>')) bodyLines.push(lines[++i].replace(/^> ?/, ''));
    const inner = marked.parse(bodyLines.join('\n')).replace(/\n+/g, ' ');
    out.push(`<div class="callout callout-${m[1].toLowerCase()}"><p class="callout-title">${esc(m[2] || m[1])}</p>${inner}</div>`);
  }
  return out.join('\n');
}

function tocHtml(html) {
  const hs = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)];
  if (hs.length < 3) return '';
  return `<aside class="toc" aria-label="Na tej stronie"><p>Na tej stronie</p><ul>${hs.map(([, id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></aside>`;
}

// ── Modele 3D: kopia + pływający pasek nawigacji ─────────────────
function modelNav(current) {
  const links = [['index', 'Start'], ...PAGES.map(p => [p.slug, p.nav])]
    .map(([slug, label]) => `<a href="${slug}.html"${slug === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `
<style>
  .site-pill { position: fixed; right: 12px; bottom: 12px; z-index: 40; display: flex; flex-wrap: wrap; gap: 2px; max-width: calc(100vw - 24px);
    padding: 4px; background: rgba(29,33,38,.88); border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,.18); font: 500 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .site-pill a { color: #fff; text-decoration: none; padding: 7px 9px; border-radius: 7px; white-space: nowrap; }
  .site-pill a:hover { background: rgba(255,255,255,.14); }
  .site-pill a[aria-current="page"] { background: #fff; color: #1d2126; }
  @media print { .site-pill { display: none !important; } }
</style>
<nav class="site-pill" aria-label="Nawigacja">${links}</nav>
`;
}

// ── Strona startowa ──────────────────────────────────────────
function indexBody() {
  const cards = PAGES.map(p => `
    <a class="card" href="${p.slug}.html">
      <span class="card-kind">${p.kind === 'model' ? 'Model 3D' : 'Opis'}</span>
      <h2>${p.nav}</h2>
      <p>${p.desc}</p>
    </a>`).join('');
  const files = FILES.map(f => `<li><a href="${f.out}">${f.name}</a></li>`).join('');
  return `
    <header class="hero">
      <h1>Schody na antresolę</h1>
      <p class="lead">Mieszkanie EKR, budynek B1/C1, ul. Łokietka w Krakowie. Bieg na wysokość 3,82 m (21 × 18,2 cm), szerokość 90 cm, zabiegowe na dole i na górze, pod biegiem nisza dla psa. Tu są zebrane warianty konstrukcji, projekt wybranego wariantu drewnianego i interaktywne modele 3D.</p>
    </header>
    <div class="cards">${cards}</div>
    <h2 class="section">Rysunki źródłowe</h2>
    <ul class="files">${files}</ul>
    <p class="hint">Modele 3D wymagają przeglądarki z WebGL. Obsługa: lewy przycisk obraca, prawy przesuwa, kółko przybliża. Arkusz z listą elementów otwiera się przyciskiem w panelu bocznym i można go wydrukować do PDF.</p>`;
}

// ── Budowa ───────────────────────────────────────────────────
await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(path.join(OUT, 'pliki'), { recursive: true });
await fs.copyFile(path.join(import.meta.dirname, 'style.css'), path.join(OUT, 'style.css'));
await fs.writeFile(path.join(OUT, '.nojekyll'), '');

for (const p of PAGES) {
  const src = await fs.readFile(path.join(ROOT, p.src), 'utf8');
  let html;
  if (p.kind === 'md') {
    const body = marked.parse(obsidian(src));
    const title = (src.match(/^# (.+)$/m)?.[1] ?? p.nav).replace(/^\p{Extended_Pictographic}\s*/u, '');
    html = layout({ slug: p.slug, title, body, toc: tocHtml(body) });
  } else {
    if (!src.includes('</body>')) throw new Error(`${p.src}: brak </body>`);
    html = src.replace('</body>', `${modelNav(p.slug)}</body>`);
  }
  await fs.writeFile(path.join(OUT, `${p.slug}.html`), html);
}
for (const f of FILES) await fs.copyFile(path.join(ROOT, f.src), path.join(OUT, f.out));
await fs.writeFile(path.join(OUT, 'index.html'), layout({ slug: 'index', title: 'Schody na antresolę', body: indexBody() }));

console.log(`Zbudowano ${PAGES.length + 1} stron → ${path.relative(ROOT, OUT)}/`);
