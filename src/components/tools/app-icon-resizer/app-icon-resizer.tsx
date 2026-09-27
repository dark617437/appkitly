"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileArchive, LoaderCircle, TriangleAlert } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import {
  ACCEPTED_IMAGE_TYPES,
  baseName,
  canvasToBlob,
  createCanvas,
  formatBytes,
  getContext,
  loadImage,
  resample,
  type LoadedImage,
} from "@/lib/image";
import { downloadBlob } from "@/lib/download";
import { createZip } from "@/lib/zip";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDropzone } from "@/components/ui/file-dropzone";
import {
  CheckboxChip,
  ColorField,
  ControlSection,
  SegmentedControl,
  SwitchField,
} from "@/components/ui/form-controls";
import { cn } from "@/lib/cn";
import { ToolEmptyState } from "../tool-empty-state";

const SIZES = [1024, 512, 192, 144, 96, 72, 48];

type BackgroundMode = "transparent" | "white" | "black" | "custom";

interface GeneratedIcon {
  size: number;
  blob: Blob;
  url: string;
}

interface AppIconResizerProps {
  locale: string;
  strings: ToolUiStrings["appIconResizer"];
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

function backgroundFill(mode: BackgroundMode, custom: string): string | null {
  if (mode === "white") return "#ffffff";
  if (mode === "black") return "#000000";
  if (mode === "custom") return custom;
  return null;
}

function renderIcon(source: LoadedImage, size: number, fill: string | null, keepAspect: boolean) {
  const canvas = createCanvas(size, size);
  const context = getContext(canvas);
  if (fill) {
    context.fillStyle = fill;
    context.fillRect(0, 0, size, size);
  }

  let width = size;
  let height = size;
  if (keepAspect) {
    const scale = Math.min(size / source.width, size / source.height);
    width = Math.max(1, Math.round(source.width * scale));
    height = Math.max(1, Math.round(source.height * scale));
  }

  const resized = resample(source.image, source.width, source.height, width, height);
  context.drawImage(resized, Math.round((size - width) / 2), Math.round((size - height) / 2));
  return canvas;
}

export function AppIconResizer({ locale, strings, common, dropzone }: AppIconResizerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<LoadedImage | null>(null);
  const [selected, setSelected] = useState<number[]>(SIZES);
  const [mode, setMode] = useState<BackgroundMode>("transparent");
  const [customColor, setCustomColor] = useState("#4f46e5");
  const [keepAspect, setKeepAspect] = useState(true);
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [iconsKey, setIconsKey] = useState("");
  const [zipping, setZipping] = useState(false);

  const loadRequest = useRef(0);
  const iconsRef = useRef<GeneratedIcon[]>([]);

  useEffect(() => {
    return () => iconsRef.current.forEach((icon) => URL.revokeObjectURL(icon.url));
  }, []);

  useEffect(() => {
    return () => {
      if (source) URL.revokeObjectURL(source.url);
    };
  }, [source]);

  async function handleFile(next: File | null) {
    const request = ++loadRequest.current;
    setFile(next);
    setSource(null);
    if (!next) return;
    try {
      const loaded = await loadImage(next);
      if (request !== loadRequest.current) {
        URL.revokeObjectURL(loaded.url);
        return;
      }
      setSource(loaded);
    } catch {
      if (request !== loadRequest.current) return;
      setFile(null);
      toast.error(common.readError);
    }
  }

  const fill = backgroundFill(mode, customColor);
  const sizes = SIZES.filter((size) => selected.includes(size));
  const sizesKey = sizes.join(",");
  const settingsKey = source ? `${source.url}|${sizesKey}|${fill}|${keepAspect}` : "";

  useEffect(() => {
    if (!source || !sizesKey) return;
    const list = sizesKey.split(",").map(Number);
    const key = `${source.url}|${sizesKey}|${fill}|${keepAspect}`;
    let cancelled = false;

    // Short delay so dragging the color picker doesn't render icons on every tick.
    const timer = setTimeout(async () => {
      const next: GeneratedIcon[] = [];
      try {
        for (const size of list) {
          const blob = await canvasToBlob(renderIcon(source, size, fill, keepAspect), "image/png");
          if (cancelled) break;
          next.push({ size, blob, url: URL.createObjectURL(blob) });
        }
      } catch {
        if (!cancelled) toast.error(common.exportError);
      }
      if (cancelled) {
        next.forEach((icon) => URL.revokeObjectURL(icon.url));
        return;
      }
      iconsRef.current.forEach((icon) => URL.revokeObjectURL(icon.url));
      iconsRef.current = next;
      setIcons(next);
      setIconsKey(key);
    }, 120);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [source, sizesKey, fill, keepAspect, common.exportError]);

  const ready = Boolean(source) && sizes.length > 0 && iconsKey === settingsKey;
  const visible = ready ? icons : [];
  const pending = Boolean(source) && sizes.length > 0 && !ready;
  const base = file ? baseName(file.name) : "icon";

  function toggleSize(size: number, checked: boolean) {
    setSelected((current) =>
      checked ? [...new Set([...current, size])] : current.filter((value) => value !== size),
    );
  }

  function downloadIcon(icon: GeneratedIcon) {
    downloadBlob(icon.blob, `${base}-${icon.size}x${icon.size}.png`);
  }

  async function downloadAll() {
    if (visible.length === 1) {
      downloadIcon(visible[0]);
      return;
    }
    setZipping(true);
    try {
      const zip = await createZip(
        visible.map((icon) => ({ name: `${base}-${icon.size}x${icon.size}.png`, data: icon.blob })),
      );
      downloadBlob(zip, `${base}-app-icons.zip`);
      toast.success(common.downloadStarted);
    } catch {
      toast.error(common.exportError);
    } finally {
      setZipping(false);
    }
  }

  const backgroundOptions: { value: BackgroundMode; label: string }[] = [
    { value: "transparent", label: strings.backgroundOptions.transparent },
    { value: "white", label: strings.backgroundOptions.white },
    { value: "black", label: strings.backgroundOptions.black },
    { value: "custom", label: strings.backgroundOptions.custom },
  ];

  const showAppStoreWarning = mode === "transparent" && selected.includes(1024);

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <Card className="space-y-8 p-5 sm:p-6">
        <FileDropzone
          accept={ACCEPTED_IMAGE_TYPES}
          extensions={["png", "jpg", "jpeg", "webp"]}
          file={file}
          preview={source}
          onFileChange={handleFile}
          strings={dropzone}
          locale={locale}
        />

        <ControlSection
          title={strings.sizesTitle}
          action={
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => setSelected(SIZES)}>
                {strings.selectAll}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                {strings.clear}
              </Button>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            {SIZES.map((size) => (
              <CheckboxChip
                key={size}
                label={<span className="font-mono">{`${size} × ${size}`}</span>}
                description={strings.sizeLabels[String(size)]}
                checked={selected.includes(size)}
                onChange={(checked) => toggleSize(size, checked)}
              />
            ))}
          </div>
        </ControlSection>

        <ControlSection title={strings.backgroundTitle}>
          <SegmentedControl
            label={strings.backgroundTitle}
            hideLabel
            value={mode}
            options={backgroundOptions}
            onChange={setMode}
          />
          {mode === "custom" && (
            <ColorField label={strings.customColor} value={customColor} onChange={setCustomColor} />
          )}
        </ControlSection>

        <SwitchField
          label={strings.keepAspect}
          description={strings.keepAspectHint}
          checked={keepAspect}
          onChange={setKeepAspect}
        />
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold tracking-tight text-foreground">{common.preview}</h2>
          <Button onClick={downloadAll} disabled={visible.length === 0 || zipping}>
            {zipping ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : visible.length > 1 ? (
              <FileArchive aria-hidden="true" />
            ) : (
              <Download aria-hidden="true" />
            )}
            {visible.length > 1
              ? format(strings.downloadZip, { count: visible.length })
              : strings.downloadPng}
          </Button>
        </div>

        {showAppStoreWarning && (
          <p className="mt-4 flex gap-2 rounded-lg border border-amber-500/30 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {strings.appStoreWarning}
          </p>
        )}

        <div aria-live="polite" aria-busy={pending}>
          {!source ? (
            <ToolEmptyState className="mt-6">{strings.empty}</ToolEmptyState>
          ) : sizes.length === 0 ? (
            <ToolEmptyState className="mt-6">{strings.noSizes}</ToolEmptyState>
          ) : pending ? (
            <ToolEmptyState className="mt-6">
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin text-primary-text" />
              {strings.generating}
            </ToolEmptyState>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((icon) => {
                const display = Math.min(icon.size, 112);
                return (
                  <li key={icon.size} className="flex flex-col rounded-xl border border-border bg-surface p-3">
                    <div
                      className={cn(
                        "flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-border",
                        fill ? "bg-card" : "bg-checkerboard",
                      )}
                    >
                      <img
                        src={icon.url}
                        alt={`${icon.size} × ${icon.size}`}
                        width={display}
                        height={display}
                        className="max-w-full"
                      />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-semibold text-foreground">
                          {icon.size} × {icon.size}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {strings.sizeLabels[String(icon.size)]} · {formatBytes(icon.blob.size, locale)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-1 size-8"
                        onClick={() => downloadIcon(icon)}
                        aria-label={format(strings.downloadSize, { size: icon.size })}
                        title={format(strings.downloadSize, { size: icon.size })}
                      >
                        <Download aria-hidden="true" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

