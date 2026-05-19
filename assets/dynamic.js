/* ============================================================
   NRB Regulatory Sandbox — Dynamic Interactions
   ============================================================ */

/* ---- PAGE TRANSITION OVERLAY ---- */
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:var(--crimson,#1A3A6B);
    pointer-events:none;
    transform:translateY(100%);
    transition:transform 0.45s cubic-bezier(.77,0,.175,1);
  `;
  document.body.appendChild(overlay);

  // Reveal on load
  requestAnimationFrame(() => {
    overlay.style.transform = 'translateY(-100%)';
    setTimeout(() => overlay.style.display = 'none', 500);
  });

  // Animate out on link clicks
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || a.target === '_blank') return;
    e.preventDefault();
    overlay.style.display = 'block';
    overlay.style.transform = 'translateY(0)';
    setTimeout(() => { window.location.href = href; }, 420);
  });
})();

/* ---- SCROLL PROGRESS BAR ---- */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:3px;width:0%;
    background:linear-gradient(90deg,var(--gold,#4A90D9),var(--crimson,#1A3A6B));
    z-index:10000;transition:width 0.1s linear;
    box-shadow:0 0 8px rgba(74,144,217,0.6);
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  });
})();

/* ---- BACK TO TOP BUTTON ---- */
(function () {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position:fixed;bottom:32px;right:32px;z-index:999;
    width:44px;height:44px;border-radius:50%;border:none;
    background:var(--crimson,#1A3A6B);color:#fff;
    font-size:18px;font-weight:700;cursor:pointer;
    box-shadow:0 4px 20px rgba(26,58,107,0.35);
    opacity:0;transform:translateY(16px);
    transition:all 0.3s;
  `;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(16px)';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ---- TOAST NOTIFICATIONS ---- */
window.showToast = function (msg, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position:fixed;bottom:90px;right:32px;z-index:9998;
      display:flex;flex-direction:column;gap:10px;
    `;
    document.body.appendChild(container);
  }
  const colors = { info: '#1A3A6B', success: '#2e7d32', warning: '#e65100', error: '#c62828' };
  const icons  = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    background:#fff;border-left:4px solid ${colors[type]};
    border-radius:6px;padding:14px 18px;
    box-shadow:0 8px 30px rgba(0,0,0,0.14);
    font-size:13.5px;color:#333;max-width:320px;
    display:flex;align-items:flex-start;gap:10px;
    animation:toastIn 0.35s ease both;
  `;
  toast.innerHTML = `<span style="flex-shrink:0">${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
    @keyframes toastOut{from{opacity:1;transform:none}to{opacity:0;transform:translateX(24px)}}
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease both';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/* ---- INTERSECTION OBSERVER — Scroll Reveal ---- */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity:0; transform:translateY(32px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .reveal.revealed { opacity:1; transform:none; }
    .reveal-left { opacity:0; transform:translateX(-32px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .reveal-left.revealed { opacity:1; transform:none; }
    .reveal-right { opacity:0; transform:translateX(32px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .reveal-right.revealed { opacity:1; transform:none; }
    .reveal-scale { opacity:0; transform:scale(0.92); transition:opacity 0.5s ease, transform 0.5s ease; }
    .reveal-scale.revealed { opacity:1; transform:scale(1); }
  `;
  document.head.appendChild(style);

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('revealed'), e.target.dataset.delay || 0);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  function assignReveal() {
    document.querySelectorAll('.card').forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = (i % 4) * 80;
    });
    document.querySelectorAll('.highlight-box').forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = i * 100;
    });
    document.querySelectorAll('.event-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = i * 100;
    });
    document.querySelectorAll('.step-item').forEach((el, i) => {
      el.classList.add('reveal-left');
      el.dataset.delay = i * 80;
    });
    document.querySelectorAll('.stat-cell').forEach((el, i) => {
      el.classList.add('reveal-scale');
      el.dataset.delay = i * 120;
    });
    document.querySelectorAll('.section-title, .section-tag, .divider').forEach(el => {
      el.classList.add('reveal');
    });
    document.querySelectorAll('.download-item').forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = i * 70;
    });
    document.querySelectorAll('[class*="reveal"]').forEach(el => obs.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', assignReveal);
  } else {
    assignReveal();
  }
})();

