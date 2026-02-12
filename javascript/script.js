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

  // Ring com lag suave
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover em elementos interativos
  const hoverEls = document.querySelectorAll('a, button, .card, .faq-question, .carrossel-btn, .foto');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

// ===== HEADER: scroll effect =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MENU HAMBÚRGUER =====
const menuToggle = document.getElementById('menuToggle');
const navList    = document.getElementById('navList');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}

// ===== REVEAL AO ROLAR =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // Delay escalonado para grupos de cards
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
    // Fecha todos
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.classList.remove('open');
    });
    // Abre o clicado
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

// Swipe / drag
if (track) {
  let startX = 0;
  let dragging = false;

  track.addEventListener('touchstart',  e => { startX = e.touches[0].clientX; dragging = true; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',    e => {
    if (!dragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    startAuto();
  });
  track.addEventListener('mousedown',  e => { startX = e.clientX; dragging = true; stopAuto(); e.preventDefault(); });
  window.addEventListener('mouseup',   e => {
    if (!dragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    startAuto();
  });

  startAuto();
}

// ===== SCROLL SUAVE (âncoras) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ANIMAÇÃO DE CONTAGEM (stats do hero) =====
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);/* =============================================
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

  // Ring com lag suave
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover em elementos interativos
  const hoverEls = document.querySelectorAll('a, button, .card, .faq-question, .carrossel-btn, .foto');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

// ===== HEADER: scroll effect =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MENU HAMBÚRGUER =====
const menuToggle = document.getElementById('menuToggle');
const navList    = document.getElementById('navList');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}

// ===== REVEAL AO ROLAR =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // Delay escalonado para grupos de cards
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
    // Fecha todos
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.classList.remove('open');
    });
    // Abre o clicado
    if (!isOpen) {
      btn.classList.add('active');
      answer.classList.add('open');
    }
  });
});

// ===== CARROSSEL CORRIGIDO =====
const track   = document.getElementById('trackResultados');
const slides  = track ? [...track.querySelectorAll('.slide')] : [];
const prevBtn = document.querySelector('.carrossel-btn.prev');
const nextBtn = document.querySelector('.carrossel-btn.next');
let current   = 0;
let autoTimer = null;

// Configura os slides para ocuparem 100% da largura
if (track && slides.length > 0) {
  slides.forEach(slide => {
    slide.style.minWidth = '100%';
    slide.style.flexShrink = '0';
  });
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

// Botões de navegação
if (prevBtn) prevBtn.addEventListener('click', () => { 
  goTo(current - 1); 
  startAuto(); 
});

if (nextBtn) nextBtn.addEventListener('click', () => { 
  goTo(current + 1); 
  startAuto(); 
});

// Swipe / drag para mobile e desktop
if (track) {
  let startX = 0;
  let dragging = false;

  track.addEventListener('touchstart', e => { 
    startX = e.touches[0].clientX; 
    dragging = true; 
    stopAuto(); 
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!dragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
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
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    startAuto();
  });

  // Inicia o carrossel automático
  startAuto();
}

// ===== SCROLL SUAVE (âncoras) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ANIMAÇÃO DE CONTAGEM (stats do hero) =====
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count + suffix;
  }, 24);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    countUp(el);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));
    }
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