import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  appIcon,
  developerName,
  developerPageUrl,
  ourApps,
  ourAppsPath,
  playStoreUrl,
  type OurApp,
} from "@/lib/our-apps";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

function AppIcon({ app, locale, size }: { app: OurApp; locale: Locale; size: number }) {
  return (
    <Image
      src={appIcon(app, locale)}
      alt=""
      width={size}
      height={size}
      // Icons are already small, optimized WebP files.
      unoptimized
      className="shrink-0 rounded-[22%] shadow-sm ring-1 ring-black/5"
    />
  );
}

function AppCard({ app, locale }: { app: OurApp; locale: Locale }) {
  const dict = getDictionary(locale);
  const text = dict.ourApps.list[app.id];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <AppIcon app={app} locale={locale} size={64} />
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-foreground">{text.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {developerName} · {text.category}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{text.description}</p>
      <a
        href={playStoreUrl(app, locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={format(dict.ourApps.viewOnPlayLabel, { name: text.name })}
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card"
      >
        {dict.ourApps.viewOnPlay}
        <ExternalLink aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}

export function OurAppsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: dict.ourApps.title, href: localizePath(ourAppsPath, locale) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: dict.ourApps.metaTitle,
            itemListElement: ourApps.map((app, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "MobileApplication",
                name: dict.ourApps.list[app.id].name,
                description: dict.ourApps.list[app.id].description,
                operatingSystem: "ANDROID",
                applicationCategory: app.schemaCategory,
                url: playStoreUrl(app, locale),
                image: absoluteUrl(appIcon(app, locale)),
                author: { "@type": "Organization", name: developerName, url: developerPageUrl(locale) },
              },
            })),
          },
        ]}
      />
      <div className="border-b border-border bg-surface/60">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {dict.ourApps.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{dict.ourApps.intro}</p>
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ourApps.map((app) => (
            <li key={app.id}>
              <AppCard app={app} locale={locale} />
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <a
            href={developerPageUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-text hover:underline"
          >
            {dict.ourApps.developerPage}
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </p>
      </Container>
    </>
  );
}

/** Compact strip of our apps for the home page. */
export function OurAppsSection({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="our-apps" className={cn("py-16 sm:py-24", className)}>
      <Container>
        <SectionHeading
          id="our-apps"
          title={dict.ourApps.homeTitle}
          description={dict.ourApps.homeSubtitle}
          action={
            <Link
              href={localizePath(ourAppsPath, locale)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-text hover:underline"
            >
              {dict.ourApps.allApps}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />
        <ul className="mt-10 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-5">
          {ourApps.map((app) => {
            const text = dict.ourApps.list[app.id];
            return (
              <li key={app.id}>
                <a
                  href={playStoreUrl(app, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={format(dict.ourApps.viewOnPlayLabel, { name: text.name })}
                  className="flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md lg:flex-col lg:items-start lg:p-4"
                >
                  <AppIcon app={app} locale={locale} size={56} />
                  <span className="min-w-0">
                    <span className="line-clamp-2 block text-sm font-semibold text-foreground">{text.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">{text.category}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
