"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface CompareSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  width: number;
  height: number;
  transparent?: boolean;
}

/** Before/after comparison. The range input underneath keeps it keyboard accessible. */
export function CompareSlider({
  beforeUrl,
  afterUrl,
  beforeLabel,
  afterLabel,
  sliderLabel,
  width,
  height,
  transparent = true,
}: CompareSliderProps) {
  const [split, setSplit] = useState(50);
  const ratio = width / height;

  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden rounded-xl border border-border select-none",
        transparent ? "bg-checkerboard" : "bg-card",
      )}
      // Fit tall screenshots within the viewport height while keeping the aspect ratio.
      style={{ aspectRatio: `${width} / ${height}`, width: `min(100%, calc(65vh * ${ratio}))` }}
    >
      <img src={afterUrl} alt={afterLabel} className="absolute inset-0 size-full object-contain" draggable={false} />
      <img
        src={beforeUrl}
        alt={beforeLabel}
        className="absolute inset-0 size-full object-contain"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        draggable={false}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.2)]"
        style={{ left: `${split}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-md">
          ⇆
        </span>
      </div>
      <span className="pointer-events-none absolute top-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
        {afterLabel}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label={sliderLabel}
        // Vertical swipes still scroll the page on touch screens.
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
