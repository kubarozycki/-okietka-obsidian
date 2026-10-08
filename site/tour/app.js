// Apartment tour – aplikacja statyczna. Dane: tour/data.json (prepare.mjs), stan użytkownika: localStorage.
const app = document.getElementById('app');
const lb = document.getElementById('lightbox');
const toastEl = document.getElementById('toast');

const DATA = await fetch('tour/data.json').then(r => r.json());
const P = DATA.project, TIERS = DATA.tiers;
const ROOMS = DATA.rooms, ROOM = Object.fromEntries(ROOMS.map(r => [r.id, r]));
const LEVEL = Object.fromEntries(DATA.levels.map(l => [l.id, l]));
const KEY = `tour:${P.id}:v1`;

// ── stan (localStorage; aplikacja działa także bez niego) ─────────
const blank = () => ({ choices: {}, approvals: {}, done: {}, custom: {}, comments: [], author: '' });
let S = blank();
try { S = { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* prywatne okno / zablokowane dane */ }
function save() { S.updated = new Date().toISOString(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* ignoruj */ } }

// ── pomocnicze ─────────────────────────────────────────────────
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => n == null ? '—' : `${Math.round(n).toLocaleString('pl-PL')} ${P.currency}`;
const tierLabel = id => TIERS.find(t => t.id === id)?.label ?? id;
const uid = () => Math.random().toString(36).slice(2, 9);
function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (toastEl.hidden = true), 2200); }
const centroid = poly => { let a = 0, x = 0, y = 0; poly.forEach((p, i) => { const q = poly[(i + 1) % poly.length], f = p[0] * q[1] - q[0] * p[1]; a += f; x += (p[0] + q[0]) * f; y += (p[1] + q[1]) * f; }); a /= 2; return [x / (6 * a), y / (6 * a)]; };

// produkty: wybór = decyzja klienta w aplikacji → decyzja z arkusza → rekomendacja projektantki
const tiersOf = item => TIERS.map(t => t.id).filter(t => item.options[t]);
const chosen = item => { const c = S.choices[item.id]; if (c && item.options[c]) return c; for (const t of [item.decision, item.rec]) if (t && item.options[t]) return t; return tiersOf(item)[0] ?? null; };
const decidedByClient = item => !!S.choices[item.id];
const cost = (item, tier) => { const o = item.options[tier]; return o && typeof o.price === 'number' ? o.price * (item.qty || 1) : null; };
function roomBudget(room) {
  let sel = 0, rec = 0, min = 0, max = 0, missing = 0;
  for (const it of room.products) {
    const ts = tiersOf(it); if (!ts.length) { missing++; continue; }
    const c = cost(it, chosen(it)); if (c == null) missing++; else sel += c;
    rec += cost(it, it.rec && it.options[it.rec] ? it.rec : chosen(it)) ?? 0;
    const all = ts.map(t => cost(it, t)).filter(v => v != null);
    if (all.length) { min += Math.min(...all); max += Math.max(...all); }
  }
  return { sel, rec, min, max, missing };
}
// elementy do akceptacji: wizualizacje, porównania, rysunki
const approvables = room => [
  ...room.renders.map((r, i) => ({ key: `${room.id}:r${i}`, label: r.title })),
  ...room.compare.map((c, i) => ({ key: `${room.id}:c${i}`, label: c.title })),
  ...room.drawings.map((d, i) => ({ key: `${room.id}:d${i}`, label: d.title })),
];
const tasksOf = room => [...room.tasks.map((t, i) => ({ key: `${room.id}:t${i}`, text: t })), ...(S.custom[room.id] || []).map(t => ({ key: t.id, text: t.text, custom: true }))];
function roomStatus(room) {
  const ap = approvables(room), tk = tasksOf(room);
  const apOk = ap.filter(a => S.approvals[a.key]).length, tkOk = tk.filter(t => S.done[t.key]).length;
  const items = room.products.filter(it => tiersOf(it).length), decided = items.filter(decidedByClient).length;
  const total = ap.length + tk.length + items.length, done = apOk + tkOk + decided;
  return { ap: ap.length, apOk, tk: tk.length, tkOk, items: items.length, decided, pct: total ? Math.round(100 * done / total) : 0, comments: S.comments.filter(c => c.room === room.id).length };
}
const totals = () => ROOMS.reduce((a, r) => { const b = roomBudget(r), s = roomStatus(r); a.sel += b.sel; a.rec += b.rec; a.min += b.min; a.max += b.max; a.ap += s.ap; a.apOk += s.apOk; a.tk += s.tk; a.tkOk += s.tkOk; a.items += s.items; a.decided += s.decided; a.comments += s.comments; return a; },
  { sel: 0, rec: 0, min: 0, max: 0, ap: 0, apOk: 0, tk: 0, tkOk: 0, items: 0, decided: 0, comments: 0 });

