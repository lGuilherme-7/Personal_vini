/* =============================================
   VGFIT — script.js
   Athletic Dark Luxury
============================================= */

// ===== CURSOR CUSTOMIZADO =====
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverEls = document.querySelectorAll('a, button, .card, .faq-question, .carrossel-btn, .foto');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

// ===== HEADER SCROLL =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MENU HAMBÚRGUER =====
const menuToggle = document.getElementById('menuToggle');
const navList    = document.getElementById('navList');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      menuToggle.textContent = '☰';
    });
  });

  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      navList.classList.remove('open');
      menuToggle.textContent = '☰';
    }
  });
}

// ===== REVEAL AO ROLAR =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 120);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('active');
      answer.classList.add('open');
    }
  });
});

// ===== CARROSSEL =====
const track   = document.getElementById('trackResultados');
const slides  = track ? [...track.querySelectorAll('.slide')] : [];
const prevBtn = document.querySelector('.carrossel-btn.prev');
const nextBtn = document.querySelector('.carrossel-btn.next');
let current   = 0;
let autoTimer = null;

if (track && slides.length) {
  track.style.display    = 'flex';
  track.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
  slides.forEach(s => s.style.minWidth = '100%');
}

function goTo(idx) {
  if (!slides.length) return;
  current = (idx + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}
function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
}

if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

// ===== BOTÕES NAVEGAÇÃO MOBILE (injetados via JS) =====
function criarNavMobile() {
  const wrapper = document.querySelector('.carrossel-wrapper');
  if (!wrapper || document.querySelector('.carrossel-nav-mobile')) return;

  const nav = document.createElement('div');
  nav.className = 'carrossel-nav-mobile';

  const btnPrev = document.createElement('button');
  btnPrev.textContent = '‹';
  btnPrev.setAttribute('aria-label', 'Anterior');

  const btnNext = document.createElement('button');
  btnNext.textContent = '›';
  btnNext.setAttribute('aria-label', 'Próximo');

  btnPrev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  nav.appendChild(btnPrev);
  nav.appendChild(btnNext);
  wrapper.appendChild(nav);
}
criarNavMobile();

// ===== SWIPE / DRAG =====
if (track) {
  let startX   = 0;
  let dragging = false;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    dragging = true;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!dragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    startAuto();
  });

  track.addEventListener('mousedown', e => {
    startX = e.clientX;
    dragging = true;
    stopAuto();
    e.preventDefault();
  });

  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 45) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    startAuto();
  });

  startAuto();
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== CONTAGEM ANIMADA (stats hero) =====
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let count    = 0;
  const step   = Math.ceil(target / 60);
  const timer  = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = count + suffix;
  }, 24);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-target]').forEach(countUp);
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);