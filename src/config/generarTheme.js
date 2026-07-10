/* ============================================
   UTILIDADES DE COLOR
   ============================================ */

/* Convierte HSL (hue, saturation, lightness) a HEX (#rrggbb) */
function hslToHex(hue, saturation, lightness) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;

  let red, green, blue;

  if (saturation === 0) {
    red = green = blue = lightness;
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;

    red   = hueToRgb(p, q, hue + 1/3);
    green = hueToRgb(p, q, hue);
    blue  = hueToRgb(p, q, hue - 1/3);
  }

  const toHex = (channel) =>
    Math.round(channel * 255).toString(16).padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

/* Separa un HEX en sus componentes R, G, B (0-255) */
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/* Limita un valor entre min y max */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* Genera un entero aleatorio entre min y max (inclusive) */
function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/* Verifica si una palabra aparece como palabra completa en un texto */
function hasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = "\\b" + escaped + "\\b";
  return new RegExp(pattern, "i").test(text);
}

/* ============================================
   MAPA DE COLORES — 40+ colores con sus HSL base
   Cada entrada asocia palabras clave a un tono (h),
   saturación (s) y luminosidad (l) de referencia.
   ============================================ */

const COLOR_MAP = [
  { keywords: ["rojo", "red", "escarlata", "scarlet", "cereza", "cherry", "carmesí", "crimson", "sangre", "blood"], h: 0, s: 85, l: 50 },
  { keywords: ["vino", "wine", "borgoña", "burgundy", "granate", "maroon", "burdeos", "bordeaux"], h: 350, s: 75, l: 35 },
  { keywords: ["rojo ladrillo", "brick red", "ladrillo", "brick", "terracota", "terracotta"], h: 10, s: 70, l: 45 },
  { keywords: ["naranja", "orange", "mandarina", "tangerine", "calabaza", "pumpkin"], h: 30, s: 90, l: 50 },
  { keywords: ["ámbar", "amber", "miel", "honey"], h: 40, s: 90, l: 55 },
  { keywords: ["amarillo", "yellow", "limón", "lemon", "canario", "canary"], h: 55, s: 90, l: 50 },
  { keywords: ["dorado", "gold", "mostaza", "mustard", "dorado viejo", "old gold"], h: 45, s: 85, l: 55 },
  { keywords: ["verde", "green", "verde bosque", "forest green"], h: 140, s: 80, l: 45 },
  { keywords: ["verde menta", "mint", "menta", "verde agua", "aqua green"], h: 160, s: 70, l: 55 },
  { keywords: ["verde oliva", "olive", "oliva", "verde militar", "military green"], h: 80, s: 50, l: 40 },
  { keywords: ["esmeralda", "emerald", "verde esmeralda"], h: 150, s: 85, l: 45 },
  { keywords: ["lima", "lime", "verde lima"], h: 110, s: 85, l: 50 },
  { keywords: ["turquesa", "turquoise", "aguamarina", "aquamarine"], h: 180, s: 80, l: 50 },
  { keywords: ["cian", "cyan", "verde azulado", "teal", "azul verdoso"], h: 190, s: 80, l: 45 },
  { keywords: ["azul", "blue", "azul cielo", "sky blue", "celeste", "sky", "azul claro", "light blue"], h: 210, s: 80, l: 55 },
  { keywords: ["azul marino", "navy", "marino", "azul oscuro", "dark blue", "azul profundo", "deep blue"], h: 220, s: 70, l: 25 },
  { keywords: ["azul eléctrico", "electric blue", "eléctrico", "electric"], h: 230, s: 90, l: 55 },
  { keywords: ["océano", "ocean", "azul océano", "mar", "sea", "azul mar"], h: 215, s: 75, l: 45 },
  { keywords: ["violeta", "violet", "morado", "purple", "púrpura", "púrpura real", "royal purple"], h: 280, s: 80, l: 50 },
  { keywords: ["lavanda", "lavender", "lila", "lilac", "malva", "mauve"], h: 270, s: 50, l: 70 },
  { keywords: ["índigo", "indigo", "añil", "violeta oscuro", "dark violet"], h: 260, s: 80, l: 35 },
  { keywords: ["magenta", "fucsia", "fuchsia"], h: 300, s: 85, l: 55 },
  { keywords: ["rosa", "pink", "rosado", "coral", "salmón", "salmon", "flamenco", "flamingo"], h: 340, s: 80, l: 55 },
  { keywords: ["rosa pastel", "pastel pink", "rosa claro", "light pink", "rosa bebé", "baby pink"], h: 350, s: 40, l: 80 },
  { keywords: ["marrón", "brown", "café", "coffee", "marrón chocolate", "chocolate brown", "chocolate"], h: 30, s: 60, l: 35 },
  { keywords: ["marrón claro", "light brown", "beige", "caramelo", "caramel", "canela", "cinnamon"], h: 30, s: 50, l: 60 },
  { keywords: ["caqui", "khaki", "arena", "sand", "beige arena"], h: 45, s: 40, l: 65 },
  { keywords: ["gris", "gray", "grey", "plateado", "silver", "gris claro", "light gray"], h: 0, s: 0, l: 50 },
  { keywords: ["gris perla", "pearl gray", "perla", "pearl"], h: 0, s: 0, l: 75 },
  { keywords: ["gris oscuro", "dark gray", "carbón", "charcoal", "pizarra", "slate"], h: 0, s: 0, l: 25 },
  { keywords: ["negro", "black", "ébano", "ebony", "obsidiana", "obsidian", "carbón", "carbon"], h: 0, s: 0, l: 10 },
  { keywords: ["blanco", "white", "marfil", "ivory", "hueso", "bone", "crema", "cream", "alabastro", "alabaster", "blanco roto", "off white"], h: 0, s: 0, l: 95 },
  { keywords: ["berenjena", "eggplant", "ciruela", "plum"], h: 310, s: 60, l: 35 },
  { keywords: ["rubí", "ruby", "rojo rubí"], h: 345, s: 85, l: 45 },
  { keywords: ["topacio", "topaz"], h: 35, s: 80, l: 55 },
  { keywords: ["arena", "sand", "duna", "dune", "playa", "beach sand"], h: 40, s: 35, l: 70 },
];

