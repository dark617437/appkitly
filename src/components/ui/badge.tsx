import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "primary" | "neutral";

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary-soft text-primary-soft-foreground",
  neutral: "border border-border bg-surface text-muted",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
