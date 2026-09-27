"use client";

import { useId, useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { ImageUp, RefreshCw, Trash2 } from "lucide-react";
import { formatBytes, MAX_FILE_SIZE } from "@/lib/image";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";
import { format } from "@/i18n/format";

export interface DropzoneStrings {
  title: string;
  browse: string;
  hint: string;
  replace: string;
  remove: string;
  invalidType: string;
  tooLarge: string;
  dimensions: string;
}

export interface DropzonePreview {
  url: string;
  width: number;
  height: number;
}

interface FileDropzoneProps {
  /** Accepted MIME types, e.g. ["image/png", "image/jpeg"]. */
  accept: string[];
  /** Extensions matching `accept`, used when the browser reports no MIME type. */
  extensions: string[];
  maxSize?: number;
  file: File | null;
  preview?: DropzonePreview | null;
  onFileChange: (file: File | null) => void;
  strings: DropzoneStrings;
  locale: string;
  /** Smaller layout for editor side panels. */
  compact?: boolean;
  label?: string;
  className?: string;
}

function matchesType(file: File, accept: string[], extensions: string[]) {
  if (file.type) return accept.includes(file.type);
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  return extensions.includes(extension);
}

export function FileDropzone({
  accept,
  extensions,
  maxSize = MAX_FILE_SIZE,
  file,
  preview,
  onFileChange,
  strings,
  locale,
  compact = false,
  label,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();
  const maxLabel = formatBytes(maxSize, locale);

  function handleFile(candidate: File | undefined) {
    if (!candidate) return;
    if (!matchesType(candidate, accept, extensions)) {
      setError(strings.invalidType);
      toast.error(strings.invalidType);
      return;
    }
    if (candidate.size > maxSize) {
      const message = format(strings.tooLarge, { max: maxLabel });
      setError(message);
      toast.error(message);
      return;
    }
    setError(null);
    onFileChange(candidate);
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={accept.join(",")}
      className="sr-only"
      tabIndex={-1}
      aria-hidden="true"
      onChange={(event) => {
        handleFile(event.target.files?.[0]);
        // Allow picking the same file again after removing it.
        event.target.value = "";
      }}
    />
  );

  const hint = format(strings.hint, { max: maxLabel });

  if (file) {
    return (
      <div className={cn("space-y-2", className)}>
        {label && <p className="text-sm font-medium text-foreground">{label}</p>}
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors",
            dragging && "border-primary bg-primary-soft",
          )}
        >
          <div className="bg-checkerboard flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border">
            {preview && (
              <img src={preview.url} alt="" className="max-h-full max-w-full object-contain" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground" title={file.name}>
              {file.name}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {formatBytes(file.size, locale)}
              {preview &&
                ` · ${format(strings.dimensions, { width: preview.width, height: preview.height })}`}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={openPicker}
              aria-label={strings.replace}
              title={strings.replace}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setError(null);
                onFileChange(null);
              }}
              aria-label={strings.remove}
              title={strings.remove}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <Trash2 aria-hidden="true" className="size-4" />
            </button>
          </div>
          {input}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}
      <div
        role="button"
        tabIndex={0}
        aria-describedby={error ? errorId : undefined}
        aria-label={label ? `${label}: ${strings.title}` : undefined}
        onClick={openPicker}
        onKeyDown={onKeyDown}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-strong bg-surface text-center transition-colors hover:border-primary hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          compact ? "gap-2 px-4 py-6" : "gap-3 px-6 py-12 sm:py-16",
          dragging && "border-primary bg-primary-soft",
          error && "border-red-400 dark:border-red-500/70",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-xl bg-card text-primary-text shadow-sm ring-1 ring-border",
            compact ? "size-10" : "size-12",
          )}
        >
          <ImageUp aria-hidden="true" className={compact ? "size-5" : "size-6"} />
        </span>
        <div>
          <p className={cn("font-medium text-foreground", compact ? "text-sm" : "text-base")}>
            {strings.title}
          </p>
          <p className="mt-1 text-sm text-muted">
            <span className="font-medium text-primary-text underline-offset-2 group-hover:underline">
              {strings.browse}
            </span>
          </p>
        </div>
        <p className="text-xs text-muted">{hint}</p>
      </div>
      {/* Outside the button role: a control can't contain another interactive element. */}
      {input}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