/* ============================================
   MAPA DE ESTILOS — define el modo lumínico
   Según las palabras clave, se elige si la paleta
   será oscura, clara, pastel, neón, etc.
   ============================================ */

const STYLE_MAP = [
  { keywords: ["oscuro", "dark", "nocturno", "night", "profundo", "deep", "sobrio", "negro", "black", "ébano", "ebony", "marino", "navy", "noche", "midnight"], mode: "dark" },
  { keywords: ["claro", "light", "minimalista", "minimalist", "blanco", "white", "brillante", "bright", "luminoso", "luminous", "diáfano", "diaphanous"], mode: "light" },
  { keywords: ["pastel", "suave", "soft", "dulce", "sweet", "lavanda", "lavender", "bebé", "baby"], mode: "pastel" },
  { keywords: ["neón", "neon", "cyberpunk", "eléctrico", "electric", "vibrante", "vibrant", "llamativo", "striking", "fosforescente", "fluorescent"], mode: "neon" },
  { keywords: ["vintage", "retro", "rústico", "rustic", "antiguo", "old", "clásico", "classic", "desgastado", "worn"], mode: "warm" },
  { keywords: ["lujo", "luxury", "elegante", "elegant", "premium", "royal", "realeza", "sofisticado", "sophisticated", "opulento", "opulent"], mode: "luxury" },
  { keywords: ["tropical", "playa", "beach", "veraniego", "summery", "caribe", "caribbean", "calor", "heat", "exótico", "exotic"], mode: "tropical" },
  { keywords: ["frío", "cold", "invierno", "winter", "hielo", "ice", "polar", "glacial", "ártico", "arctic", "congelado", "frozen"], mode: "cool" },
  { keywords: ["monocromático", "monochrome", "escala de grises", "grayscale", "blanco y negro", "black and white"], mode: "mono" },
  { keywords: ["naturaleza", "nature", "bosque", "forest", "eco", "orgánico", "organic", "tierra", "earthy", "natural", "jardín", "garden"], mode: "nature" },
  { keywords: ["otoño", "autumn", "fall", "cosecha", "harvest", "marrón", "marron", "cálido", "warm"], mode: "autumn" },
  { keywords: ["primavera", "spring", "floral", "flores", "flowers"], mode: "spring" },
];

/* ============================================
   MAPA TEMÁTICO — contextos que definen una
   paleta completa de 3 colores semilla + estilo
   Ej: "playa" → turquesa, arena, azul marino
   ============================================ */

