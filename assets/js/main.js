/**
 * NovaAxis Systems – Portfolio JavaScript
 * Author : Miriam Muthoni Muthii
 * ────────────────────────────────────────
 */

'use strict';

/* ══════════════════════════════════════════════════
   1. YEAR STAMPS
══════════════════════════════════════════════════ */
(function setYear() {
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #footerYear').forEach(el => {
    el.textContent = y;
  });
})();

/* ══════════════════════════════════════════════════
   2. THEME TOGGLE (light / dark)
══════════════════════════════════════════════════ */
(function initTheme() {
  const html     = document.documentElement;
  const STORAGE  = 'novaaxis-theme';
  const DARK     = 'dark';
  const LIGHT    = 'light';

  // Determine initial theme: localStorage → system preference → dark default
  function getPreferred() {
    const stored = localStorage.getItem(STORAGE);
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }
    return DARK;
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE, theme);
    // Update all toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const icon = btn.querySelector('i');
      if (!icon) return;
      if (theme === DARK) {
        icon.className = 'bi bi-moon-stars-fill';
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        icon.className = 'bi bi-sun-fill';
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  // Apply on load
  applyTheme(getPreferred());

  // Wire all toggle buttons
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  });

  // Watch system preference change
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE)) {
      applyTheme(e.matches ? LIGHT : DARK);
    }
  });
})();

/* ══════════════════════════════════════════════════
   3. SIDEBAR / HAMBURGER
══════════════════════════════════════════════════ */
(function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const hamburger= document.getElementById('hamburger');
  const closeBtn = document.getElementById('sidebarClose');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Trap focus inside sidebar
    const firstFocusable = sidebar.querySelector('button, a, [tabindex="0"]');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Close when a nav link is tapped (mobile)
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1200) {
        closeSidebar();
      }
    });
  });
})();

/* ══════════════════════════════════════════════════
   4. ACTIVE SECTION HIGHLIGHT (IntersectionObserver)
══════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (!sections.length || !navLinks.length) return;

  const topbarEl = document.querySelector('.topbar');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, {
    rootMargin: `-${topbarEl ? topbarEl.offsetHeight + 10 : 70}px 0px -50% 0px`,
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
})();

/* ══════════════════════════════════════════════════
   5. SMOOTH SCROLL (for anchor links)
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    const topbar = document.querySelector('.topbar');
    const offset = topbar && getComputedStyle(topbar).display !== 'none'
      ? topbar.offsetHeight + 8
      : 0;

    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════════
   6. TYPING ANIMATION
══════════════════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const titles = [
    'Full Stack Software Developer',
    'AI Developer'
  ];

  let titleIdx  = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTime = 0;

  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 45;
  const PAUSE_END    = 2200;
  const PAUSE_START  = 500;

  function tick() {
    const current = titles[titleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        pauseTime = PAUSE_END;
        setTimeout(tick, pauseTime);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        pauseTime = PAUSE_START;
        setTimeout(tick, pauseTime);
        return;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  // Respect reduce motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = titles[0];
    return;
  }

  setTimeout(tick, 600);
})();

/* ══════════════════════════════════════════════════
   7. ANIMATED HERO CANVAS
     (connected network nodes + floating code symbols)
══════════════════════════════════════════════════ */
(function initHeroCanvas() {
  const canvas  = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip animation if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx     = canvas.getContext('2d');
  let W, H, particles, animId;
  let isVisible = true;

  const ACCENT   = '#149ddd';
  const N_DOTS   = 65;
  const MAX_DIST = 130;

  const CODE_SYMBOLS = ['</>', '{}', '()', '=>', '#!/', '0x', 'AI', '[]', '&&', '||'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * 0.5,
      vy:   (Math.random() - 0.5) * 0.5,
      r:    Math.random() * 2.5 + 1,
      sym:  Math.random() > 0.75 ? CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)] : null,
      opacity: Math.random() * 0.5 + 0.15
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: N_DOTS }, makeParticle);
  }

  function draw() {
    if (!isVisible) {
      animId = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(20,157,221,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      // Bounce
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Draw dot or symbol
      if (p.sym) {
        ctx.font = `${p.r * 5}px JetBrains Mono, monospace`;
        ctx.fillStyle = `rgba(20,157,221,${p.opacity * 0.7})`;
        ctx.fillText(p.sym, p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    animId = requestAnimationFrame(draw);
  }

  // Pause when section off-screen
  const heroSection = document.getElementById('home');
  if (heroSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    obs.observe(heroSection);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });
})();

/* ══════════════════════════════════════════════════
   8. STAT COUNTERS (IntersectionObserver)
══════════════════════════════════════════════════ */
(function initCounters() {
  const cards = document.querySelectorAll('.stat-card[data-target]');
  if (!cards.length) return;

  // Skip animation if reduced motion
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el, target) {
    if (noMotion) { el.textContent = target.toLocaleString(); return; }

    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card   = entry.target;
      const target = parseInt(card.dataset.target, 10);
      const el     = card.querySelector('.counter');
      if (el && !card.dataset.counted) {
        card.dataset.counted = '1';
        animateCounter(el, target);
      }
      observer.unobserve(card);
    });
  }, { threshold: 0.4 });

  cards.forEach(card => observer.observe(card));
})();

