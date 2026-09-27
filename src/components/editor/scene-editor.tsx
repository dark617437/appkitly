"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDown,
  Download,
  LoaderCircle,
  Redo2,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import { ACCEPTED_IMAGE_TYPES, loadImage } from "@/lib/image";
import { downloadBlob } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/file-dropzone";
import {
  ColorField,
  RangeField,
  SegmentedControl,
  SelectField,
  SwitchField,
  TextField,
} from "@/components/ui/form-controls";
import { cn } from "@/lib/cn";
import { EditorCanvas, type LayerPatch } from "./editor-canvas";
import { backgroundCss, exportScene, imageRatio } from "./render";
import type { AssetMap, Background, BackgroundKind, ImageLayer, Layer, Scene, TextAlign, TextLayer } from "./types";
import { useHistory } from "./use-history";

export interface TextSection {
  kind: "text";
  layerId: string;
  title: string;
  /** Can be hidden with a switch (e.g. the subtitle). */
  toggleable?: boolean;
  /** Font size range as fractions of the canvas width. */
  fontSizeRange: [number, number];
}

export interface ImageSection {
  kind: "image";
  layerId: string;
  title: string;
  /** A new image keeps the current height but is never wider than this (fraction of the canvas width). */
  maxWidth: number;
}

export type EditorSection = TextSection | ImageSection;

export interface SceneTemplate {
  id: string;
  name: string;
  swatch: Background;
  /** `ratios` holds height ÷ width for each image layer, so templates can size images by height. */
  apply: (scene: Scene, ratios: Record<string, number>) => Scene;
}

export interface SizePreset {
  width: number;
  height: number;
}

type EditorStrings = ToolUiStrings["editor"];

