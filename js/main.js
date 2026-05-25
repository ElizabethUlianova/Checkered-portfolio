/* =============================================================================
   main.js  --  index page
   Drag canvas to explore; subtle mouse parallax; pan bounded 200px past images.
   ============================================================================= */

'use strict';

// --- Responsive scale --------------------------------------------------------
// All design values authored for 1440 x 1024 px.
let scale = 1;
function updateScale() {
  scale = Math.min(window.innerWidth / 1440, window.innerHeight / 1024);
  document.documentElement.style.setProperty('--scale', scale);
}
window.addEventListener('resize', updateScale);
updateScale();

// --- Canvas bounding box (at scale 1) ----------------------------------------
// Derived from SCENE_IMAGES min/max positions.
const IMG_MIN_X = -2172;   // leftmost image left edge
const IMG_MAX_X =  2572;   // rightmost image right edge  (x + w)
const IMG_MIN_Y = -4080;   // topmost image top edge
const IMG_MAX_Y =  3720;   // bottommost image bottom edge (y + h)
const PAN_PAD   =  200;    // blank space kept at each canvas edge

function getPanLimits() {
  const vw = window.innerWidth, vh = window.innerHeight;
  return {
    minX: vw / 2 - PAN_PAD - IMG_MAX_X * scale,
    maxX: PAN_PAD - vw / 2 - IMG_MIN_X * scale,
    minY: vh / 2 - PAN_PAD - IMG_MAX_Y * scale,
    maxY: PAN_PAD - vh / 2 - IMG_MIN_Y * scale,
  };
}

// --- Drag-to-pan state -------------------------------------------------------
let isDragging  = false;
let dragMoved   = false;
let dragOriginX = 0, dragOriginY = 0;
let panX = 0, panY = 0;
let velX = 0, velY = 0;
const FRICTION = 0.91;

// --- Mouse position (for parallax) ------------------------------------------
let mouseX = window.innerWidth  / 2;
let mouseY = window.innerHeight / 2;

// --- Cursor ------------------------------------------------------------------
const $cursor     = document.getElementById('cursor');
const $cursorText = document.getElementById('cursor-text');

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  $cursor.style.left = e.clientX + 'px';
  $cursor.style.top  = e.clientY + 'px';

  if (!isDragging) return;

  const newPanX = e.clientX - dragOriginX;
  const newPanY = e.clientY - dragOriginY;
  velX = newPanX - panX;
  velY = newPanY - panY;
  panX = newPanX;
  panY = newPanY;
  if (Math.abs(velX) + Math.abs(velY) > 3) dragMoved = true;
});

document.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  isDragging  = true;
  dragMoved   = false;
  dragOriginX = e.clientX - panX;
  dragOriginY = e.clientY - panY;
  velX = velY = 0;
  document.body.classList.add('is-dragging');
  $cursor.classList.remove('on-image');
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.classList.remove('is-dragging');
});

document.addEventListener('mouseleave', () => {
  isDragging = false;
  document.body.classList.remove('is-dragging');
});

// --- Notification ------------------------------------------------------------
const $notif = document.getElementById('notification');
let notifTimer;
function showNotif(msg) {
  $notif.textContent = msg;
  $notif.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => $notif.classList.remove('show'), 3200);
}

