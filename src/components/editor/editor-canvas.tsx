"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { getContext } from "@/lib/image";
import { ensureFonts, hitTest, layerBox, renderScene, toScene, type Box, type Point } from "./render";
import type { AssetMap, ImageLayer, Layer, Scene, TextLayer } from "./types";

export type LayerPatch = Partial<Omit<TextLayer, "kind" | "id">> & Partial<Omit<ImageLayer, "kind" | "id">>;

type DragMode = "move" | "resize" | "rotate";

interface Drag {
  mode: DragMode;
  layer: Layer;
  box: Box;
  start: Point;
  group: string;
}

// Sizes in CSS pixels, converted to scene pixels at the current zoom.
const HANDLE = 12;
const ROTATE_OFFSET = 32;
const SNAP = 8;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Handle positions in scene pixels. They are kept inside the visible canvas, so a layer
 * that extends past the edges can still be resized and rotated.
 */
function handlePoints(box: Box, scene: Scene, unit: number) {
  const margin = (HANDLE / 2 + 2) * unit;
  const inside = (point: Point): Point => ({
    x: clamp(point.x, margin, scene.width - margin),
    y: clamp(point.y, margin, scene.height - margin),
  });
  return {
    resize: inside(toScene({ x: box.width / 2, y: box.height / 2 }, box)),
    rotate: inside(toScene({ x: 0, y: -box.height / 2 - ROTATE_OFFSET * unit }, box)),
    rotateAnchor: toScene({ x: 0, y: -box.height / 2 }, box),
  };
}

function normalizeAngle(angle: number): number {
  let value = angle % 360;
  if (value > 180) value -= 360;
  if (value <= -180) value += 360;
  return value;
}

interface EditorCanvasProps {
  scene: Scene;
  assets: AssetMap;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLayerChange: (id: string, patch: LayerPatch, group: string) => void;
  placeholderLabels: Record<string, string>;
  label: string;
}

