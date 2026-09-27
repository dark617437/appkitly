"use client";

import { useSyncExternalStore } from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { dismissToast, getServerToasts, getToasts, subscribeToasts, type ToastVariant } from "@/lib/toast";
import { cn } from "@/lib/cn";

const icons: Record<ToastVariant, typeof Info> = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
};

const iconColors: Record<ToastVariant, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-primary-text",
};

export function Toaster({ closeLabel }: { closeLabel: string }) {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
    >
      {toasts.map((item) => {
        const Icon = icons[item.variant];
        return (
          <div
            key={item.id}
            role={item.variant === "error" ? "alert" : "status"}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground shadow-lg shadow-black/10"
          >
            <Icon aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", iconColors[item.variant])} />
            <p className="flex-1 leading-relaxed">{item.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(item.id)}
              aria-label={closeLabel}
              className="-m-1 rounded-md p-1 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
