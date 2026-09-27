import "server-only";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { toolPath, type Tool } from "@/lib/tools";
import type { ToolCardData } from "./tool-card";

/** Resolves a registry tool into translated, serializable card data. */
export function toToolCardData(tool: Tool, locale: Locale, dict: Dictionary): ToolCardData {
  const text = dict.toolList[tool.slug];
  return {
    slug: tool.slug,
    name: text.name,
    description: text.description,
    icon: tool.icon,
    status: tool.status,
    href: localizePath(toolPath(tool.slug), locale),
    categoryLabels: tool.categories.map((category) => dict.categories[category].shortName),
  };
}
