"use client";

import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { SceneEditor, type EditorSection, type SceneTemplate } from "@/components/editor/scene-editor";
import { applyTemplateStyle, type TemplateStyle } from "@/components/editor/templates";
import type { Scene } from "@/components/editor/types";

type TemplateId = "minimal" | "gradient" | "clean" | "bold" | "dark";

const SIZE_PRESETS = [
  { width: 1080, height: 1920 },
  { width: 1080, height: 2340 },
  { width: 1440, height: 2560 },
];

const centeredText = { x: 0.5, align: "center" as const, rotation: 0 };

const STYLES: Record<TemplateId, TemplateStyle> = {
  minimal: {
    background: { kind: "light" },
    layers: {
      title: { ...centeredText, y: 0.105, fontSize: 0.072, fontWeight: 700, color: "#0f172a", maxWidth: 0.84 },
      subtitle: { ...centeredText, y: 0.195, fontSize: 0.038, fontWeight: 400, color: "#475569", maxWidth: 0.8 },
      screenshot: { x: 0.5, y: 0.615, height: 0.64, radius: 0.06, shadow: 45, rotation: 0 },
    },
  },
  gradient: {
    background: { kind: "gradient", from: "#6366f1", to: "#a855f7", angle: 160 },
    layers: {
      title: { ...centeredText, y: 0.105, fontSize: 0.078, fontWeight: 800, color: "#ffffff", maxWidth: 0.86 },
      subtitle: { ...centeredText, y: 0.2, fontSize: 0.038, fontWeight: 500, color: "#e0e7ff", maxWidth: 0.8 },
      screenshot: { x: 0.5, y: 0.625, height: 0.64, radius: 0.06, shadow: 65, rotation: 0 },
    },
  },
  clean: {
    background: { kind: "solid", color: "#ffffff" },
    layers: {
      title: { x: 0.5, y: 0.8, align: "left", rotation: 0, fontSize: 0.068, fontWeight: 700, color: "#111827", maxWidth: 0.84 },
      subtitle: { x: 0.5, y: 0.89, align: "left", rotation: 0, fontSize: 0.036, fontWeight: 400, color: "#6b7280", maxWidth: 0.84 },
      screenshot: { x: 0.5, y: 0.385, height: 0.64, radius: 0.05, shadow: 30, rotation: 0 },
    },
  },
  bold: {
    background: { kind: "solid", color: "#facc15" },
    layers: {
      title: { ...centeredText, y: 0.11, fontSize: 0.09, fontWeight: 800, color: "#111827", maxWidth: 0.88 },
      subtitle: { ...centeredText, y: 0.215, fontSize: 0.04, fontWeight: 600, color: "#1f2937", maxWidth: 0.82 },
      screenshot: { x: 0.5, y: 0.64, height: 0.62, radius: 0.06, shadow: 70, rotation: -6 },
    },
  },
  dark: {
    background: { kind: "dark" },
    layers: {
      title: { ...centeredText, y: 0.105, fontSize: 0.074, fontWeight: 700, color: "#ffffff", maxWidth: 0.84 },
      subtitle: { ...centeredText, y: 0.195, fontSize: 0.038, fontWeight: 400, color: "#94a3b8", maxWidth: 0.8 },
      screenshot: { x: 0.5, y: 0.615, height: 0.64, radius: 0.06, shadow: 85, rotation: 0 },
    },
  },
};

const PLACEHOLDER_RATIO = 2.1;

function createScene(strings: ToolUiStrings["playStoreScreenshotMaker"]): Scene {
  const scene: Scene = {
    width: 1080,
    height: 1920,
    background: { kind: "light", color: "#eef2ff", from: "#6366f1", to: "#a855f7", angle: 160 },
    layers: [
      {
        id: "screenshot",
        kind: "image",
        assetId: null,
        x: 0.5,
        y: 0.6,
        width: 0.3,
        radius: 0.06,
        shadow: 45,
        rotation: 0,
        visible: true,
        placeholderRatio: PLACEHOLDER_RATIO,
      },
      {
        id: "title",
        kind: "text",
        text: strings.defaultTitle,
        x: 0.5,
        y: 0.1,
        fontSize: 0.07,
        fontWeight: 700,
        color: "#0f172a",
        align: "center",
        maxWidth: 0.84,
        rotation: 0,
        visible: true,
      },
      {
        id: "subtitle",
        kind: "text",
        text: strings.defaultSubtitle,
        x: 0.5,
        y: 0.2,
        fontSize: 0.038,
        fontWeight: 400,
        color: "#475569",
        align: "center",
        maxWidth: 0.8,
        rotation: 0,
        visible: true,
      },
    ],
  };
  return applyTemplateStyle(scene, STYLES.minimal, { screenshot: PLACEHOLDER_RATIO });
}

interface PlayStoreScreenshotMakerProps {
  locale: string;
  strings: ToolUiStrings["playStoreScreenshotMaker"];
  editor: ToolUiStrings["editor"];
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

export function PlayStoreScreenshotMaker({ locale, strings, editor, common, dropzone }: PlayStoreScreenshotMakerProps) {
  const templates: SceneTemplate[] = (Object.keys(STYLES) as TemplateId[]).map((id) => ({
    id,
    name: strings.templateNames[id],
    swatch: { kind: "solid", color: "#ffffff", from: "#6366f1", to: "#a855f7", angle: 160, ...STYLES[id].background },
    apply: (scene, ratios) => applyTemplateStyle(scene, STYLES[id], ratios),
  }));

  const sections: EditorSection[] = [
    { kind: "image", layerId: "screenshot", title: strings.screenshot, maxWidth: 0.9 },
    { kind: "text", layerId: "title", title: strings.title, fontSizeRange: [0.03, 0.14] },
    { kind: "text", layerId: "subtitle", title: strings.subtitle, toggleable: true, fontSizeRange: [0.02, 0.08] },
  ];

  return (
    <SceneEditor
      locale={locale}
      initialScene={() => createScene(strings)}
      templates={templates}
      sections={sections}
      sizePresets={SIZE_PRESETS}
      requiredLayer="screenshot"
      fileName={(scene) => `play-store-screenshot-${scene.width}x${scene.height}.png`}
      placeholderLabels={{ screenshot: strings.placeholder }}
      strings={editor}
      common={common}
      dropzone={dropzone}
    />
  );
}
