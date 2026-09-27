import type { Metadata, Viewport } from "next";
import { locales, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getToolContent } from "@/i18n/get-tool-content";
import { blogPath, getPost } from "@/lib/blog";
import { ogImagePath } from "@/lib/og";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { categoryPath, toolPath, type ToolCategory, type ToolSlug } from "@/lib/tools";

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: { default: dict.meta.defaultTitle, template: `%s | ${siteConfig.name}` },
    description: dict.meta.defaultDescription,
  };
}

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c14" },
  ],
};

export function homeMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/",
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    absoluteTitle: true,
    image: ogImagePath(locale, "home"),
  });
}

export function toolsMetadata(locale: Locale, category: ToolCategory | null): Metadata {
  const dict = getDictionary(locale);
  if (!category) {
    return buildMetadata({
      locale,
      path: categoryPath(null),
      title: dict.meta.toolsTitle,
      description: dict.meta.toolsDescription,
      image: ogImagePath(locale, "tools"),
    });
  }
  const text = dict.categories[category];
  return buildMetadata({
    locale,
    path: categoryPath(category),
    title: format(dict.meta.categoryTitle, { category: text.name }),
    description: text.description,
    image: ogImagePath(locale, `tools-${category}`),
  });
}

export function toolMetadata(locale: Locale, slug: ToolSlug): Metadata {
  const content = getToolContent(locale, slug);
  return buildMetadata({
    locale,
    path: toolPath(slug),
    title: content.seoTitle,
    description: content.seoDescription,
    image: ogImagePath(locale, slug),
  });
}

export function blogIndexMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: blogPath(),
    title: dict.blog.metaTitle,
    description: dict.blog.description,
    image: ogImagePath(locale, "blog"),
  });
}

export function blogPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: blogPath(slug),
    title: post.title,
    description: post.description,
    image: ogImagePath(locale, `blog-${slug}`),
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    availableLocales: locales.filter((other) => getPost(other, slug)),
  });
}
