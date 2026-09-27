import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ToolEmptyState({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-strong px-6 py-12 text-center text-sm text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
