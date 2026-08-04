/* ═══════════════════════════════════════════════════════════
   Juan Alvarez — Portafolio
   Tema, navegación móvil, scroll spy, progreso y reveals.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Tema (claro / oscuro) ──────────────────────────────
     El tema inicial ya se aplica antes del primer render
     mediante el bloque inline al final de este archivo. */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* modo privado */ }
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
  }

  themeToggle.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Seguir al sistema mientras el usuario no haya elegido manualmente.
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', function (e) {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch (err) { /* noop */ }
    if (!stored) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  /* ── Navegación móvil ───────────────────────────────── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  }

  navToggle.addEventListener('click', function () {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ── Header pegajoso + barra de progreso ────────────── */
  const header = document.getElementById('header');
  const progress = document.getElementById('progress');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-stuck', y > 8);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ── Scroll spy ─────────────────────────────────────── */
  const links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Reveals al entrar en viewport ──────────────────── */
  const revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Escalonado suave entre hermanos visibles a la vez.
        const delay = Math.min(entry.target.dataset.i ? +entry.target.dataset.i * 70 : 0, 350);
        setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      // El índice se reinicia por bloque padre para que el escalonado no crezca sin fin.
      const siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (c) {
        return c.classList.contains('reveal');
      });
      el.dataset.i = Math.max(siblings.indexOf(el), 0);
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Foto: respaldo con iniciales si no existe ──────── */
  const portrait = document.getElementById('portrait');
  if (portrait) {
    const markMissing = function () {
      portrait.closest('.photo-frame').classList.add('no-image');
    };
    portrait.addEventListener('error', markMissing);
    if (portrait.complete && portrait.naturalWidth === 0) markMissing();
  }

  /* ── Año del footer ─────────────────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

})();
