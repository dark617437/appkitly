import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export function PrivacyNote({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
        className,
      )}
    >
      <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