/* ---- ANIMATED COUNTERS ---- */
(function () {
  function animateCount(el) {
    const target = parseFloat(el.dataset.target || el.innerText.replace(/[^0-9.]/g, ''));
    const isDecimal = String(target).includes('.');
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  function initCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const raw = el.innerText.trim();
      if (/^\d/.test(raw)) {
        el.dataset.target = raw.replace(/[^0-9.]/g, '');
        el.dataset.suffix = raw.replace(/[0-9.]/g, '');
        obs.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();

/* ---- PARTICLE CANVAS (Hero pages) ---- */
(function () {
  function initParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.reset = function () {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.8 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
      };
      this.reset();
    }

    function init() {
      resize();
      particles = Array.from({ length: 70 }, () => new Particle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,144,217,${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74,144,217,${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); });
    init();
    draw();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.home-hero, .page-hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;
      pointer-events:none;z-index:0;
    `;
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);
    // Ensure hero content is above canvas
    hero.querySelectorAll(':scope > *:not(canvas)').forEach(el => {
      el.style.position = 'relative';
      el.style.zIndex = '1';
    });
    initParticles(canvas);
  });
})();

/* ---- PARALLAX on hero ---- */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.home-hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      hero.style.backgroundPositionY = `${offset * 0.3}px`;
    }, { passive: true });
  });
})();

/* ---- MOBILE HAMBURGER MENU ---- */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // Inject hamburger button
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    hamburger.style.cssText = `
      display:none;flex-direction:column;gap:5px;
      background:none;border:none;cursor:pointer;padding:6px;
      z-index:1001;
    `;
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.cssText = `display:block;width:24px;height:2px;background:var(--crimson,#1A3A6B);border-radius:2px;transition:all 0.3s;`;
    });
    nav.appendChild(hamburger);

    // Mobile drawer
    const drawer = document.createElement('div');
    drawer.id = 'mobile-drawer';
    drawer.style.cssText = `
      display:none;position:fixed;top:0;right:0;bottom:0;
      width:min(320px,90vw);background:#fff;z-index:1000;
      box-shadow:-8px 0 40px rgba(0,0,0,0.18);
      overflow-y:auto;padding:72px 0 40px;
      transition:transform 0.35s cubic-bezier(.77,0,.175,1);
      transform:translateX(100%);
    `;

    // Build mobile nav links from desktop nav
    const links = [
      { label: 'Home', href: 'index.html' },
      { label: 'About Us', href: 'about.html', children: ['Introduction','Governance Structure','Objective','Scope','Benefits'] },
      { label: 'Sandbox Framework', href: 'framework.html', children: ['Target Audience','Eligibility Criteria','Permissible Products','Application Requirements','Sandbox Process'] },
      { label: 'Policies & Guidelines', href: 'policies.html', children: ['Sandbox Guidelines','NRB Act, 2058','Payment & Settlement Act','Foreign Exchange Act'] },
      { label: 'Sandbox Statistics', href: 'statistics.html' },
      { label: 'Knowledge Hub', href: 'knowledge.html', children: ['FAQs','Monthly Reports','Annual Reports','Innovation Blogs','Case Studies'] },
      { label: 'Events & Announcements', href: 'events.html' },
    ];

    links.forEach(link => {
      const item = document.createElement('div');
      item.style.cssText = `border-bottom:1px solid #eee;`;
      let html = `<a href="${link.href}" style="display:block;padding:14px 24px;font-size:15px;font-weight:600;color:#1a1a1a;text-decoration:none;">${link.label}</a>`;
      if (link.children) {
        html += link.children.map(c => `<a href="${link.href}" style="display:block;padding:9px 24px 9px 40px;font-size:13px;color:#666;text-decoration:none;border-top:1px solid #f5f5f5;">${c}</a>`).join('');
      }
      item.innerHTML = html;
      drawer.appendChild(item);
    });

    const applyBtn = document.createElement('div');
    applyBtn.style.cssText = `padding:20px 24px;`;
    applyBtn.innerHTML = `<a href="apply.html" style="display:block;text-align:center;background:var(--crimson,#1A3A6B);color:#fff;padding:13px;border-radius:4px;font-weight:700;text-decoration:none;">Apply Now →</a>`;
    drawer.appendChild(applyBtn);

    document.body.appendChild(drawer);

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.style.cssText = `
      display:none;position:fixed;inset:0;z-index:999;
      background:rgba(0,0,0,0.4);opacity:0;transition:opacity 0.3s;
    `;
    document.body.appendChild(backdrop);

    let isOpen = false;
    function openMenu() {
      isOpen = true;
      drawer.style.display = 'block';
      backdrop.style.display = 'block';
      requestAnimationFrame(() => {
        drawer.style.transform = 'translateX(0)';
        backdrop.style.opacity = '1';
      });
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    }
    function closeMenu() {
      isOpen = false;
      drawer.style.transform = 'translateX(100%)';
      backdrop.style.opacity = '0';
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      setTimeout(() => {
        drawer.style.display = 'none';
        backdrop.style.display = 'none';
      }, 350);
    }
    hamburger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    backdrop.addEventListener('click', closeMenu);

    // Responsive show/hide
    const mq = window.matchMedia('(max-width: 1024px)');
    function handleMQ(e) {
      hamburger.style.display = e.matches ? 'flex' : 'none';
      const menu = document.querySelector('.nav-menu');
      if (menu) menu.style.display = e.matches ? 'none' : 'flex';
    }
    mq.addEventListener('change', handleMQ);
    handleMQ(mq);
  });
})();

/* ---- STICKY NAV SHRINK on scroll ---- */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    const style = document.createElement('style');
    style.textContent = `.main-nav.shrunk { height:56px !important; box-shadow:0 4px 24px rgba(26,58,107,0.15) !important; }`;
    document.head.appendChild(style);
    window.addEventListener('scroll', () => {
      nav.classList.toggle('shrunk', window.scrollY > 60);
    }, { passive: true });
  });
})();

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const offset = 80;
  window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
});