const THEMATIC_MAP = [
  {
    keywords: ["playa", "beach", "tropical", "caribe", "caribbean", "verano", "summer", "vacaciones", "vacation", "arena", "sand", "mar", "sea", "océano", "ocean", "costero", "coastal"],
    colors: [
      { h: 200, s: 65, l: 50 }, { h: 40, s: 45, l: 70 }, { h: 180, s: 60, l: 45 },
    ],
    style: "tropical",
  },
  {
    keywords: ["cyberpunk", "synthwave", "futurista", "futuristic", "techno", "digital", "videojuego", "video game", "retro futurista", "outrun"],
    colors: [
      { h: 300, s: 100, l: 55 }, { h: 200, s: 100, l: 55 }, { h: 340, s: 100, l: 55 },
    ],
    style: "neon",
  },
  {
    keywords: ["naturaleza", "nature", "bosque", "forest", "selva", "jungle", "jungla", "verde", "green", "jardín", "garden", "campo", "field", "prado", "meadow", "eco"],
    colors: [
      { h: 140, s: 70, l: 40 }, { h: 90, s: 50, l: 45 }, { h: 30, s: 40, l: 50 },
    ],
    style: "nature",
  },
  {
    keywords: ["atardecer", "sunset", "ocaso", "dusk", "crepúsculo", "twilight", "anochecer", "anaranjado", "dorado", "golden hour"],
    colors: [
      { h: 20, s: 85, l: 55 }, { h: 340, s: 70, l: 45 }, { h: 50, s: 80, l: 55 },
    ],
    style: "warm",
  },
  {
    keywords: ["noche", "night", "nocturno", "midnight", "luna", "moon", "estrellado", "starry", "espacio", "space", "universo", "universe", "astral"],
    colors: [
      { h: 240, s: 60, l: 15 }, { h: 220, s: 50, l: 25 }, { h: 280, s: 40, l: 30 },
    ],
    style: "dark",
  },
  {
    keywords: ["navidad", "christmas", "navideño", "diciembre", "december", "invierno", "winter", "nieve", "snow"],
    colors: [
      { h: 0, s: 85, l: 50 }, { h: 140, s: 80, l: 40 }, { h: 0, s: 0, l: 95 },
    ],
    style: "dark",
  },
  {
    keywords: ["fuego", "fire", "llama", "flame", "calor", "heat", "volcán", "volcano", "lava", "infierno", "hell"],
    colors: [
      { h: 10, s: 90, l: 55 }, { h: 30, s: 95, l: 50 }, { h: 50, s: 90, l: 50 },
    ],
    style: "dark",
  },
  {
    keywords: ["marina", "nautical", "náutico", "barco", "boat", "velero", "sail", "puerto", "harbor"],
    colors: [
      { h: 215, s: 70, l: 30 }, { h: 0, s: 0, l: 95 }, { h: 200, s: 60, l: 55 },
    ],
    style: "light",
  },
  {
    keywords: ["lujo", "luxury", "elegante", "elegant", "sofisticado", "sophisticated", "premium", "royal", "realeza", "rey", "king", "reina", "queen", "palacio", "palace", "clásico", "classic"],
    colors: [
      { h: 45, s: 80, l: 50 }, { h: 0, s: 0, l: 10 }, { h: 350, s: 60, l: 35 },
    ],
    style: "luxury",
  },
  {
    keywords: ["primavera", "spring", "floral", "flores", "flowers", "jardín", "garden", "cultivo", "bloom", "cherry blossom", "cerezo en flor"],
    colors: [
      { h: 340, s: 50, l: 75 }, { h: 100, s: 50, l: 55 }, { h: 50, s: 40, l: 70 },
    ],
    style: "spring",
  },
  {
    keywords: ["otoño", "autumn", "fall", "cosecha", "harvest", "hierba", "grass", "hojas", "leaves", "naranja", "orange", "marrón"],
    colors: [
      { h: 25, s: 70, l: 45 }, { h: 45, s: 65, l: 50 }, { h: 10, s: 60, l: 40 },
    ],
    style: "autumn",
  },
  {
    keywords: ["hielo", "ice", "frío", "cold", "polar", "glacial", "ártico", "arctic", "congelado", "frozen", "invierno", "winter", "escarcha", "frost"],
    colors: [
      { h: 200, s: 40, l: 85 }, { h: 220, s: 30, l: 75 }, { h: 190, s: 50, l: 60 },
    ],
    style: "cool",
  },
  {
    keywords: ["tech", "tecnología", "technology", "código", "code", "programación", "programming", "developer", "desarrollador", "software", "moderno", "modern", "minimalista", "minimalist"],
    colors: [
      { h: 220, s: 70, l: 50 }, { h: 0, s: 0, l: 10 }, { h: 200, s: 60, l: 45 },
    ],
    style: "dark",
  },
];

/* ============================================
   MAPA DE MODIFICADORES — ajustan saturación
   y luminosidad según adjetivos del prompt
   Ej: "brillante" → +15 sat, +5 light
   ============================================ */

const MODIFIER_MAP = [
  { keywords: ["brillante", "bright", "vibrante", "vibrant", "intenso", "intense", "vivo", "vivid", "fuerte", "strong"], satDelta: 15, lightDelta: 5 },
  { keywords: ["opaco", "opaque", "apagado", "dull", "sutil", "subtle", "suave", "soft", "tenue", "dim", "discreto", "discreet"], satDelta: -20, lightDelta: 5 },
  { keywords: ["pastel", "suave", "soft", "bajo", "low"], satDelta: -30, lightDelta: 15 },
  { keywords: ["saturado", "saturated", "puro", "pure"], satDelta: 15, lightDelta: 0 },
  { keywords: ["desaturado", "desaturated", "grisáceo", "greyish", "fade"], satDelta: -30, lightDelta: 0 },
  { keywords: ["oscuro", "dark", "profundo", "deep", "intenso", "intense"], satDelta: 0, lightDelta: -10 },
  { keywords: ["claro", "light", "luminoso", "luminous", "pálido", "pale"], satDelta: -10, lightDelta: 15 },
];

/* ============================================
   EXTRACCIÓN DE COLORES / ESTILOS / MODIFICADORES
   ============================================ */

/* Busca el primer tema contextual que coincida con el prompt */
function extractThemeFromPrompt(prompt) {
  const lower = prompt.toLowerCase();
  for (const theme of THEMATIC_MAP) {
    for (const keyword of theme.keywords) {
      if (hasWord(lower, keyword)) {
        return theme;
      }
    }
  }
  return null;
}