/* ══════════════════════════════════════════════════
   9. PROJECT FILTER
══════════════════════════════════════════════════ */
(function initProjectFilter() {
  const tabs  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!tabs.length || !cards.length) return;

  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          if (!noMotion) {
            card.classList.remove('fade-in');
            void card.offsetWidth; // reflow
            card.classList.add('fade-in');
          }
        } else {
          card.classList.add('hidden');
          card.classList.remove('fade-in');
        }
      });
    });
  });
})();

/* ══════════════════════════════════════════════════
   10. CONTACT FORM (Formspree + validation)
══════════════════════════════════════════════════ */
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const statusEl   = document.getElementById('formStatus');
  const submitBtn  = document.getElementById('submitBtn');

  if (!form) return;

  // Field validation rules
  const rules = {
    contactName:    { required: true, minLength: 2, label: 'Name' },
    contactEmail:   { required: true, email: true,  label: 'Email' },
    contactMessage: { required: true, minLength: 10, label: 'Message' }
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const rule  = rules[id];
    const errorEl = input ? input.parentElement.querySelector('.field-error') : null;
    if (!input || !rule) return true;

    const val = input.value.trim();
    let msg = '';

    if (rule.required && !val) {
      msg = `${rule.label} is required.`;
    } else if (rule.minLength && val.length < rule.minLength) {
      msg = `${rule.label} must be at least ${rule.minLength} characters.`;
    } else if (rule.email && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msg = 'Please enter a valid email address.';
    }

    if (msg) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
      return false;
    } else {
      input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  // Inline validation on blur
  Object.keys(rules).forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('blur', () => validateField(id));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(id);
      });
    }
  });

  function setStatus(type, msg) {
    statusEl.className = `form-status ${type}`;
    statusEl.textContent = msg;
  }

  function clearStatus() {
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearStatus();

    // Validate all fields
    const valid = Object.keys(rules).map(id => validateField(id)).every(Boolean);
    if (!valid) return;

    // Check if Formspree ID has been replaced
    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      setStatus('error',
        '⚠ The contact form is not yet configured. Please email miriammuthoni29@gmail.com directly or use WhatsApp.'
      );
      return;
    }

    // Set loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const res  = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setStatus('success',
          '✓ Your message was sent successfully! I\'ll get back to you soon.'
        );
        form.reset();
        // Remove any stale error classes
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      } else {
        const json = await res.json().catch(() => ({}));
        const errMsg = json?.errors?.[0]?.message || 'Something went wrong.';
        setStatus('error',
          `✗ Message not sent: ${errMsg}. Please try emailing me directly.`
        );
      }
    } catch (err) {
      setStatus('error',
        '✗ Network error — your message was not sent. Please check your connection or email me directly.'
      );
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
})();

/* ══════════════════════════════════════════════════
   11. LAZY-LOAD BELOW-HERO IMAGES (native + fallback)
══════════════════════════════════════════════════ */
(function initLazyLoad() {
  // Native lazy loading is already on images via loading="lazy".
  // This observer handles browsers that don't support it natively.
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
})();

/* ══════════════════════════════════════════════════
   12. SCROLL-REVEAL (subtle fade-in for section cards)
══════════════════════════════════════════════════ */
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(
    '.skill-group, .timeline-card, .cert-card, .service-card, .contact-card, .stat-card'
  );

  if (!targets.length) return;

  // Set initial state
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════
   13. PROJECT CARDS REVEAL (staggered)
══════════════════════════════════════════════════ */
(function initProjectReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
})();
