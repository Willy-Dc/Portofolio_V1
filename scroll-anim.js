/* ============================================================
   SCROLL ANIMATION SYSTEM
   - Elemen masuk saat scroll turun (dari bawah/kiri/kanan/scale)
   - Elemen keluar + masuk lagi saat scroll naik (reversible)
   - Pakai IntersectionObserver → ringan, tanpa scroll listener
   - Tiap elemen bisa punya arah & delay berbeda via data-anim
============================================================ */

(function () {

  /* ── State awal: semua elemen .reveal disembunyikan ── */
  const HIDDEN_STATES = {
    'from-bottom': 'translateY(52px)',
    'from-top':    'translateY(-52px)',
    'from-left':   'translateX(-60px)',
    'from-right':  'translateX(60px)',
    'scale-up':    'translateY(40px) scale(0.94)',
    'fade':        'translateY(0px)',
  };

  /* ── Easing elegan ── */
  const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const DURATION = '0.7s';

  /* ── Set initial style setiap elemen ── */
  function initElement(el) {
    const anim = el.dataset.anim || 'from-bottom';
    const delay = el.dataset.delay || '0ms';
    el.style.opacity = '0';
    el.style.transform = HIDDEN_STATES[anim] || HIDDEN_STATES['from-bottom'];
    el.style.transition = `opacity ${DURATION} ${EASING} ${delay}, transform ${DURATION} ${EASING} ${delay}`;
    el.style.willChange = 'opacity, transform';
  }

  /* ── Animasikan masuk ── */
  function animateIn(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0) translateX(0) scale(1)';
  }

  /* ── Animasikan keluar (saat scroll ke atas melewati elemen) ── */
  function animateOut(el) {
    const anim = el.dataset.anim || 'from-bottom';
    el.style.opacity = '0';
    el.style.transform = HIDDEN_STATES[anim] || HIDDEN_STATES['from-bottom'];
  }

  /* ── IntersectionObserver utama ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateIn(entry.target);
        entry.target.classList.add('anim-visible');
      } else {
        // Hanya hide lagi jika elemen BELUM pernah terlihat dari bawah
        // → artinya user scroll ke atas melewati elemen ini
        if (entry.target.classList.contains('anim-visible')) {
          // Cek apakah elemen sekarang di atas viewport (scroll naik)
          const rect = entry.target.getBoundingClientRect();
          if (rect.bottom < 0) {
            // Elemen sudah lewat ke atas → reset biar bisa animasi lagi saat balik
            animateOut(entry.target);
            entry.target.classList.remove('anim-visible');
          }
          // Jika rect.top > window.innerHeight → elemen di bawah viewport, biarkan
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  /* ── Init semua elemen .reveal ── */
  function setup() {
    const elements = document.querySelectorAll('.reveal');

    // Tambah stagger delay otomatis ke elemen dalam grup (sibling)
    const groups = {};
    elements.forEach(el => {
      const parent = el.parentElement;
      const key = parent ? parent.className + (parent.id || '') : 'root';
      if (!groups[key]) groups[key] = [];
      groups[key].push(el);
    });

    Object.values(groups).forEach(group => {
      group.forEach((el, i) => {
        // Jika sudah ada data-delay di HTML, hormati itu
        if (!el.dataset.delay && group.length > 1) {
          el.dataset.delay = `${i * 80}ms`;
        }
        initElement(el);
        observer.observe(el);
      });
    });
  }

  /* ── Tambahan: animasi untuk card project & certificate (yang tidak pakai .reveal) ── */
  function setupCards() {
    const cards = document.querySelectorAll('.project-card, .certificate-card, .skill-icon-card');
    cards.forEach((card, i) => {
      if (card.classList.contains('reveal')) return; // sudah dihandle
      card.dataset.anim = 'scale-up';
      card.dataset.delay = `${(i % 3) * 100}ms`;
      initElement(card);
      observer.observe(card);
    });
  }

  /* ── Jalankan setelah DOM siap ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { setup(); setupCards(); });
  } else {
    setup();
    setupCards();
  }

})();
