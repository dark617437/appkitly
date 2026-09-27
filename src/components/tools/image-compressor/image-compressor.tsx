"use client";

import { useEffect, useRef, useState } from "react";
import { Download, LoaderCircle, TriangleAlert } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import {
  ACCEPTED_IMAGE_TYPES,
  baseName,
  encodeCanvas,
  FORMAT_LABELS,
  formatBytes,
  formatFromFile,
  getContext,
  imageToCanvas,
  loadImage,
  UnsupportedFormatError,
  type ImageFormat,
  type LoadedImage,
} from "@/lib/image";
import { encodePng } from "@/lib/png";
import { downloadBlob } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { ControlSection, RangeField, SegmentedControl } from "@/components/ui/form-controls";
import { cn } from "@/lib/cn";
import { CompareSlider } from "../compare-slider";
import { ToolEmptyState } from "../tool-empty-state";

type OutputMode = "original" | "webp" | "jpg";

interface CompressedResult {
  blob: Blob;
  url: string;
  format: ImageFormat;
  key: string;
}

interface ImageCompressorProps {
  locale: string;
  strings: ToolUiStrings["imageCompressor"];
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

/** Maps quality 10–99 to a 16–256 color palette; 100 keeps PNGs lossless. */
function pngColors(quality: number): number {
  if (quality >= 100) return 0;
  return Math.round(16 + ((quality - 10) / 89) * 240);
}

async function compress(source: LoadedImage, target: ImageFormat, quality: number): Promise<Blob> {
  const { image, width, height } = source;
  if (target === "png") {
    const canvas = imageToCanvas(image, width, height);
    const data = getContext(canvas).getImageData(0, 0, width, height);
    return encodePng(data, pngColors(quality));
  }
  // JPG has no transparency: flatten onto white.
  const canvas = imageToCanvas(image, width, height, target === "jpg" ? "#ffffff" : undefined);
  return encodeCanvas(canvas, target, quality / 100);
}

export function ImageCompressor({ locale, strings, common, dropzone }: ImageCompressorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<LoadedImage | null>(null);
  const [quality, setQuality] = useState(80);
  const [mode, setMode] = useState<OutputMode>("original");
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);

  const loadRequest = useRef(0);
  const resultRef = useRef<CompressedResult | null>(null);

  useEffect(() => {
    return () => {
      if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
    };
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

  const inputFormat: ImageFormat = (file && formatFromFile(file)) || "png";
  const target: ImageFormat = mode === "original" ? inputFormat : mode;
  const settingsKey = source ? `${source.url}|${target}|${quality}` : "";

  useEffect(() => {
    if (!source) return;
    const key = `${source.url}|${target}|${quality}`;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const blob = await compress(source, target, quality);
        if (cancelled) return;
        const next = { blob, url: URL.createObjectURL(blob), format: target, key };
        if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
        resultRef.current = next;
        setResult(next);
      } catch (error) {
        if (cancelled) return;
        setFailedKey(key);
        toast.error(error instanceof UnsupportedFormatError ? common.webpUnsupported : common.exportError);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [source, target, quality, common.webpUnsupported, common.exportError]);

  const current = result && result.key === settingsKey ? result : null;
  const failed = failedKey === settingsKey;
  const busy = Boolean(source) && !current && !failed;

  const originalSize = file?.size ?? 0;
  const change = current && originalSize ? current.blob.size / originalSize - 1 : 0;
  const percent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(
    Math.abs(change),
  );

  const formatOptions: { value: OutputMode; label: string }[] = [
    { value: "original", label: strings.formatOriginal },
    { value: "webp", label: "WebP" },
    { value: "jpg", label: "JPG" },
  ];

  function download() {
    if (!current || !file) return;
    const extension = current.format === "jpg" ? "jpg" : current.format;
    downloadBlob(current.blob, `${baseName(file.name)}-compressed.${extension}`);
  }

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

        <ControlSection title={common.settings}>
          <RangeField
            label={strings.quality}
            value={quality}
            min={10}
            max={100}
            onChange={setQuality}
          />
          <SegmentedControl label={strings.format} value={mode} options={formatOptions} onChange={setMode} />
          <p className="text-xs leading-relaxed text-muted">
            {target === "png" ? strings.pngNote : strings.lossyNote}
          </p>
        </ControlSection>
      </Card>

      <Card className="p-5 sm:p-6">
        {!source ? (
          <ToolEmptyState>{strings.empty}</ToolEmptyState>
        ) : (
          <div className="space-y-5">
            <dl className="grid grid-cols-3 overflow-hidden rounded-xl border border-border">
              <Stat label={strings.originalSize} value={formatBytes(originalSize, locale)} />
              <Stat
                label={`${strings.compressedSize} (${FORMAT_LABELS[target]})`}
                value={current ? formatBytes(current.blob.size, locale) : "—"}
                className="border-l border-border"
              />
              <Stat
                label={strings.saved}
                value={current ? (change <= 0 ? `−${percent}` : `+${percent}`) : "—"}
                className={cn(
                  "border-l border-border",
                  current && change <= 0 && "[&_dd]:text-emerald-700 dark:[&_dd]:text-emerald-400",
                  current && change > 0 && "[&_dd]:text-amber-700 dark:[&_dd]:text-amber-300",
                )}
              />
            </dl>

            {current && change > 0 && (
              <p className="flex gap-2 rounded-lg border border-amber-500/30 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {format(strings.larger, { percent })}
              </p>
            )}

            <div aria-live="polite" aria-busy={busy}>
              {current ? (
                <CompareSlider
                  beforeUrl={source.url}
                  afterUrl={current.url}
                  beforeLabel={common.original}
                  afterLabel={strings.compressedLabel}
                  sliderLabel={strings.compareLabel}
                  width={source.width}
                  height={source.height}
                />
              ) : (
                <ToolEmptyState>
                  {busy && <LoaderCircle aria-hidden="true" className="size-5 animate-spin text-primary-text" />}
                  {busy ? strings.compressing : common.exportError}
                </ToolEmptyState>
              )}
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={download} disabled={!current} className="w-full sm:w-auto">
                <Download aria-hidden="true" />
                {strings.download}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col-reverse justify-end gap-1 p-3 sm:p-4", className)}>
      <dt className="truncate text-xs text-muted" title={label}>
        {label}
      </dt>
      <dd className="font-mono text-sm font-semibold text-foreground tabular-nums sm:text-lg">{value}</dd>
    </div>
  );
}