// --- Header ------------------------------------------------------------------
function initHeader() {
  const $btn      = document.getElementById('projects-btn');
  const $dropdown = document.getElementById('projects-dropdown');

  PROJECTS.forEach(p => {
    const a = document.createElement('a');
    a.href = `project.html?slug=${p.slug}`;
    a.innerHTML = `${p.label}<span class="sep">|</span>${p.type}<span class="sep">|</span>${p.model}`;
    $dropdown.appendChild(a);
  });

  $btn.addEventListener('click', e => { e.stopPropagation(); $dropdown.classList.toggle('open'); });
  document.addEventListener('click', () => $dropdown.classList.remove('open'));
  $dropdown.addEventListener('click', e => e.stopPropagation());

  document.getElementById('linkedin-link').addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/lisaulianova/', '_blank');
  });

  document.getElementById('email-btn').addEventListener('click', () => {
    const done = () => showNotif("email copied. lookin' forward to your mail 👐🏻");
    navigator.clipboard.writeText('elizabethulianova@gmail.com').then(done).catch(() => {
      const ta = Object.assign(document.createElement('textarea'), { value: 'elizabethulianova@gmail.com' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done();
    });
  });
}

// --- Scene images ------------------------------------------------------------
const imageEls = [];
const TEXT_BELOW = 3, TEXT_ABOVE = 8;

function initScene() {
  const $scene    = document.getElementById('scene');
  const $heroText = document.getElementById('hero-text');

  SCENE_IMAGES.forEach((data, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'scene-img';
    wrap.style.zIndex = data.above ? TEXT_ABOVE : TEXT_BELOW;
    // Per-image base size -- CSS uses calc(var(--img-w) * var(--scale))
    wrap.style.setProperty('--img-w', data.w + 'px');
    wrap.style.setProperty('--img-h', data.h + 'px');

    const img = document.createElement('img');
    img.src = data.src;
    img.alt = (PROJECTS.find(p => p.slug === data.slug) || {}).label || '';
    img.draggable = false;
    wrap.appendChild(img);
    $scene.insertBefore(wrap, $heroText);
    imageEls.push(wrap);

    // Hover: dim all others + cursor tooltip
    wrap.addEventListener('mouseenter', () => {
      if (isDragging) return;
      imageEls.forEach(el => { if (el !== wrap) el.classList.add('dimmed'); });
      const proj = PROJECTS.find(p => p.slug === data.slug);
      $cursorText.textContent = proj ? proj.label : '';
      $cursor.classList.add('on-image');
    });
    wrap.addEventListener('mouseleave', () => {
      imageEls.forEach(el => el.classList.remove('dimmed'));
      $cursor.classList.remove('on-image');
    });

    // Click -> zoom -> project page
    wrap.addEventListener('click', () => {
      if (dragMoved) return;
      handleImageClick(wrap, data);
    });

    // Staggered reveal
    setTimeout(() => { wrap.style.opacity = '1'; }, i * 45 + 200);
  });
}

// --- Fade transition ---------------------------------------------------------
function handleImageClick(el, data) {
  sessionStorage.setItem('heroSrc',  data.src);
  sessionStorage.setItem('heroSlug', data.slug);

  const $overlay = document.getElementById('zoom-overlay');
  requestAnimationFrame(() => { $overlay.style.opacity = '1'; });
  setTimeout(() => { window.location.href = `project.html?slug=${data.slug}`; }, 380);
}

// --- RAF: momentum + pan limits + parallax + position -----------------------
function tick() {
  // Momentum
  if (!isDragging) {
    panX += velX; panY += velY;
    velX *= FRICTION; velY *= FRICTION;
    if (Math.abs(velX) < 0.2) velX = 0;
    if (Math.abs(velY) < 0.2) velY = 0;
  }

  // Pan limits -- stop 200px past outermost image on every side
  const lim = getPanLimits();
  panX = Math.min(lim.maxX, Math.max(lim.minX, panX));
  panY = Math.min(lim.maxY, Math.max(lim.minY, panY));
  if (panX === lim.maxX || panX === lim.minX) velX = 0;
  if (panY === lim.maxY || panY === lim.minY) velY = 0;

  // Parallax: subtle image shift based on cursor position relative to centre
  const cx  = window.innerWidth  / 2;
  const cy  = window.innerHeight / 2;
  const plx = mouseX - cx;
  const ply = mouseY - cy;

  const s = scale;
  imageEls.forEach((el, i) => {
    const { x, y, r, d } = SCENE_IMAGES[i];
    const tx = x * s + panX + plx * d;
    const ty = y * s + panY + ply * d;
    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${r}deg)`;
  });

  requestAnimationFrame(tick);
}

// --- Boot -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScene();
  requestAnimationFrame(tick);
});
