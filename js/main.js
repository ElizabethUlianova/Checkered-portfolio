/* ═══════════════════════════════════════════════════════════════════════════
   main.js  –  index page
   Drag canvas to explore; hero text stays centred; images dim on hover.
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Responsive scale ─────────────────────────────────────────────────────
// All design values are authored for 1440 × 1024 px.
// --scale shrinks / grows everything proportionally for other viewports.
let scale = 1;
function updateScale() {
  scale = Math.min(window.innerWidth / 1440, window.innerHeight / 1024);
  document.documentElement.style.setProperty('--scale', scale);
}
window.addEventListener('resize', updateScale);
updateScale();

// ─── Drag-to-pan state ────────────────────────────────────────────────────
let isDragging = false;
let dragMoved  = false;
let dragOriginX = 0, dragOriginY = 0;  // clientXY - panXY at drag start
let panX = 0, panY = 0;                // current canvas offset in screen px
let velX = 0, velY = 0;                // momentum after release
const FRICTION = 0.91;

const TEXT_BELOW = 3;
const TEXT_ABOVE = 8;

// ─── Cursor ───────────────────────────────────────────────────────────────
const $cursor     = document.getElementById('cursor');
const $cursorText = document.getElementById('cursor-text');

document.addEventListener('mousemove', e => {
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
  // Hide tooltip while dragging
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

// ─── Scene images ─────────────────────────────────────────────────────────
const imageEls = [];

function initScene() {
  const $scene    = document.getElementById('scene');
  const $heroText = document.getElementById('hero-text');

  SCENE_IMAGES.forEach((data, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'scene-img ' + data.or;
    wrap.style.zIndex = data.above ? TEXT_ABOVE : TEXT_BELOW;

    const img = document.createElement('img');
    img.src = data.src;
    img.alt = (PROJECTS.find(p => p.slug === data.slug) || {}).label || '';
    img.draggable = false;
    wrap.appendChild(img);

    $scene.insertBefore(wrap, $heroText);
    imageEls.push(wrap);

    // ── Hover: dim all others + cursor tooltip ────────────────────────────
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

    // ── Click → zoom → project page ──────────────────────────────────────
    wrap.addEventListener('click', () => {
      if (dragMoved) return;
      handleImageClick(wrap, data);
    });

    // Staggered reveal
    setTimeout(() => { wrap.style.opacity = '1'; }, i * 55 + 250);
  });
}

// ─── Zoom transition ──────────────────────────────────────────────────────
function handleImageClick(el, data) {
  const rect = el.getBoundingClientRect();
  sessionStorage.setItem('heroSrc',  data.src);
  sessionStorage.setItem('heroSlug', data.slug);

  const $overlay = document.getElementById('zoom-overlay');
  const $clone   = document.createElement('img');
  $clone.id  = 'zoom-clone';
  $clone.src = data.src;
  $clone.style.cssText = `
    position:fixed; object-fit:cover; pointer-events:none; z-index:9999;
    border-radius:6px;
    left:${rect.left}px; top:${rect.top}px;
    width:${rect.width}px; height:${rect.height}px;
    transition: left .68s cubic-bezier(.76,0,.24,1), top .68s cubic-bezier(.76,0,.24,1),
                width .68s cubic-bezier(.76,0,.24,1), height .68s cubic-bezier(.76,0,.24,1),
                border-radius .68s ease;
  `;
  document.body.appendChild($clone);

  requestAnimationFrame(() => {
    $overlay.style.opacity = '1';
    requestAnimationFrame(() => {
      $clone.style.left = $clone.style.top = '0';
      $clone.style.width = '100vw'; $clone.style.height = '100vh';
      $clone.style.borderRadius = '0';
    });
  });

  setTimeout(() => { window.location.href = `project.html?slug=${data.slug}`; }, 700);
}

// ─── RAF: apply momentum + position all images ────────────────────────────
function tick() {
  if (!isDragging) {
    panX += velX; panY += velY;
    velX *= FRICTION; velY *= FRICTION;
    if (Math.abs(velX) < 0.2) velX = 0;
    if (Math.abs(velY) < 0.2) velY = 0;
  }

  const s = scale;
  imageEls.forEach((el, i) => {
    const { x, y, r } = SCENE_IMAGES[i];
    el.style.transform = `translate(${x * s + panX}px, ${y * s + panY}px) rotate(${r}deg)`;
  });

  requestAnimationFrame(tick);
}

// ─── Boot ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScene();
  requestAnimationFrame(tick);
});
