/* ═══════════════════════════════════════════════════════════════════════════
   main.js  –  index page
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ─── State ────────────────────────────────────────────────────────────────
let rawX = 0, rawY = 0;   // normalised mouse pos  -1 … +1
let curX = 0, curY = 0;   // smoothed (lerped)
const LERP = 0.072;

const TEXT_Z_BELOW = 3;
const TEXT_Z       = 5;
const TEXT_Z_ABOVE = 8;

// ─── Cursor ───────────────────────────────────────────────────────────────
const $cursor     = document.getElementById('cursor');
const $cursorText = document.getElementById('cursor-text');

// Direct cursor follow (no lerp – feels more responsive)
document.addEventListener('mousemove', e => {
  rawX = (e.clientX / innerWidth  - .5) * 2;
  rawY = (e.clientY / innerHeight - .5) * 2;
  $cursor.style.left = e.clientX + 'px';
  $cursor.style.top  = e.clientY + 'px';
});

// ─── Notification ─────────────────────────────────────────────────────────
const $notif = document.getElementById('notification');
let notifTimer;

function showNotif(msg) {
  $notif.textContent = msg;
  $notif.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => $notif.classList.remove('show'), 3200);
}

// ─── Header: dropdown ─────────────────────────────────────────────────────
function initHeader() {
  const $btn      = document.getElementById('projects-btn');
  const $dropdown = document.getElementById('projects-dropdown');

  // Populate dropdown links
  PROJECTS.forEach(p => {
    const a = document.createElement('a');
    a.href = `project.html?slug=${p.slug}`;
    a.innerHTML =
      `${p.label}<span class="sep">|</span>${p.type}<span class="sep">|</span>${p.model}`;
    $dropdown.appendChild(a);
  });

  $btn.addEventListener('click', e => {
    e.stopPropagation();
    $dropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => $dropdown.classList.remove('open'));
  $dropdown.addEventListener('click', e => e.stopPropagation());

  // LinkedIn
  document.getElementById('linkedin-link').addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/lisaulianova/', '_blank');
  });

  // Email copy
  document.getElementById('email-btn').addEventListener('click', () => {
    navigator.clipboard.writeText('elizabethulianova@gmail.com')
      .then(() => showNotif("email copied. lookin’ forward to your mail 👐🏻"))
      .catch(() => {
        // fallback for non-https
        const ta = document.createElement('textarea');
        ta.value = 'elizabethulianova@gmail.com';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showNotif("email copied. lookin’ forward to your mail 👐🏻");
      });
  });
}

// ─── Scene images ─────────────────────────────────────────────────────────
const imageEls = [];

function initScene() {
  const $scene    = document.getElementById('scene');
  const $heroText = document.getElementById('hero-text');

  SCENE_IMAGES.forEach((data, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'scene-img ' + data.or;
    wrap.style.left    = data.x + '%';
    wrap.style.top     = data.y + '%';
    wrap.style.zIndex  = data.above ? TEXT_Z_ABOVE : TEXT_Z_BELOW;
    wrap.style.transform = `translate(0,0) rotate(${data.r}deg)`;

    const img = document.createElement('img');
    img.src = data.src;
    img.alt = (PROJECTS.find(p => p.slug === data.slug) || {}).label || '';
    wrap.appendChild(img);

    // Insert before hero text so stacking context is right
    $scene.insertBefore(wrap, $heroText);
    imageEls.push(wrap);

    // Cursor morph on hover
    wrap.addEventListener('mouseenter', () => {
      const proj = PROJECTS.find(p => p.slug === data.slug);
      $cursorText.textContent = proj ? proj.label : '';
      $cursor.classList.add('on-image');
    });
    wrap.addEventListener('mouseleave', () => {
      $cursor.classList.remove('on-image');
    });

    // Click → zoom to project
    wrap.addEventListener('click', () => handleImageClick(wrap, data));

    // Staggered reveal
    setTimeout(() => { wrap.style.opacity = '1'; }, i * 75 + 350);
  });
}

// ─── Click → zoom → navigate ──────────────────────────────────────────────
function handleImageClick(el, data) {
  const rect = el.getBoundingClientRect();
  const currentTransform = el.style.transform;

  // Store for project page
  sessionStorage.setItem('heroSrc',  data.src);
  sessionStorage.setItem('heroSlug', data.slug);

  // Background overlay (fades in after slight delay to reveal the expanding img)
  const $overlay = document.getElementById('zoom-overlay');

  // Expanding image clone
  const $clone = document.createElement('img');
  $clone.id  = 'zoom-clone';
  $clone.src = data.src;
  $clone.style.left   = rect.left + 'px';
  $clone.style.top    = rect.top  + 'px';
  $clone.style.width  = rect.width  + 'px';
  $clone.style.height = rect.height + 'px';
  document.body.appendChild($clone);

  // First frame: kick off transitions
  requestAnimationFrame(() => {
    $overlay.style.opacity = '1';
    requestAnimationFrame(() => {
      $clone.style.left         = '0';
      $clone.style.top          = '0';
      $clone.style.width        = '100vw';
      $clone.style.height       = '100vh';
      $clone.style.borderRadius = '0';
    });
  });

  setTimeout(() => {
    window.location.href = `project.html?slug=${data.slug}`;
  }, 700);
}

// ─── Parallax RAF loop ────────────────────────────────────────────────────
function tick() {
  curX += (rawX - curX) * LERP;
  curY += (rawY - curY) * LERP;

  imageEls.forEach((el, i) => {
    const p  = SCENE_IMAGES[i].p;
    const r  = SCENE_IMAGES[i].r;
    const dx = curX * p * 38;
    const dy = curY * p * 38;
    el.style.transform = `translate(${dx}px,${dy}px) rotate(${r}deg)`;
  });

  requestAnimationFrame(tick);
}

// ─── Boot ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScene();
  requestAnimationFrame(tick);
});
