"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Copy, Lock, LockOpen, Pipette, Shuffle } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import { generatePalette, normalizeHex, readableTextColor } from "@/lib/color";
import { copyText } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// A fixed first palette keeps server and client renders identical.
const INITIAL_PALETTE = ["#eef2ff", "#a5b4fc", "#6366f1", "#4338ca", "#1e1b4b"];

interface ColorPaletteGeneratorProps {
  strings: ToolUiStrings["colorPaletteGenerator"];
  common: ToolUiStrings["common"];
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName)
  );
}

export function ColorPaletteGenerator({ strings, common }: ColorPaletteGeneratorProps) {
  const [colors, setColors] = useState<string[]>(INITIAL_PALETTE);
  const [locked, setLocked] = useState<boolean[]>(() => INITIAL_PALETTE.map(() => false));

  const generate = useCallback(() => {
    setColors((current) => generatePalette(current, locked));
  }, [locked]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code !== "Space" || event.repeat || isTypingTarget(event.target)) return;
      event.preventDefault();
      generate();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [generate]);

  async function copy(text: string) {
    const ok = await copyText(text);
    if (ok) toast.success(common.copied);
    else toast.error(common.copyFailed);
  }

  function setColor(index: number, value: string) {
    const normalized = normalizeHex(value);
    if (!normalized) return;
    setColors((current) => current.map((color, i) => (i === index ? normalized : color)));
  }

  function toggleLock(index: number) {
    setLocked((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  const cssVariables = `:root {\n${colors.map((color, i) => `  --color-${i + 1}: ${color};`).join("\n")}\n}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button size="lg" onClick={generate}>
            <Shuffle aria-hidden="true" />
            {strings.generate}
          </Button>
          <Button size="lg" variant="secondary" onClick={() => copy(colors.join(", "))}>
            <Copy aria-hidden="true" />
            {strings.copyAll}
          </Button>
          <Button size="lg" variant="secondary" onClick={() => copy(cssVariables)}>
            <Copy aria-hidden="true" />
            {strings.copyCss}
          </Button>
        </div>
        <p className="hidden text-sm text-muted md:block">{strings.spaceHint}</p>
      </div>

      <ul
        aria-label={strings.paletteLabel}
        className="grid overflow-hidden rounded-2xl border border-border shadow-sm md:h-[26rem] md:grid-cols-5"
      >
        {colors.map((color, index) => {
          const text = readableTextColor(color);
          const position = index + 1;
          const isLocked = locked[index];
          return (
            <li
              key={index}
              className="flex min-h-28 items-center justify-between gap-3 px-5 py-4 transition-colors duration-300 md:flex-col md:justify-end md:px-3 md:py-8"
              style={{ backgroundColor: color, color: text }}
            >
              <div className="md:order-2 md:text-center">
                <p className="font-mono text-xl font-bold tracking-wide">
                  <span className="sr-only">{format(strings.colorLabel, { index: position })}: </span>
                  {color.toUpperCase().slice(1)}
                </p>
              </div>

              <div className="flex items-center gap-1 md:order-1 md:mb-4 md:flex-col">
                <SwatchButton
                  label={format(isLocked ? strings.unlock : strings.lock, { index: position })}
                  pressed={isLocked}
                  onClick={() => toggleLock(index)}
                >
                  {isLocked ? <Lock aria-hidden="true" /> : <LockOpen aria-hidden="true" />}
                </SwatchButton>
                <SwatchButton
                  label={format(strings.copyHex, { hex: color.toUpperCase() })}
                  onClick={() => copy(color.toUpperCase())}
                >
                  <Copy aria-hidden="true" />
                </SwatchButton>
                <span className="relative flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-black/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-current">
                  <Pipette aria-hidden="true" className="size-4" />
                  <input
                    type="color"
                    value={color}
                    onChange={(event) => setColor(index, event.target.value)}
                    aria-label={format(strings.edit, { index: position })}
                    title={format(strings.edit, { index: position })}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                  />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SwatchButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-current [&_svg]:size-4",
        pressed && "bg-black/10",
      )}
    >
      {children}
    </button>
  );
}
