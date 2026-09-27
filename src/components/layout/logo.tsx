import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient id="appkitly-logo-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#appkitly-logo-bg)" />
      <rect x="8" y="8" width="7" height="7" rx="2" fill="#fff" />
      <rect x="8" y="17" width="7" height="7" rx="2" fill="#fff" fillOpacity="0.7" />
      <rect x="17" y="17" width="7" height="7" rx="2" fill="#fff" />
      <circle cx="20.5" cy="11.5" r="3.5" fill="#c7d2fe" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        App<span className="text-primary-text">Kitly</span>
      </span>
    </span>
  );
}
