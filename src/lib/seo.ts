import type { Metadata } from "next";
import { defaultLocale, localeInfo, localizePath, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "./site";

interface PageMetadataInput {
  locale: Locale;
  /** Locale-neutral path, e.g. "/tools". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
  /** Path of the 1200 × 630 social sharing image. */
  image?: string;
  /** Open Graph type: "article" for blog posts. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Locales where this page exists. Defaults to all locales. */
  availableLocales?: readonly Locale[];
}

/** Hreflang alternates for a locale-neutral path, including x-default when English exists. */
export function languageAlternates(path: string, available: readonly Locale[] = locales): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of available) {
    languages[locale] = localizePath(path, locale);
  }
  if (available.includes(defaultLocale)) languages["x-default"] = localizePath(path, defaultLocale);
  return languages;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  availableLocales = locales,
}: PageMetadataInput): Metadata {
  const url = localizePath(path, locale);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: fullTitle }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, availableLocales),
    },
    openGraph: {
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
      images,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: availableLocales
        .filter((other) => other !== locale)
        .map((other) => localeInfo[other].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images?.map((item) => item.url),
    },
  };
}
