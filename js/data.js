// --- Projects ----------------------------------------------------------------
const PROJECTS = [
  { slug: 'megamarket',    label: 'megamarket',  type: 'marketplace', model: 'b2c' },
  { slug: 'avito',         label: 'avito',       type: 'classified',  model: 'b2c' },
  { slug: 'viju-streaming',label: 'viju',        type: 'streaming',   model: 'b2c' },
  { slug: 'viju-cms',      label: 'viju',        type: 'cms',         model: 'b2b' },
  { slug: 'braghouse',     label: 'brag house',  type: 'streaming',   model: 'b2c' },
  { slug: 'sbermarket',    label: 'sbermarket',  type: 'hrms',        model: 'b2b' },
];

// --- All images per project (project detail page) ----------------------------
const PROJECT_IMAGES = {
  megamarket: [
    'images/megamarket web main.png',      // default hero
    'images/megamarket main.png',          // row 1
    'images/megamarket item.png',          // row 1
    'images/megamarket listing.png',       // row 2
    'images/megamarket post purchase.png', // row 2
    'images/megamarket main fsh.png',      // row 3
    'images/megamarket lookbook.png',      // row 3
    'images/megamarket size guide.png',    // row 4
    'images/megamarket my size.png',       // row 4
    'images/megamarket main bty.png',      // row 5
    'images/megamarket brands.png',        // row 5
    'images/megamarket try on web.png',    // row 6 (landscape)
    'images/megamarket try on app.png',    // row 7
    'images/megamarket makeup idea.png',   // row 7
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

// --- Text blocks per project (overview / details / more) ---------------------
const PROJECT_TEXT = {
  megamarket: {
    overview: {
      heading: 'overview',
      body: "It's a multi-category marketplace🛒. Before I joined, every category followed the same generic product-list approach with no real shopping experience. I led the design for the fashion vertical — building it from scratch into a dedicated fashion destination with editorial content, outfit inspiration, brand storytelling, and personalised recommendations. My work helped grow the category from near-zero to a meaningful share of GMV.",
    },
    details: {
      heading: 'details',
      body: "The marketplace transformation began with a deep audit of the existing user experience and business model. I mapped the full customer journey across discovery, browsing, and purchase — identifying friction points and missed opportunities. Working closely with product managers, analysts, and engineers, I redesigned the core shopping flows: category pages, product cards, and checkout. Each iteration was validated with user research and A/B testing, ensuring design decisions were grounded in real behaviour.",
    },
    more: {
      heading: 'more about it',
      body: "When I joined the Megamarket team, the design processes were slow and unstructured. I introduced a component-based design system that cut delivery time significantly and gave engineers a reliable source of truth. I also ran weekly design critiques, brought in usability testing as a standard practice, and mentored two junior designers. Beyond shipping product, I helped shift how the team thought about design — from pixel-pushing to strategic problem-solving.",
    },
  },
  avito: {
    overview: { heading: 'overview', body: '' },
    details:  { heading: 'details',  body: '' },
    more:     { heading: 'more about it', body: '' },
  },
  'viju-streaming': {
    overview: { heading: 'overview', body: '' },
    details:  { heading: 'details',  body: '' },
    more:     { heading: 'more about it', body: '' },
  },
  'viju-cms': {
    overview: { heading: 'overview', body: '' },
    details:  { heading: 'details',  body: '' },
    more:     { heading: 'more about it', body: '' },
  },
  braghouse: {
    overview: { heading: 'overview', body: '' },
    details:  { heading: 'details',  body: '' },
    more:     { heading: 'more about it', body: '' },
  },
  sbermarket: {
    overview: { heading: 'overview', body: '' },
    details:  { heading: 'details',  body: '' },
    more:     { heading: 'more about it', body: '' },
  },
};

// --- Scene layout: 34 images, 8 staggered rows + 1 center image ---------------
//
// Layout per reference schematic (left-to-right, top-to-bottom):
//   Line 1: megamarket item, viju movie page tv, braghouse made a brag, sbermarket list
//   Line 2: vijucms edit movie, megamarket main, megamarket main bty
//   Line 3: viju collections app, megamarket listing, viju kinom playlist,
//           braghouse my brags, vijucms movies list, viju playlist app
//   Line 4: megamarket try on app, sbermarket profile
//   CENTER: viju create a kinom app (above hero text)
//   Line 5: megamarket try on web, viju movie page app, megamarket web main,
//           braghouse one type of tokens
//   Line 6: vijucms edit image, megamarket lookbook, megamarket my size,
//           braghouse favorite genres
//   Line 7: megamarket brands, braghouse posts, megamarket main fsh,
//           vijucms edit kinom
//   Line 8: sbermarket scheme, megamarket post purchase, sbermarket profile managment,
//           megamarket size guide, braghouse favorite games, megamarket makeup idea
//
// Row centers at: -3720, -2800, -1880, -960, -180(kinom), 600, 1520, 2440, 3360
// Odd rows centered; even rows +400px stagger.
// 200px gap between all image pairs (verified, 0 violations).
//
// Heights: 720px = sbermarket/vijucms/viju kinom playlist/viju movie page tv/
//                   megamarket web main/megamarket try on web
//          440px = viju create a kinom app
//          610px = all other megamarket/viju/braghouse
//
// x, y  = offset from VIEWPORT CENTRE to image TOP-LEFT (px at scale 1)
// w, h  = image size at scale 1
// r     = rotation degrees
// d     = parallax depth factor
// above = true -> z-index above hero text

const SCENE_IMAGES = [

  // ==== Line 1  (odd, centered, y_c=-3720) ===================================
  { src:'images/megamarket item.png',              slug:'megamarket',     w: 327, h:610, x:-2000, y:-4200, r:-1.5, d:0.04, above:true  },
  { src:'images/viju movie page tv.png',           slug:'viju-streaming', w:1078, h:720, x:-1300, y:-3880, r: 1.0, d:0.04, above:false },
  { src:'images/braghouse made a brag.png',        slug:'braghouse',      w: 327, h:610, x:  300, y:-4200, r: 2.0, d:0.04, above:true  },
  { src:'images/sbermarket list.png',              slug:'sbermarket',     w:1018, h:720, x: 1500, y:-4150, r:-1.0, d:0.04, above:false },

  // ==== Line 2  (even +400, y_c=-2800) =======================================
  { src:'images/vijucms edit movie.png',           slug:'viju-cms',       w:1018, h:720, x:-2200, y:-3050, r: 1.5, d:0.03, above:false },
  { src:'images/megamarket main.png',              slug:'megamarket',     w: 327, h:610, x: -100, y:-3105, r:-2.0, d:0.03, above:true  },
  { src:'images/megamarket main bty.png',          slug:'megamarket',     w: 327, h:610, x:  900, y:-3400, r: 1.0, d:0.03, above:false },

  // ==== Line 3  (odd, centered, y_c=-1880) ===================================
  { src:'images/viju collections app.png',         slug:'viju-streaming', w: 327, h:610, x:-2172, y:-2185, r:-1.5, d:0.02, above:true  },
  { src:'images/megamarket listing.png',           slug:'megamarket',     w: 327, h:610, x:-1000, y:-2650, r: 1.0, d:0.02, above:false },
  { src:'images/viju kinom playlist.png',          slug:'viju-streaming', w:1018, h:720, x: -820, y:-1900, r: 2.0, d:0.02, above:true  },
  { src:'images/braghouse my brags.png',           slug:'braghouse',      w: 327, h:610, x:  700, y:-2400, r:-1.0, d:0.02, above:false },
  { src:'images/vijucms movies list.png',          slug:'viju-cms',       w:1018, h:720, x: 1800, y:-3100, r: 1.5, d:0.02, above:true  },
  { src:'images/viju playlist app.png',            slug:'viju-streaming', w: 327, h:610, x: 2075, y:-2125, r:-2.0, d:0.02, above:false },

  // ==== Line 4  (even +400, y_c=-960) ========================================
  { src:'images/megamarket try on app.png',        slug:'megamarket',     w: 327, h:610, x:   50, y:-1150, r: 1.0, d:0.015, above:true  },
  { src:'images/sbermarket profile.png',           slug:'sbermarket',     w:1018, h:720, x: 1150, y:-1170, r:-1.5, d:0.015, above:false },

  // ==== CENTER  (y_c=-180, above hero text) ===================================
  { src:'images/viju create a kinom app.png',      slug:'viju-streaming', w: 726, h:440, x:-1870, y:-1050, r:-2.0, d:0.01,  above:true  },

  // ==== Line 5  (odd, centered, y_c=600) =====================================
  { src:'images/megamarket try on web.png',        slug:'megamarket',     w:1018, h:720, x:-2100, y:  240, r: 1.5, d:0.015, above:false },
  { src:'images/viju movie page app.png',          slug:'viju-streaming', w: 327, h:610, x: -800, y: -450, r:-1.0, d:0.015, above:true  },
  { src:'images/megamarket web main.png',          slug:'megamarket',     w:1018, h:720, x:  300, y: -240, r: 2.0, d:0.015, above:false },
  { src:'images/braghouse one type of tokens.png', slug:'braghouse',      w: 327, h:610, x: 2050, y:   70, r:-1.5, d:0.015, above:true  },

  // ==== Line 6  (even +400, y_c=1520) ========================================
  { src:'images/vijucms edit image.png',           slug:'viju-cms',       w:1018, h:720, x:-1050, y: 1100, r: 1.0, d:0.02,  above:false },
  { src:'images/megamarket lookbook.png',          slug:'megamarket',     w: 327, h:610, x: -300, y:  350, r:-2.0, d:0.02,  above:true  },
  { src:'images/megamarket my size.png',           slug:'megamarket',     w: 327, h:610, x:  845, y:  700, r: 1.5, d:0.02,  above:false },
  { src:'images/braghouse favorite genres.png',    slug:'braghouse',      w: 327, h:610, x: 2000, y: 1100, r:-1.0, d:0.02,  above:true  },

  // ==== Line 7  (odd, centered, y_c=2440) ====================================
  { src:'images/megamarket brands.png',            slug:'megamarket',     w: 327, h:610, x:-2175, y: 1360, r: 2.0, d:0.03,  above:false },
  { src:'images/braghouse posts.png',              slug:'braghouse',      w: 327, h:610, x:-2000, y: 2400, r:-1.5, d:0.03,  above:true  },
  { src:'images/megamarket main fsh.png',          slug:'megamarket',     w: 327, h:610, x: -996, y: 1985, r: 1.0, d:0.03,  above:false },
  { src:'images/vijucms edit kinom.png',           slug:'viju-cms',       w:1018, h:720, x:  400, y: 1600, r:-2.0, d:0.03,  above:true  },

  // ==== Line 8  (even +400, y_c=3360) ========================================
  { src:'images/sbermarket scheme.png',            slug:'sbermarket',     w:1018, h:720, x:-2300, y: 3270, r: 1.5, d:0.04,  above:false },
  { src:'images/megamarket post purchase.png',     slug:'megamarket',     w: 327, h:610, x: -925, y: 2900, r:-1.0, d:0.04,  above:true  },
  { src:'images/sbermarket profile managment.png', slug:'sbermarket',     w:1018, h:720, x:  -27, y: 2720, r: 2.0, d:0.04,  above:false },
  { src:'images/megamarket size guide.png',        slug:'megamarket',     w: 327, h:610, x: 1191, y: 3200, r:-1.5, d:0.04,  above:true  },
  { src:'images/braghouse favorite games.png',     slug:'braghouse',      w: 327, h:610, x: 2318, y: 2600, r: 1.0, d:0.04,  above:false },
  { src:'images/megamarket makeup idea.png',       slug:'megamarket',     w: 327, h:610, x: 1700, y: 2135, r:-2.0, d:0.04,  above:true  },
];
