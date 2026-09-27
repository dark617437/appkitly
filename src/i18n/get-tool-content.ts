import "server-only";
import type { Locale } from "./config";
import { enToolContent, type ToolContent } from "./tool-content/en";
import { trToolContent } from "./tool-content/tr";
import type { ToolSlug } from "@/lib/tools";

const content: Record<Locale, Record<ToolSlug, ToolContent>> = { en: enToolContent, tr: trToolContent };

export function getToolContent(locale: Locale, slug: ToolSlug): ToolContent {
  return content[locale][slug];
}

export type { ToolContent };
