// ─── Projects ────────────────────────────────────────────────────────────────
const PROJECTS = [
  { slug: 'megamarket',    label: 'megamarket',  type: 'marketplace', model: 'b2c' },
  { slug: 'avito',         label: 'avito',       type: 'classified',  model: 'b2c' },
  { slug: 'viju-streaming',label: 'viju',        type: 'streaming',   model: 'b2c' },
  { slug: 'viju-cms',      label: 'viju',        type: 'cms',         model: 'b2b' },
  { slug: 'braghouse',     label: 'brag house',  type: 'streaming',   model: 'b2c' },
  { slug: 'sbermarket',    label: 'sbermarket',  type: 'hrms',        model: 'b2b' },
];

// ─── All images per project (project detail page) ────────────────────────────
const PROJECT_IMAGES = {
  megamarket: [
    'images/megamarket main.png',
    'images/megamarket web main.png',
    'images/megamarket item.png',
    'images/megamarket listing.png',
    'images/megamarket chekcout.png',
    'images/megamarket lookbook.png',
    'images/megamarket brands.png',
    'images/megamarket main bty.png',
    'images/megamarket main fsh.png',
    'images/megamarket makeup idea.png',
    'images/megamarket my size.png',
    'images/megamarket post purchase.png',
    'images/megamarket size guide.png',
    'images/megamarket try on app.png',
    'images/megamarket try on web.png',
  ],
  avito: [],
  'viju-streaming': [
    'images/viju movie page app.png',
    'images/viju movie page tv.png',
    'images/viju collections app.png',
    'images/viju playlist app.png',
    'images/viju kinom playlist.png',
    'images/viju create a kinom app.png',
  ],
  'viju-cms': [
    'images/vijucms movies list.png',
    'images/vijucms edit movie.png',
    'images/vijucms edit kinom.png',
    'images/vijucms edit image.png',
  ],
  braghouse: [
    'images/braghouse posts.png',
    'images/braghouse my brags.png',
    'images/braghouse made a brag.png',
    'images/braghouse favorite games.png',
    'images/braghouse favorite genres.png',
    'images/braghouse one type of tokens.png',
  ],
  sbermarket: [
    'images/sbermarket profile.png',
    'images/sbermarket list.png',
    'images/sbermarket profile managment.png',
    'images/sbermarket scheme.png',
  ],
};

// ─── Scene layout — ALL 35 images ────────────────────────────────────────────
//
// Baseline viewport: 1440 × 1024 px.  All px values are at scale = 1.
// JS applies `--scale = min(vw/1440, vh/1024)` so everything scales proportionally.
//
// x, y  = offset from VIEWPORT CENTRE to image TOP-LEFT  (px, at scale 1)
// r     = rotation °
// above = z-index above hero text (z 8) vs below (z 3)
// p     = 1  (all images pan together, depth comes from z-index stacking)
//
// Sizes at scale 1:
//   pt  241 × 450 px
//   ls  806 × 570 px
//
// ── 5 BANDS, 7 images each = 35 total ────────────────────────────────────────
//
// Band layout patterns (from left, 200 px gaps):
//   ODD bands  → LS  PT  PT  LS  PT  PT  LS   total w = 4582 px  start x = -2291
//   EVEN bands → PT  PT  LS  PT  PT  LS  PT   total w = 4017 px  start x = -2009
//
// Band base y:
//   Band 1  y = -1300   (above viewport, drag UP to reveal)
//   Band 2  y =  -250   (visible at rest, overlaps hero text → layering effect)
//   Band 3  y =   520   (just below viewport bottom, drag DOWN slightly to reveal)
//   Band 4  y =  1290   (deep below, long drag)
//   Band 5  y =  2060   (deepest)
//
// Verified: every pair of images has gap_x ≥ 200 OR gap_y ≥ 200.

