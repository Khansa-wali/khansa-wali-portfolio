/* Portfolio page: renders everything from js/projects-data.js */
(() => {
  'use strict';

  /* ---- CONTACT SETTINGS (same idea as the Services page) ----
     email:    enquiries open the visitor's mail app
     whatsapp: digits only with country code, e.g. '923001234567'. '' = email only. */
  const CONTACT = { email: 'khansawali.dev@gmail.com', whatsapp: '923089661739' };

  const DATA = window.PORTFOLIO;
  if (!DATA) return;
  const CATS = DATA.categories;
  /* published: false hides a project; optional `order` (lower = first), otherwise file order */
  const PROJECTS = DATA.projects.filter(p => p.published !== false)
    .map((p, i) => ({ p, i })).sort((a, b) => (a.p.order ?? 1e6) - (b.p.order ?? 1e6) || a.i - b.i).map(x => x.p);
  const catById = Object.fromEntries(CATS.map(c => [c.id, c]));
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5"/></svg>';
  const countIn = id => PROJECTS.filter(p => p.category === id).length;

  /* ---------- contact links ---------- */
  function contactHref(subject, body) {
    if (CONTACT.whatsapp) return { href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, ext: true };
    return { href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, ext: false };
  }
  function applyContact(a, subject, body) {
    const c = contactHref(subject, body);
    a.href = c.href;
    if (c.ext) { a.target = '_blank'; a.rel = 'noopener'; }
  }
  $$('[data-contact]').forEach(a => applyContact(a, 'Project enquiry', "Hi Khansa, I'd like to discuss a project with you.\n\nWhat I'm trying to achieve:\n"));

  /* ---------- placeholder illustrations (clearly not screenshots) ---------- */
  let uid = 0;
  function visual(type) {
    const g = 'g' + (++uid);
    const grad = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#39D9E6"/><stop offset="1" stop-color="#9B7BFF"/></linearGradient></defs>`;
    const mono = 'font-family="JetBrains Mono, monospace" font-size="8"';
    const base = '<rect width="400" height="240" fill="#0d1220"/>';
    const wrap = inner => `<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${grad}${base}${inner}</svg>`;
    switch (type) {
      case 'traffic': return wrap(`
        <path d="M120 240 200 20 280 240" fill="#131a2b"/><path d="M200 20v220" stroke="#F4F6FC" stroke-opacity=".18" stroke-dasharray="10 12"/>
        <path d="M0 150h400M0 90h400" stroke="#F4F6FC" stroke-opacity=".05"/>
        <g class="scan"><rect width="400" height="2" fill="#39D9E6" opacity=".5"/></g>
        <g fill="none" stroke="url(#${g})" stroke-width="1.5"><rect x="140" y="130" width="52" height="34" rx="3"/><rect x="212" y="84" width="38" height="26" rx="3"/><rect x="232" y="170" width="60" height="38" rx="3" stroke="#9B7BFF"/></g>
        <g ${mono} fill="#39D9E6"><text x="140" y="125">vehicle</text><text x="212" y="79">vehicle</text><text x="232" y="165" fill="#9B7BFF">priority</text></g>
        <rect x="160" y="200" width="44" height="10" rx="2" fill="none" stroke="#477BFF" stroke-dasharray="3 3"/><text x="160" y="222" ${mono} fill="#477BFF">road damage</text>`);
      case 'classify': return wrap(`
        <circle cx="200" cy="120" r="78" fill="#171E2D"/><circle cx="200" cy="120" r="78" fill="none" stroke="#477BFF" stroke-opacity=".5"/>
        <circle cx="200" cy="120" r="46" fill="none" stroke="#39D9E6" stroke-dasharray="4 5"/>
        <path d="M168 88v-12h12M232 88v-12h-12M168 152v12h12M232 152v12h-12" stroke="#39D9E6" stroke-width="1.5" fill="none"/>
        <g fill="#9B7BFF" opacity=".8"><circle cx="190" cy="112" r="5"/><circle cx="214" cy="128" r="3"/><circle cx="206" cy="104" r="2.5"/></g>`);
      case 'cnn': return wrap(`
        <g fill="none" stroke="#477BFF" stroke-opacity=".6"><rect x="60" y="80" width="40" height="80" rx="3"/><rect x="68" y="72" width="40" height="80" rx="3" stroke="#39D9E6"/><rect x="150" y="92" width="30" height="56" rx="3"/><rect x="158" y="84" width="30" height="56" rx="3" stroke="#39D9E6"/><rect x="230" y="104" width="20" height="32" rx="3"/><rect x="238" y="96" width="20" height="32" rx="3" stroke="#39D9E6"/></g>
        <g fill="#9B7BFF"><circle cx="320" cy="96" r="6"/><circle cx="320" cy="120" r="6"/><circle cx="320" cy="144" r="6"/></g>
        <path d="M258 112l56-16M258 112l56 8M258 112l56 32" stroke="#9B7BFF" stroke-opacity=".5"/>`);
      case 'trend': return wrap(`
        <path d="M50 190h300M50 190V40" stroke="#F4F6FC" stroke-opacity=".15"/>
        <g fill="#39D9E6" opacity=".85"><circle cx="85" cy="165" r="3"/><circle cx="120" cy="150" r="3"/><circle cx="150" cy="158" r="3"/><circle cx="190" cy="122" r="3"/><circle cx="225" cy="130" r="3"/><circle cx="260" cy="92" r="3"/><circle cx="295" cy="98" r="3"/><circle cx="325" cy="62" r="3"/></g>
        <path d="M70 172 335 58" stroke="#9B7BFF" stroke-width="2" stroke-linecap="round"/>`);
      case 'pulse': return wrap(`
        <path d="M0 60h400M0 120h400M0 180h400M80 0v240M160 0v240M240 0v240M320 0v240" stroke="#F4F6FC" stroke-opacity=".05"/>
        <path d="M30 124h80l14-8 12 40 20-86 20 74 12-20h30l12-12 12 12h120" fill="none" stroke="url(#${g})" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M268 124h102" stroke="#477BFF" stroke-dasharray="3 4" opacity=".7"/>`);
      case 'network': return wrap(`
        <g stroke="#477BFF" stroke-opacity=".4" fill="none"><path d="M90 120 170 70 250 100 320 60M90 120 160 170 250 100 300 170M170 70 160 170M250 100 320 60M300 170 320 60"/></g>
        <g fill="#39D9E6"><circle cx="90" cy="120" r="5"/><circle cx="170" cy="70" r="5"/><circle cx="250" cy="100" r="5"/><circle cx="160" cy="170" r="5"/></g>
        <g fill="#9B7BFF"><circle cx="320" cy="60" r="5"/><circle cx="300" cy="170" r="5"/></g>`);
      case 'face': return wrap(`
        <ellipse cx="200" cy="116" rx="46" ry="58" fill="#171E2D" stroke="#477BFF" stroke-opacity=".5"/>
        <path d="M172 126q28 22 56 0v22q-28 18-56 0z" fill="#101522" stroke="#39D9E6" stroke-opacity=".6"/>
        <rect x="146" y="52" width="108" height="130" rx="4" fill="none" stroke="url(#${g})" stroke-width="1.5" stroke-dasharray="6 4"/>
        <circle cx="184" cy="100" r="3" fill="#39D9E6"/><circle cx="216" cy="100" r="3" fill="#39D9E6"/>`);
      case 'road': return wrap(`
        <path d="M110 240 190 10h20l80 230z" fill="#131a2b"/><path d="M200 10v230" stroke="#F4F6FC" stroke-opacity=".18" stroke-dasharray="10 12"/>
        <path d="M168 186l14-12 6 14 16-10 8 12" fill="none" stroke="#9B7BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="156" y="160" width="86" height="48" rx="3" fill="none" stroke="url(#${g})" stroke-width="1.5" stroke-dasharray="5 4"/>
        <text x="156" y="154" ${mono} fill="#39D9E6">damage</text>`);
      default: return wrap(`<circle cx="200" cy="120" r="60" fill="none" stroke="#477BFF" stroke-opacity=".5"/><circle cx="200" cy="120" r="28" fill="none" stroke="#39D9E6" stroke-dasharray="4 5"/>`);
    }
  }
  function media(p) {
    if (p.image) return `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">`;
    return visual(p.visual) + '<span class="pcard__ph mono">Concept illustration</span>';
  }

  /* ---------- small builders ---------- */
  const tags = (list, max) => `<ul class="tags">${(max ? list.slice(0, max) : list).map(t => `<li>${esc(t)}</li>`).join('')}${max && list.length > max ? `<li>+${list.length - max}</li>` : ''}</ul>`;
  const chips = p => [p.flagship ? 'Flagship project' : '', p.status, p.kind].filter(Boolean).map(c => `<span class="chip-s">${esc(c)}</span>`).join('');
  const link = p => `#p-${encodeURIComponent(p.id)}`;

  function card(p, i) {
    const cat = catById[p.category];
    return `<article class="pcard" data-id="${esc(p.id)}" data-cat="${esc(p.category)}" style="--i:${i}">
      <div class="pcard__media">${media(p)}</div>
      <div class="pcard__body">
        <p class="pcard__cat mono">${esc(cat ? cat.tab : p.category)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="pcard__desc">${esc(p.overview)}</p>
        ${tags(p.tech, 3)}
        <div class="pcard__foot">
          <span class="pcard__chips">${chips(p)}</span>
          <a class="pcard__cta" href="${link(p)}" aria-label="View project: ${esc(p.title)}"><span>View Project</span>${ARROW}</a>
        </div>
      </div>
    </article>`;
  }

  /* ---------- hero meta (computed from the data, never typed) ---------- */
  const used = CATS.filter(c => countIn(c.id) > 0).length;
  const meta = $('#pfMeta');
  if (meta) meta.textContent = `${PROJECTS.length} project${PROJECTS.length === 1 ? '' : 's'} across ${used} area${used === 1 ? '' : 's'}`;

  /* ---------- featured ---------- */
  const feat = PROJECTS.filter(p => p.featured);
  const flag = feat.find(p => p.flagship) || feat[0];
  const rest = feat.filter(p => p !== flag);
  const featEl = $('#featured');
  if (featEl && flag) {
    const cat = catById[flag.category];
    const involves = flag.features && flag.features.length ? `<div class="feat__list"><h4 class="mono">What it involves</h4><ul>${flag.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : '';
    featEl.innerHTML = `
      <article class="feat reveal" data-id="${esc(flag.id)}">
        <div class="feat__media">${media(flag)}</div>
        <div class="feat__body">
          <p class="feat__tag mono"><span class="dot"></span> ${flag.flagship ? 'Flagship project' : 'Featured project'} <i>/</i> ${esc(cat ? cat.name : '')}</p>
          <h3>${esc(flag.title)}</h3>
          <p>${esc(flag.overview)}</p>
          ${involves}
          ${tags(flag.tech)}
          <div class="feat__actions"><a class="btn btn--primary" href="${link(flag)}">Explore Project ${ARROW}</a>${chips(flag).replace(/<span class="chip-s">Flagship project<\/span>/, '')}</div>
        </div>
      </article>
      ${rest.length ? `<div class="feat__row">${rest.map((p, i) => card(p, i).replace('class="pcard"', `class="pcard reveal" style="--d:${(i * .08).toFixed(2)}s"`).replace(/ style="--i:\d+"/, '')).join('')}</div>` : ''}`;
  }

  /* ---------- filters + grid ---------- */
  const state = { cat: 'all', q: '' };
  const filters = $('#filters'), grid = $('#grid'), empty = $('#empty'), count = $('#count'), search = $('#search');
  filters.innerHTML = [{ id: 'all', tab: 'All Work' }, ...CATS].map(c => {
    const n = c.id === 'all' ? PROJECTS.length : countIn(c.id);
    return `<button type="button" class="pill${c.id === 'all' ? ' is-on' : ''}${n === 0 ? ' is-empty' : ''}" data-cat="${c.id}" aria-pressed="${c.id === 'all'}">${esc(c.tab)} <span class="pill__n">${n}</span></button>`;
  }).join('');
  grid.innerHTML = PROJECTS.map((p, i) => card(p, i)).join('');

  const cards = $$('.pcard', grid);
  let started = false;
  function animate() {
    started = true;
    let i = 0;
    cards.forEach(c => {
      c.classList.remove('pop');
      if (!c.hidden) { c.style.setProperty('--i', i++); void c.offsetWidth; c.classList.add('pop'); }
    });
  }
  function apply(animateIt = true) {
    const q = state.q.trim().toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const p = PROJECTS.find(x => x.id === c.dataset.id);
      const inCat = state.cat === 'all' || p.category === state.cat;
      const hay = [p.title, p.overview, (catById[p.category] || {}).name, ...p.tech].join(' ').toLowerCase();
      const ok = inCat && (!q || hay.includes(q));
      c.hidden = !ok; if (ok) shown++;
    });
    $$('.pill', filters).forEach(b => { const on = b.dataset.cat === state.cat; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    count.textContent = `Showing ${shown} of ${PROJECTS.length} project${PROJECTS.length === 1 ? '' : 's'}`;
    if (shown === 0) {
      const cat = catById[state.cat];
      const subject = cat ? cat.name : 'a project';
      if (q) empty.innerHTML = `<h3>No projects match &ldquo;${esc(state.q.trim())}&rdquo;</h3><p>Try a different word, or clear the search.</p>`;
      else empty.innerHTML = `<h3>No ${esc(cat ? cat.name : '')} projects yet</h3><p>Nothing is listed here until there is real work to show. If you have a project like this in mind, I&rsquo;d be glad to talk.</p><a class="btn btn--ghost" data-empty-contact href="#">Discuss ${esc(subject)} ${ARROW}</a>`;
      const b = $('[data-empty-contact]', empty);
      if (b) applyContact(b, 'Project enquiry: ' + subject, `Hi Khansa, I'd like to discuss a project in this area: ${subject}.\n\nWhat I'm trying to achieve:\n`);
    }
    empty.hidden = shown !== 0;
    if (animateIt && started) animate();
  }
  function setCat(id, scroll) {
    state.cat = id; apply();
    if (scroll) $('#all-work').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  filters.addEventListener('click', e => { const b = e.target.closest('.pill'); if (b) setCat(b.dataset.cat, false); });
  search.addEventListener('input', () => { state.q = search.value; apply(); });
  apply(false);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { animate(); o.disconnect(); } }, { rootMargin: '0px 0px -10% 0px' }).observe(grid);
    setTimeout(() => { if (!started) animate(); }, 4000);
  } else animate();

  /* ---------- area tiles ---------- */
  $('#areas').innerHTML = CATS.map((c, i) => {
    const n = countIn(c.id);
    return `<article class="area reveal${n === 0 ? ' is-empty' : ''}" style="--d:${((i % 4) * .06).toFixed(2)}s">
      <span class="mono area__num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.desc)}</p>
      <div class="area__foot">
        <button type="button" class="area__btn" data-cat="${c.id}">${n ? `View ${n} project${n === 1 ? '' : 's'}` : 'No projects yet'} ${ARROW}</button>
        <a class="area__svc mono" href="services.html#${c.service}">About this service</a>
      </div>
    </article>`;
  }).join('');
  $('#areas').addEventListener('click', e => { const b = e.target.closest('.area__btn'); if (b) setCat(b.dataset.cat, true); });

  /* ---------- project detail modal ---------- */
  const modal = $('#modal'), shell = $('.modal__shell', modal), panel = $('.modal__panel', modal), body = $('#modalBody');
  const inertEls = $$('main, header.nav, footer, .skip');
  let lastFocus = null, navOpened = false, isOpen = false;

  const block = (title, inner) => `<section class="mblock"><h3 class="mono">${title}</h3>${inner}</section>`;
  const para = t => `<p>${esc(t)}</p>`;
  function detail(p) {
    const cat = catById[p.category];
    const hasMore = p.problem || p.solution || p.role || p.approach || p.challenges || (p.images && p.images.length);
    const links = [];
    if (p.links && p.links.github) links.push(`<a class="btn btn--ghost btn--sm" href="${esc(p.links.github)}" target="_blank" rel="noopener">GitHub repository</a>`);
    if (p.links && p.links.demo) links.push(`<a class="btn btn--ghost btn--sm" href="${esc(p.links.demo)}" target="_blank" rel="noopener">Live demo</a>`);
    return `
      <div class="modal__media">${media(p)}</div>
      <div class="modal__content">
        <p class="pcard__cat mono">${esc(cat ? cat.name : '')}</p>
        <h2 id="modalTitle">${esc(p.title)}</h2>
        <div class="modal__chips">${chips(p)}</div>
        <p class="modal__lead">${esc(p.overview)}</p>
        ${p.problem ? block('Problem / motivation', para(p.problem)) : ''}
        ${p.solution ? block('Proposed solution', para(p.solution)) : ''}
        ${p.role ? block('My role', para(p.role)) : ''}
        ${p.features && p.features.length ? block(p.flagship ? 'What it involves' : 'Main features', `<ul class="mlist">${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`) : ''}
        ${p.approach ? block('Development approach', para(p.approach)) : ''}
        ${p.challenges ? block('Challenges &amp; learning', para(p.challenges)) : ''}
        ${block('Technologies', tags(p.tech))}
        ${p.images && p.images.length ? block('Screenshots', `<div class="shots">${p.images.map(src => `<img src="${esc(src)}" alt="${esc(p.title)} screenshot" loading="lazy">`).join('')}</div>`) : ''}
        ${links.length ? `<div class="modal__links">${links.join('')}</div>` : ''}
        ${hasMore ? '' : `<p class="modal__soon">More detail on this project will be added as its documentation is completed.</p>`}
        <div class="modal__actions">
          <a class="btn btn--primary" data-modal-contact href="#">Discuss a similar project ${ARROW}</a>
          <button type="button" class="btn btn--ghost" data-modal-close>Back to all work</button>
        </div>
      </div>`;
  }
  function show(p) {
    if (!isOpen) lastFocus = document.activeElement;
    body.innerHTML = detail(p);
    applyContact($('[data-modal-contact]', body), 'Project enquiry: ' + p.title, `Hi Khansa, I'd like to discuss a project similar to: ${p.title}.\n\nWhat I'm trying to achieve:\n`);
    modal.hidden = false; isOpen = true;
    document.documentElement.classList.add('modal-open');
    inertEls.forEach(el => el.setAttribute('inert', ''));
    panel.scrollTop = 0;
    requestAnimationFrame(() => { modal.classList.add('is-open'); $('.modal__close', modal).focus(); });
  }
  function hide() {
    if (!isOpen) return;
    isOpen = false; modal.classList.remove('is-open');
    document.documentElement.classList.remove('modal-open');
    inertEls.forEach(el => el.removeAttribute('inert'));
    setTimeout(() => { if (!isOpen) modal.hidden = true; }, reduce ? 0 : 280);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function closeRequest() {
    if (!isOpen) return;
    if (navOpened) { navOpened = false; history.back(); }
    else { history.replaceState(null, '', location.pathname + location.search); hide(); }
  }
  function route(initial) {
    const m = location.hash.match(/^#p-(.+)$/);
    const p = m && PROJECTS.find(x => x.id === decodeURIComponent(m[1]));
    if (p) { if (!initial && !isOpen) navOpened = true; show(p); } else hide();
  }
  window.addEventListener('hashchange', () => route(false));
  modal.addEventListener('click', e => { if (e.target.closest('[data-modal-close]') || e.target === modal || e.target.classList.contains('modal__backdrop')) closeRequest(); });
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); closeRequest(); }
    if (e.key === 'Tab') {
      const f = $$('a[href], button:not([disabled])', shell).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  route(true);
})();
