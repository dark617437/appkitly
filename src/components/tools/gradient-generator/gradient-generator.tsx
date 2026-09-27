"use client";

import { useState } from "react";
import { Copy, Dices, Plus, Trash2 } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format } from "@/i18n/format";
import { mixHex, oklchToHex } from "@/lib/color";
import { copyText } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ColorField, ControlSection, RangeField, SegmentedControl } from "@/components/ui/form-controls";

type GradientType = "linear" | "radial";
type RadialShape = "circle" | "ellipse";
type RadialPosition = "center" | "top" | "bottom" | "left" | "right";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

interface GradientState {
  type: GradientType;
  angle: number;
  shape: RadialShape;
  center: RadialPosition;
  stops: ColorStop[];
}

const MAX_STOPS = 5;

let stopCounter = 0;
function newStopId() {
  stopCounter += 1;
  return `stop-${stopCounter}`;
}

function stopsFrom(colors: string[]): ColorStop[] {
  return colors.map((color, index) => ({
    id: newStopId(),
    color,
    position: Math.round((index / (colors.length - 1)) * 100),
  }));
}

const PRESETS: { colors: string[]; angle: number }[] = [
  { colors: ["#6366f1", "#a855f7"], angle: 135 },
  { colors: ["#06b6d4", "#3b82f6"], angle: 135 },
  { colors: ["#f97316", "#ec4899"], angle: 135 },
  { colors: ["#22c55e", "#14b8a6"], angle: 120 },
  { colors: ["#0f172a", "#334155"], angle: 180 },
  { colors: ["#fde68a", "#f472b6", "#8b5cf6"], angle: 120 },
  { colors: ["#e0e7ff", "#fdf2f8"], angle: 180 },
  { colors: ["#ff9a9e", "#fad0c4"], angle: 45 },
];

const INITIAL: GradientState = {
  type: "linear",
  angle: 135,
  shape: "circle",
  center: "center",
  // Fixed ids so the server and client render the same markup.
  stops: [
    { id: "initial-1", color: "#6366f1", position: 0 },
    { id: "initial-2", color: "#a855f7", position: 100 },
  ],
};

function gradientCss(state: GradientState): string {
  const stops = [...state.stops]
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");
  if (state.type === "linear") return `linear-gradient(${state.angle}deg, ${stops})`;
  return `radial-gradient(${state.shape} at ${state.center}, ${stops})`;
}

function randomGradient(current: GradientState): GradientState {
  const hue = Math.random() * 360;
  const count = Math.random() < 0.3 ? 3 : 2;
  const colors = Array.from({ length: count }, (_, i) =>
    oklchToHex(0.62 + Math.random() * 0.2, 0.12 + Math.random() * 0.08, (hue + i * (40 + Math.random() * 60)) % 360),
  );
  return {
    ...current,
    angle: Math.round((Math.random() * 360) / 15) * 15,
    stops: stopsFrom(colors),
  };
}

interface GradientGeneratorProps {
  strings: ToolUiStrings["gradientGenerator"];
  common: ToolUiStrings["common"];
}

