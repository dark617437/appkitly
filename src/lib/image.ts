export const IMAGE_MIME = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
} as const;

export type ImageFormat = keyof typeof IMAGE_MIME;

export const IMAGE_FORMATS: ImageFormat[] = ["png", "jpg", "webp"];

export const ACCEPTED_IMAGE_TYPES: string[] = Object.values(IMAGE_MIME);

export const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const FORMAT_LABELS: Record<ImageFormat, string> = { png: "PNG", jpg: "JPG", webp: "WebP" };

export function formatFromMime(mime: string): ImageFormat | null {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  if (mime === "image/webp") return "webp";
  return null;
}

export function formatFromFile(file: File): ImageFormat | null {
  const fromMime = formatFromMime(file.type);
  if (fromMime) return fromMime;
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "png") return "png";
  if (extension === "jpg" || extension === "jpeg") return "jpg";
  if (extension === "webp") return "webp";
  return null;
}

/** File name without its extension, safe to reuse for downloads. */
export function baseName(filename: string): string {
  const withoutExtension = filename.replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^-+|-+$/g, "") || "image";
}

export function formatBytes(bytes: number, locale: string): string {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  const digits = unit === 0 ? 0 : value < 10 ? 2 : value < 100 ? 1 : 0;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value)} ${units[unit]}`;
}

export interface LoadedImage {
  image: HTMLImageElement;
  url: string;
  width: number;
  height: number;
}

/** Decodes an image file in the browser. Revoke `url` when the image is no longer needed. */
export async function loadImage(file: Blob): Promise<LoadedImage> {
  const url = URL.createObjectURL(file);
  const image = new Image();
  // `load` rather than `decode()`: decode() can stay pending while the tab is in the background.
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Image could not be decoded"));
      image.src = url;
    });
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
  if (!image.naturalWidth || !image.naturalHeight) {
    URL.revokeObjectURL(url);
    throw new Error("Image has no dimensions");
  }
  return { image, url, width: image.naturalWidth, height: image.naturalHeight };
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

export function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is not supported");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  return context;
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed"))),
      type,
      quality,
    );
  });
}

type Drawable = HTMLImageElement | HTMLCanvasElement | ImageBitmap;

/**
 * Scales an image to the target size. Large reductions are done in halving steps,
 * which keeps small icons sharp instead of aliased.
 */
export function resample(
  source: Drawable,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): HTMLCanvasElement {
  let current: Drawable = source;
  let width = sourceWidth;
  let height = sourceHeight;

  while (width / 2 >= targetWidth && height / 2 >= targetHeight) {
    const nextWidth = Math.max(targetWidth, Math.round(width / 2));
    const nextHeight = Math.max(targetHeight, Math.round(height / 2));
    const step = createCanvas(nextWidth, nextHeight);
    getContext(step).drawImage(current, 0, 0, width, height, 0, 0, nextWidth, nextHeight);
    current = step;
    width = nextWidth;
    height = nextHeight;
  }

  const output = createCanvas(targetWidth, targetHeight);
  getContext(output).drawImage(current, 0, 0, width, height, 0, 0, targetWidth, targetHeight);
  return output;
}

/** Copies an image onto a canvas, optionally flattening transparency onto a color. */
export function imageToCanvas(image: Drawable, width: number, height: number, background?: string) {
  const canvas = createCanvas(width, height);
  const context = getContext(canvas);
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

/**
 * Encodes a canvas with the browser's encoder. Some browsers silently fall back to
 * PNG for formats they cannot write (e.g. WebP in older Safari), so the result is verified.
 */
export async function encodeCanvas(
  canvas: HTMLCanvasElement,
  format: "jpg" | "webp",
  quality: number,
): Promise<Blob> {
  const mime = IMAGE_MIME[format];
  const blob = await canvasToBlob(canvas, mime, quality);
  if (blob.type !== mime) throw new UnsupportedFormatError(format);
  return blob;
}

export class UnsupportedFormatError extends Error {
  constructor(public format: ImageFormat) {
    super(`This browser cannot encode ${format}`);
    this.name = "UnsupportedFormatError";
  }
}
