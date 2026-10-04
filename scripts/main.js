/* =========================================================
   Wang Decai · Portfolio — interaction layer
   - Sticky nav state on scroll
   - Active nav link via IntersectionObserver
   - Reveal-on-scroll
   - Skill bars width animation
   - Mobile menu toggle
   - Smooth scroll (native + offset for fixed nav)
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- 1. Nav: scrolled state ---------- */
  const nav = $('#nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobile menu ---------- */
  const navToggle = $('#navToggle');
  const navMenu   = $('#navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-open');
      navMenu.classList.toggle('is-open');
    });
    // close on link click
    $$('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-open');
      });
    });
    // close on outside click
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-open');
      }
    });
  }

  /* ---------- 3. Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  // hero reveals fire on load
  const heroReveals = $$('.hero .reveal');
  setTimeout(() => {
    heroReveals.forEach((el) => el.classList.add('is-visible'));
  }, 100);

  // general reveal via IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach((el) => {
    if (!el.classList.contains('is-visible')) io.observe(el);
  });

  /* ---------- 4. Active nav link on scroll ---------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  const setActive = (id) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute('href').replace('#', '');
      if (target === id) link.classList.add('is-active');
      else link.classList.remove('is-active');
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- 5. Skill bars ---------- */
  // CSS uses ::before width: var(--w); we read data-level -> set --w
  // and animate when in view
  const skillItems = $$('.skill-item');
  skillItems.forEach((item) => {
    const level = parseInt(item.getAttribute('data-level') || '70', 10);
    item.style.setProperty('--w', level + '%');
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillItems.forEach((item) => skillObserver.observe(item));

  /* ---------- 6. Smooth scroll with nav offset ---------- */
  // Native scroll-behavior: smooth handles most; we add offset via click handler
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = nav.offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // update URL hash without jumping
      history.replaceState(null, '', href);
    });
  });

  /* ---------- 7. Subtle parallax on hero bg lines ---------- */
  const heroLines = $$('.hero__bg-line');
  if (heroLines.length && window.matchMedia('(min-width: 720px)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          heroLines.forEach((line, i) => {
            const speed = (i + 1) * 0.08;
            line.style.transform = `translateY(${y * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- 8. Footer year ---------- */
  const yearEl = $('.footer__year');
  if (yearEl) yearEl.textContent = '© ' + new Date().getFullYear();

})();