export function EditorCanvas({
  scene,
  assets,
  selectedId,
  onSelect,
  onLayerChange,
  placeholderLabels,
  label,
}: EditorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const guidesRef = useRef({ x: false, y: false });
  const gestureRef = useRef(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  // Bumped when fonts load or overlays change, to trigger a redraw.
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const fontKey = scene.layers
    .filter((layer): layer is TextLayer => layer.kind === "text")
    .map((layer) => `${layer.fontWeight}:${layer.text}`)
    .join("|");

  useEffect(() => {
    let active = true;
    ensureFonts(scene).then(() => {
      if (active) setVersion((value) => value + 1);
    });
    return () => {
      active = false;
    };
    // Only reload fonts when weights or text change, not on every move.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.max(1, Math.round(size.width * dpr));
    const pixelHeight = Math.max(1, Math.round(size.height * dpr));
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;

    const context = getContext(canvas);
    const scale = pixelWidth / scene.width;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, scene.width, scene.height);
    renderScene(context, scene, assets, { scale, preview: true, placeholderLabels });

    // Selection outline, resize and rotate handles, snap guides: preview only.
    const unit = scene.width / size.width;
    const selected = scene.layers.find((layer) => layer.id === selectedId && layer.visible);
    if (selected) {
      const box = layerBox(selected, scene, assets);
      context.save();
      context.lineWidth = 1.5 * unit;
      context.strokeStyle = "#6366f1";
      context.fillStyle = "#ffffff";
      context.save();
      context.translate(box.cx, box.cy);
      context.rotate((box.rotation * Math.PI) / 180);
      context.strokeRect(-box.width / 2, -box.height / 2, box.width, box.height);
      context.restore();
      const handles = handlePoints(box, scene, unit);
      context.beginPath();
      context.moveTo(handles.rotateAnchor.x, handles.rotateAnchor.y);
      context.lineTo(handles.rotate.x, handles.rotate.y);
      context.stroke();
      context.beginPath();
      context.arc(handles.rotate.x, handles.rotate.y, (HANDLE / 2) * unit, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      const half = (HANDLE / 2) * unit;
      context.fillRect(handles.resize.x - half, handles.resize.y - half, half * 2, half * 2);
      context.strokeRect(handles.resize.x - half, handles.resize.y - half, half * 2, half * 2);
      context.restore();
    }
    const guides = guidesRef.current;
    if (guides.x || guides.y) {
      context.save();
      context.strokeStyle = "#ec4899";
      context.lineWidth = unit;
      context.setLineDash([6 * unit, 4 * unit]);
      context.beginPath();
      if (guides.x) {
        context.moveTo(scene.width / 2, 0);
        context.lineTo(scene.width / 2, scene.height);
      }
      if (guides.y) {
        context.moveTo(0, scene.height / 2);
        context.lineTo(scene.width, scene.height / 2);
      }
      context.stroke();
      context.restore();
    }
  }, [scene, assets, selectedId, size, version, placeholderLabels]);

  function toPoint(event: PointerEvent<HTMLCanvasElement>): { point: Point; unit: number } {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      point: {
        x: ((event.clientX - rect.left) / rect.width) * scene.width,
        y: ((event.clientY - rect.top) / rect.height) * scene.height,
      },
      unit: scene.width / rect.width,
    };
  }

  function handleAt(point: Point, box: Box, unit: number, touch: boolean): DragMode | null {
    const tolerance = (touch ? 22 : 12) * unit;
    const handles = handlePoints(box, scene, unit);
    if (Math.hypot(point.x - handles.resize.x, point.y - handles.resize.y) <= tolerance) return "resize";
    if (Math.hypot(point.x - handles.rotate.x, point.y - handles.rotate.y) <= tolerance) return "rotate";
    return null;
  }

  function onPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0) return;
    const { point, unit } = toPoint(event);
    const touch = event.pointerType === "touch";

    let mode: DragMode = "move";
    let target: Layer | undefined;
    const selected = scene.layers.find((layer) => layer.id === selectedId && layer.visible);
    if (selected) {
      const handle = handleAt(point, layerBox(selected, scene, assets), unit, touch);
      if (handle) {
        mode = handle;
        target = selected;
      }
    }
    if (!target) {
      const id = hitTest(point, scene, assets);
      target = scene.layers.find((layer) => layer.id === id);
    }

    onSelect(target?.id ?? null);
    if (!target) return;

    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // The pointer may already be gone (e.g. a cancelled touch); dragging still works without capture.
    }
    gestureRef.current += 1;
    dragRef.current = {
      mode,
      layer: target,
      box: layerBox(target, scene, assets),
      start: point,
      group: `gesture:${gestureRef.current}`,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    const { point, unit } = toPoint(event);
    const drag = dragRef.current;
    const canvas = event.currentTarget;

    if (!drag) {
      const selected = scene.layers.find((layer) => layer.id === selectedId && layer.visible);
      const handle = selected
        ? handleAt(point, layerBox(selected, scene, assets), unit, event.pointerType === "touch")
        : null;
      canvas.style.cursor =
        handle === "resize" ? "nwse-resize" : handle === "rotate" ? "grab" : hitTest(point, scene, assets) ? "move" : "default";
      return;
    }

    const { layer, box, start, group } = drag;
    if (drag.mode === "move") {
      let cx = box.cx + point.x - start.x;
      let cy = box.cy + point.y - start.y;
      const snapX = Math.abs(cx - scene.width / 2) < SNAP * unit;
      const snapY = Math.abs(cy - scene.height / 2) < SNAP * unit;
      if (snapX) cx = scene.width / 2;
      if (snapY) cy = scene.height / 2;
      guidesRef.current = { x: snapX, y: snapY };
      onLayerChange(layer.id, { x: cx / scene.width, y: cy / scene.height }, group);
    } else if (drag.mode === "resize") {
      const startDistance = Math.max(1, Math.hypot(start.x - box.cx, start.y - box.cy));
      const ratio = Math.max(0.05, Math.hypot(point.x - box.cx, point.y - box.cy) / startDistance);
      if (layer.kind === "image") {
        onLayerChange(layer.id, { width: clamp(layer.width * ratio, 0.03, 2) }, group);
      } else {
        onLayerChange(
          layer.id,
          { fontSize: clamp(layer.fontSize * ratio, 0.01, 0.3), maxWidth: clamp(layer.maxWidth * ratio, 0.1, 1.5) },
          group,
        );
      }
    } else {
      const startAngle = Math.atan2(start.y - box.cy, start.x - box.cx);
      const angle = Math.atan2(point.y - box.cy, point.x - box.cx);
      let rotation = normalizeAngle(layer.rotation + ((angle - startAngle) * 180) / Math.PI);
      const nearest = Math.round(rotation / 15) * 15;
      // Snap to 15° steps when close, or always while Shift is held.
      if (event.shiftKey || Math.abs(rotation - nearest) < 3) rotation = nearest;
      onLayerChange(layer.id, { rotation: Math.round(normalizeAngle(rotation)) }, group);
    }
  }

  function endDrag(event: PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current) return;
    dragRef.current = null;
    guidesRef.current = { x: false, y: false };
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setVersion((value) => value + 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLCanvasElement>) {
    if (event.key === "Escape") {
      onSelect(null);
      return;
    }
    const layer = scene.layers.find((item) => item.id === selectedId);
    if (!layer) return;
    const step = event.shiftKey ? 10 : 1;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = delta[event.key];
    if (!move) return;
    event.preventDefault();
    onLayerChange(
      layer.id,
      { x: layer.x + move[0] / scene.width, y: layer.y + move[1] / scene.height },
      `nudge:${layer.id}`,
    );
  }

  const ratio = scene.width / scene.height;

  return (
    <div
      className="bg-checkerboard relative mx-auto overflow-hidden rounded-xl border border-border shadow-sm"
      style={{
        aspectRatio: `${scene.width} / ${scene.height}`,
        width: `min(100%, calc(var(--preview-max-h) * ${ratio}))`,
      }}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="absolute inset-0 size-full touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
    </div>
  );
}

