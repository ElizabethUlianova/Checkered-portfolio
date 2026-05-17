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
    'images/megamarket main.png',
    'images/megamarket web main.png',
    'images/megamarket item.png',
    'images/megamarket listing.png',
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
  { src:'images/megamarket item.png',              slug:'megamarket',     w: 327, h:610, x:-1675, y:-4025, r:-1.5, d:0.04, above:true  },
  { src:'images/viju movie page tv.png',           slug:'viju-streaming', w:1078, h:720, x:-1148, y:-4080, r: 1.0, d:0.04, above:false },
  { src:'images/braghouse made a brag.png',        slug:'braghouse',      w: 327, h:610, x:  130, y:-4025, r: 2.0, d:0.04, above:true  },
  { src:'images/sbermarket list.png',              slug:'sbermarket',     w:1018, h:720, x:  657, y:-4080, r:-1.0, d:0.04, above:false },

  // ==== Line 2  (even +400, y_c=-2800) =======================================
  { src:'images/vijucms edit movie.png',           slug:'viju-cms',       w:1018, h:720, x: -636, y:-3160, r: 1.5, d:0.03, above:false },
  { src:'images/megamarket main.png',              slug:'megamarket',     w: 327, h:610, x:  582, y:-3105, r:-2.0, d:0.03, above:true  },
  { src:'images/megamarket main bty.png',          slug:'megamarket',     w: 327, h:610, x: 1109, y:-3105, r: 1.0, d:0.03, above:false },

  // ==== Line 3  (odd, centered, y_c=-1880) ===================================
  { src:'images/viju collections app.png',         slug:'viju-streaming', w: 327, h:610, x:-2172, y:-2185, r:-1.5, d:0.02, above:true  },
  { src:'images/megamarket listing.png',           slug:'megamarket',     w: 327, h:610, x:-1645, y:-2185, r: 1.0, d:0.02, above:false },
  { src:'images/viju kinom playlist.png',          slug:'viju-streaming', w:1018, h:720, x:-1118, y:-2240, r: 2.0, d:0.02, above:true  },
  { src:'images/braghouse my brags.png',           slug:'braghouse',      w: 327, h:610, x:  100, y:-2185, r:-1.0, d:0.02, above:false },
  { src:'images/vijucms movies list.png',          slug:'viju-cms',       w:1018, h:720, x:  627, y:-2240, r: 1.5, d:0.02, above:true  },
  { src:'images/viju playlist app.png',            slug:'viju-streaming', w: 327, h:610, x: 1845, y:-2185, r:-2.0, d:0.02, above:false },

  // ==== Line 4  (even +400, y_c=-960) ========================================
  { src:'images/megamarket try on app.png',        slug:'megamarket',     w: 327, h:610, x: -373, y:-1265, r: 1.0, d:0.015, above:true  },
  { src:'images/sbermarket profile.png',           slug:'sbermarket',     w:1018, h:720, x:  154, y:-1320, r:-1.5, d:0.015, above:false },

  // ==== CENTER  (y_c=-180, above hero text) ===================================
  { src:'images/viju create a kinom app.png',      slug:'viju-streaming', w: 726, h:440, x: -363, y: -400, r:-2.0, d:0.01,  above:true  },

  // ==== Line 5  (odd, centered, y_c=600) =====================================
  { src:'images/megamarket try on web.png',        slug:'megamarket',     w:1018, h:720, x:-1645, y:  240, r: 1.5, d:0.015, above:false },
  { src:'images/viju movie page app.png',          slug:'viju-streaming', w: 327, h:610, x: -700, y: -450, r:-1.0, d:0.015, above:true  },
  { src:'images/megamarket web main.png',          slug:'megamarket',     w:1018, h:720, x:  400, y: -240, r: 2.0, d:0.015, above:false },
  { src:'images/braghouse one type of tokens.png', slug:'braghouse',      w: 327, h:610, x: 1318, y:  295, r:-1.5, d:0.015, above:true  },

  // ==== Line 6  (even +400, y_c=1520) ========================================
  { src:'images/vijucms edit image.png',           slug:'viju-cms',       w:1018, h:720, x: -900, y: 1160, r: 1.0, d:0.02,  above:false },
  { src:'images/megamarket lookbook.png',          slug:'megamarket',     w: 327, h:610, x:  318, y:  240, r:-2.0, d:0.02,  above:true  },
  { src:'images/megamarket my size.png',           slug:'megamarket',     w: 327, h:610, x:  845, y: 1215, r: 1.5, d:0.02,  above:false },
  { src:'images/braghouse favorite genres.png',    slug:'braghouse',      w: 327, h:610, x: 1372, y: 1215, r:-1.0, d:0.02,  above:true  },

  // ==== Line 7  (odd, centered, y_c=2440) ====================================
  { src:'images/megamarket brands.png',            slug:'megamarket',     w: 327, h:610, x:-1300, y: 2135, r: 2.0, d:0.03,  above:false },
  { src:'images/braghouse posts.png',              slug:'braghouse',      w: 327, h:610, x: -773, y: 2135, r:-1.5, d:0.03,  above:true  },
  { src:'images/megamarket main fsh.png',          slug:'megamarket',     w: 327, h:610, x: -246, y: 2135, r: 1.0, d:0.03,  above:false },
  { src:'images/vijucms edit kinom.png',           slug:'viju-cms',       w:1018, h:720, x:  281, y: 2080, r:-2.0, d:0.03,  above:true  },

  // ==== Line 8  (even +400, y_c=3360) ========================================
  { src:'images/sbermarket scheme.png',            slug:'sbermarket',     w:1018, h:720, x:-1772, y: 3000, r: 1.5, d:0.04,  above:false },
  { src:'images/megamarket post purchase.png',     slug:'megamarket',     w: 327, h:610, x: -554, y: 3055, r:-1.0, d:0.04,  above:true  },
  { src:'images/sbermarket profile managment.png', slug:'sbermarket',     w:1018, h:720, x:  -27, y: 3000, r: 2.0, d:0.04,  above:false },
  { src:'images/megamarket size guide.png',        slug:'megamarket',     w: 327, h:610, x: 1191, y: 3055, r:-1.5, d:0.04,  above:true  },
  { src:'images/braghouse favorite games.png',     slug:'braghouse',      w: 327, h:610, x: 1718, y: 3055, r: 1.0, d:0.04,  above:false },
  { src:'images/megamarket makeup idea.png',       slug:'megamarket',     w: 327, h:610, x: 2245, y: 3055, r:-2.0, d:0.04,  above:true  },
];