// ── układ wspólny ──────────────────────────────────────────────
function bar(active) {
  const t = totals();
  const tab = (href, label, id) => `<a href="${href}"${active === id ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<div class="bar">
    <div><h1>${esc(P.name)}</h1><div class="sub">${esc(P.subtitle)}</div></div>
    <nav class="tabs" aria-label="Poziomy">${DATA.levels.map(l => tab(`#/plan/${l.id}`, l.name, l.id)).join('')}${tab('#/podsumowanie', 'Podsumowanie', 'sum')}</nav>
    <div class="kpis"><span class="kpi">Budżet: <b>${money(t.sel)}</b></span><span class="kpi">Zaakceptowane: <b>${t.apOk}/${t.ap}</b></span><span class="kpi">Zadania: <b>${t.tkOk}/${t.tk}</b></span></div>
  </div>${DATA.productsSource === 'sample' ? `<p class="banner">Produkty to próbka pierwszych pozycji z arkusza „Zestawienie”. Pełna lista pojawi się po wczytaniu arkusza.</p>` : ''}`;
}

// ── rzut ───────────────────────────────────────────────────────
function viewPlan(levelId) {
  const L = LEVEL[levelId] || DATA.levels[0], rooms = ROOMS.filter(r => r.level === L.id);
  const shapes = rooms.map(r => {
    const [cx, cy] = centroid(r.poly), b = roomBudget(r), s = roomStatus(r);
    const xs = r.poly.map(p => p[0]), fit = 0.9 * (Math.max(...xs) - Math.min(...xs)) / (0.58 * r.name.length);   // etykieta mieści się w szerokości pomieszczenia
    return `<a class="room-link" href="#/pokoj/${r.id}" data-room="${r.id}" aria-label="${esc(r.name)}">
      <polygon class="room-shape" points="${r.poly.map(p => p.join(',')).join(' ')}"/>
      <text class="room-label" x="${cx}" y="${cy - 6}" style="--fs:${Math.min(30, fit).toFixed(1)}px;--fsm:${Math.min(46, fit).toFixed(1)}px">${esc(r.name)}</text>
      <text class="room-meta" x="${cx}" y="${cy + 24}">${r.products.length ? money(b.sel) + ' · ' : ''}${s.pct}%</text></a>`;
  }).join('');
  const oos = L.outOfScope.map(o => { const [cx, cy] = centroid(o.poly); return `<polygon class="oos" points="${o.poly.map(p => p.join(',')).join(' ')}"/><text class="oos-label" x="${cx}" y="${cy}">${esc(o.label)}</text>`; }).join('');
  const list = rooms.map(r => {
    const s = roomStatus(r), b = roomBudget(r), im = r.renders[0];
    return `<a class="room-card" href="#/pokoj/${r.id}" data-room="${r.id}">
      <span class="thumb" ${im ? `style="background-image:url('${im.thumb}')"` : ''}>${im ? '' : 'brak wizualizacji'}</span>
      <span><h3>${esc(r.name)}</h3><span class="meta">${r.products.length ? `<span>${money(b.sel)}</span>` : ''}<span>${r.renders.length} wiz.</span><span>${r.drawings.length} rys.</span>${s.comments ? `<span>💬 ${s.comments}</span>` : ''}</span>
      <span class="progress" title="Postęp decyzji: ${s.pct}%"><span style="width:${s.pct}%"></span></span></span></a>`;
  }).join('');
  app.innerHTML = `${bar(L.id)}
  <div class="plan-layout">
    <div class="plan-card">
      <svg class="plan-svg" viewBox="0 0 ${L.plan.w} ${L.plan.h}" role="img" aria-label="Rzut: ${esc(L.name)}">
        <defs><pattern id="hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" style="fill:var(--code)"/><line x1="0" y1="0" x2="0" y2="16" style="stroke:var(--line)" stroke-width="6"/></pattern></defs>
        <image href="${L.plan.src}" width="${L.plan.w}" height="${L.plan.h}"/>${oos}${shapes}
      </svg>
      <p class="plan-hint">Kliknij pomieszczenie na rzucie albo na liście, aby zobaczyć wizualizacje, rysunki, produkty i zadania. <a href="model-mieszkanie.html">Otwórz model 3D mieszkania →</a></p>
    </div>
    <div class="room-list">${list}</div>
  </div>`;
  // podświetlanie rzut ↔ lista
  app.querySelectorAll('[data-room]').forEach(el => {
    const id = el.dataset.room, on = v => app.querySelectorAll(`[data-room="${id}"]`).forEach(x => { x.classList.toggle('hl', v); x.querySelector('.room-shape')?.classList.toggle('hl', v); });
    el.addEventListener('mouseenter', () => on(true)); el.addEventListener('mouseleave', () => on(false));
  });
}

// ── pomieszczenie ───────────────────────────────────────────────
function approveBtn(key, small = false) {
  const on = !!S.approvals[key];
  return `<button class="approve${small ? ' small' : ''}" data-approve="${esc(key)}" aria-pressed="${on}"><span class="dot"></span>${on ? 'Zaakceptowane' : 'Akceptuję'}</button>`;
}
function viewRoom(id, anchor) {
  const r = ROOM[id]; if (!r) return viewPlan();
  const lvl = LEVEL[r.level], order = ROOMS, i = order.indexOf(r), prev = order[i - 1], next = order[i + 1];
  const b = roomBudget(r), st = roomStatus(r);
  const sections = [
    r.renders.length && ['wiz', 'Wizualizacje', r.renders.length],
    r.compare.length && ['por', 'Porównanie', r.compare.length],
    r.drawings.length && ['rys', 'Rysunki', r.drawings.length],
    r.products.length && ['prod', 'Produkty', r.products.length],
    ['zad', 'Checklista', `${st.tkOk}/${st.tk}`],
    ['kom', 'Komentarze', st.comments],
  ].filter(Boolean);
  const cur = Math.min(Number(viewRoom.cur?.[id] ?? 0), Math.max(0, r.renders.length - 1));

  const wiz = r.renders.length ? `<section class="section" id="wiz"><h3>Wizualizacje <small>${st.apOk}/${st.ap} zaakceptowanych w tym pomieszczeniu</small></h3>
    <div class="viewer"><div class="stage" data-open="${cur}"><img src="${r.renders[cur].src}" alt="${esc(r.renders[cur].title)}" width="${r.renders[cur].w}" height="${r.renders[cur].h}"></div>
      <div class="caption"><span class="t">${esc(r.renders[cur].title)}</span>${approveBtn(`${r.id}:r${cur}`)}<button class="btn small" data-comment-ref="r${cur}">Skomentuj</button><button class="btn small" data-open="${cur}">Pełny ekran</button></div></div>
    ${r.renders.length > 1 ? `<div class="strip">${r.renders.map((x, k) => `<button data-pick="${k}" aria-current="${k === cur}" aria-label="${esc(x.title)}"><img src="${x.thumb}" alt="" loading="lazy">${S.approvals[`${r.id}:r${k}`] ? '<span class="ok">✓</span>' : ''}</button>`).join('')}</div>` : ''}</section>` : '';

  const por = r.compare.length ? `<section class="section" id="por"><h3>Porównanie <small>przeciągnij suwak</small></h3>${r.compare.map((c, k) => {
    const pick = S.choices[`${r.id}:c${k}`];
    return `<div class="compare" style="max-width:calc(72vh * ${(c.a.w / c.a.h).toFixed(3)})"><div class="cmp-stage" style="--x:50%"><img src="${c.a.src}" alt="${esc(c.a.label)}" width="${c.a.w}" height="${c.a.h}"><div class="top"><img src="${c.b.src}" alt="${esc(c.b.label)}"></div>
      <span class="cmp-tag l">${esc(c.a.label)}</span><span class="cmp-tag r">${esc(c.b.label)}</span><span class="handle"></span>
      <input type="range" min="0" max="100" value="50" aria-label="Suwak porównania: ${esc(c.title)}"></div>
      <div class="cmp-foot"><span class="t">${esc(c.title)}</span>${c.kind === 'variant' ? `<span class="seg" role="group" aria-label="Wybór wariantu"><button data-variant="${r.id}:c${k}" data-v="a" aria-pressed="${pick === 'a'}">${esc(c.a.label)}</button><button data-variant="${r.id}:c${k}" data-v="b" aria-pressed="${pick === 'b'}">${esc(c.b.label)}</button></span>` : ''}${approveBtn(`${r.id}:c${k}`)}</div></div>`;
  }).join('')}</section>` : '';

  const rys = r.drawings.length ? `<section class="section" id="rys"><h3>Rysunki</h3><div class="drawings">${r.drawings.map((d, k) => `<div class="drawing">
      <a class="pv" href="${d.href}" target="_blank" rel="noopener" style="background-image:url('${d.thumb}')" aria-label="Otwórz rysunek: ${esc(d.title)}"></a>
      <div class="b"><span class="t">${esc(d.title)}</span><div class="row"><a class="btn small" href="${d.href}" target="_blank" rel="noopener">Otwórz rysunek</a>${approveBtn(`${r.id}:d${k}`, true)}</div></div></div>`).join('')}</div></section>` : '';

  const delta = b.sel - b.rec;
  const prod = r.products.length ? `<section class="section" id="prod"><h3>Produkty <small>wybierz wariant – budżet liczy się na bieżąco</small></h3>
    <div class="budget"><span>Twój wybór: <b>${money(b.sel)}</b></span><span>Wg rekomendacji projektantki: <b>${money(b.rec)}</b></span>${b.rec ? `<span class="delta ${delta > 0 ? 'up' : 'down'}">${delta === 0 ? 'zgodnie z rekomendacją' : `${delta > 0 ? '+' : '−'}${money(Math.abs(delta))} względem rekomendacji`}</span>` : ''}<span>Zakres: ${money(b.min)} – ${money(b.max)}</span>${b.missing ? `<span>${b.missing} poz. bez ceny</span>` : ''}</div>
    <div class="products">${r.products.map(it => {
      const ch = chosen(it), c = ch ? cost(it, ch) : null;
      return `<div class="product"><div class="head"><span class="t">${esc(it.name)}</span><span class="q">${it.qty > 1 ? `× ${it.qty}` : ''}</span>${decidedByClient(it) ? '<span class="pill ok">wybrane</span>' : it.decision ? '<span class="pill wait">wstępnie z arkusza</span>' : ''}<span class="sum">${ch ? money(c) : ''}</span></div>
        ${tiersOf(it).length ? `<div class="tiers">${TIERS.map(t => {
          const o = it.options[t.id];
          if (!o) return `<div class="tier na"><span class="lbl">${t.label}</span><span class="nt">brak propozycji</span></div>`;
          return `<div class="tier" role="button" tabindex="0" data-choose="${it.id}" data-tier="${t.id}" aria-pressed="${ch === t.id}">${it.rec === t.id ? '<span class="rec">rekomendacja</span>' : ''}<span class="chk"></span>
            <span class="lbl">${t.label}</span><span class="pr">${typeof o.price === 'number' ? money(o.price) : 'cena do ustalenia'}</span>
            ${it.qty > 1 && typeof o.price === 'number' ? `<span class="nt">razem ${money(o.price * it.qty)}</span>` : ''}${o.note ? `<span class="nt">${esc(o.note)}</span>` : ''}
            ${o.link ? `<a class="lk" href="${esc(o.link)}" target="_blank" rel="noopener" data-stop>zobacz produkt ↗</a>` : ''}</div>`;
        }).join('')}</div>` : '<p class="empty">Brak propozycji – projektantka uzupełni warianty.</p>'}</div>`;
    }).join('')}</div></section>` : '';

  const tasks = tasksOf(r);
  const zad = `<section class="section" id="zad"><h3>Checklista <small>${st.tkOk}/${st.tk}</small></h3>
    <ul class="tasks">${tasks.map(t => `<li class="${S.done[t.key] ? 'done' : ''}"><input type="checkbox" id="t-${esc(t.key)}" data-task="${esc(t.key)}" ${S.done[t.key] ? 'checked' : ''}><label class="tx" for="t-${esc(t.key)}">${esc(t.text)}</label>${t.custom ? `<button class="rm" data-rmtask="${esc(t.key)}" aria-label="Usuń zadanie">×</button>` : ''}</li>`).join('')}</ul>
    <form class="addrow" data-addtask><input name="t" placeholder="Dodaj własne zadanie…" aria-label="Nowe zadanie"><button class="btn" type="submit">Dodaj</button></form></section>`;

  const refs = [['', 'Ogólnie'], ...r.renders.map((x, k) => [`r${k}`, `Wizualizacja: ${x.title}`]), ...r.compare.map((x, k) => [`c${k}`, `Porównanie: ${x.title}`]), ...r.drawings.map((x, k) => [`d${k}`, `Rysunek: ${x.title}`]), ...r.products.map(x => [x.id, `Produkt: ${x.name}`])];
  const refLabel = ref => refs.find(x => x[0] === ref)?.[1] ?? '';
  const coms = S.comments.filter(c => c.room === r.id);
  const kom = `<section class="section" id="kom"><h3>Komentarze <small>dla projektantki</small></h3>
    <div class="comments">${coms.length ? coms.map(c => `<div class="comment"><div class="who"><b>${esc(c.author || 'Klient')}</b><span>${new Date(c.ts).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })}</span>${c.ref ? `<span class="ref">${esc(refLabel(c.ref))}</span>` : ''}<button class="rm" data-rmcomment="${c.id}" aria-label="Usuń komentarz">×</button></div><div class="txt">${esc(c.text)}</div></div>`).join('') : '<p class="empty">Brak komentarzy. Uwagi trafią do podsumowania i maila do projektantki.</p>'}</div>
    <form class="comment-form" data-comment><input name="author" placeholder="Twoje imię" value="${esc(S.author)}" aria-label="Autor"><select name="ref" aria-label="Czego dotyczy">${refs.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select>
      <textarea name="text" placeholder="Np. „Wolę jaśniejszy blat” albo „Czy da się przesunąć lampę?”" aria-label="Treść komentarza" required></textarea><div class="row"><button class="btn primary" type="submit">Dodaj komentarz</button></div></form></section>`;

  app.innerHTML = `${bar(r.level)}
  <div class="crumbs"><a href="#/plan/${lvl.id}">${esc(lvl.name)}</a><span>›</span><span>${esc(r.name)}</span></div>
  <div class="room-head"><h2>${esc(r.name)}</h2><span class="pill ${st.pct === 100 ? 'ok' : 'wait'}">${st.pct}% decyzji</span>
    <div class="room-nav">${prev ? `<a class="btn" href="#/pokoj/${prev.id}">← ${esc(prev.name)}</a>` : ''}${next ? `<a class="btn" href="#/pokoj/${next.id}">${esc(next.name)} →</a>` : `<a class="btn primary" href="#/podsumowanie">Podsumowanie →</a>`}</div></div>
  ${r.intro ? `<p class="intro">${esc(r.intro)}</p>` : ''}
  <div class="actions"><a class="btn" href="model-mieszkanie.html#pokoj=${r.id}">Pokaż w 3D</a>${r.links.map(l => `<a class="btn" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}</div>
  <nav class="chips" aria-label="Sekcje">${sections.map(([sid, l, n]) => `<a href="#/pokoj/${r.id}/${sid}">${l}<span class="n">${n}</span></a>`).join('')}</nav>
  ${wiz}${por}${rys}${prod}${zad}${kom}`;

  // zdarzenia
  app.querySelectorAll('[data-pick]').forEach(b => b.addEventListener('click', () => { (viewRoom.cur ||= {})[id] = Number(b.dataset.pick); rerender(); }));
  app.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openLightbox(r, Number(b.dataset.open))));
  app.querySelectorAll('.cmp-stage input').forEach(inp => inp.addEventListener('input', () => inp.closest('.cmp-stage').style.setProperty('--x', `${inp.value}%`)));
  app.querySelectorAll('[data-variant]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.variant; S.choices[k] = S.choices[k] === b.dataset.v ? undefined : b.dataset.v; save(); rerender(); }));
  const choose = b => { S.choices[b.dataset.choose] = b.dataset.tier; save(); rerender(); toast(`Wybrano: ${tierLabel(b.dataset.tier)}`); };
  app.querySelectorAll('[data-choose]').forEach(b => {
    b.addEventListener('click', e => { if (!e.target.closest('[data-stop]')) choose(b); });
    b.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('[data-stop]')) { e.preventDefault(); choose(b); } });
  });
  app.querySelectorAll('[data-comment-ref]').forEach(b => b.addEventListener('click', () => {
    const f = app.querySelector('[data-comment]'); f.ref.value = b.dataset.commentRef; f.scrollIntoView({ behavior: 'smooth', block: 'center' }); f.text.focus();
  }));
  app.querySelector('[data-addtask]').addEventListener('submit', e => {
    e.preventDefault(); const t = e.target.t.value.trim(); if (!t) return;
    (S.custom[id] ||= []).push({ id: `${id}:x${uid()}`, text: t }); save(); rerender('zad');
  });
  app.querySelector('[data-comment]').addEventListener('submit', e => {
    e.preventDefault(); const f = e.target, text = f.text.value.trim(); if (!text) return;
    S.author = f.author.value.trim(); S.comments.push({ id: uid(), room: id, ref: f.ref.value, text, author: S.author, ts: new Date().toISOString() }); save(); rerender('kom'); toast('Dodano komentarz');
  });
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }));
}

