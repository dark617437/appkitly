import type { Background, ImageLayer, Layer, Scene, TextLayer } from "./types";

type TextStyle = Partial<Omit<TextLayer, "id" | "kind" | "text" | "visible">>;
/** `height` (fraction of the canvas height) sizes an image by its height, using its aspect ratio. */
type ImageStyle = Partial<Omit<ImageLayer, "id" | "kind" | "assetId" | "visible" | "placeholderRatio">> & {
  height?: number;
};

export interface TemplateStyle {
  background: Partial<Background>;
  layers: Record<string, TextStyle | ImageStyle>;
}

/**
 * Applies a template's look while keeping the user's content: texts, images and
 * visibility stay as they are.
 */
export function applyTemplateStyle(scene: Scene, style: TemplateStyle, ratios: Record<string, number>): Scene {
  return {
    ...scene,
    background: { ...scene.background, ...style.background },
    layers: scene.layers.map((layer): Layer => {
      const patch = style.layers[layer.id];
      if (!patch) return layer;
      if (layer.kind === "image") {
        const { height, ...rest } = patch as ImageStyle;
        const width =
          height !== undefined ? (height * scene.height) / ((ratios[layer.id] ?? layer.placeholderRatio) * scene.width) : undefined;
        return { ...layer, ...rest, ...(width !== undefined ? { width } : {}) };
      }
      return { ...layer, ...(patch as TextStyle) };
    }),
  };
}
