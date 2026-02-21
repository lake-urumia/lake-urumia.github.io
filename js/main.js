/* ============================================
   LAKE URUMIA - Main JavaScript
   ============================================ */

// --- Theme Toggle ---
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Load saved theme preference or respect system preference
function initTheme() {
  const saved = localStorage.getItem('theme');
  
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// --- Email Obfuscation ---
// Assembles email from parts to avoid scraper bots
function initEmail() {
  const target = document.getElementById('email-target');
  if (!target) return;
  
  // Split your email into parts
  const user = 'booking.unison333';
  const domain = 'passfwd';
  const tld = 'com';
  
  // Assemble
  const email = `${user}@${domain}.${tld}`;
  
  // Create link
  const link = document.createElement('a');
  link.href = `mailto:${email}`;
  link.textContent = email;
  
  target.appendChild(link);
}

// --- Smooth scroll for anchor links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// --- Intersection Observer for fade-in effects ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// --- Background Audio ---
function initAudio() {
  const audio = document.getElementById('bg-audio');
  const toggle = document.getElementById('audio-toggle');
  if (!audio || !toggle) return;

  audio.volume = 0.8; // moderate volume

  // Browsers block autoplay until the user interacts with the page.
  // Start playback on the first click, scroll, or keypress.
  function tryPlay() {
    audio.play().then(() => {
      toggle.classList.remove('muted');
    }).catch(() => {});
    document.removeEventListener('click', tryPlay);
    document.removeEventListener('scroll', tryPlay);
    document.removeEventListener('keydown', tryPlay);
  }

  document.addEventListener('click', tryPlay, { once: true });
  document.addEventListener('scroll', tryPlay, { once: true });
  document.addEventListener('keydown', tryPlay, { once: true });

  // Mute / unmute toggle
  toggle.classList.add('muted'); // starts visually muted until playback begins
  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      toggle.classList.remove('muted');
    } else {
      audio.muted = !audio.muted;
      toggle.classList.toggle('muted', audio.muted);
    }
  });
}

// --- Initialize on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEmail();
  initSmoothScroll();
  initScrollAnimations();
  initAudio();
});

// --- Listen for system theme changes ---
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
  }
});
