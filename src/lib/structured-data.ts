import { localeInfo, localizePath, type Locale } from "@/i18n/config";
import { absoluteUrl, siteConfig } from "./site";

type JsonLd = Record<string, unknown>;

const organization = () => ({
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
});

export function websiteJsonLd(locale: Locale, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(localizePath("/", locale)),
    description,
    inLanguage: localeInfo[locale].ogLocale.replace("_", "-"),
    publisher: organization(),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function webApplicationJsonLd(input: {
  name: string;
  description: string;
  href: string;
  locale: Locale;
  category: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.href),
    applicationCategory: input.category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern web browser.",
    inLanguage: localeInfo[input.locale].ogLocale.replace("_", "-"),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: organization(),
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  href: string;
  locale: Locale;
  date: string;
  updated: string;
  image: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.href),
    mainEntityOfPage: absoluteUrl(input.href),
    datePublished: input.date,
    dateModified: input.updated,
    inLanguage: localeInfo[input.locale].ogLocale.replace("_", "-"),
    image: absoluteUrl(input.image),
    author: organization(),
    publisher: organization(),
  };
}