// ── podsumowanie ────────────────────────────────────────────────
function summaryText() {
  const t = totals(), lines = [`${P.name} – podsumowanie decyzji (${new Date().toLocaleDateString('pl-PL')})`, `Budżet wybrany: ${money(t.sel)} (rekomendacja: ${money(t.rec)})`, `Zaakceptowane: ${t.apOk}/${t.ap}, zadania: ${t.tkOk}/${t.tk}`, ''];
  for (const r of ROOMS) {
    const b = roomBudget(r), ap = approvables(r), coms = S.comments.filter(c => c.room === r.id);
    const picks = r.products.filter(decidedByClient), vars = r.compare.map((c, k) => [c, S.choices[`${r.id}:c${k}`]]).filter(([, v]) => v);
    const okd = ap.filter(a => S.approvals[a.key]);
    if (!picks.length && !vars.length && !okd.length && !coms.length) continue;
    lines.push(`■ ${r.name}${r.products.length ? ` – ${money(b.sel)}` : ''}`);
    picks.forEach(it => lines.push(`  • ${it.name}: ${tierLabel(chosen(it))} (${money(cost(it, chosen(it)))})${it.rec && it.rec !== chosen(it) ? ` – rekomendacja: ${tierLabel(it.rec)}` : ''}`));
    vars.forEach(([c, v]) => lines.push(`  • ${c.title}: ${v === 'a' ? c.a.label : c.b.label}`));
    if (okd.length) lines.push(`  ✓ zaakceptowane: ${okd.map(a => a.label).join('; ')}`);
    coms.forEach(c => lines.push(`  💬 ${c.author || 'Klient'}: ${c.text.replace(/\s+/g, ' ')}`));
    lines.push('');
  }
  return lines.join('\n');
}
function viewSummary() {
  const t = totals();
  const rows = ROOMS.map(r => { const b = roomBudget(r), s = roomStatus(r);
    return `<tr><td><a href="#/pokoj/${r.id}">${esc(r.name)}</a></td><td class="num">${r.products.length ? money(b.sel) : '—'}</td><td class="num">${r.products.length ? money(b.rec) : '—'}</td><td class="num">${s.items ? `${s.decided}/${s.items}` : '—'}</td><td class="num">${s.ap ? `${s.apOk}/${s.ap}` : '—'}</td><td class="num">${s.tkOk}/${s.tk}</td><td class="num">${s.comments || ''}</td></tr>`; }).join('');
  app.innerHTML = `${bar('sum')}
  <div class="sum-kpis">
    <div class="sum-kpi"><div class="v">${money(t.sel)}</div><div class="l">budżet wg Twoich wyborów</div></div>
    <div class="sum-kpi"><div class="v">${money(t.rec)}</div><div class="l">wg rekomendacji projektantki</div></div>
    <div class="sum-kpi"><div class="v">${money(t.min)} – ${money(t.max)}</div><div class="l">zakres: najtaniej – najdrożej</div></div>
    <div class="sum-kpi"><div class="v">${t.decided}/${t.items}</div><div class="l">produktów wybranych</div></div>
    <div class="sum-kpi"><div class="v">${t.apOk}/${t.ap}</div><div class="l">wizualizacji i rysunków zaakceptowanych</div></div>
    <div class="sum-kpi"><div class="v">${t.comments}</div><div class="l">komentarzy</div></div>
  </div>
  <div class="table-wrap"><table class="sum-table"><thead><tr><th>Pomieszczenie</th><th class="num">Twój wybór</th><th class="num">Rekomendacja</th><th class="num">Produkty</th><th class="num">Akceptacje</th><th class="num">Zadania</th><th class="num">💬</th></tr></thead><tbody>${rows}</tbody>
    <tfoot><tr><th>Razem</th><th class="num">${money(t.sel)}</th><th class="num">${money(t.rec)}</th><th class="num">${t.decided}/${t.items}</th><th class="num">${t.apOk}/${t.ap}</th><th class="num">${t.tkOk}/${t.tk}</th><th class="num">${t.comments}</th></tr></tfoot></table></div>
  <div class="actions">
    <button class="btn primary" data-act="mail">Wyślij projektantce</button>
    <button class="btn" data-act="copy">Kopiuj podsumowanie</button>
    <button class="btn" data-act="export">Pobierz plik decyzji</button>
    <label class="btn">Wczytaj plik decyzji<input type="file" accept="application/json" data-act="import" hidden></label>
    <button class="btn" data-act="print">Drukuj / PDF</button>
    <button class="btn" data-act="reset">Wyczyść moje wybory</button>
  </div>
  <p class="note">Wybory, akceptacje, zadania i komentarze zapisują się w tej przeglądarce. Żeby przekazać je projektantce, wyślij podsumowanie albo plik decyzji. Projektantka wczyta go przyciskiem „Wczytaj plik decyzji”.</p>
  <h3>Podgląd podsumowania</h3><pre class="note" style="white-space:pre-wrap;background:var(--code);padding:14px;border-radius:10px">${esc(summaryText())}</pre>`;

  app.querySelectorAll('[data-act]').forEach(el => el.addEventListener(el.type === 'file' ? 'change' : 'click', async e => {
    const act = el.dataset.act, text = summaryText();
    if (act === 'copy') { await navigator.clipboard.writeText(text).catch(() => {}); toast('Skopiowano podsumowanie'); }
    if (act === 'mail') {
      await navigator.clipboard.writeText(text).catch(() => {});
      const body = text.length > 1800 ? `${text.slice(0, 1700)}\n…\n(pełne podsumowanie jest w schowku – wklej je tutaj)` : text;
      location.href = `mailto:${encodeURIComponent(P.designerEmail || '')}?subject=${encodeURIComponent(`${P.name} – decyzje i uwagi`)}&body=${encodeURIComponent(body)}`;
    }
    if (act === 'export') {
      const blob = new Blob([JSON.stringify({ project: P.id, exported: new Date().toISOString(), state: S }, null, 1)], { type: 'application/json' });
      const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${P.id}-decyzje-${new Date().toISOString().slice(0, 10)}.json` });
      a.click(); URL.revokeObjectURL(a.href);
    }
    if (act === 'import') {
      try {
        const j = JSON.parse(await e.target.files[0].text());
        if (j.project !== P.id || !j.state) throw new Error('inny projekt');
        const st = j.state;
        // scalanie: wybory i akceptacje z pliku nadpisują, komentarze i zadania własne są łączone
        S.choices = { ...S.choices, ...st.choices }; S.approvals = { ...S.approvals, ...st.approvals }; S.done = { ...S.done, ...st.done };
        for (const [rid, list] of Object.entries(st.custom || {})) { const have = new Set((S.custom[rid] ||= []).map(x => x.id)); list.forEach(x => have.has(x.id) || S.custom[rid].push(x)); }
        const ids = new Set(S.comments.map(c => c.id)); (st.comments || []).forEach(c => ids.has(c.id) || S.comments.push(c));
        S.comments.sort((a, b) => a.ts.localeCompare(b.ts)); save(); rerender(); toast('Wczytano plik decyzji');
      } catch (err) { toast(`Nie udało się wczytać pliku (${err.message})`); }
    }
    if (act === 'print') print();
    if (act === 'reset' && confirm('Usunąć wszystkie wybory, akceptacje, zadania i komentarze zapisane w tej przeglądarce?')) { S = blank(); save(); rerender(); }
  }));
}

// ── podgląd pełnoekranowy ───────────────────────────────────────
function openLightbox(room, i) {
  const n = room.renders.length, r = room.renders[i], key = `${room.id}:r${i}`;
  lb.innerHTML = `<div class="top"><span class="t">${esc(room.name)} · ${esc(r.title)} <span class="note">(${i + 1}/${n})</span></span><button class="x" data-x aria-label="Zamknij">✕</button></div>
    <div class="img"><img src="${r.src}" alt="${esc(r.title)}"></div>${n > 1 ? `<button class="nav p" data-go="-1" aria-label="Poprzednia">‹</button><button class="nav n" data-go="1" aria-label="Następna">›</button>` : ''}
    <div class="bottom">${approveBtn(key)}</div>`;
  lb.hidden = false; document.body.style.overflow = 'hidden';
  lb.querySelector('[data-x]').onclick = closeLightbox;
  lb.querySelectorAll('[data-go]').forEach(b => (b.onclick = () => openLightbox(room, (i + Number(b.dataset.go) + n) % n)));
  lb.onkeydown = null; openLightbox.cur = { room, i };
}
function closeLightbox() { lb.hidden = true; document.body.style.overflow = ''; openLightbox.cur = null; rerender(); }
document.addEventListener('keydown', e => {
  const c = openLightbox.cur; if (!c) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') openLightbox(c.room, (c.i + (e.key === 'ArrowRight' ? 1 : -1) + c.room.renders.length) % c.room.renders.length);
});

// akceptacje i zadania (delegacja – działa też w lightboxie)
document.addEventListener('click', e => {
  const a = e.target.closest('[data-approve]');
  if (a) { const k = a.dataset.approve; S.approvals[k] = !S.approvals[k] || undefined; save(); if (openLightbox.cur) openLightbox(openLightbox.cur.room, openLightbox.cur.i); else rerender(); toast(S.approvals[k] ? 'Zaakceptowano' : 'Cofnięto akceptację'); }
  const rt = e.target.closest('[data-rmtask]');
  if (rt) { for (const l of Object.values(S.custom)) { const j = l.findIndex(x => x.id === rt.dataset.rmtask); if (j >= 0) l.splice(j, 1); } delete S.done[rt.dataset.rmtask]; save(); rerender('zad'); }
  const rc = e.target.closest('[data-rmcomment]');
  if (rc && confirm('Usunąć komentarz?')) { S.comments = S.comments.filter(c => c.id !== rc.dataset.rmcomment); save(); rerender('kom'); }
});
document.addEventListener('change', e => { const t = e.target.closest('[data-task]'); if (t) { S.done[t.dataset.task] = t.checked || undefined; save(); rerender(); } });

// ── routing ─────────────────────────────────────────────────────
// anchor: undefined → sekcja z adresu, false → bez przewijania, tekst → przewiń do tej sekcji
function route(anchor) {
  const [, view, id, sec] = location.hash.split('/');
  if (view === 'pokoj') viewRoom(id, anchor === undefined ? sec : anchor);
  else if (view === 'podsumowanie') viewSummary();
  else viewPlan(id);
}
// ponowne rysowanie bez skakania strony
function rerender(anchor) { const y = scrollY; route(anchor || false); if (!anchor) scrollTo(0, y); }
addEventListener('hashchange', () => { route(); if (!location.hash.split('/')[3]) scrollTo(0, 0); });
route();