interface SceneEditorProps {
  locale: string;
  initialScene: () => Scene;
  templates: SceneTemplate[];
  sections: EditorSection[];
  /** When set, the canvas size can be changed. */
  sizePresets?: SizePreset[];
  sizeLimits?: { min: number; max: number };
  /** Export stays disabled until this image layer has an image. */
  requiredLayer?: string;
  fileName: (scene: Scene) => string;
  placeholderLabels: Record<string, string>;
  strings: EditorStrings;
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

const WEIGHTS = ["400", "500", "600", "700", "800"];

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

export function SceneEditor({
  locale,
  initialScene,
  templates,
  sections,
  sizePresets,
  sizeLimits = { min: 320, max: 3840 },
  requiredLayer,
  fileName,
  placeholderLabels,
  strings,
  common,
  dropzone,
}: SceneEditorProps) {
  const { state: scene, update, undo, redo, canUndo, canRedo } = useHistory<Scene>(initialScene);
  const [assets, setAssets] = useState<AssetMap>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");

  // Release image memory when leaving the page.
  const assetsRef = useRef(assets);
  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);
  useEffect(() => {
    return () => Object.values(assetsRef.current).forEach((asset) => URL.revokeObjectURL(asset.url));
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey) || isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((key === "z" && event.shiftKey) || key === "y") {
        event.preventDefault();
        redo();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  const updateLayer = useCallback(
    (id: string, patch: LayerPatch, group?: string) => {
      update(
        (current) => ({
          ...current,
          layers: current.layers.map((layer) => (layer.id === id ? ({ ...layer, ...patch } as Layer) : layer)),
        }),
        group,
      );
    },
    [update],
  );

  function updateBackground(patch: Partial<Background>, group?: string) {
    update((current) => ({ ...current, background: { ...current.background, ...patch } }), group);
  }

  async function handleImage(section: ImageSection, file: File | null) {
    if (!file) {
      updateLayer(section.layerId, { assetId: null });
      return;
    }
    try {
      const loaded = await loadImage(file);
      // Object URLs are unique, so they double as asset ids.
      const assetId = loaded.url;
      setAssets((current) => ({ ...current, [assetId]: { file, ...loaded } }));
      const ratio = loaded.height / loaded.width;
      update((current) => ({
        ...current,
        layers: current.layers.map((layer) => {
          if (layer.id !== section.layerId || layer.kind !== "image") return layer;
          // Keep the height the previous image (or placeholder) had, so the layout stays intact.
          const previousRatio = imageRatio(layer, assetsRef.current);
          const width = Math.min(section.maxWidth, (layer.width * previousRatio) / ratio);
          return { ...layer, assetId, visible: true, width };
        }),
      }));
      setSelectedId(section.layerId);
    } catch {
      toast.error(common.readError);
    }
  }

  const requiredMissing = requiredLayer
    ? !scene.layers.some(
        (layer) => layer.id === requiredLayer && layer.kind === "image" && layer.assetId && assets[layer.assetId],
      )
    : false;

  async function handleExport() {
    setExporting(true);
    // Let the button show its busy state before the heavy encoding starts.
    await new Promise((resolve) => setTimeout(resolve, 30));
    try {
      const blob = await exportScene(scene, assets);
      downloadBlob(blob, fileName(scene));
      toast.success(format(strings.exported, { width: scene.width, height: scene.height }));
    } catch {
      toast.error(common.exportError);
    } finally {
      setExporting(false);
    }
  }

  function applyTemplate(template: SceneTemplate) {
    setTemplateId(template.id);
    const ratios: Record<string, number> = {};
    for (const layer of scene.layers) {
      if (layer.kind === "image") ratios[layer.id] = imageRatio(layer, assets);
    }
    update((current) => template.apply(current, ratios));
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
      {/* Preview first on small screens, stays in view while scrolling the controls. */}
      <div className="sticky top-16 z-20 -mx-4 space-y-3 border-b border-border bg-background/95 px-4 pt-3 pb-3 backdrop-blur [--preview-max-h:32vh] sm:-mx-6 sm:px-6 lg:order-2 lg:top-24 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none lg:[--preview-max-h:calc(100vh-13rem)]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            <Button
              variant="secondary"
              size="icon"
              onClick={undo}
              disabled={!canUndo}
              aria-label={strings.undo}
              title={`${strings.undo} (Ctrl+Z)`}
            >
              <Undo2 aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={redo}
              disabled={!canRedo}
              aria-label={strings.redo}
              title={`${strings.redo} (Ctrl+Shift+Z)`}
            >
              <Redo2 aria-hidden="true" />
            </Button>
          </div>
          <p className="hidden truncate font-mono text-xs text-muted sm:block">
            {format(strings.exportSize, { width: scene.width, height: scene.height })}
          </p>
          <Button onClick={handleExport} disabled={exporting || requiredMissing}>
            {exporting ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Download aria-hidden="true" />}
            {exporting ? (
              strings.exporting
            ) : (
              <>
                <span className="sm:hidden">{strings.exportShort}</span>
                <span className="hidden sm:inline">{strings.export}</span>
              </>
            )}
          </Button>
        </div>

        <EditorCanvas
          scene={scene}
          assets={assets}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onLayerChange={updateLayer}
          placeholderLabels={placeholderLabels}
          label={strings.previewLabel}
        />

        {requiredMissing ? (
          <p className="text-center text-xs text-amber-800 dark:text-amber-200">{strings.needImage}</p>
        ) : (
          <p className="hidden text-center text-xs text-muted lg:block">{strings.hint}</p>
        )}
      </div>

      <div className="space-y-4 lg:order-1">
        <EditorPanel title={strings.templates}>
          <ul className="grid grid-cols-3 gap-2">
            {templates.map((template) => (
              <li key={template.id}>
                <button
                  type="button"
                  onClick={() => applyTemplate(template)}
                  aria-pressed={template.id === templateId}
                  aria-label={format(strings.template, { name: template.name })}
                  className={cn(
                    "flex w-full flex-col items-center gap-2 rounded-xl border p-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    template.id === templateId
                      ? "border-primary bg-primary-soft text-primary-soft-foreground"
                      : "border-border text-muted hover:border-border-strong hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-10 w-full rounded-lg border border-black/5"
                    style={{ background: backgroundCss(template.swatch) }}
                  />
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
        </EditorPanel>

        {sizePresets && (
          <EditorPanel title={strings.canvas}>
            <CanvasSizeControl
              scene={scene}
              presets={sizePresets}
              limits={sizeLimits}
              strings={strings}
              onChange={(width, height) => update((current) => ({ ...current, width, height }), "canvas-size")}
            />
          </EditorPanel>
        )}

        <EditorPanel title={strings.background}>
          <BackgroundControls background={scene.background} strings={strings} onChange={updateBackground} />
        </EditorPanel>

        {sections.map((section) => {
          const layer = scene.layers.find((item) => item.id === section.layerId);
          if (!layer) return null;
          return (
            <EditorPanel
              key={section.layerId}
              title={section.title}
              onFocus={() => setSelectedId(section.layerId)}
              active={selectedId === section.layerId}
            >
              {section.kind === "text" && layer.kind === "text" ? (
                <TextControls
                  layer={layer}
                  section={section}
                  scene={scene}
                  strings={strings}
                  onChange={(patch, group) => updateLayer(layer.id, patch, group)}
                />
              ) : section.kind === "image" && layer.kind === "image" ? (
                <ImageControls
                  layer={layer}
                  assets={assets}
                  strings={strings}
                  dropzone={dropzone}
                  locale={locale}
                  onImage={(file) => handleImage(section, file)}
                  onChange={(patch, group) => updateLayer(layer.id, patch, group)}
                />
              ) : null}
            </EditorPanel>
          );
        })}
      </div>
    </div>
  );
}

function EditorPanel({
  title,
  children,
  onFocus,
  active = false,
}: {
  title: string;
  children: ReactNode;
  onFocus?: () => void;
  active?: boolean;
}) {
  return (
    <details
      open
      onFocusCapture={onFocus}
      className={cn(
        "group rounded-2xl border bg-card shadow-sm transition-colors",
        active ? "border-primary/50" : "border-border",
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-foreground select-none focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden="true" className="size-4 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-5 border-t border-border px-5 py-5">{children}</div>
    </details>
  );
}

function CanvasSizeControl({
  scene,
  presets,
  limits,
  strings,
  onChange,
}: {
  scene: Scene;
  presets: SizePreset[];
  limits: { min: number; max: number };
  strings: EditorStrings;
  onChange: (width: number, height: number) => void;
}) {
  const [customMode, setCustomMode] = useState(false);
  const [draft, setDraft] = useState<{ width: string; height: string } | null>(null);
  const matching = presets.find((preset) => preset.width === scene.width && preset.height === scene.height);
  const value = customMode || !matching ? "custom" : `${matching.width}x${matching.height}`;

  const width = draft?.width ?? String(scene.width);
  const height = draft?.height ?? String(scene.height);
  const valid = (text: string) => {
    const number = Number(text);
    return Number.isInteger(number) && number >= limits.min && number <= limits.max;
  };

  function changeDimension(key: "width" | "height", text: string) {
    const next = { width, height, [key]: text };
    setDraft(next);
    if (valid(next.width) && valid(next.height)) onChange(Number(next.width), Number(next.height));
  }

  const ratio = Math.max(scene.width, scene.height) / Math.min(scene.width, scene.height);

  return (
    <div className="space-y-4">
      <SegmentedControl
        label={strings.canvas}
        hideLabel
        value={value}
        options={[
          ...presets.map((preset) => ({
            value: `${preset.width}x${preset.height}`,
            label: `${preset.width} × ${preset.height}`,
          })),
          { value: "custom", label: strings.custom },
        ]}
        onChange={(next) => {
          setDraft(null);
          if (next === "custom") {
            setCustomMode(true);
            return;
          }
          setCustomMode(false);
          const [w, h] = next.split("x").map(Number);
          onChange(w, h);
        }}
      />
      {value === "custom" && (
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label={strings.width}
            type="number"
            inputMode="numeric"
            min={limits.min}
            max={limits.max}
            value={width}
            onChange={(text) => changeDimension("width", text)}
            hint={!valid(width) ? format(strings.sizeRange, limits) : undefined}
          />
          <TextField
            label={strings.height}
            type="number"
            inputMode="numeric"
            min={limits.min}
            max={limits.max}
            value={height}
            onChange={(text) => changeDimension("height", text)}
            hint={!valid(height) ? format(strings.sizeRange, limits) : undefined}
          />
        </div>
      )}
      {ratio > 2 && (
        <p className="flex gap-2 rounded-lg border border-amber-500/30 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {format(strings.ratioWarning, { width: scene.width, height: scene.height })}
        </p>
      )}
    </div>
  );
}

function BackgroundControls({
  background,
  strings,
  onChange,
}: {
  background: Background;
  strings: EditorStrings;
  onChange: (patch: Partial<Background>, group?: string) => void;
}) {
  const kinds: BackgroundKind[] = ["solid", "gradient", "light", "dark"];
  return (
    <>
      <SegmentedControl
        label={strings.background}
        hideLabel
        value={background.kind}
        options={kinds.map((kind) => ({ value: kind, label: strings.backgroundKinds[kind] }))}
        onChange={(kind) => onChange({ kind })}
      />
      {background.kind === "solid" && (
        <ColorField label={strings.color} value={background.color} onChange={(color) => onChange({ color }, "bg-color")} />
      )}
      {background.kind === "gradient" && (
        <>
          <div className="grid gap-4 min-[400px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <ColorField
              label={strings.gradientFrom}
              value={background.from}
              onChange={(from) => onChange({ from }, "bg-from")}
            />
            <ColorField label={strings.gradientTo} value={background.to} onChange={(to) => onChange({ to }, "bg-to")} />
          </div>
          <RangeField
            label={strings.angle}
            value={background.angle}
            min={0}
            max={360}
            format={(value) => `${value}°`}
            onChange={(angle) => onChange({ angle }, "bg-angle")}
          />
        </>
      )}
    </>
  );
}

function PositionControls({
  layer,
  strings,
  onChange,
}: {
  layer: Layer;
  strings: EditorStrings;
  onChange: (patch: LayerPatch, group?: string) => void;
}) {
  return (
    <>
      <RangeField
        label={strings.positionX}
        value={Math.round(layer.x * 100)}
        min={-20}
        max={120}
        format={(value) => `${value}%`}
        onChange={(value) => onChange({ x: value / 100 }, `x:${layer.id}`)}
      />
      <RangeField
        label={strings.positionY}
        value={Math.round(layer.y * 100)}
        min={-20}
        max={120}
        format={(value) => `${value}%`}
        onChange={(value) => onChange({ y: value / 100 }, `y:${layer.id}`)}
      />
      <RangeField
        label={strings.rotation}
        value={layer.rotation}
        min={-180}
        max={180}
        format={(value) => `${value}°`}
        onChange={(rotation) => onChange({ rotation }, `rotation:${layer.id}`)}
      />
    </>
  );
}

function TextControls({
  layer,
  section,
  scene,
  strings,
  onChange,
}: {
  layer: TextLayer;
  section: TextSection;
  scene: Scene;
  strings: EditorStrings;
  onChange: (patch: LayerPatch, group?: string) => void;
}) {
  const [minSize, maxSize] = section.fontSizeRange.map((fraction) => Math.round(fraction * scene.width));
  const alignOptions: { value: TextAlign; label: ReactNode }[] = [
    { value: "left", label: <AlignIcon icon={AlignLeft} label={strings.alignLeft} /> },
    { value: "center", label: <AlignIcon icon={AlignCenter} label={strings.alignCenter} /> },
    { value: "right", label: <AlignIcon icon={AlignRight} label={strings.alignRight} /> },
  ];

  return (
    <>
      {section.toggleable && (
        <SwitchField label={strings.show} checked={layer.visible} onChange={(visible) => onChange({ visible })} />
      )}
      <TextField
        label={strings.text}
        multiline
        rows={2}
        value={layer.text}
        onChange={(text) => onChange({ text }, `text:${layer.id}`)}
        maxLength={160}
      />
      <RangeField
        label={strings.fontSize}
        value={Math.round(layer.fontSize * scene.width)}
        min={minSize}
        max={maxSize}
        format={(value) => `${value}px`}
        onChange={(value) => onChange({ fontSize: value / scene.width }, `font-size:${layer.id}`)}
      />
      <div className="grid gap-4 min-[400px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <SelectField
          label={strings.fontWeight}
          value={String(layer.fontWeight)}
          options={WEIGHTS.map((weight) => ({ value: weight, label: strings.weights[weight] }))}
          onChange={(weight) => onChange({ fontWeight: Number(weight) })}
        />
        <SegmentedControl
          label={strings.align}
          value={layer.align}
          options={alignOptions}
          onChange={(align) => onChange({ align })}
        />
      </div>
      <ColorField label={strings.textColor} value={layer.color} onChange={(color) => onChange({ color }, `color:${layer.id}`)} />
      <PositionControls layer={layer} strings={strings} onChange={onChange} />
    </>
  );
}

function ImageControls({
  layer,
  assets,
  strings,
  dropzone,
  locale,
  onImage,
  onChange,
}: {
  layer: ImageLayer;
  assets: AssetMap;
  strings: EditorStrings;
  dropzone: ToolUiStrings["dropzone"];
  locale: string;
  onImage: (file: File | null) => void;
  onChange: (patch: LayerPatch, group?: string) => void;
}) {
  const asset = layer.assetId ? assets[layer.assetId] : undefined;
  return (
    <>
      <FileDropzone
        accept={ACCEPTED_IMAGE_TYPES}
        extensions={["png", "jpg", "jpeg", "webp"]}
        file={asset?.file ?? null}
        preview={asset}
        onFileChange={onImage}
        strings={dropzone}
        locale={locale}
        compact
      />
      <RangeField
        label={strings.size}
        value={Math.round(layer.width * 100)}
        min={5}
        max={150}
        format={(value) => `${value}%`}
        onChange={(value) => onChange({ width: value / 100 }, `width:${layer.id}`)}
      />
      <RangeField
        label={strings.radius}
        value={Math.round(layer.radius * 100)}
        min={0}
        max={50}
        format={(value) => `${value}%`}
        onChange={(value) => onChange({ radius: value / 100 }, `radius:${layer.id}`)}
      />
      <RangeField
        label={strings.shadow}
        value={layer.shadow}
        min={0}
        max={100}
        onChange={(shadow) => onChange({ shadow }, `shadow:${layer.id}`)}
      />
      <PositionControls layer={layer} strings={strings} onChange={onChange} />
    </>
  );
}

function AlignIcon({ icon: Icon, label }: { icon: typeof AlignLeft; label: string }) {
  return (
    <>
      <Icon aria-hidden="true" className="size-4" />
      <span className="sr-only">{label}</span>
    </>
  );
}
