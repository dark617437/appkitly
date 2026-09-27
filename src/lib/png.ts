import { getContext } from "./image";

// upng-js (and its deflate dependency) is only downloaded when a PNG is actually encoded.
async function loadUpng() {
  const mod = await import("upng-js");
  return mod.default;
}

/**
 * Encodes a canvas as a 24-bit RGB PNG without an alpha channel, the format Google Play
 * requires for screenshots and feature graphics. Transparent pixels are flattened.
 */
export async function encodeOpaquePng(canvas: HTMLCanvasElement): Promise<Blob> {
  const { width, height } = canvas;
  const pixels = getContext(canvas).getImageData(0, 0, width, height).data;
  for (let i = 3; i < pixels.length; i += 4) pixels[i] = 255;

  const UPNG = await loadUpng();
  const png = UPNG.encode([pixels.buffer as ArrayBuffer], width, height, 0, undefined, true);
  return new Blob([png], { type: "image/png" });
}

/**
 * Encodes image data as PNG. `colors` 0 keeps every color (lossless);
 * 2–256 reduces the palette, which is how PNG files shrink dramatically.
 */
export async function encodePng(image: ImageData, colors: number): Promise<Blob> {
  const UPNG = await loadUpng();
  const copy = image.data.slice().buffer as ArrayBuffer;
  const png = UPNG.encode([copy], image.width, image.height, colors);
  return new Blob([png], { type: "image/png" });
}
