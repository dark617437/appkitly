import type { MetadataRoute } from "next";
import { localizePath, locales, type Locale } from "@/i18n/config";
import { blogPath, getPost, getPosts } from "@/lib/blog";
import { languageAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { categoryPath, toolCategories, toolPath, tools } from "@/lib/tools";

interface SitemapPage {
  /** Locale-neutral path. */
  path: string;
  /** Locales where the page exists. */
  available: readonly Locale[];
  lastModified?: string;
}

function indexablePages(): SitemapPage[] {
  const all = locales;
  const postSlugs = new Set(locales.flatMap((locale) => getPosts(locale).map((post) => post.slug)));

  return [
    { path: "/", available: all },
    { path: categoryPath(null), available: all },
    ...toolCategories.map((category) => ({ path: categoryPath(category), available: all })),
    ...tools.filter((tool) => tool.status === "available").map((tool) => ({ path: toolPath(tool.slug), available: all })),
    { path: blogPath(), available: all },
    ...[...postSlugs].map((slug) => {
      const available = locales.filter((locale) => getPost(locale, slug));
      const updated = available.map((locale) => getPost(locale, slug)?.updated ?? "").sort().at(-1);
      return { path: blogPath(slug), available, lastModified: updated };
    }),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages().flatMap(({ path, available, lastModified }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path, available)).map(([lang, href]) => [lang, absoluteUrl(href)]),
    );
    return available.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages },
    }));
  });
}
