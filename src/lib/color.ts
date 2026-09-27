export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Normalizes "#abc", "abc" or "#AABBCC" to lowercase "#aabbcc". Returns null when invalid. */
export function normalizeHex(value: string): string | null {
  const match = HEX_PATTERN.exec(value.trim());
  if (!match) return null;
  let hex = match[1].toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((char) => char + char).join("");
  return `#${hex}`;
}

export function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex) ?? "#000000";
  const value = parseInt(normalized.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (channel: number) =>
    Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** Picks black or white text, whichever reads better on the given background. */
export function readableTextColor(background: string): "#0f172a" | "#ffffff" {
  return contrastRatio(background, "#ffffff") >= contrastRatio(background, "#0f172a")
    ? "#ffffff"
    : "#0f172a";
}

// --- OKLCH (perceptually uniform) -> sRGB -----------------------------------

function linearToChannel(value: number): number {
  const v = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
  return v * 255;
}

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

function inGamut([r, g, b]: [number, number, number]): boolean {
  const epsilon = 0.0001;
  return [r, g, b].every((v) => v >= -epsilon && v <= 1 + epsilon);
}

/**
 * Converts OKLCH to hex. Colors outside sRGB keep their hue and lightness while
 * chroma is reduced until they fit, which avoids the hue shifts of plain clipping.
 */
export function oklchToHex(l: number, c: number, h: number): string {
  let chroma = c;
  let rgb = oklchToLinearRgb(l, chroma, h);
  if (!inGamut(rgb)) {
    let low = 0;
    let high = c;
    for (let i = 0; i < 20; i++) {
      chroma = (low + high) / 2;
      if (inGamut(oklchToLinearRgb(l, chroma, h))) low = chroma;
      else high = chroma;
    }
    rgb = oklchToLinearRgb(l, low, h);
  }
  const [r, g, b] = rgb.map((v) => linearToChannel(Math.min(1, Math.max(0, v))));
  return rgbToHex({ r, g, b });
}

// --- Palette generation -----------------------------------------------------

type Harmony = "analogous" | "monochromatic" | "complementary" | "triadic" | "split";

const HARMONY_OFFSETS: Record<Harmony, number[]> = {
  analogous: [-40, -20, 0, 20, 40],
  monochromatic: [0, 0, 0, 0, 0],
  complementary: [0, 0, 180, 180, 0],
  triadic: [0, 120, 0, 240, 0],
  split: [0, 150, 0, 210, 0],
};

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Generates a harmonious five-color palette from light to dark. Colors at `locked`
 * indexes are kept exactly as they are.
 */
export function generatePalette(current: string[], locked: boolean[]): string[] {
  const harmonies = Object.keys(HARMONY_OFFSETS) as Harmony[];
  const harmony = harmonies[Math.floor(Math.random() * harmonies.length)];
  const baseHue = random(0, 360);
  const offsets = HARMONY_OFFSETS[harmony];

  const lightStart = random(0.9, 0.97);
  const lightEnd = random(0.22, 0.35);
  const peakChroma = random(0.09, 0.2);

  return current.map((color, index) => {
    if (locked[index]) return color;
    const t = index / (current.length - 1);
    const lightness = lightStart + (lightEnd - lightStart) * t;
    // Very light and very dark colors look best with less chroma.
    const chroma = peakChroma * (0.35 + 0.65 * Math.sin(Math.PI * Math.min(1, t * 0.9 + 0.1)));
    const hue = (baseHue + offsets[index] + random(-6, 6) + 360) % 360;
    return oklchToHex(lightness, chroma, hue);
  });
}

/** Mixes two hex colors; `t` = 0 returns `a`, 1 returns `b`. */
export function mixHex(a: string, b: string, t: number): string {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return rgbToHex({ r: x.r + (y.r - x.r) * t, g: x.g + (y.g - x.g) * t, b: x.b + (y.b - x.b) * t });
}
