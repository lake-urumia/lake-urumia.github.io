/* ============================================
   LAKE URUMIA - Main JavaScript
   ============================================ */

// ── Work gallery ─────────────────────────────────────────────
// Drop images into the your-images/ folder, named:
//   work-1.jpg, work-2.jpg, work-3.jpg, ...
// (numbered without gaps; jpg, jpeg, png and webp all work).
// The "work" section appears automatically once at least one
// image is found. Optional captions, in the same order:
const WORK_CAPTIONS = [
  // 'Forum Stadtpark, 2024',
  // 'Messy Sensing installation, 2023',
];
const WORK_DIR = 'your-images/';
const WORK_MAX = 24;
const WORK_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
// ─────────────────────────────────────────────────────────────

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Theme Toggle ---
// (The initial theme is applied by an inline script in <head>
// so the page never flashes the wrong theme.)
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// --- Email Obfuscation ---
// Assembles email from parts to avoid scraper bots
function initEmail() {
  const target = document.getElementById('email-target');
  if (!target) return;

  const user = 'booking.unison333';
  const domain = 'passfwd';
  const tld = 'com';

  const email = `${user}@${domain}.${tld}`;

  const link = document.createElement('a');
  link.href = `mailto:${email}`;
  link.textContent = email;

  target.appendChild(link);
}

// --- Smooth scroll for anchor links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// --- Intersection Observer for fade-in effects ---
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// --- Work gallery (loads images from your-images/) ---
function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function findWorkImage(index) {
  for (const ext of WORK_EXTENSIONS) {
    const img = await loadImage(`${WORK_DIR}work-${index}.${ext}`);
    if (img) return img;
  }
  return null;
}

async function initWorkGallery() {
  const section = document.getElementById('work');
  const gallery = section ? section.querySelector('.gallery') : null;
  if (!gallery) return;
  const navLink = document.getElementById('nav-work');

  for (let i = 1; i <= WORK_MAX; i++) {
    const img = await findWorkImage(i);
    if (!img) break;

    const caption = WORK_CAPTIONS[i - 1] || '';
    img.alt = caption || `Lake Urumia, work ${i}`;

    const inner = document.createElement('span');
    inner.className = 'frame-inner';
    inner.appendChild(img);

    const figure = document.createElement('figure');
    figure.className = 'gallery-item frame';
    figure.appendChild(inner);

    if (caption) {
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = caption;
      figure.appendChild(figcaption);
    }

    gallery.appendChild(figure);
    section.hidden = false;
    if (navLink) navLink.hidden = false;
  }
}

// --- Vimeo facade: swap the poster for the real player on demand ---
function initVideoFacade() {
  const facade = document.getElementById('video-facade');
  if (!facade) return;

  facade.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = facade.dataset.src + '&autoplay=1';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.title = facade.dataset.title || 'Video';
    facade.replaceWith(iframe);
  });
}

// --- Background Audio (strictly opt-in: the file only downloads
// and plays when the visitor presses the toggle) ---
function initAudio() {
  const audio = document.getElementById('bg-audio');
  const toggle = document.getElementById('audio-toggle');
  if (!audio || !toggle) return;

  audio.volume = 0.8;

  function setState(playing) {
    toggle.classList.toggle('muted', !playing);
    toggle.classList.toggle('playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pause background audio' : 'Play background audio');
  }

  setState(false);

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setState(true)).catch(() => {});
    } else {
      audio.pause();
      setState(false);
    }
  });
}

// --- Initialize on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  initEmail();
  initSmoothScroll();
  initScrollAnimations();
  initWorkGallery();
  initVideoFacade();
  initAudio();
});

// --- Listen for system theme changes ---
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
  }
});
