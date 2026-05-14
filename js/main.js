/* ═══════════════════════════════════════════════════════════════════════════
   main.js  –  index page
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Pan state ────────────────────────────────────────────────────────────
// The whole scene pans with mouse movement (like a large canvas).
// Hero text is position:absolute top/left 50% so it stays viewport-centred.
// Each image is positioned as: translate(data.x + panX*p, data.y + panY*p).

const PAN_X = 820;   // max horizontal pan in px
const PAN_Y = 720;   // max vertical pan in px
const LERP  = 0.07;

let rawPanX = 0, rawPanY = 0;   // target  (set on mousemove)
let panX    = 0, panY    = 0;   // smoothed (lerped each frame)

const TEXT_BELOW = 3;
const TEXT_Z     = 5;
const TEXT_ABOVE = 8;

// ─── Cursor ───────────────────────────────────────────────────────────────
const $cursor     = document.getElementById('cursor');
const $cursorText = document.getElementById('cursor-text');

document.addEventListener('mousemove', e => {
  // Normalise to -1…+1, then scale to pan range
  rawPanX = (e.clientX / innerWidth  - 0.5) * 2 * PAN_X;
  rawPanY = (e.clientY / innerHeight - 0.5) * 2 * PAN_Y;

  // Cursor follows mouse directly (no lerp)
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

// ─── Header ───────────────────────────────────────────────────────────────
function initHeader() {
  const $btn      = document.getElementById('projects-btn');
  const $dropdown = document.getElementById('projects-dropdown');

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

  document.getElementById('linkedin-link').addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/lisaulianova/', '_blank');
  });

  document.getElementById('email-btn').addEventListener('click', () => {
    const copy = () => showNotif("email copied. lookin' forward to your mail 👐🏻");
    navigator.clipboard.writeText('elizabethulianova@gmail.com')
      .then(copy)
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = 'elizabethulianova@gmail.com';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copy();
      });
  });
}

// ─── Scene ────────────────────────────────────────────────────────────────
const imageEls = [];

function initScene() {
  const $scene    = document.getElementById('scene');
  const $heroText = document.getElementById('hero-text');

  SCENE_IMAGES.forEach((data, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'scene-img ' + data.or;
    wrap.style.zIndex = data.above ? TEXT_ABOVE : TEXT_BELOW;
    // Base position from viewport centre; pan applied in RAF via transform
    wrap.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.r}deg)`;

    const img = document.createElement('img');
    img.src = data.src;
    img.alt = (PROJECTS.find(p => p.slug === data.slug) || {}).label || '';
    wrap.appendChild(img);

    $scene.insertBefore(wrap, $heroText);
    imageEls.push(wrap);

    // ── Hover: dim all others, morph cursor ─────────────────────────────
    wrap.addEventListener('mouseenter', () => {
      // Dim siblings
      imageEls.forEach(el => {
        if (el !== wrap) el.classList.add('dimmed');
      });
      // Cursor tooltip
      const proj = PROJECTS.find(p => p.slug === data.slug);
      $cursorText.textContent = proj ? proj.label : '';
      $cursor.classList.add('on-image');
    });

    wrap.addEventListener('mouseleave', () => {
      imageEls.forEach(el => el.classList.remove('dimmed'));
      $cursor.classList.remove('on-image');
    });

    // ── Click → zoom → navigate ─────────────────────────────────────────
    wrap.addEventListener('click', () => handleImageClick(wrap, data));

    // Staggered reveal
    setTimeout(() => { wrap.style.opacity = '1'; }, i * 70 + 300);
  });
}

// ─── Zoom transition ──────────────────────────────────────────────────────
function handleImageClick(el, data) {
  const rect = el.getBoundingClientRect();

  sessionStorage.setItem('heroSrc',  data.src);
  sessionStorage.setItem('heroSlug', data.slug);

  // Background overlay
  const $overlay = document.getElementById('zoom-overlay');

  // Expanding clone
  const $clone = document.createElement('img');
  $clone.id  = 'zoom-clone';
  $clone.src = data.src;
  $clone.style.cssText = `
    position:fixed; object-fit:cover; pointer-events:none;
    z-index:9999; border-radius:6px;
    left:${rect.left}px; top:${rect.top}px;
    width:${rect.width}px; height:${rect.height}px;
    transition: left .68s cubic-bezier(.76,0,.24,1),
                top  .68s cubic-bezier(.76,0,.24,1),
                width .68s cubic-bezier(.76,0,.24,1),
                height .68s cubic-bezier(.76,0,.24,1),
                border-radius .68s ease;
  `;
  document.body.appendChild($clone);

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

// ─── RAF: smooth pan + per-image depth shift ──────────────────────────────
function tick() {
  panX += (rawPanX - panX) * LERP;
  panY += (rawPanY - panY) * LERP;

  imageEls.forEach((el, i) => {
    const { x, y, r, p } = SCENE_IMAGES[i];
    const tx = x + panX * p;
    const ty = y + panY * p;
    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${r}deg)`;
  });

  requestAnimationFrame(tick);
}

// ─── Boot ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScene();
  requestAnimationFrame(tick);
});
