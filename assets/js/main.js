/**
 * Deepak Kumar Mishra — Portfolio
 * Modern AI Theme JS
 */
(function () {
  'use strict';

  /* ── AOS init ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });
  }

  /* ── Typed.js ── */
  if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
    new Typed('#typed', {
      strings: ['AI agents.', 'RAG pipelines.', 'sovereign LLMs.', 'enterprise APIs.'],
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2200,
      smartBackspace: true,
    });
  }

  /* ── Sidebar active nav on scroll ── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');

  const activateNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', activateNav, { passive: true });
  activateNav();

  /* ── Mobile nav toggle ── */
  const sidebar   = document.getElementById('sidebar');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    // close on nav link click
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => sidebar.classList.remove('open'));
    });
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Back to top ── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ── Footer year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
