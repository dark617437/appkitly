import type { Locale } from "@/i18n/config";

/** Android apps published by Incipient Apps, the team behind AppKitly. */
export type OurAppId = "ezan-vakti" | "durum-indirici" | "kelime-koprusu" | "kabe-yonu" | "football-striker";

export interface OurApp {
  id: OurAppId;
  packageId: string;
  /** Icon in /public/apps. Some apps use a different icon per store language. */
  icon: string | Record<Locale, string>;
  /** schema.org application category. */
  schemaCategory: "LifestyleApplication" | "UtilitiesApplication" | "GameApplication";
}

export const developerName = "Incipient Apps";

export const ourApps: OurApp[] = [
  {
    id: "ezan-vakti",
    packageId: "com.incipientapps.islami_ogreniyorum",
    icon: "/apps/ezan-vakti.webp",
    schemaCategory: "LifestyleApplication",
  },
  {
    id: "durum-indirici",
    packageId: "com.incipientapps.durumapp",
    icon: "/apps/durum-indirici.webp",
    schemaCategory: "UtilitiesApplication",
  },
  {
    id: "kelime-koprusu",
    packageId: "com.kksavasi.kelimekoprusu",
    icon: { en: "/apps/kelime-koprusu-en.webp", tr: "/apps/kelime-koprusu-tr.webp" },
    schemaCategory: "GameApplication",
  },
  {
    id: "kabe-yonu",
    packageId: "com.kuranvesureler.kiblepusulasi",
    icon: "/apps/kabe-yonu.webp",
    schemaCategory: "LifestyleApplication",
  },
  {
    id: "football-striker",
    packageId: "com.tasarimci.brain_goal_futbol_zeka",
    icon: "/apps/football-striker.webp",
    schemaCategory: "GameApplication",
  },
];

export function appIcon(app: OurApp, locale: Locale): string {
  return typeof app.icon === "string" ? app.icon : app.icon[locale];
}

export function playStoreUrl(app: OurApp, locale: Locale): string {
  return `https://play.google.com/store/apps/details?id=${app.packageId}&hl=${locale}`;
}

export function developerPageUrl(locale: Locale): string {
  return `https://play.google.com/store/apps/developer?id=Incipient+Apps&hl=${locale}`;
}

export const ourAppsPath = "/apps";
export const privacyPath = "/privacy";
