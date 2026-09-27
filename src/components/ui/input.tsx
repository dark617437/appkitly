import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const inputBase =
  "h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3.5 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/80 hover:border-border-strong focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm";

type InputProps = ComponentProps<"input"> & {
  /** Decorative icon rendered inside the field, before the text. */
  icon?: ReactNode;
};

export function Input({ className, icon, ...props }: InputProps) {
  if (!icon) return <input className={cn(inputBase, className)} {...props} />;

  return (
    <div className="relative w-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted [&_svg]:size-4"
      >
        {icon}
      </span>
      <input className={cn(inputBase, "pl-10", className)} {...props} />
    </div>
  );
}
