"use client";

import { usePathname } from "next/navigation";
import { localeInfo, localizePath, locales, parsePathname, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const { path } = parsePathname(usePathname());

  return (
    <nav aria-label={label} className="flex items-center rounded-lg border border-border bg-surface p-0.5">
      {locales.map((option) => {
        const active = option === locale;
        return (
          // Plain anchors: each locale has its own root layout, so switching is a full page load.
          <a
            key={option}
            href={localizePath(path, option)}
            hrefLang={option}
            lang={option}
            aria-current={active ? "true" : undefined}
            title={localeInfo[option].label}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted hover:text-foreground",
            )}
          >
            <span aria-hidden="true">{localeInfo[option].short}</span>
            <span className="sr-only">{localeInfo[option].label}</span>
          </a>
        );
      })}
    </nav>
  );
}
