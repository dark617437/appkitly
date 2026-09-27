import { createCanvas, getContext } from "@/lib/image";
import { encodeOpaquePng } from "@/lib/png";
import type { AssetMap, Background, EditorAsset, ImageLayer, Layer, Scene, TextLayer } from "./types";

export const BACKGROUND_PRESETS = { light: "#f1f5f9", dark: "#0b1020" } as const;

const LINE_HEIGHT = 1.18;

// --- Fonts ----------------------------------------------------------------------

let cachedFamily: string | null = null;

/** The site's Geist font, resolved from the CSS variable next/font sets on <html>. */
export function fontFamily(): string {
  if (cachedFamily) return cachedFamily;
  if (typeof document === "undefined") return "system-ui, sans-serif";
  const value = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-sans").trim();
  cachedFamily = value ? `${value}, system-ui, sans-serif` : "system-ui, sans-serif";
  return cachedFamily;
}

function fontString(layer: TextLayer, scene: Scene): string {
  return `${layer.fontWeight} ${layer.fontSize * scene.width}px ${fontFamily()}`;
}

/** Waits until every font weight used by the scene is loaded, so exports never fall back. */
export async function ensureFonts(scene: Scene): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;
  const loads = scene.layers
    .filter((layer): layer is TextLayer => layer.kind === "text" && layer.visible)
    .map((layer) => document.fonts.load(fontString(layer, scene), layer.text || "A"));
  await Promise.allSettled(loads);
}

// --- Text layout --------------------------------------------------------------------

export interface TextLayout {
  lines: string[];
  font: string;
  lineHeight: number;
  boxWidth: number;
  boxHeight: number;
}

let measureContext: CanvasRenderingContext2D | null = null;

function getMeasureContext(): CanvasRenderingContext2D {
  if (!measureContext) measureContext = getContext(createCanvas(1, 1));
  return measureContext;
}

