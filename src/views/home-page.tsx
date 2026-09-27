import Link from "next/link";
import { ArrowRight, Check, Gift, ShieldCheck, Sparkles, Store } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { formatCount } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { categoryIcons, categoryPath, toolCategories, tools, toolsInCategory } from "@/lib/tools";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ToolCard } from "@/components/tools/tool-card";
import { toToolCardData } from "@/components/tools/tool-data";
import { ToolIcon } from "@/components/tools/tool-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { websiteJsonLd } from "@/lib/structured-data";
import { LatestGuides } from "./blog-pages";

const principleIcons = [Gift, ShieldCheck, Store];

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { home } = dict;
  const popular = tools.filter((tool) => tool.popular);
  const cardLabels = { comingSoon: dict.common.comingSoon, openTool: dict.common.openTool };

  return (
    <>
      <JsonLd data={websiteJsonLd(locale, dict.meta.defaultDescription)} />
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[-12rem] left-1/2 -z-10 h-[28rem] w-[56rem] max-w-[200vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
        />

        <Container className="flex flex-col items-center pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted shadow-sm sm:text-sm">
            <Sparkles aria-hidden="true" className="size-3.5 text-primary-text" />
            {home.eyebrow}
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {home.heroTitleLead}{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-indigo-400 dark:to-violet-400">
              {home.heroTitleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {home.heroSubtitle}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={localizePath(categoryPath(null), locale)} size="lg">
              {home.exploreTools}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={localizePath(categoryPath("play-store"), locale)}
              size="lg"
              variant="secondary"
            >
              <Store aria-hidden="true" />
              {home.playStoreTools}
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {home.highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-primary-text" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-14 w-full max-w-4xl">
            <h2 className="text-xs font-medium tracking-wider text-muted uppercase">{home.specsLabel}</h2>
            <dl className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur-sm sm:grid-cols-4">
              {home.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={
                    "flex flex-col-reverse justify-end gap-1 px-4 py-5 " +
                    (index % 2 === 1 ? "border-l border-border " : "") +
                    (index >= 2 ? "border-t border-border sm:border-t-0 " : "") +
                    (index === 2 ? "sm:border-l" : "")
                  }
                >
                  <dt className="text-xs text-muted sm:text-sm">{spec.label}</dt>
                  <dd className="font-mono text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Popular tools */}
      <section aria-labelledby="popular-tools" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="popular-tools"
            title={home.popularTitle}
            description={home.popularSubtitle}
            action={
              <Link
                href={localizePath(categoryPath(null), locale)}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-text hover:underline"
              >
                {dict.common.viewAllTools}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={toToolCardData(tool, locale, dict)} labels={cardLabels} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Categories */}
      <section aria-labelledby="categories" className="border-y border-border bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading id="categories" title={home.categoriesTitle} description={home.categoriesSubtitle} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((category) => {
              const text = dict.categories[category];
              const count = toolsInCategory(category).length;
              return (
                <li key={category}>
                  <Link
                    href={localizePath(categoryPath(category), locale)}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <ToolIcon name={categoryIcons[category]} className="size-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">{text.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-text">
                      {formatCount(locale, count, dict.tools.toolCount)}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles" className="py-16 sm:py-24">
        <Container>
          <SectionHeading id="principles" title={home.principlesTitle} />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {home.principles.map((principle, index) => {
              const Icon = principleIcons[index] ?? Check;
              return (
                <li key={principle.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{principle.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{principle.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Guides */}
      <section aria-labelledby="latest-guides" className="border-t border-border bg-surface py-16 sm:py-24">
        <Container>
          <LatestGuides locale={locale} />
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-12 text-center shadow-xl shadow-indigo-900/10 sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgb(255_255_255/0.18),transparent_55%)]"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
              {home.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-indigo-100">{home.ctaBody}</p>
            <Link
              href={localizePath(categoryPath(null), locale)}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-base font-medium text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50 focus-visible:outline-white"
            >
              {home.ctaButton}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
