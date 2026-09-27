"use client";

import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { SceneEditor, type EditorSection, type SceneTemplate } from "@/components/editor/scene-editor";
import { applyTemplateStyle, type TemplateStyle } from "@/components/editor/templates";
import type { Scene } from "@/components/editor/types";

type TemplateId = "minimal" | "showcase" | "gradient" | "dark" | "clean";

const leftText = { align: "left" as const, rotation: 0 };

const STYLES: Record<TemplateId, TemplateStyle> = {
  minimal: {
    background: { kind: "light" },
    layers: {
      icon: { x: 0.13, y: 0.5, width: 0.15, radius: 0.22, shadow: 20, rotation: 0 },
      title: { ...leftText, x: 0.47, y: 0.43, fontSize: 0.056, fontWeight: 700, color: "#0f172a", maxWidth: 0.5 },
      subtitle: { ...leftText, x: 0.47, y: 0.59, fontSize: 0.028, fontWeight: 400, color: "#475569", maxWidth: 0.5 },
      screenshot: { x: 0.86, y: 0.63, height: 1, radius: 0.06, shadow: 35, rotation: 0 },
    },
  },
  showcase: {
    background: { kind: "gradient", from: "#4f46e5", to: "#7c3aed", angle: 120 },
    layers: {
      icon: { x: 0.1, y: 0.21, width: 0.085, radius: 0.22, shadow: 30, rotation: 0 },
      title: { ...leftText, x: 0.32, y: 0.47, fontSize: 0.062, fontWeight: 800, color: "#ffffff", maxWidth: 0.5 },
      subtitle: { ...leftText, x: 0.32, y: 0.64, fontSize: 0.03, fontWeight: 400, color: "#e0e7ff", maxWidth: 0.5 },
      screenshot: { x: 0.78, y: 0.66, height: 1.05, radius: 0.06, shadow: 70, rotation: -8 },
    },
  },
  gradient: {
    background: { kind: "gradient", from: "#f97316", to: "#ec4899", angle: 135 },
    layers: {
      icon: { x: 0.5, y: 0.24, width: 0.12, radius: 0.22, shadow: 30, rotation: 0 },
      title: { x: 0.5, y: 0.56, align: "center", rotation: 0, fontSize: 0.064, fontWeight: 800, color: "#ffffff", maxWidth: 0.74 },
      subtitle: { x: 0.5, y: 0.72, align: "center", rotation: 0, fontSize: 0.03, fontWeight: 500, color: "#fff7ed", maxWidth: 0.66 },
      screenshot: { x: 0.93, y: 0.84, height: 0.8, radius: 0.06, shadow: 50, rotation: 12 },
    },
  },
  dark: {
    background: { kind: "dark" },
    layers: {
      screenshot: { x: 0.21, y: 0.64, height: 1.05, radius: 0.06, shadow: 80, rotation: 6 },
      icon: { x: 0.46, y: 0.25, width: 0.085, radius: 0.22, shadow: 40, rotation: 0 },
      title: { ...leftText, x: 0.67, y: 0.5, fontSize: 0.058, fontWeight: 700, color: "#ffffff", maxWidth: 0.46 },
      subtitle: { ...leftText, x: 0.67, y: 0.66, fontSize: 0.028, fontWeight: 400, color: "#94a3b8", maxWidth: 0.46 },
    },
  },
  clean: {
    background: { kind: "solid", color: "#ffffff" },
    layers: {
      icon: { x: 0.13, y: 0.5, width: 0.15, radius: 0.22, shadow: 15, rotation: 0 },
      title: { ...leftText, x: 0.5, y: 0.43, fontSize: 0.054, fontWeight: 700, color: "#111827", maxWidth: 0.46 },
      subtitle: { ...leftText, x: 0.5, y: 0.58, fontSize: 0.028, fontWeight: 400, color: "#6b7280", maxWidth: 0.46 },
      screenshot: { x: 0.87, y: 0.6, height: 0.95, radius: 0.05, shadow: 25, rotation: 0 },
    },
  },
};

const SCREENSHOT_RATIO = 2.1;

function createScene(strings: ToolUiStrings["featureGraphicMaker"]): Scene {
  const scene: Scene = {
    width: 1024,
    height: 500,
    background: { kind: "light", color: "#eef2ff", from: "#4f46e5", to: "#7c3aed", angle: 120 },
    layers: [
      {
        id: "screenshot",
        kind: "image",
        assetId: null,
        x: 0.86,
        y: 0.6,
        width: 0.2,
        radius: 0.06,
        shadow: 35,
        rotation: 0,
        visible: true,
        placeholderRatio: SCREENSHOT_RATIO,
      },
      {
        id: "icon",
        kind: "image",
        assetId: null,
        x: 0.13,
        y: 0.5,
        width: 0.15,
        radius: 0.22,
        shadow: 20,
        rotation: 0,
        visible: true,
        placeholderRatio: 1,
      },
      {
        id: "title",
        kind: "text",
        text: strings.defaultTitle,
        x: 0.47,
        y: 0.43,
        fontSize: 0.056,
        fontWeight: 700,
        color: "#0f172a",
        align: "left",
        maxWidth: 0.5,
        rotation: 0,
        visible: true,
      },
      {
        id: "subtitle",
        kind: "text",
        text: strings.defaultSubtitle,
        x: 0.47,
        y: 0.59,
        fontSize: 0.028,
        fontWeight: 400,
        color: "#475569",
        align: "left",
        maxWidth: 0.5,
        rotation: 0,
        visible: true,
      },
    ],
  };
  return applyTemplateStyle(scene, STYLES.minimal, { screenshot: SCREENSHOT_RATIO, icon: 1 });
}

interface FeatureGraphicMakerProps {
  locale: string;
  strings: ToolUiStrings["featureGraphicMaker"];
  editor: ToolUiStrings["editor"];
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

export function FeatureGraphicMaker({ locale, strings, editor, common, dropzone }: FeatureGraphicMakerProps) {
  const templates: SceneTemplate[] = (Object.keys(STYLES) as TemplateId[]).map((id) => ({
    id,
    name: strings.templateNames[id],
    swatch: { kind: "solid", color: "#ffffff", from: "#4f46e5", to: "#7c3aed", angle: 120, ...STYLES[id].background },
    apply: (scene, ratios) => applyTemplateStyle(scene, STYLES[id], ratios),
  }));

  const sections: EditorSection[] = [
    { kind: "image", layerId: "icon", title: strings.icon, maxWidth: 0.4 },
    { kind: "text", layerId: "title", title: strings.title, fontSizeRange: [0.03, 0.12] },
    { kind: "text", layerId: "subtitle", title: strings.subtitle, toggleable: true, fontSizeRange: [0.015, 0.07] },
    { kind: "image", layerId: "screenshot", title: strings.screenshot, maxWidth: 0.6 },
  ];

  return (
    <SceneEditor
      locale={locale}
      initialScene={() => createScene(strings)}
      templates={templates}
      sections={sections}
      fileName={() => "feature-graphic-1024x500.png"}
      placeholderLabels={{ screenshot: strings.placeholderScreenshot, icon: strings.placeholderIcon }}
      strings={editor}
      common={common}
      dropzone={dropzone}
    />
  );
}
