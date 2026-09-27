"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, LoaderCircle, RefreshCw } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import {
  ACCEPTED_IMAGE_TYPES,
  baseName,
  canvasToBlob,
  encodeCanvas,
  FORMAT_LABELS,
  formatBytes,
  formatFromFile,
  IMAGE_FORMATS,
  imageToCanvas,
  loadImage,
  UnsupportedFormatError,
  type ImageFormat,
  type LoadedImage,
} from "@/lib/image";
import { downloadBlob } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { ColorField, ControlSection, RangeField, SegmentedControl } from "@/components/ui/form-controls";
import { ToolEmptyState } from "../tool-empty-state";

interface ConvertedImage {
  blob: Blob;
  url: string;
  format: ImageFormat;
  /** Settings the image was converted with; changing any of them hides the result. */
  key: string;
}

interface ImageConverterProps {
  locale: string;
  strings: ToolUiStrings["imageConverter"];
  common: ToolUiStrings["common"];
  dropzone: ToolUiStrings["dropzone"];
}

async function convert(
  source: LoadedImage,
  target: ImageFormat,
  quality: number,
  background: string,
): Promise<Blob> {
  const { image, width, height } = source;
  if (target === "png") return canvasToBlob(imageToCanvas(image, width, height), "image/png");
  if (target === "jpg") {
    return encodeCanvas(imageToCanvas(image, width, height, background), "jpg", quality / 100);
  }
  return encodeCanvas(imageToCanvas(image, width, height), "webp", quality / 100);
}

export function ImageConverter({ locale, strings, common, dropzone }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<LoadedImage | null>(null);
  const [target, setTarget] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState("#ffffff");
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [converting, setConverting] = useState(false);

  const loadRequest = useRef(0);
  const resultRef = useRef<ConvertedImage | null>(null);

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

  function replaceResult(next: ConvertedImage | null) {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
    resultRef.current = next;
    setResult(next);
  }

  async function handleFile(next: File | null) {
    const request = ++loadRequest.current;
    setFile(next);
    setSource(null);
    replaceResult(null);
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

  const inputFormat = file ? formatFromFile(file) : null;
  const targets = IMAGE_FORMATS.filter((option) => option !== inputFormat);
  // Converting to the same format is pointless; fall back to the first other format.
  const effectiveTarget = targets.includes(target) ? target : targets[0];
  const lossy = effectiveTarget !== "png";
  const settingsKey = source
    ? [source.url, effectiveTarget, lossy ? quality : "", effectiveTarget === "jpg" ? background : ""].join("|")
    : "";
  const current = result && result.key === settingsKey ? result : null;

  async function runConversion() {
    if (!source) return;
    setConverting(true);
    try {
      const blob = await convert(source, effectiveTarget, quality, background);
      replaceResult({ blob, url: URL.createObjectURL(blob), format: effectiveTarget, key: settingsKey });
      toast.success(format(strings.converted, { format: FORMAT_LABELS[effectiveTarget] }));
    } catch (error) {
      toast.error(error instanceof UnsupportedFormatError ? common.webpUnsupported : common.exportError);
    } finally {
      setConverting(false);
    }
  }

  function download() {
    if (!current || !file) return;
    downloadBlob(current.blob, `${baseName(file.name)}.${current.format}`);
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
          {inputFormat && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">{strings.from}:</span>
              <Badge variant="primary">{FORMAT_LABELS[inputFormat]}</Badge>
              <ArrowRight aria-hidden="true" className="size-4 text-muted" />
              <Badge variant="primary">{FORMAT_LABELS[effectiveTarget]}</Badge>
            </div>
          )}
          <SegmentedControl
            label={strings.to}
            value={effectiveTarget}
            options={targets.map((option) => ({ value: option, label: FORMAT_LABELS[option] }))}
            onChange={setTarget}
          />
          {lossy && (
            <RangeField
              label={strings.quality}
              value={quality}
              min={10}
              max={100}
              onChange={setQuality}
            />
          )}
          {effectiveTarget === "jpg" && (
            <div className="space-y-1.5">
              <ColorField label={strings.background} value={background} onChange={setBackground} />
              <p className="text-xs leading-relaxed text-muted">{strings.backgroundHint}</p>
            </div>
          )}
        </ControlSection>

        <Button size="lg" className="w-full" onClick={runConversion} disabled={!source || converting}>
          {converting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <RefreshCw aria-hidden="true" />
          )}
          {converting ? strings.converting : strings.convert}
        </Button>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{strings.result}</h2>
        <div className="mt-5" aria-live="polite">
          {!source ? (
            <ToolEmptyState>{strings.empty}</ToolEmptyState>
          ) : !current ? (
            <ToolEmptyState>{strings.pending}</ToolEmptyState>
          ) : (
            <div className="space-y-5">
              <div
                className="bg-checkerboard mx-auto overflow-hidden rounded-xl border border-border"
                style={{
                  aspectRatio: `${source.width} / ${source.height}`,
                  width: `min(100%, calc(60vh * ${source.width / source.height}))`,
                }}
              >
                <img src={current.url} alt={strings.result} className="size-full object-contain" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">{FORMAT_LABELS[current.format]}</span>
                  {" · "}
                  {source.width} × {source.height} px · {formatBytes(current.blob.size, locale)}
                </p>
                <Button size="lg" onClick={download} className="w-full sm:w-auto">
                  <Download aria-hidden="true" />
                  {format(strings.download, { format: FORMAT_LABELS[current.format] })}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
