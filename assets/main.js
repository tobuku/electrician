/* ======================================================================
   JM ELECTRIC LLC — GSAP ANIMATION MASTER
   tobuku.github.io/electrician
   ====================================================================== */

(function () {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Helper: check element exists ─────────────────────────────────── */
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => document.querySelectorAll(sel);

  /* ── Mobile navigation ─────────────────────────────────────────────── */
  const hamburger = q('.hamburger');
  const nav = q('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) {
        gsap.from('.nav a', { y: -8, opacity: 0, stagger: 0.05, duration: 0.28, ease: 'power2.out' });
      }
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  }

  /* ── Hero entrance timeline ────────────────────────────────────────── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Eyebrow
  heroTl.from('.hero .eyebrow, .page-hero .eyebrow', { y: 20, opacity: 0, duration: 0.65 }, 0);

  // Headline — word-by-word slide-up
  const headline = q('.hero h1, .page-hero h1');
  if (headline) {
    const originalHTML = headline.innerHTML;
    // Split text into word spans preserving <br> tags
    const parts = originalHTML.split(/(<br\s*\/?>)/gi);
    headline.innerHTML = parts.map(part => {
      if (/^<br/i.test(part)) return part;
      return part.split(' ').filter(w => w.trim()).map(word =>
        `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${word}</span></span>`
      ).join(' ');
    }).join('');

    heroTl.from('.word-inner', {
      y: '105%',
      opacity: 0,
      duration: 0.75,
      stagger: 0.055,
      ease: 'power4.out'
    }, 0.15);
  }

  heroTl
    .from('.hero-text p, .page-hero > .container > div > p, .page-hero-grid > div > p', {
      y: 20, opacity: 0, duration: 0.65
    }, 0.35)
    .from('.hero-actions .btn, .page-hero-actions .btn', {
      y: 16, opacity: 0, duration: 0.55, stagger: 0.1
    }, 0.5)
    .from('.hero-stats .stat-pill', {
      y: 16, opacity: 0, duration: 0.55, stagger: 0.08
    }, 0.6)
    .from('.hero-visual', {
      x: 36, opacity: 0, duration: 1, ease: 'power2.out'
    }, 0.25)
    .from('.float-tag', {
      y: 18, opacity: 0, duration: 0.55, stagger: 0.14
    }, 0.7);

  // Trust strip / eyebrow on page heroes
  heroTl.from('.trust-strip .trust-badge', {
    y: 14, opacity: 0, duration: 0.5, stagger: 0.08
  }, 0.55);

  /* ── Orbit rings ───────────────────────────────────────────────────── */
  if (q('.orbit')) {
    gsap.to('.orbit:not(.orbit-2)', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    gsap.to('.orbit-2', { rotation: -360, duration: 32, repeat: -1, ease: 'none' });
  }

  /* ── ScrollTrigger reveals ─────────────────────────────────────────── */
  qa('.reveal').forEach(el => {
    gsap.fromTo(el,
      { y: 34, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  qa('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { x: -34, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  qa('.reveal-right').forEach(el => {
    gsap.fromTo(el,
      { x: 34, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  qa('.reveal-scale').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.91, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* ── Stagger grid children ─────────────────────────────────────────── */
  ['.grid-2', '.grid-3', '.grid-4', '.service-list', '.timeline'].forEach(sel => {
    qa(sel).forEach(grid => {
      const kids = Array.from(grid.children);
      if (!kids.length) return;
      gsap.fromTo(kids,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 86%', toggleActions: 'play none none none' }
        }
      );
    });
  });

  /* ── Gallery masonry stagger ───────────────────────────────────────── */
  const galGrid = q('.gallery-grid');
  if (galGrid) {
    gsap.fromTo(galGrid.children,
      { y: 28, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.055, ease: 'power2.out',
        scrollTrigger: { trigger: galGrid, start: 'top 88%' }
      }
    );
  }

  /* ── Stats counter animation ───────────────────────────────────────── */
  qa('.stat-block .num, .stat-pill .num').forEach(el => {
    const rawText = el.textContent.trim();
    const match = rawText.match(/^([^0-9]*)(\d+\.?\d*)([^0-9]*)$/);
    if (!match) return;
    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isInt = Number.isInteger(target);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          }
        });
      }
    });
  });

  /* ── Magnetic buttons ──────────────────────────────────────────────── */
  qa('.btn.primary, .btn.lg').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.55)' });
    });
  });

  /* ── Section heads ─────────────────────────────────────────────────── */
  qa('.section-head').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* ── Gallery lightbox ──────────────────────────────────────────────── */
  const gCards = qa('.gallery-card[data-src]');
  if (gCards.length) {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    Object.assign(lb.style, {
      position: 'fixed', inset: '0', zIndex: '999',
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)',
      display: 'grid', placeItems: 'center',
      opacity: '0', pointerEvents: 'none', padding: '20px', cursor: 'zoom-out'
    });
    lb.innerHTML = `
      <button id="lb-close" style="position:absolute;top:20px;right:24px;color:#e9f6ff;font-size:2rem;line-height:1;background:none;border:none;cursor:pointer;opacity:0.7;">&times;</button>
      <img id="lb-img" style="max-width:90vw;max-height:86vh;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,0.7);object-fit:contain;" />
      <div id="lb-caption" style="position:absolute;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(9,26,40,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:9px 20px;color:#e9f6ff;font-size:0.85rem;text-align:center;white-space:nowrap;"></div>
    `;
    document.body.appendChild(lb);

    const openLb = (src, caption) => {
      document.getElementById('lb-img').src = src;
      const cap = document.getElementById('lb-caption');
      cap.textContent = caption || '';
      cap.style.display = caption ? '' : 'none';
      lb.style.pointerEvents = 'auto';
      gsap.to(lb, { opacity: 1, duration: 0.3 });
      gsap.fromTo('#lb-img', { scale: 0.82 }, { scale: 1, duration: 0.42, ease: 'back.out(1.6)' });
    };
    const closeLb = () => {
      gsap.to(lb, { opacity: 0, duration: 0.22, onComplete: () => { lb.style.pointerEvents = 'none'; } });
    };

    gCards.forEach(card => card.addEventListener('click', () => openLb(card.dataset.src, card.dataset.caption)));
    lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lb-close') closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  /* ── Gallery filter tabs ───────────────────────────────────────────── */
  qa('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      qa('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      qa('[data-cat]').forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        gsap.to(item, {
          opacity: show ? 1 : 0.18,
          scale: show ? 1 : 0.96,
          duration: 0.32,
          ease: 'power2.out'
        });
        item.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* ── Topbar scroll state ───────────────────────────────────────────── */
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: self => {
      const bar = q('.topbar');
      if (bar) bar.style.boxShadow = self.progress > 0
        ? '0 4px 24px rgba(52,97,193,0.12)'
        : '0 2px 20px rgba(52,97,193,0.07)';
    }
  });

  /* ── Feature card image shimmer ────────────────────────────────────── */
  qa('.feature-card .fc-img').forEach(fc => {
    const shimmer = document.createElement('div');
    Object.assign(shimmer.style, {
      position: 'absolute', inset: '0', zIndex: '3', pointerEvents: 'none',
      background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
      transform: 'translateX(-150%)'
    });
    fc.style.position = 'relative';
    fc.appendChild(shimmer);
    ScrollTrigger.create({
      trigger: fc,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(shimmer, { x: '300%', duration: 1, ease: 'power2.inOut' })
    });
  });

})();