export function GradientGenerator({ strings, common }: GradientGeneratorProps) {
  const [state, setState] = useState<GradientState>(INITIAL);
  const css = gradientCss(state);
  const code = `background: ${state.stops[0]?.color ?? "#000000"};\nbackground: ${css};`;

  function update(patch: Partial<GradientState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateStop(id: string, patch: Partial<ColorStop>) {
    setState((current) => ({
      ...current,
      stops: current.stops.map((stop) => (stop.id === id ? { ...stop, ...patch } : stop)),
    }));
  }

  function addStop() {
    setState((current) => {
      if (current.stops.length >= MAX_STOPS) return current;
      const sorted = [...current.stops].sort((a, b) => a.position - b.position);
      // Insert in the widest gap between existing stops.
      let gapIndex = 0;
      let gap = -1;
      for (let i = 0; i < sorted.length - 1; i++) {
        const size = sorted[i + 1].position - sorted[i].position;
        if (size > gap) {
          gap = size;
          gapIndex = i;
        }
      }
      const [left, right] = [sorted[gapIndex], sorted[gapIndex + 1]];
      const stop = {
        id: newStopId(),
        color: mixHex(left.color, right.color, 0.5),
        position: Math.round((left.position + right.position) / 2),
      };
      return { ...current, stops: [...current.stops, stop] };
    });
  }

  function removeStop(id: string) {
    setState((current) =>
      current.stops.length <= 2 ? current : { ...current, stops: current.stops.filter((stop) => stop.id !== id) },
    );
  }

  async function copyCss() {
    const ok = await copyText(code);
    if (ok) toast.success(common.copied);
    else toast.error(common.copyFailed);
  }

  const positionOptions = (Object.keys(strings.positions) as RadialPosition[]).map((value) => ({
    value,
    label: strings.positions[value],
  }));

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <Card className="order-2 space-y-8 p-5 sm:p-6 lg:order-1">
        <ControlSection title={common.settings}>
          <SegmentedControl
            label={strings.type}
            value={state.type}
            options={[
              { value: "linear", label: strings.linear },
              { value: "radial", label: strings.radial },
            ]}
            onChange={(type) => update({ type })}
          />
          {state.type === "linear" ? (
            <RangeField
              label={strings.angle}
              value={state.angle}
              min={0}
              max={360}
              onChange={(angle) => update({ angle })}
              format={(value) => `${value}°`}
            />
          ) : (
            <>
              <SegmentedControl
                label={strings.shape}
                value={state.shape}
                options={[
                  { value: "circle", label: strings.circle },
                  { value: "ellipse", label: strings.ellipse },
                ]}
                onChange={(shape) => update({ shape })}
              />
              <SegmentedControl
                label={strings.position}
                value={state.center}
                options={positionOptions}
                onChange={(center) => update({ center })}
              />
            </>
          )}
        </ControlSection>

        <ControlSection
          title={strings.colors}
          action={
            <Button variant="secondary" size="sm" onClick={addStop} disabled={state.stops.length >= MAX_STOPS}>
              <Plus aria-hidden="true" />
              {strings.addColor}
            </Button>
          }
        >
          <ol className="space-y-4">
            {state.stops.map((stop, index) => (
              <li key={stop.id} className="space-y-3 rounded-xl border border-border bg-surface p-3">
                <div className="flex items-end gap-2">
                  <ColorField
                    className="flex-1"
                    label={format(strings.color, { index: index + 1 })}
                    value={stop.color}
                    onChange={(color) => updateStop(stop.id, { color })}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStop(stop.id)}
                    disabled={state.stops.length <= 2}
                    aria-label={format(strings.removeColor, { index: index + 1 })}
                    title={format(strings.removeColor, { index: index + 1 })}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>
                <RangeField
                  label={format(strings.stopPosition, { index: index + 1 })}
                  value={stop.position}
                  min={0}
                  max={100}
                  onChange={(position) => updateStop(stop.id, { position })}
                  format={(value) => `${value}%`}
                />
              </li>
            ))}
          </ol>
        </ControlSection>
      </Card>

      <div className="order-1 space-y-6 lg:order-2">
        <Card className="space-y-5 p-5 sm:p-6">
          <div
            role="img"
            aria-label={strings.preview}
            className="h-56 w-full rounded-xl border border-border shadow-inner sm:h-80"
            style={{ backgroundImage: css }}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">{strings.presets}</h2>
              <Button variant="secondary" size="sm" onClick={() => setState((current) => randomGradient(current))}>
                <Dices aria-hidden="true" />
                {strings.random}
              </Button>
            </div>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {PRESETS.map((preset, index) => {
                const presetCss = `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          type: "linear",
                          angle: preset.angle,
                          stops: stopsFrom(preset.colors),
                        }))
                      }
                      aria-label={format(strings.preset, { index: index + 1 })}
                      title={format(strings.preset, { index: index + 1 })}
                      className="block aspect-square w-full rounded-lg border border-border shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      style={{ backgroundImage: presetCss }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>

        <Card className="space-y-3 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">{strings.css}</h2>
            <Button size="sm" onClick={copyCss}>
              <Copy aria-hidden="true" />
              {strings.copyCss}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed text-foreground">
            <code>{code}</code>
          </pre>
        </Card>
      </div>
    </div>
  );
}
