/* ═══════════════════════════════════════════════════════════════════════════
   project.js  –  project detail page
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Cursor (same as main page) ───────────────────────────────────────────
const $cursor     = document.getElementById('cursor');
const $cursorText = document.getElementById('cursor-text');

document.addEventListener('mousemove', e => {
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

// ─── Header (shared logic) ────────────────────────────────────────────────
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
    navigator.clipboard.writeText('elizabethulianova@gmail.com')
      .then(() => showNotif("email copied. lookin' forward to your mail 👐🏻"))
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = 'elizabethulianova@gmail.com';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showNotif("email copied. lookin' forward to your mail 👐🏻");
      });
  });
}

// ─── Project page init ────────────────────────────────────────────────────
function initProject() {
  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('slug');
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    document.title = 'Not found — Lisa';
    return;
  }

  const heroSrc      = sessionStorage.getItem('heroSrc');
  const heroSlug     = sessionStorage.getItem('heroSlug');
  const allImages    = PROJECT_IMAGES[slug] || [];

  // Pick hero: clicked image if it belongs to this project, else first in array
  const heroImage = (heroSrc && heroSlug === slug) ? heroSrc : allImages[0];

  // Clear sessionStorage so back-navigation doesn't re-use stale values
  sessionStorage.removeItem('heroSrc');
  sessionStorage.removeItem('heroSlug');

  // Page title
  document.title = `${project.label} — Lisa`;

  // Project name + meta
  document.getElementById('project-name').textContent = project.label;
  document.getElementById('project-meta').innerHTML =
    `${project.type}<span class="sep" style="margin:0 6px">|</span>${project.model}`;

  // ── Hero image ──────────────────────────────────────────────────────────
  const $hero      = document.getElementById('project-hero');
  const storedRect = JSON.parse(sessionStorage.getItem('heroRect') || 'null');
  sessionStorage.removeItem('heroRect');

  if (heroImage) {
    $hero.src = heroImage;
    $hero.alt = project.label;

    if (storedRect) {
      // ── Flying clone: image travels from its canvas position to the hero slot
      const $fly = document.createElement('img');
      $fly.src = heroImage;
      Object.assign($fly.style, {
        position:      'fixed',
        left:          storedRect.left   + 'px',
        top:           storedRect.top    + 'px',
        width:         storedRect.width  + 'px',
        height:        storedRect.height + 'px',
        borderRadius:  '6px',
        objectFit:     'cover',
        pointerEvents: 'none',
        zIndex:        '9999',
      });
      document.body.appendChild($fly);

      const startFlight = () => {
        // Disable hero scale so getBoundingClientRect returns natural dimensions
        $hero.style.transform  = 'none';
        $hero.style.transition = 'none';

        requestAnimationFrame(() => {
          const dest = $hero.getBoundingClientRect();

          // Hero will only fade in (no scale), clone handles spatial movement
          $hero.style.transition = 'opacity .4s ease';

          $fly.style.transition = [
            'left .65s cubic-bezier(.76,0,.24,1)',
            'top .65s cubic-bezier(.76,0,.24,1)',
            'width .65s cubic-bezier(.76,0,.24,1)',
            'height .65s cubic-bezier(.76,0,.24,1)',
            'border-radius .65s ease',
            'opacity .25s ease .35s',   // fade out 350 → 600 ms
          ].join(',');

          requestAnimationFrame(() => {
            $fly.style.left         = dest.left   + 'px';
            $fly.style.top          = dest.top    + 'px';
            $fly.style.width        = dest.width  + 'px';
            $fly.style.height       = dest.height + 'px';
            $fly.style.borderRadius = '10px';
            $fly.style.opacity      = '0';
          });

          // Hero fades in as clone disappears
          setTimeout(() => { $hero.classList.add('visible'); }, 600);

          // Clean up clone + restore hero transitions
          setTimeout(() => {
            $fly.remove();
            $hero.style.transform  = '';
            $hero.style.transition = '';
          }, 1100);
        });
      };

      if ($hero.complete) startFlight();
      else $hero.addEventListener('load', startFlight, { once: true });

    } else {
      // Normal reveal for direct navigation (no click transition)
      const reveal = () => { requestAnimationFrame(() => $hero.classList.add('visible')); };
      if ($hero.complete) reveal();
      else $hero.addEventListener('load', reveal, { once: true });
    }
  } else {
    $hero.style.display = 'none';
  }

  // ── Info ────────────────────────────────────────────────────────────────
  setTimeout(() => {
    document.getElementById('project-info').classList.add('visible');
  }, 200);

  // ── Gallery (built after hero loads so we know its orientation) ──────────
  const $gallery  = document.getElementById('project-gallery');
  const $noImages = document.getElementById('no-images');
  const projectText = PROJECT_TEXT[slug] || {};

  // Images that should never get left padding
  const NO_PADDING_SRCS = ['viju movie page tv.png', 'viju create a kinom app.png'];

  function makeTextBlock(key) {
    const data = projectText[key];
    if (!data || (!data.heading && !data.body)) return null;
    const block = document.createElement('div');
    block.className = 'text-block';
    const h = document.createElement('p');
    h.className = 'text-block__heading';
    h.textContent = data.heading || '';
    const b = document.createElement('p');
    b.className = 'text-block__body';
    b.textContent = data.body || '';
    block.appendChild(h);
    block.appendChild(b);
    return block;
  }

  function buildGallery(heroIsPortrait) {
    if (allImages.length === 0 && !heroImage) {
      $noImages.classList.add('visible');
      return;
    }

    const defaultHero = allImages[0];
    // Default gallery order = allImages without the default hero
    const defaultGallery = allImages.filter(s => s !== defaultHero);

    let gallery = allImages.filter(s => s !== heroImage);

    if (heroIsPortrait) {
      // Find the partner of the hero in the default paired layout
      const hi = defaultGallery.indexOf(heroImage);
      if (hi >= 0) {
        const partnerIdx = hi % 2 === 0 ? hi + 1 : hi - 1;
        const partner = (partnerIdx >= 0 && partnerIdx < defaultGallery.length)
          ? defaultGallery[partnerIdx] : null;

        if (partner && partner !== defaultHero) {
          // Move partner to front – it will be alone in row 1 and centered
          gallery = [partner, ...gallery.filter(s => s !== partner)];
        }
      }
    } else if (heroImage !== defaultHero) {
      // Landscape non-default hero: default image moves to position 1
      const di = gallery.indexOf(defaultHero);
      if (di > 1) {
        gallery.splice(di, 1);
        gallery.splice(1, 0, defaultHero);
      }
    }

    // Overview text block first
    const overviewBlock = makeTextBlock('overview');
    if (overviewBlock) $gallery.appendChild(overviewBlock);

    const galleryItemEls = [];

    gallery.forEach((src, idx) => {
      if (idx === 5) {
        const b = makeTextBlock('details');
        if (b) $gallery.appendChild(b);
      }
      if (idx === 9) {
        const b = makeTextBlock('more');
        if (b) $gallery.appendChild(b);
      }

      const item = document.createElement('div');
      item.className = 'gallery-item';

      const filename = src.split('/').pop();
      if (NO_PADDING_SRCS.includes(filename)) item.classList.add('no-padding');

      const img = document.createElement('img');
      img.src     = src;
      img.alt     = project.label;
      img.loading = 'lazy';
      img.addEventListener('load', () => {
        if (img.naturalWidth > img.naturalHeight) item.classList.add('landscape');
      }, { once: true });

      item.appendChild(img);
      $gallery.appendChild(item);
      galleryItemEls.push(item);
    });

    // Portrait hero: first gallery item is the lone partner → center it
    if (heroIsPortrait && galleryItemEls.length > 0) {
      galleryItemEls[0].classList.add('alone');
    }

    setTimeout(() => $gallery.classList.add('visible'), 380);
  }

  // Trigger gallery build once we know hero orientation
  function onHeroReady() {
    const heroIsPortrait = $hero.naturalHeight > $hero.naturalWidth;
    buildGallery(heroIsPortrait);
  }

  if (heroImage) {
    if ($hero.complete && $hero.naturalWidth > 0) onHeroReady();
    else $hero.addEventListener('load', onHeroReady, { once: true });
  } else {
    buildGallery(false);
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initProject();
});
