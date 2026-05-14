// ─── Projects ────────────────────────────────────────────────────────────────
const PROJECTS = [
  { slug: 'megamarket',    label: 'megamarket',  type: 'marketplace', model: 'b2c' },
  { slug: 'avito',         label: 'avito',       type: 'classified',  model: 'b2c' },
  { slug: 'viju-streaming',label: 'viju',        type: 'streaming',   model: 'b2c' },
  { slug: 'viju-cms',      label: 'viju',        type: 'cms',         model: 'b2b' },
  { slug: 'braghouse',     label: 'brag house',  type: 'streaming',   model: 'b2c' },
  { slug: 'sbermarket',    label: 'sbermarket',  type: 'hrms',        model: 'b2b' },
];

// ─── All images per project (for project detail page) ────────────────────────
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

// ─── Scene layout ─────────────────────────────────────────────────────────────
//
// x, y  = pixel offset from VIEWPORT CENTRE to the TOP-LEFT of the image.
//         (positive x → right, positive y → down)
// r     = rotation in degrees (slight tilt)
// above = true → z-index above hero text (z 8), false → below (z 3)
// p     = parallax depth factor (1.0 = moves with scene, >1 moves a bit more)
//
// Image sizes:
//   pt (portrait)  = 241 × 450 px
//   ls (landscape) = 806 × 570 px
//
// Layout uses 4 horizontal bands separated by ≥ 100 px vertical gaps.
// Within each band images are placed left→right with exactly 100 px x-gaps.
//
//  Band A  tops  ≈ −920   (above viewport)
//  Band B  tops  ≈ −220   (spans viewport centre — creates text layering)
//  Band C  tops  ≈  460   (below centre)
//  Band D  tops  ≈ 1150   (far below viewport)
//
// Verified: all inter-image gaps ≥ 100 px in the static (no-pan) state.
// During mouse panning images with different `p` values will drift slightly
// relative to each other — this is the intentional depth / parallax effect.

const SCENE_IMAGES = [

  // ── Band A ────────────────────────────────────────────────────────────────
  // A1  LS  right=-494   bottom=-350
  { src:'images/megamarket web main.png',      slug:'megamarket',     or:'ls', x:-1300, y: -920, r:-1.5, above:false, p:0.92 },
  // A2  PT  left=-394    right=-153   bottom=-470    gap to A1: 100 px
  { src:'images/braghouse posts.png',          slug:'braghouse',      or:'pt', x: -394, y: -870, r: 2.0, above:false, p:0.92 },
  // A3  PT  left=-53     right=188    bottom=-490    gap to A2: 100 px
  { src:'images/sbermarket profile.png',       slug:'sbermarket',     or:'pt', x:  -53, y: -940, r:-1.0, above:true,  p:1.08 },
  // A4  PT  left=288     right=529    bottom=-410    gap to A3: 100 px
  { src:'images/viju movie page app.png',      slug:'viju-streaming', or:'pt', x:  288, y: -860, r: 1.5, above:true,  p:1.08 },
  // A5  LS  left=629     right=1435   bottom=-360    gap to A4: 100 px
  { src:'images/vijucms edit movie.png',       slug:'viju-cms',       or:'ls', x:  629, y: -930, r:-2.0, above:false, p:0.92 },

  // ── Band B (spans viewport centre → text layering effect) ─────────────────
  // B1  LS  right=-644   bottom=340    (top=-230, gap to Band A LS min=-350: 120 px ✓)
  { src:'images/viju movie page tv.png',       slug:'viju-streaming', or:'ls', x:-1450, y: -230, r: 1.0, above:false, p:0.92 },
  // B2  PT  left=-544    right=-303   bottom=270     gap to B1: 100 px
  { src:'images/megamarket item.png',          slug:'megamarket',     or:'pt', x: -544, y: -180, r:-2.0, above:false, p:0.92 },
  // B3  PT  left=-203    right=38     bottom=230     gap to B2: 100 px  ← behind text
  { src:'images/megamarket listing.png',       slug:'megamarket',     or:'pt', x: -203, y: -220, r: 2.0, above:true,  p:1.08 },
  // B4  PT  left=138     right=379    bottom=280     gap to B3: 100 px  ← in front of text
  { src:'images/braghouse made a brag.png',    slug:'braghouse',      or:'pt', x:  138, y: -170, r:-1.0, above:false, p:0.92 },
  // B5  LS  left=479     right=1285   bottom=360     gap to B4: 100 px
  { src:'images/sbermarket scheme.png',        slug:'sbermarket',     or:'ls', x:  479, y: -210, r: 1.5, above:false, p:0.92 },

  // ── Band C ────────────────────────────────────────────────────────────────
  // C1  LS  right=-594   bottom=1030  (top=460, gap to Band B LS max bottom=360: 100 px ✓)
  { src:'images/megamarket main.png',          slug:'megamarket',     or:'ls', x:-1400, y:  460, r:-2.0, above:false, p:0.92 },
  // C2  PT  left=-494    right=-253   bottom=950     gap to C1: 100 px
  { src:'images/megamarket lookbook.png',      slug:'megamarket',     or:'pt', x: -494, y:  500, r: 1.5, above:false, p:0.92 },
  // C3  PT  left=-153    right=88     bottom=930     gap to C2: 100 px
  { src:'images/braghouse my brags.png',       slug:'braghouse',      or:'pt', x: -153, y:  480, r:-1.0, above:true,  p:1.08 },
  // C4  PT  left=188     right=429    bottom=960     gap to C3: 100 px
  { src:'images/viju collections app.png',     slug:'viju-streaming', or:'pt', x:  188, y:  510, r: 2.0, above:true,  p:1.08 },
  // C5  LS  left=529     right=1335   bottom=1030    gap to C4: 100 px
  { src:'images/vijucms movies list.png',      slug:'viju-cms',       or:'ls', x:  529, y:  460, r:-1.5, above:false, p:0.92 },

  // ── Band D ────────────────────────────────────────────────────────────────
  // (top=1150, gap to Band C LS max bottom=1030: 120 px ✓)
  // D1  PT  left=-1200   right=-959
  { src:'images/viju playlist app.png',        slug:'viju-streaming', or:'pt', x:-1200, y: 1170, r: 1.0, above:false, p:0.92 },
  // D2  PT  left=-800    right=-559   gap to D1: 159 px
  { src:'images/megamarket try on app.png',    slug:'megamarket',     or:'pt', x: -800, y: 1150, r:-2.0, above:false, p:0.92 },
  // D3  LS  left=-350    right=456    gap to D2: 209 px
  { src:'images/sbermarket profile managment.png', slug:'sbermarket', or:'ls', x: -350, y: 1180, r: 1.5, above:false, p:0.92 },
  // D4  PT  left=600     right=841    gap to D3: 144 px
  { src:'images/braghouse favorite games.png', slug:'braghouse',      or:'pt', x:  600, y: 1160, r:-1.0, above:false, p:0.92 },
  // D5  PT  left=1000    right=1241   gap to D4: 159 px
  { src:'images/sbermarket list.png',          slug:'sbermarket',     or:'pt', x: 1000, y: 1150, r: 2.0, above:false, p:0.92 },
];
