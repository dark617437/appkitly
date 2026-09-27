import "server-only";
import type { Locale } from "./config";
import { enToolUi, type ToolUiStrings } from "./tool-ui/en";
import { trToolUi } from "./tool-ui/tr";

const toolUi: Record<Locale, ToolUiStrings> = { en: enToolUi, tr: trToolUi };

export function getToolUi(locale: Locale): ToolUiStrings {
  return toolUi[locale];
}

export type { ToolUiStrings };
