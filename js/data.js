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

// ─── Scene layout for main page ──────────────────────────────────────────────
// x, y   = left / top as % of viewport  (image top-left corner)
// r      = rotation in degrees
// above  = true → z-index above hero text, false → below
// p      = parallax strength (higher = moves more = feels closer)
// or     = 'pt' portrait (155×290) | 'ls' landscape (275×192)
const SCENE_IMAGES = [
  // ── Left column ──────────────────────────────────────────────────
  { src:'images/megamarket web main.png',      slug:'megamarket',     or:'ls', x: 1,  y: 5,  r:-1.5, above:false, p:0.50 },
  { src:'images/megamarket item.png',          slug:'megamarket',     or:'pt', x: 4,  y:36,  r: 2.0, above:true,  p:1.20 },
  { src:'images/megamarket listing.png',       slug:'megamarket',     or:'pt', x: 1,  y:65,  r:-1.0, above:false, p:0.60 },

  // ── Upper-left ────────────────────────────────────────────────────
  { src:'images/megamarket lookbook.png',      slug:'megamarket',     or:'pt', x:13,  y: 7,  r: 1.5, above:true,  p:1.00 },
  { src:'images/braghouse made a brag.png',    slug:'braghouse',      or:'pt', x:23,  y: 2,  r:-1.0, above:false, p:0.70 },

  // ── Lower-left ────────────────────────────────────────────────────
  { src:'images/megamarket try on app.png',    slug:'megamarket',     or:'pt', x:15,  y:72,  r: 2.0, above:true,  p:1.10 },
  { src:'images/megamarket main.png',          slug:'megamarket',     or:'ls', x: 3,  y:84,  r:-2.0, above:false, p:0.50 },

  // ── Top centre ───────────────────────────────────────────────────
  { src:'images/braghouse posts.png',          slug:'braghouse',      or:'pt', x:32,  y: 1,  r: 1.0, above:false, p:0.80 },
  { src:'images/sbermarket profile.png',       slug:'sbermarket',     or:'pt', x:47,  y: 1,  r:-2.0, above:false, p:0.60 },
  { src:'images/viju movie page tv.png',       slug:'viju-streaming', or:'ls', x:58,  y: 4,  r: 1.0, above:false, p:0.50 },

  // ── Bottom centre ────────────────────────────────────────────────
  { src:'images/vijucms edit kinom.png',       slug:'viju-cms',       or:'ls', x:27,  y:79,  r: 2.0, above:false, p:0.60 },
  { src:'images/braghouse my brags.png',       slug:'braghouse',      or:'pt', x:38,  y:83,  r:-1.0, above:true,  p:1.00 },
  { src:'images/vijucms movies list.png',      slug:'viju-cms',       or:'ls', x:56,  y:80,  r:-1.5, above:false, p:0.50 },

  // ── Upper-right ───────────────────────────────────────────────────
  { src:'images/vijucms edit movie.png',       slug:'viju-cms',       or:'ls', x:79,  y: 2,  r:-1.0, above:false, p:0.60 },
  { src:'images/viju movie page app.png',      slug:'viju-streaming', or:'pt', x:75,  y:12,  r: 2.0, above:true,  p:1.00 },

  // ── Right column ──────────────────────────────────────────────────
  { src:'images/sbermarket scheme.png',        slug:'sbermarket',     or:'ls', x:83,  y:27,  r:-2.0, above:false, p:0.70 },
  { src:'images/viju collections app.png',     slug:'viju-streaming', or:'pt', x:82,  y:47,  r: 1.5, above:true,  p:1.20 },

  // ── Lower-right ───────────────────────────────────────────────────
  { src:'images/viju playlist app.png',        slug:'viju-streaming', or:'pt', x:70,  y:68,  r:-1.0, above:false, p:0.70 },
  { src:'images/sbermarket list.png',          slug:'sbermarket',     or:'pt', x:86,  y:70,  r: 2.0, above:true,  p:1.10 },
  { src:'images/braghouse favorite games.png', slug:'braghouse',      or:'pt', x:57,  y:86,  r:-2.0, above:false, p:0.60 },
];
