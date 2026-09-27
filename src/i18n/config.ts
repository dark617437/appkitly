export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeInfo: Record<
  Locale,
  { label: string; short: string; ogLocale: string }
> = {
  en: { label: "English", short: "EN", ogLocale: "en_US" },
  tr: { label: "Türkçe", short: "TR", ogLocale: "tr_TR" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Turns a locale-neutral path ("/tools") into the public URL path for a locale.
 * English lives at the root, other locales are prefixed ("/tr/tools").
 */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/** Splits a public pathname into its locale and locale-neutral path. */
export function parsePathname(pathname: string): { locale: Locale; path: string } {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}`) return { locale, path: "/" };
    if (pathname.startsWith(`/${locale}/`)) {
      return { locale, path: pathname.slice(locale.length + 1) };
    }
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
