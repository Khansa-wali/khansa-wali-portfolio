/* Khansa Wali — portfolio interactions (vanilla JS, no dependencies) */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* footer year */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* sticky nav state */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu */
  const burger = $('#burger'), links = $('#navLinks');
  const setMenu = open => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* scroll reveal */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  /* active nav link */
  const map = { home: 'home', about: 'about', expertise: 'expertise', projects: 'projects', arsenal: 'expertise', journey: 'journey', vision: 'journey', contact: 'contact' };
  const navLinks = $$('[data-link]');
  const page = document.body.dataset.page;
  if (page) {
    navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.link === page));
  } else if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const key = map[en.target.dataset.section];
        navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.link === key));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(s => so.observe(s));
  }

  /* cursor glow + card spotlight + tilt (desktop only) */
  if (fine && !reduce) {
    const glow = $('.cursor-glow');
    window.addEventListener('pointermove', e => {
      glow.style.transform = `translate3d(${e.clientX - 260}px, ${e.clientY - 260}px, 0)`;
    }, { passive: true });

    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', x * 100 + '%'); card.style.setProperty('--my', y * 100 + '%');
        card.style.transform = `perspective(1000px) rotateX(${(.5 - y) * 4}deg) rotateY(${(x - .5) * 5}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    /* subtle portrait parallax */
    const portrait = $('#portrait');
    if (portrait) {
      window.addEventListener('pointermove', e => {
        const dx = (e.clientX / innerWidth - .5) * 10, dy = (e.clientY / innerHeight - .5) * 8;
        portrait.style.setProperty('--px', dx + 'px'); portrait.style.setProperty('--py', dy + 'px');
        portrait.querySelector('img').style.translate = `${dx * .5}px ${dy * .5}px`;
        portrait.querySelector('.portrait__halo').style.translate = `${-dx}px ${-dy}px`;
      }, { passive: true });
    }
  }

  /* restrained network canvas in the hero */
  const canvas = $('#net');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d');
    let w, h, pts = [], raf, visible = true;
    const count = () => Math.min(46, Math.floor(innerWidth / 30));
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: count() }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22 }));
    };
    const tick = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
          if (d < 14400) { ctx.strokeStyle = `rgba(71,123,255,${(1 - d / 14400) * .22})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(57,217,230,.55)'; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.4, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(resize, 200); });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) { cancelAnimationFrame(raf); tick(); } }).observe(canvas);
    tick();
  }

  /* placeholder links: tell the owner what to fill in instead of 404ing */
  const toast = $('#toast'); let tt;
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-placeholder]');
    if (!a) return;
    e.preventDefault();
    toast.textContent = `Placeholder: add your ${a.dataset.placeholder} (see the README).`;
    toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 3800);
  });
})();
