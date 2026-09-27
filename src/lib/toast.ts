export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

type Listener = () => void;

let toasts: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<Listener>();
const EMPTY: ToastItem[] = [];

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToasts(): ToastItem[] {
  return toasts;
}

export function getServerToasts(): ToastItem[] {
  return EMPTY;
}

export function dismissToast(id: number): void {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

function push(message: string, variant: ToastVariant, duration: number) {
  const id = nextId++;
  // Keep at most four toasts on screen.
  toasts = [...toasts.slice(-3), { id, message, variant }];
  emit();
  setTimeout(() => dismissToast(id), duration);
}

export const toast = {
  success: (message: string) => push(message, "success", 3500),
  info: (message: string) => push(message, "info", 3500),
  error: (message: string) => push(message, "error", 6000),
};
