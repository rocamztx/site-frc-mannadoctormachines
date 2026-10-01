// ================================================
// MANNA DOCTORS MACHINE — SCRIPT.JS
// ================================================

/* --- NAVBAR SCROLL --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* --- HAMBURGER MENU --- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* --- ACTIVE NAV LINK ON SCROLL --- */
// Removed because site is multi-page now


/* --- MODALITY TABS --- */
const modTabs     = document.querySelectorAll('.mod-tab');
const modContents = document.querySelectorAll('.mod-content');

modTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.modal;

    modTabs.forEach(t => t.classList.remove('active'));
    modContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const content = document.getElementById(`mod-${target}`);
    if (content) content.classList.add('active');
  });
});

/* --- AWARDS FILTER --- */
const filterBtns = document.querySelectorAll('.filter-btn');
const awardCards = document.querySelectorAll('.award-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    awardCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* --- ANIMATED COUNTERS --- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const step = target / (duration / 16);
  let current = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

/* --- INTERSECTION OBSERVER (reveal + counters) --- */
const revealEls  = document.querySelectorAll('.reveal');
const counterEls = document.querySelectorAll('.stat-num');
const countersAnimated = new Set();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
      countersAnimated.add(entry.target);
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

revealEls.forEach(el => revealObserver.observe(el));
counterEls.forEach(el => counterObserver.observe(el));

/* --- FLOATING PARTICLES --- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size  = Math.random() * 6 + 2;
    const left  = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur   = Math.random() * 12 + 8;

    Object.assign(p.style, {
      width:           `${size}px`,
      height:          `${size}px`,
      left:            `${left}%`,
      animationDelay:  `${delay}s`,
      animationDuration:`${dur}s`,
    });

    container.appendChild(p);
  }
}

createParticles();


/* --- ADD REVEAL CLASS TO CARDS ON LOAD --- */
document.querySelectorAll(
  '.value-card, .award-card, .mod-awards-preview, .about-text, .about-values'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
