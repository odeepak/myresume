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

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateNav = () => {
    const scrollY = window.scrollY + 140;
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

  /* ── Mobile nav toggle + overlay ── */
  const sidebar         = document.getElementById('sidebar');
  const navToggle       = document.getElementById('navToggle');
  const sidebarOverlay  = document.getElementById('sidebarOverlay');

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    navToggle.querySelector('i').className = 'bi bi-list';
  };

  const openSidebar = () => {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    navToggle.querySelector('i').className = 'bi bi-x';
  };

  if (navToggle && sidebar) {
    navToggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  /* ── Smooth scroll (respects sidebar offset) ── */
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

  /* ── Contact form — AJAX with feedback ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    // Inject feedback elements
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.style.cssText = 'display:none;margin-top:14px;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:500;';
    contactForm.appendChild(feedback);

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic client-side validation
      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const subject = contactForm.querySelector('#subject').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !subject || !message) {
        showFeedback('Please fill in all fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending…';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          showFeedback('Message sent! I\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        showFeedback('Something went wrong. Try emailing me directly at odeepakmishra@gmail.com', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });

    function showFeedback(msg, type) {
      feedback.textContent = msg;
      feedback.style.display = 'block';
      if (type === 'success') {
        feedback.style.background = 'rgba(16,185,129,0.12)';
        feedback.style.border     = '1px solid rgba(16,185,129,0.3)';
        feedback.style.color      = '#10b981';
      } else {
        feedback.style.background = 'rgba(239,68,68,0.1)';
        feedback.style.border     = '1px solid rgba(239,68,68,0.25)';
        feedback.style.color      = '#f87171';
      }
      setTimeout(() => { feedback.style.display = 'none'; }, 6000);
    }
  }

})();
