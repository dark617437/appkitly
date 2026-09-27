export type BackgroundKind = "solid" | "gradient" | "light" | "dark";

export interface Background {
  kind: BackgroundKind;
  /** Used by "solid". */
  color: string;
  /** Used by "gradient". */
  from: string;
  to: string;
  angle: number;
}

export type TextAlign = "left" | "center" | "right";

/**
 * Positions and sizes are stored relative to the canvas (0–1), so a layout keeps its
 * proportions when the canvas size changes. Pixel values are derived when rendering.
 */
interface LayerBase {
  id: string;
  /** Center of the layer as a fraction of the canvas width / height. */
  x: number;
  y: number;
  /** Degrees, clockwise. */
  rotation: number;
  visible: boolean;
}

export interface TextLayer extends LayerBase {
  kind: "text";
  text: string;
  /** Font size as a fraction of the canvas width. */
  fontSize: number;
  fontWeight: number;
  color: string;
  align: TextAlign;
  /** Width of the text box (where lines wrap) as a fraction of the canvas width. */
  maxWidth: number;
}

export interface ImageLayer extends LayerBase {
  kind: "image";
  /** Key into the editor's loaded images; null shows a placeholder in the preview. */
  assetId: string | null;
  /** Rendered width as a fraction of the canvas width. Height follows the image's aspect ratio. */
  width: number;
  /** Corner radius as a fraction of the shorter side (0–0.5). */
  radius: number;
  /** Shadow strength, 0–100. */
  shadow: number;
  /** Height ÷ width used for the preview placeholder before an image is added. */
  placeholderRatio: number;
}

export type Layer = TextLayer | ImageLayer;

export interface Scene {
  /** Export size in pixels. */
  width: number;
  height: number;
  background: Background;
  /** Drawn in order: later layers appear on top. */
  layers: Layer[];
}

export interface EditorAsset {
  file: File;
  image: HTMLImageElement;
  url: string;
  width: number;
  height: number;
}

export type AssetMap = Record<string, EditorAsset>;