const SCENE_IMAGES = [

  // ━━━━ Band 1  (ODD: LS PT PT LS PT PT LS) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { src:'images/megamarket web main.png',         slug:'megamarket',     or:'ls', x:-2291, y:-1310, r:-1.5, above:false },
  { src:'images/megamarket item.png',             slug:'megamarket',     or:'pt', x:-1285, y:-1280, r: 2.0, above:false },
  { src:'images/braghouse posts.png',             slug:'braghouse',      or:'pt', x: -844, y:-1330, r:-1.0, above:false },
  { src:'images/vijucms edit movie.png',          slug:'viju-cms',       or:'ls', x: -403, y:-1300, r: 1.5, above:false },
  { src:'images/viju movie page app.png',         slug:'viju-streaming', or:'pt', x:  603, y:-1270, r:-2.0, above:false },
  { src:'images/megamarket chekcout.png',         slug:'megamarket',     or:'pt', x: 1044, y:-1310, r: 1.0, above:false },
  { src:'images/sbermarket scheme.png',           slug:'sbermarket',     or:'ls', x: 1485, y:-1290, r:-1.5, above:false },

  // ━━━━ Band 2  (EVEN: PT PT LS PT PT LS PT)  ← visible at rest ━━━━━━━━━━━━━
  { src:'images/megamarket listing.png',          slug:'megamarket',     or:'pt', x:-2009, y: -260, r: 1.0, above:false },
  { src:'images/viju collections app.png',        slug:'viju-streaming', or:'pt', x:-1568, y: -230, r:-1.5, above:false },
  { src:'images/sbermarket profile.png',          slug:'sbermarket',     or:'ls', x:-1127, y: -270, r: 2.0, above:false },
  { src:'images/megamarket main.png',             slug:'megamarket',     or:'pt', x: -121, y: -240, r:-1.0, above:true  }, // ← in front of text
  { src:'images/braghouse my brags.png',          slug:'braghouse',      or:'pt', x:  320, y: -220, r: 1.5, above:true  }, // ← in front of text
  { src:'images/vijucms movies list.png',         slug:'viju-cms',       or:'ls', x:  761, y: -250, r:-2.0, above:false },
  { src:'images/viju playlist app.png',           slug:'viju-streaming', or:'pt', x: 1767, y: -270, r: 1.0, above:false },

  // ━━━━ Band 3  (ODD: LS PT PT LS PT PT LS) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { src:'images/megamarket try on web.png',       slug:'megamarket',     or:'ls', x:-2291, y:  510, r: 1.5, above:false },
  { src:'images/megamarket lookbook.png',         slug:'megamarket',     or:'pt', x:-1285, y:  540, r:-2.0, above:false },
  { src:'images/viju create a kinom app.png',     slug:'viju-streaming', or:'pt', x: -844, y:  520, r: 1.0, above:false },
  { src:'images/viju movie page tv.png',          slug:'viju-streaming', or:'ls', x: -403, y:  500, r:-1.5, above:false },
  { src:'images/braghouse made a brag.png',       slug:'braghouse',      or:'pt', x:  603, y:  550, r: 2.0, above:false },
  { src:'images/megamarket main bty.png',         slug:'megamarket',     or:'pt', x: 1044, y:  520, r:-1.0, above:false },
  { src:'images/sbermarket list.png',             slug:'sbermarket',     or:'ls', x: 1485, y:  530, r: 1.5, above:false },

  // ━━━━ Band 4  (EVEN: PT PT LS PT PT LS PT) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { src:'images/megamarket main fsh.png',         slug:'megamarket',     or:'pt', x:-2009, y: 1280, r:-1.5, above:false },
  { src:'images/viju kinom playlist.png',         slug:'viju-streaming', or:'pt', x:-1568, y: 1310, r: 2.0, above:false },
  { src:'images/sbermarket profile managment.png',slug:'sbermarket',     or:'ls', x:-1127, y: 1290, r:-1.0, above:false },
  { src:'images/megamarket my size.png',          slug:'megamarket',     or:'pt', x: -121, y: 1270, r: 1.5, above:false },
  { src:'images/megamarket makeup idea.png',      slug:'megamarket',     or:'pt', x:  320, y: 1300, r:-2.0, above:false },
  { src:'images/vijucms edit kinom.png',          slug:'viju-cms',       or:'ls', x:  761, y: 1300, r: 1.0, above:false },
  { src:'images/braghouse favorite games.png',    slug:'braghouse',      or:'pt', x: 1767, y: 1320, r:-1.5, above:false },

  // ━━━━ Band 5  (EVEN: PT PT LS PT PT LS PT) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { src:'images/megamarket post purchase.png',    slug:'megamarket',     or:'pt', x:-2009, y: 2050, r: 1.5, above:false },
  { src:'images/braghouse favorite genres.png',   slug:'braghouse',      or:'pt', x:-1568, y: 2080, r:-1.0, above:false },
  { src:'images/megamarket brands.png',           slug:'megamarket',     or:'ls', x:-1127, y: 2060, r: 2.0, above:false },
  { src:'images/megamarket size guide.png',       slug:'megamarket',     or:'pt', x: -121, y: 2040, r:-1.5, above:false },
  { src:'images/megamarket try on app.png',       slug:'megamarket',     or:'pt', x:  320, y: 2070, r: 1.0, above:false },
  { src:'images/vijucms edit image.png',          slug:'viju-cms',       or:'ls', x:  761, y: 2070, r:-2.0, above:false },
  { src:'images/braghouse one type of tokens.png',slug:'braghouse',      or:'pt', x: 1767, y: 2090, r: 1.5, above:false },
];