/** Wraps text into lines that fit the layer's box. All values are in scene pixels. */
export function layoutText(layer: TextLayer, scene: Scene): TextLayout {
  const context = getMeasureContext();
  const font = fontString(layer, scene);
  context.font = font;
  const boxWidth = layer.maxWidth * scene.width;
  const lines: string[] = [];

  for (const paragraph of layer.text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let line = words[0];
    for (const word of words.slice(1)) {
      const candidate = `${line} ${word}`;
      if (context.measureText(candidate).width <= boxWidth) {
        line = candidate;
      } else {
        lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }

  const lineHeight = layer.fontSize * scene.width * LINE_HEIGHT;
  return { lines, font, lineHeight, boxWidth, boxHeight: Math.max(1, lines.length) * lineHeight };
}

// --- Geometry --------------------------------------------------------------------------

export interface Box {
  cx: number;
  cy: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Point {
  x: number;
  y: number;
}

export function imageRatio(layer: ImageLayer, assets: AssetMap): number {
  const asset = layer.assetId ? assets[layer.assetId] : undefined;
  return asset ? asset.height / asset.width : layer.placeholderRatio;
}

/** The layer's rotated box in scene pixels. */
export function layerBox(layer: Layer, scene: Scene, assets: AssetMap): Box {
  const cx = layer.x * scene.width;
  const cy = layer.y * scene.height;
  if (layer.kind === "text") {
    const layout = layoutText(layer, scene);
    return { cx, cy, width: layout.boxWidth, height: layout.boxHeight, rotation: layer.rotation };
  }
  const width = layer.width * scene.width;
  return { cx, cy, width, height: width * imageRatio(layer, assets), rotation: layer.rotation };
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** Converts a scene point into the box's unrotated coordinates, relative to its center. */
export function toLocal(point: Point, box: Box): Point {
  const angle = -toRadians(box.rotation);
  const dx = point.x - box.cx;
  const dy = point.y - box.cy;
  return { x: dx * Math.cos(angle) - dy * Math.sin(angle), y: dx * Math.sin(angle) + dy * Math.cos(angle) };
}

/** Converts a point relative to the box center (unrotated) into scene coordinates. */
export function toScene(local: Point, box: Box): Point {
  const angle = toRadians(box.rotation);
  return {
    x: box.cx + local.x * Math.cos(angle) - local.y * Math.sin(angle),
    y: box.cy + local.x * Math.sin(angle) + local.y * Math.cos(angle),
  };
}

/** Topmost visible layer under the point, or null. */
export function hitTest(point: Point, scene: Scene, assets: AssetMap): string | null {
  for (let i = scene.layers.length - 1; i >= 0; i--) {
    const layer = scene.layers[i];
    if (!layer.visible) continue;
    const box = layerBox(layer, scene, assets);
    const local = toLocal(point, box);
    if (Math.abs(local.x) <= box.width / 2 && Math.abs(local.y) <= box.height / 2) return layer.id;
  }
  return null;
}

/** CSS-compatible linear gradient line for an angle (0deg points up, 90deg right). */
export function gradientLine(angle: number, width: number, height: number) {
  const radians = toRadians(angle);
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  const half = (Math.abs(width * dx) + Math.abs(height * dy)) / 2;
  return {
    x0: width / 2 - dx * half,
    y0: height / 2 - dy * half,
    x1: width / 2 + dx * half,
    y1: height / 2 + dy * half,
  };
}

export function backgroundCss(background: Background): string {
  if (background.kind === "gradient") {
    return `linear-gradient(${background.angle}deg, ${background.from}, ${background.to})`;
  }
  return background.kind === "solid" ? background.color : BACKGROUND_PRESETS[background.kind];
}

// --- Drawing ----------------------------------------------------------------------------

function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function drawBackground(context: CanvasRenderingContext2D, scene: Scene) {
  const { background, width, height } = scene;
  if (background.kind === "gradient") {
    const line = gradientLine(background.angle, width, height);
    const gradient = context.createLinearGradient(line.x0, line.y0, line.x1, line.y1);
    gradient.addColorStop(0, background.from);
    gradient.addColorStop(1, background.to);
    context.fillStyle = gradient;
  } else {
    context.fillStyle = background.kind === "solid" ? background.color : BACKGROUND_PRESETS[background.kind];
  }
  context.fillRect(0, 0, width, height);
}

function drawText(context: CanvasRenderingContext2D, layer: TextLayer, scene: Scene) {
  if (!layer.text.trim()) return;
  const layout = layoutText(layer, scene);
  context.save();
  context.translate(layer.x * scene.width, layer.y * scene.height);
  context.rotate(toRadians(layer.rotation));
  context.font = layout.font;
  context.fillStyle = layer.color;
  context.textAlign = layer.align;
  context.textBaseline = "middle";
  const x = layer.align === "left" ? -layout.boxWidth / 2 : layer.align === "right" ? layout.boxWidth / 2 : 0;
  let y = -layout.boxHeight / 2 + layout.lineHeight / 2;
  for (const line of layout.lines) {
    context.fillText(line, x, y);
    y += layout.lineHeight;
  }
  context.restore();
}

// The rounded image is composed once per size and reused while the layer is dragged.
const composedCache = new Map<string, { key: string; canvas: HTMLCanvasElement }>();

function composeRounded(layer: ImageLayer, asset: EditorAsset, pixelWidth: number, pixelHeight: number, radius: number) {
  const key = `${asset.url}|${pixelWidth}|${pixelHeight}|${radius.toFixed(2)}`;
  const cached = composedCache.get(layer.id);
  if (cached && cached.key === key) return cached.canvas;

  const canvas = createCanvas(pixelWidth, pixelHeight);
  const context = getContext(canvas);
  roundedRectPath(context, 0, 0, pixelWidth, pixelHeight, radius);
  context.clip();
  context.drawImage(asset.image, 0, 0, pixelWidth, pixelHeight);
  composedCache.set(layer.id, { key, canvas });
  return canvas;
}

interface RenderOptions {
  /** Device pixels per scene pixel. Canvas shadows ignore transforms, so they need it. */
  scale: number;
  /** Draw placeholders for empty image layers (never exported). */
  preview: boolean;
  placeholderLabels?: Record<string, string>;
}

function drawImageLayer(
  context: CanvasRenderingContext2D,
  layer: ImageLayer,
  scene: Scene,
  assets: AssetMap,
  options: RenderOptions,
) {
  const asset = layer.assetId ? assets[layer.assetId] : undefined;
  if (!asset && !options.preview) return;

  const box = layerBox(layer, scene, assets);
  const radius = layer.radius * Math.min(box.width, box.height);

  context.save();
  context.translate(box.cx, box.cy);
  context.rotate(toRadians(box.rotation));

  if (!asset) {
    roundedRectPath(context, -box.width / 2, -box.height / 2, box.width, box.height, radius);
    context.fillStyle = "rgba(148, 163, 184, 0.28)";
    context.fill();
    context.setLineDash([12 / options.scale, 10 / options.scale]);
    context.lineWidth = 2 / options.scale;
    context.strokeStyle = "rgba(100, 116, 139, 0.9)";
    context.stroke();
    const label = options.placeholderLabels?.[layer.id];
    if (label) {
      const size = Math.max(12 / options.scale, Math.min(box.width * 0.09, 40));
      context.font = `600 ${size}px ${fontFamily()}`;
      context.fillStyle = "rgba(71, 85, 105, 0.95)";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, 0, 0, box.width * 0.9);
    }
    context.restore();
    return;
  }

  const pixelWidth = Math.max(1, Math.round(box.width * options.scale));
  const pixelHeight = Math.max(1, Math.round(box.height * options.scale));
  const composed = composeRounded(layer, asset, pixelWidth, pixelHeight, radius * options.scale);

  if (layer.shadow > 0) {
    const strength = layer.shadow / 100;
    context.shadowColor = `rgba(15, 23, 42, ${0.18 + strength * 0.32})`;
    context.shadowBlur = strength * 0.06 * scene.width * options.scale;
    context.shadowOffsetY = strength * 0.02 * scene.width * options.scale;
  }
  context.drawImage(composed, -box.width / 2, -box.height / 2, box.width, box.height);
  context.restore();
}

/**
 * Draws the scene in scene pixels. The caller sets the transform: identity for export,
 * a scale for the on-screen preview.
 */
export function renderScene(context: CanvasRenderingContext2D, scene: Scene, assets: AssetMap, options: RenderOptions) {
  drawBackground(context, scene);
  for (const layer of scene.layers) {
    if (!layer.visible) continue;
    if (layer.kind === "text") drawText(context, layer, scene);
    else drawImageLayer(context, layer, scene, assets, options);
  }
}

/** Renders the scene at its full export size as a 24-bit PNG (no alpha), as Google Play requires. */
export async function exportScene(scene: Scene, assets: AssetMap): Promise<Blob> {
  await ensureFonts(scene);
  const canvas = createCanvas(scene.width, scene.height);
  const context = getContext(canvas);
  renderScene(context, scene, assets, { scale: 1, preview: false });
  return encodeOpaquePng(canvas);
}