/* ---- COUNTDOWN TIMER ---- */
window.initCountdown = function (elementId, targetDate) {
  const el = document.getElementById(elementId);
  if (!el) return;
  function update() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) { el.innerHTML = '<span style="color:var(--crimson)">Deadline passed</span>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <span class="cd-unit"><strong>${d}</strong><small>Days</small></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><strong>${String(h).padStart(2,'0')}</strong><small>Hrs</small></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><strong>${String(m).padStart(2,'0')}</strong><small>Min</small></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><strong>${String(s).padStart(2,'0')}</strong><small>Sec</small></span>
    `;
  }
  update();
  setInterval(update, 1000);
};

/* ---- SEARCH OVERLAY ---- */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // Search button
    const searchBtn = document.createElement('button');
    searchBtn.title = 'Search';
    searchBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    searchBtn.style.cssText = `
      background:none;border:none;cursor:pointer;color:var(--crimson,#1A3A6B);
      padding:6px;display:flex;align-items:center;
      opacity:0.7;transition:opacity 0.2s;
    `;
    searchBtn.onmouseenter = () => searchBtn.style.opacity = '1';
    searchBtn.onmouseleave = () => searchBtn.style.opacity = '0.7';

    const menu = nav.querySelector('.nav-menu');
    if (menu) menu.insertBefore(searchBtn, menu.querySelector('.nav-apply'));

    // Search overlay
    const pages = [
      { title: 'Home', url: 'index.html', desc: 'NRB Regulatory Sandbox homepage' },
      { title: 'About Us — Introduction', url: 'about.html#introduction', desc: 'What is the NRB Regulatory Sandbox' },
      { title: 'About Us — Governance', url: 'about.html#governance', desc: 'Sandbox Governing Committee and Sandbox Committee' },
      { title: 'About Us — Objectives', url: 'about.html#objective', desc: 'Goals and objectives of the Sandbox' },
      { title: 'About Us — Benefits', url: 'about.html#benefits', desc: 'Benefits of participating in the Sandbox' },
      { title: 'Framework — Target Audience', url: 'framework.html#target-audience', desc: 'Who can apply: banks, PSOs, PSPs, remittance, fintech' },
      { title: 'Framework — Eligibility Criteria', url: 'framework.html#eligibility', desc: 'Eligibility requirements for the Sandbox' },
      { title: 'Framework — Permissible Products', url: 'framework.html#products', desc: 'APIs, mobile money, digital KYC, lending, smart contracts' },
      { title: 'Framework — Application Requirements', url: 'framework.html#application', desc: 'Documents and information needed to apply' },
      { title: 'Framework — Sandbox Process', url: 'framework.html#process', desc: 'Step-by-step process from application to graduation' },
      { title: 'Policies — Sandbox Guidelines', url: 'policies.html#guidelines', desc: 'Download the official Sandbox guidelines' },
      { title: 'Policies — NRB Act 2058', url: 'policies.html#nrb-act', desc: 'Nepal Rastra Bank Act legislation' },
      { title: 'Policies — Payment Act 2075', url: 'policies.html#payment-act', desc: 'Payment and Settlement Act' },
      { title: 'Statistics', url: 'statistics.html', desc: 'Active participants, graduated solutions, highlights' },
      { title: 'Knowledge Hub — FAQs', url: 'knowledge.html#faq', desc: 'Frequently asked questions about the Sandbox' },
      { title: 'Knowledge Hub — Reports', url: 'knowledge.html#reports', desc: 'Monthly, quarterly, and annual reports' },
      { title: 'Knowledge Hub — Case Studies', url: 'knowledge.html#case-studies', desc: 'International regulatory sandbox case studies' },
      { title: 'Events & Announcements', url: 'events.html', desc: 'Cohort windows, workshops, innovation challenges' },
      { title: 'Apply Now', url: 'apply.html', desc: 'Submit your application for the Sandbox' },
    ];

    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.style.cssText = `
      display:none;position:fixed;inset:0;z-index:9990;
      background:rgba(5,16,26,0.85);backdrop-filter:blur(6px);
      padding:80px 24px 40px;
    `;
    overlay.innerHTML = `
      <div style="max-width:640px;margin:0 auto">
        <div style="display:flex;align-items:center;background:#fff;border-radius:8px;padding:14px 18px;gap:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3A6B" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="search-input" type="text" placeholder="Search pages, topics, guidelines…" style="flex:1;border:none;outline:none;font-size:16px;font-family:'DM Sans',sans-serif;color:#1a1a1a;">
          <button id="search-close" style="background:none;border:none;cursor:pointer;font-size:20px;color:#999;line-height:1">×</button>
        </div>
        <div id="search-results" style="margin-top:12px;display:flex;flex-direction:column;gap:6px;"></div>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;text-align:center;margin-top:20px">Press <kbd style="background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:3px;color:#fff">Esc</kbd> to close</p>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#search-input');
    const results = overlay.querySelector('#search-results');

    function renderResults(q) {
      const matches = q.length < 2 ? pages.slice(0, 6) : pages.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.desc.toLowerCase().includes(q.toLowerCase())
      );
      results.innerHTML = matches.map(p => `
        <a href="${p.url}" style="display:block;background:#fff;border-radius:6px;padding:14px 18px;text-decoration:none;transition:background 0.15s;"
          onmouseenter="this.style.background='#f0f4fb'" onmouseleave="this.style.background='#fff'">
          <div style="font-size:14px;font-weight:600;color:#1A3A6B">${p.title}</div>
          <div style="font-size:12.5px;color:#666;margin-top:3px">${p.desc}</div>
        </a>
      `).join('') || `<div style="color:rgba(255,255,255,0.6);text-align:center;padding:24px">No results found for "<em>${q}</em>"</div>`;
    }

    function openSearch() {
      overlay.style.display = 'block';
      renderResults('');
      setTimeout(() => input.focus(), 50);
    }
    function closeSearch() { overlay.style.display = 'none'; input.value = ''; }

    searchBtn.addEventListener('click', openSearch);
    overlay.querySelector('#search-close').addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });
    input.addEventListener('input', () => renderResults(input.value));
  });
})();

/* ---- TOOLTIP on hover ---- */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.createElement('div');
    tooltip.id = 'global-tooltip';
    tooltip.style.cssText = `
      position:fixed;z-index:9995;pointer-events:none;
      background:#1a1a1a;color:#fff;font-size:12px;
      padding:6px 10px;border-radius:4px;opacity:0;
      transition:opacity 0.2s;white-space:nowrap;
      box-shadow:0 4px 12px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(tooltip);
    document.addEventListener('mouseover', e => {
      const el = e.target.closest('[data-tooltip]');
      if (!el) { tooltip.style.opacity = '0'; return; }
      tooltip.textContent = el.dataset.tooltip;
      tooltip.style.opacity = '1';
    });
    document.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 12) + 'px';
      tooltip.style.top = (e.clientY - 28) + 'px';
    });
    document.addEventListener('mouseout', e => {
      if (!e.target.closest('[data-tooltip]')) tooltip.style.opacity = '0';
    });
  });
})();

/* ---- ACTIVE NAV LINK highlight based on current page ---- */
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-dropdown a, .nav-item > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith(current) || (current === '' && href === 'index.html')) {
      a.style.color = 'var(--crimson, #1A3A6B)';
      a.style.fontWeight = '700';
    }
  });
});
