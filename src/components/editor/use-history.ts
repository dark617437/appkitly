"use client";

import { useCallback, useRef, useState } from "react";

const LIMIT = 60;
/** Changes in the same group within this window become a single undo step. */
const MERGE_WINDOW = 1000;

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * Undo/redo for editor state. Continuous edits (dragging, sliders, typing) pass a
 * `group` so they collapse into one step; a group starting with "gesture:" always
 * merges, which keeps one drag as one step no matter how long it takes.
 */
export function useHistory<T>(initial: () => T) {
  const [history, setHistory] = useState<HistoryState<T>>(() => ({ past: [], present: initial(), future: [] }));
  const last = useRef<{ group: string | null; time: number }>({ group: null, time: 0 });

  const update = useCallback((recipe: (current: T) => T, group?: string) => {
    const now = Date.now();
    const merge =
      group !== undefined &&
      group === last.current.group &&
      (group.startsWith("gesture:") || now - last.current.time < MERGE_WINDOW);
    last.current = { group: group ?? null, time: now };

    setHistory((current) => {
      const next = recipe(current.present);
      if (Object.is(next, current.present)) return current;
      if (merge) return { ...current, present: next, future: [] };
      return { past: [...current.past, current.present].slice(-LIMIT), present: next, future: [] };
    });
  }, []);

  const undo = useCallback(() => {
    last.current = { group: null, time: 0 };
    setHistory((current) => {
      if (current.past.length === 0) return current;
      return {
        past: current.past.slice(0, -1),
        present: current.past[current.past.length - 1],
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    last.current = { group: null, time: 0 };
    setHistory((current) => {
      if (current.future.length === 0) return current;
      return { past: [...current.past, current.present], present: current.future[0], future: current.future.slice(1) };
    });
  }, []);

  return {
    state: history.present,
    update,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
