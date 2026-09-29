import "server-only";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPosts } from "./blog";
import { toolCategories, tools } from "./tools";

export interface OgEntry {
  key: string;
  title: string;
  subtitle: string;
  label: string;
}

const labels: Record<Locale, { tool: string; guide: string; tools: string }> = {
  en: { tool: "Free tool", guide: "Guide", tools: "Free tools" },
  tr: { tool: "Ücretsiz araç", guide: "Rehber", tools: "Ücretsiz araçlar" },
};

/** Every social sharing image the site generates, one per indexable page. */
export function getOgEntries(locale: Locale): OgEntry[] {
  const dict = getDictionary(locale);
  const label = labels[locale];
  return [
    {
      key: "home",
      title: `${dict.home.heroTitleLead} ${dict.home.heroTitleAccent}`,
      subtitle: dict.footer.tagline,
      label: label.tools,
    },
    { key: "tools", title: dict.tools.title, subtitle: dict.tools.subtitle, label: label.tools },
    ...toolCategories.map((category) => ({
      key: `tools-${category}`,
      title: dict.categories[category].name,
      subtitle: dict.categories[category].description,
      label: label.tools,
    })),
    ...tools
      .filter((tool) => tool.status === "available")
      .map((tool) => ({
        key: tool.slug,
        title: dict.toolList[tool.slug].name,
        subtitle: dict.toolList[tool.slug].description,
        label: label.tool,
      })),
    { key: "blog", title: dict.blog.title, subtitle: dict.blog.description, label: label.guide },
    { key: "apps", title: dict.ourApps.title, subtitle: dict.ourApps.intro, label: "Incipient Apps" },
    { key: "privacy", title: dict.privacyPage.title, subtitle: dict.privacyPage.intro, label: "AppKitly" },
    ...getPosts(locale).map((post) => ({
      key: `blog-${post.slug}`,
      title: post.title,
      subtitle: post.description,
      label: label.guide,
    })),
  ];
}

export function ogImagePath(locale: Locale, key: string): string {
  return `/og/${locale}/${key}.png`;
}