/* Extrae colores semilla del prompt:
   1) Si hay un tema contextual, usa sus colores predefinidos
   2) Si no, busca colores individuales separados por "y", "con" o ","
   3) Si no encuentra nada, genera un color aleatorio */
function extractAllColorsFromPrompt(prompt) {
  const lower = prompt.toLowerCase();
  const results = [];

  const thematic = extractThemeFromPrompt(prompt);
  if (thematic) {
    const colors = thematic.colors.map((c) => ({ h: c.h, s: c.s, l: c.l }));
    return { colors, style: thematic.style };
  }

  const separators = /\s+y\s+|\s+con\s+|,\s*/;
  const parts = lower.split(separators).filter(Boolean);
  const matchedWords = new Set();

  for (const part of parts) {
    let found = false;
    for (const color of COLOR_MAP) {
      const sortedByLength = [...color.keywords].sort(
        (a, b) => b.split(/\s+/).length - a.split(/\s+/).length
      );
      for (const keyword of sortedByLength) {
        if (hasWord(part, keyword)) {
          const keywordWords = keyword.toLowerCase().split(/\s+/);
          if (keywordWords.some((w) => matchedWords.has(w))) continue;
          keywordWords.forEach((w) => matchedWords.add(w));
          results.push({
            h: clamp(color.h + randomBetween(-8, 8), 0, 360),
            s: clamp(color.s + randomBetween(-8, 8), 10, 100),
            l: clamp(color.l + randomBetween(-8, 8), 5, 95),
          });
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }

  /* Si no encontró nada por partes, busca en todo el prompt */
  if (results.length === 0) {
    for (const color of COLOR_MAP) {
      for (const keyword of color.keywords) {
        if (hasWord(lower, keyword)) {
          results.push({
            h: clamp(color.h + randomBetween(-8, 8), 0, 360),
            s: clamp(color.s + randomBetween(-8, 8), 10, 100),
            l: clamp(color.l + randomBetween(-8, 8), 5, 95),
          });
          return { colors: results, style: null };
        }
      }
    }
    /* Último recurso: color aleatorio */
    results.push({
      h: randomBetween(0, 360),
      s: randomBetween(40, 90),
      l: randomBetween(40, 60),
    });
  }

  return { colors: results, style: null };
}

/* Extrae el modo de estilo (dark, light, pastel, etc.) */
function extractStyleFromPrompt(prompt) {
  const lower = prompt.toLowerCase();
  for (const style of STYLE_MAP) {
    for (const keyword of style.keywords) {
      if (hasWord(lower, keyword)) {
        return style.mode;
      }
    }
  }
  return "neutral";
}

/* Extrae modificadores de saturación/luminosidad */
function extractModifiersFromPrompt(prompt) {
  const lower = prompt.toLowerCase();
  let satDelta = 0;
  let lightDelta = 0;

  for (const modifier of MODIFIER_MAP) {
    for (const keyword of modifier.keywords) {
      if (hasWord(lower, keyword)) {
        if (
          Math.abs(modifier.satDelta) > Math.abs(satDelta) ||
          (modifier.satDelta === satDelta && modifier.satDelta !== 0)
        ) {
          satDelta = modifier.satDelta;
        }
        if (Math.abs(modifier.lightDelta) > Math.abs(lightDelta)) {
          lightDelta = modifier.lightDelta;
        }
        break;
      }
    }
  }

  return { satDelta, lightDelta };
}

/* ============================================
   GENERADOR DE PALETA COMPLETA
   Toma los colores semilla + estilo + modificadores
   y genera los 13 colores del tema (background,
   surface, text, primary, success, etc.)
   ============================================ */

function generatePaletteFromPrompt(prompt) {
  const { colors: seedColors, style: thematicStyle } = extractAllColorsFromPrompt(prompt);
  const style = thematicStyle || extractStyleFromPrompt(prompt);
  const modifiers = extractModifiersFromPrompt(prompt);
  const primarySeed = seedColors[0];

  const baseHue = primarySeed.h;
  const baseSaturation = clamp(primarySeed.s + modifiers.satDelta, 10, 100);
  const baseLightness = primarySeed.l;

  const isSeedDark = baseLightness < 40;

  /* Determina la luminosidad del fondo según el estilo */
  const getBgLightness = (style) => {
    switch (style) {
      case "dark": return 10;
      case "light": return 96;
      case "pastel": return 97;
      case "neon": return 8;
      case "warm": return 93;
      case "luxury": return 12;
      case "tropical": return 95;
      case "cool": return 95;
      case "mono": return 94;
      case "nature": return 95;
      case "autumn": return 92;
      case "spring": return 97;
      default: return isSeedDark ? 12 : 95;
    }
  };

  /* Determina la luminosidad del texto según el estilo */
  const getTextLightness = (style) => {
    switch (style) {
      case "dark": return 92;
      case "light": return 12;
      case "pastel": return 32;
      case "neon": return 94;
      case "warm": return 20;
      case "luxury": return 92;
      case "tropical": return 20;
      case "cool": return 15;
      case "mono": return 15;
      case "nature": return 20;
      case "autumn": return 20;
      case "spring": return 28;
      default: return isSeedDark ? 92 : 15;
    }
  };

  /* Determina la saturación del color primario según el estilo */
  const getPrimarySaturation = (style) => {
    switch (style) {
      case "dark": return clamp(baseSaturation + 5, 50, 100);
      case "light": return clamp(baseSaturation - 5, 30, 75);
      case "pastel": return 35;
      case "neon": return 100;
      case "warm": return clamp(baseSaturation, 40, 65);
      case "luxury": return 70;
      case "tropical": return 85;
      case "cool": return 65;
      case "mono": return 0;
      case "nature": return clamp(baseSaturation, 40, 75);
      case "autumn": return clamp(baseSaturation, 45, 70);
      case "spring": return 45;
      default: return baseSaturation;
    }
  };

  /* Determina la luminosidad del color primario según el estilo */
  const getPrimaryLightness = (style) => {
    switch (style) {
      case "dark": return 58;
      case "light": return 48;
      case "pastel": return 68;
      case "neon": return 60;
      case "warm": return 42;
      case "luxury": return 52;
      case "tropical": return 52;
      case "cool": return 50;
      case "mono": return 48;
      case "nature": return 48;
      case "autumn": return 48;
      case "spring": return 58;
      default: return clamp(baseLightness + modifiers.lightDelta, 5, 95);
    }
  };

  const bgLightness = getBgLightness(style);
  const textLightness = getTextLightness(style);
  const primarySaturation = getPrimarySaturation(style);
  const primaryLightness = getPrimaryLightness(style);

  const isDarkStyle = style === "dark" || style === "neon" || style === "luxury" || style === "autumn";

  /* Genera cada color de la paleta */
  const background = hslToHex(baseHue, clamp(primarySaturation - 20, 0, 35), bgLightness);
  const backgroundSecondary = hslToHex(baseHue, clamp(primarySaturation - 15, 0, 30), bgLightness + (isDarkStyle ? 4 : -3));
  const surface = hslToHex(baseHue, clamp(primarySaturation - 10, 0, 25), bgLightness + (isDarkStyle ? 8 : -6));
  const surfaceHover = hslToHex(baseHue, clamp(primarySaturation - 5, 0, 25), bgLightness + (isDarkStyle ? 14 : -9));
  const text = hslToHex(baseHue, clamp(primarySaturation - 30, 0, 15), textLightness);
  const textSecondary = hslToHex(baseHue, clamp(primarySaturation - 25, 0, 10), textLightness + (isDarkStyle ? -30 : 30));
  const primary = hslToHex(baseHue, primarySaturation, primaryLightness);
  const primaryHover = hslToHex(baseHue, clamp(primarySaturation + 5, 0, 100), clamp(primaryLightness - 8, 5, 95));
  const border = hslToHex(baseHue, clamp(primarySaturation - 10, 0, 20), Math.round((bgLightness + textLightness) / 2));

  const success = hslToHex(150, clamp(primarySaturation - 10, 40, 80), textLightness > 50 ? 45 : 55);
  const warning = hslToHex(45, clamp(primarySaturation - 10, 40, 80), textLightness > 50 ? 50 : 60);
  const danger = hslToHex(5, clamp(primarySaturation, 40, 80), textLightness > 50 ? 50 : 55);

  const isDark = isDarkStyle || bgLightness < 30;
  const shadowOpacity = isDark ? "0.45" : "0.10";
  const primaryRGB = hexToRgb(primary);

  return {
    colors: {
      background,
      backgroundSecondary,
      surface,
      surfaceHover,
      text,
      textSecondary,
      primary,
      primaryHover,
      success,
      warning,
      danger,
      border,
      shadow: `0 8px 24px rgba(${primaryRGB.r},${primaryRGB.g},${primaryRGB.b},${shadowOpacity})`,
    },
  };
}

/* ============================================
   PALETAS TEMPLATE — 17 temas predefinidos
   Usado como último recurso si el generador
   algorítmico no produce colores
   ============================================ */

const PALETTE_TEMPLATES = [
  {
    keywords: ["oscuro", "dark", "neón", "neon", "cyberpunk", "nocturno", "night", "gamer", "futurista", "futuristic"],
    fontId: "unbounded",
    icon: "carbon",
    colors: {
      background: "#0A0A0F", backgroundSecondary: "#16161E", surface: "#1E1E2A", surfaceHover: "#2A2A3A",
      text: "#F0F0FF", textSecondary: "#9090B0", primary: "#FF2D95", primaryHover: "#E62080",
      success: "#00FF88", warning: "#FFD700", danger: "#FF4444", border: "#2A2A3A",
      shadow: "0 8px 24px rgba(0,0,0,.60)",
    },
  },
  {
    keywords: ["lujo", "luxury", "dorado", "gold", "elegante", "elegant", "premium", "clásico", "classic", "royal", "realeza"],
    fontId: "playfair",
    icon: "midnight",
    colors: {
      background: "#1A1510", backgroundSecondary: "#2A2218", surface: "#3A3020", surfaceHover: "#4A4030",
      text: "#F5F0E8", textSecondary: "#C0B090", primary: "#D4A84B", primaryHover: "#C49640",
      success: "#5CB85C", warning: "#F0AD4E", danger: "#D9534F", border: "#4A4030",
      shadow: "0 8px 24px rgba(0,0,0,.50)",
    },
  },
  {
    keywords: ["vintage", "retro", "café", "coffee", "marrón", "brown", "rústico", "rustic", "madera", "wood", "tierra", "earthy"],
    fontId: "dm-sans",
    icon: "forest",
    colors: {
      background: "#F5F0E8", backgroundSecondary: "#EDE5D8", surface: "#E0D5C5", surfaceHover: "#D4C5B0",
      text: "#3A3020", textSecondary: "#7A6A50", primary: "#8B6F47", primaryHover: "#7A5E3A",
      success: "#5CB85C", warning: "#F0AD4E", danger: "#D9534F", border: "#C5B8A8",
      shadow: "0 8px 24px rgba(139,111,71,.15)",
    },
  },
  {
    keywords: ["claro", "light", "minimalista", "blanco", "white", "limpio", "clean", "simple", "neutro", "neutral"],
    fontId: "inter",
    icon: "light",
    colors: {
      background: "#FAFAFA", backgroundSecondary: "#F0F0F0", surface: "#E8E8E8", surfaceHover: "#DDDDDD",
      text: "#1A1A1A", textSecondary: "#666666", primary: "#4A90D9", primaryHover: "#357ABD",
      success: "#27AE60", warning: "#F39C12", danger: "#E74C3C", border: "#DDDDDD",
      shadow: "0 8px 24px rgba(0,0,0,.06)",
    },
  },
  {
    keywords: ["menta", "mint", "verde", "green", "naturaleza", "nature", "bosque", "forest", "jungla", "jungle", "eco", "planta", "plant", "natural"],
    fontId: "sora",
    icon: "forest",
    colors: {
      background: "#F0FAF0", backgroundSecondary: "#E0F5E0", surface: "#D0EBD0", surfaceHover: "#C0E0C0",
      text: "#1A3A1A", textSecondary: "#4A7A4A", primary: "#2ECC71", primaryHover: "#27AE60",
      success: "#1ABC9C", warning: "#F1C40F", danger: "#E74C3C", border: "#B0D5B0",
      shadow: "0 8px 24px rgba(46,204,113,.12)",
    },
  },
  {
    keywords: ["océano", "ocean", "azul", "blue", "mar", "sea", "profundo", "deep", "agua", "water", "náutico", "nautical", "cielo", "sky"],
    fontId: "space-grotesk",
    icon: "arctic",
    colors: {
      background: "#0A1628", backgroundSecondary: "#0F1F3A", surface: "#15294A", surfaceHover: "#1A335A",
      text: "#E8F0FF", textSecondary: "#90B0D0", primary: "#3498DB", primaryHover: "#2980B9",
      success: "#1ABC9C", warning: "#F39C12", danger: "#E74C3C", border: "#1A335A",
      shadow: "0 8px 24px rgba(52,152,219,.25)",
    },
  },
  {
    keywords: ["lavanda", "lavender", "morado", "purple", "violeta", "violet", "magenta", "púrpura", "lila", "lilac", "uva", "grape"],
    fontId: "syne",
    icon: "dracula",
    colors: {
      background: "#F8F0FA", backgroundSecondary: "#F0E0F5", surface: "#E8D0EB", surfaceHover: "#DDC0E0",
      text: "#2A1A3A", textSecondary: "#6A4A7A", primary: "#9B59B6", primaryHover: "#8E44AD",
      success: "#27AE60", warning: "#F39C12", danger: "#E74C3C", border: "#D0B5D5",
      shadow: "0 8px 24px rgba(155,89,182,.15)",
    },
  },
  {
    keywords: ["ocaso", "sunset", "atardecer", "naranja", "orange", "cálido", "warm", "fuego", "fire", "llama", "flame", "verano", "summer"],
    fontId: "archivo",
    icon: "sunset",
    colors: {
      background: "#1A0E08", backgroundSecondary: "#2A180E", surface: "#3A2214", surfaceHover: "#4A2C1A",
      text: "#FFF0E8", textSecondary: "#D0A080", primary: "#E67E22", primaryHover: "#D35400",
      success: "#27AE60", warning: "#F1C40F", danger: "#E74C3C", border: "#4A2C1A",
      shadow: "0 8px 24px rgba(230,126,34,.30)",
    },
  },
  {
    keywords: ["rojo", "red", "coral", "escarlata", "scarlet", "cereza", "cherry", "vino", "wine", "borgoña", "burgundy", "pasión", "passion"],
    fontId: "archivo",
    icon: "sunset",
    colors: {
      background: "#1A0808", backgroundSecondary: "#2A0E0E", surface: "#3A1414", surfaceHover: "#4A1A1A",
      text: "#FFF0F0", textSecondary: "#D09090", primary: "#E74C3C", primaryHover: "#C0392B",
      success: "#2ECC71", warning: "#F39C12", danger: "#E74C3C", border: "#4A1A1A",
      shadow: "0 8px 24px rgba(231,76,60,.30)",
    },
  },
  {
    keywords: ["rosa", "pink", "romántico", "romantic", "suave", "soft", "pastel", "dulce", "sweet", "floral"],
    fontId: "dm-sans",
    icon: "sakura",
    colors: {
      background: "#FFF0F5", backgroundSecondary: "#FFE4EE", surface: "#FFD8E8", surfaceHover: "#FFC8DD",
      text: "#4A2040", textSecondary: "#8A6070", primary: "#E84393", primaryHover: "#D63384",
      success: "#20C997", warning: "#FAB005", danger: "#FA5252", border: "#F0C0D0",
      shadow: "0 8px 24px rgba(232,67,147,.12)",
    },
  },
  {
    keywords: ["tropical", "playa", "beach", "caribe", "caribbean", "veraniego", "summery", "brillante", "bright", "vibrante", "vibrant", "colorido", "colorful"],
    fontId: "sora",
    icon: "light",
    colors: {
      background: "#FFF5E6", backgroundSecondary: "#FFF0D6", surface: "#FFE8C0", surfaceHover: "#FFDCA8",
      text: "#1A2A1A", textSecondary: "#6A7A5A", primary: "#00B894", primaryHover: "#00A381",
      success: "#00CEC9", warning: "#FDCB6E", danger: "#E17055", border: "#E8D5B0",
      shadow: "0 8px 24px rgba(0,184,148,.15)",
    },
  },
  {
    keywords: ["hielo", "ice", "frío", "cold", "invierno", "winter", "polar", "ártico", "arctic", "congelado", "frozen", "glacial"],
    fontId: "inter",
    icon: "arctic",
    colors: {
      background: "#F0FBFF", backgroundSecondary: "#E0F7FF", surface: "#D0F0FF", surfaceHover: "#C0E8FF",
      text: "#0A2A3A", textSecondary: "#4A7A8A", primary: "#00BCD4", primaryHover: "#00ACC1",
      success: "#26A69A", warning: "#FFA726", danger: "#EF5350", border: "#B0E0F0",
      shadow: "0 8px 24px rgba(0,188,212,.12)",
    },
  },
  {
    keywords: ["otoño", "autumn", "fall", "cosecha", "harvest", "ámbar", "amber", "mostaza", "mustard", "terracota", "terracotta"],
    fontId: "archivo",
    icon: "sunset",
    colors: {
      background: "#1A1410", backgroundSecondary: "#2A1E14", surface: "#3A2818", surfaceHover: "#4A3220",
      text: "#F5EDE0", textSecondary: "#C0A880", primary: "#D4893B", primaryHover: "#C4782A",
      success: "#6B8E23", warning: "#DAA520", danger: "#CD5C5C", border: "#4A3A28",
      shadow: "0 8px 24px rgba(212,137,59,.25)",
    },
  },
  {
    keywords: ["monocromático", "monochrome", "gris", "gray", "grisáceo", "grey", "escala", "scale", "sobrio", "sobriety", "serio", "serious"],
    fontId: "inter",
    icon: "carbon",
    colors: {
      background: "#0A0A0A", backgroundSecondary: "#1A1A1A", surface: "#2A2A2A", surfaceHover: "#3A3A3A",
      text: "#F0F0F0", textSecondary: "#909090", primary: "#888888", primaryHover: "#AAAAAA",
      success: "#66BB6A", warning: "#FFD54F", danger: "#EF5350", border: "#3A3A3A",
      shadow: "0 8px 24px rgba(0,0,0,.50)",
    },
  },
  {
    keywords: ["chocolate", "cacao", "oscuro", "intenso", "intense", "espresso"],
    fontId: "playfair",
    icon: "midnight",
    colors: {
      background: "#0D0805", backgroundSecondary: "#1A1008", surface: "#27180C", surfaceHover: "#342010",
      text: "#F0E8D8", textSecondary: "#A09070", primary: "#A0724A", primaryHover: "#8E6238",
      success: "#5B8C5A", warning: "#D4A030", danger: "#C04040", border: "#342818",
      shadow: "0 8px 24px rgba(0,0,0,.55)",
    },
  },
  {
    keywords: ["tecnología", "tech", "moderno", "modern", "digital", "código", "code", "programación", "programming", "developer", "desarrollador"],
    fontId: "space-grotesk",
    icon: "carbon",
    colors: {
      background: "#0A0D14", backgroundSecondary: "#121820", surface: "#1A2230", surfaceHover: "#222C40",
      text: "#E8F0F8", textSecondary: "#8090A8", primary: "#3B82F6", primaryHover: "#2563EB",
      success: "#10B981", warning: "#F59E0B", danger: "#EF4444", border: "#222C40",
      shadow: "0 8px 24px rgba(59,130,246,.25)",
    },
  },
  {
    keywords: ["atardecer rosa", "pink sunset", "atardecer morado", "purple sunset", "dusk", "crepúsculo", "twilight", "anochecer"],
    fontId: "syne",
    icon: "dracula",
    colors: {
      background: "#0E0814", backgroundSecondary: "#1A0E20", surface: "#261830", surfaceHover: "#322040",
      text: "#F0E8F8", textSecondary: "#A080B0", primary: "#A855F7", primaryHover: "#9333EA",
      success: "#2DD4BF", warning: "#FBBF24", danger: "#FB7185", border: "#322040",
      shadow: "0 8px 24px rgba(168,85,247,.30)",
    },
  },
];

/* ============================================
   TEMPLATE MATCHING — busca la paleta predefinida
   que más se parezca al prompt por palabras clave
   ============================================ */

function findClosestPalette(prompt) {
  const lower = prompt.toLowerCase();
  const words = lower.split(/\s+/);
  let bestMatch = null;
  let maxScore = 0;

  for (const template of PALETTE_TEMPLATES) {
    let score = 0;
    for (const keyword of template.keywords) {
      /* Coincidencia exacta de palabra completa */
      if (new RegExp("\\b" + keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(lower)) {
        score += 3;
      }
      /* Coincidencia exacta de término */
      if (words.some((w) => w === keyword)) {
        score += 2;
      }
      /* Coincidencia parcial (substring de 4+ caracteres) */
      if (keyword.length >= 4 && words.some((w) => {
        if (w.length !== keyword.length && (w.includes(keyword) || keyword.includes(w))) return false;
        for (let i = 0; i <= w.length - 4; i++) {
          if (keyword.includes(w.slice(i, i + 4))) return true;
        }
        return false;
      })) {
        score += 1;
      }
    }
    if (score >= maxScore) {
      maxScore = score;
      bestMatch = template;
    }
  }

  return bestMatch || PALETTE_TEMPLATES[Math.floor(Math.random() * PALETTE_TEMPLATES.length)];
}

/* ============================================
   FUNCIONES DE APOYO
   ============================================ */

/* Genera un ID único para el tema basado en el prompt */
function generateThemeId(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20);
  const timestamp = Date.now().toString(36).slice(-4);
  const random = Math.random().toString(36).substring(2, 9);
  return `${base}-${timestamp}${random}`;
}

/* Genera un nombre legible para el tema (primeras 3 palabras) */
function generateThemeName(prompt, lang) {
  const words = prompt.split(/\s+/).slice(0, 3);
  const capitalized = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return capitalized || (lang === "es" ? "Tema Personalizado" : "Custom Theme");
}

/* Asigna un ícono según las palabras clave del prompt */
function getThemeIcon(prompt) {
  const lower = prompt.toLowerCase();
  if (/\b(dark|oscuro|nocturno|night|neon|noche|gamer|tech|technology|tecnología|code|código)\b/.test(lower)) return "carbon";
  if (/\b(lujo|luxury|gold|dorado|royal|realeza|premium|chocolate|cacao)\b/.test(lower)) return "midnight";
  if (/\b(vintage|retro|naturaleza|nature|bosque|forest|madera|wood|natural|eco|tierra|earthy)\b/.test(lower)) return "forest";
  if (/\b(claro|light|brillante|bright|minimalista|white|blanco|limpio|clean)\b/.test(lower)) return "light";
  if (/\b(ocean|océano|azul|blue|mar|sea|hielo|ice|frío|cold|invierno|winter)\b/.test(lower)) return "arctic";
  if (/\b(lavanda|lavender|morado|purple|violeta|violet|magenta|rosa|pink|romántico|romantic|floral)\b/.test(lower)) return "sakura";
  if (/\b(ocaso|sunset|atardecer|naranja|orange|cálido|warm|fuego|fire|verano|summer)\b/.test(lower)) return "sunset";
  if (/\b(playa|beach|tropical|tropical|caribe|caribbean)\b/.test(lower)) return "light";
  if (/\b(hielo|ice|frío|cold|polar|ártico|arctic)\b/.test(lower)) return "arctic";
  return "light";
}

/* ============================================
   FUNCIÓN PRINCIPAL — punto de entrada
   Recibe un texto descriptivo y devuelve un
   objeto tema completo con 13 colores
   ============================================ */

function generateThemeFromPrompt(prompt, lang = "es") {
  let colors = null;
  let used = "";

  /* 1) Intenta generar la paleta por vocabulario (algoritmo HSL) */
  try {
    const result = generatePaletteFromPrompt(prompt);
    colors = result.colors;
    used = "Vocabulario";
  } catch (error) {
    console.warn("Error en generador algorítmico:", error.message);
  }

  /* 2) Si falla, usa el template predefinido más cercano */
  if (!colors) {
    const match = findClosestPalette(prompt);
    colors = match.colors;
    used = "Template";
  }

  return {
    id: generateThemeId(prompt),
    name: generateThemeName(prompt, lang),
    icon: getThemeIcon(prompt),
    fontId: "inter",
    preview: [colors.background, colors.primary, colors.text],
    colors,
    generated: true,
    used,
  };
}

export { generateThemeFromPrompt, PALETTE_TEMPLATES };
