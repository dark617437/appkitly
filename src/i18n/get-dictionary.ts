import "server-only";
import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { tr } from "./dictionaries/tr";

const dictionaries: Record<Locale, Dictionary> = { en, tr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
