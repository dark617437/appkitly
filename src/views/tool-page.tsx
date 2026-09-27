import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { getToolContent } from "@/i18n/get-tool-content";
import { getToolUi } from "@/i18n/get-tool-ui";
import { blogPath, getGuidesForTool } from "@/lib/blog";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  webApplicationJsonLd,
} from "@/lib/structured-data";
import { categoryPath, getTool, toolPath, type ToolCategory, type ToolSlug } from "@/lib/tools";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PrivacyNote } from "@/components/ui/privacy-note";
import { SectionHeading } from "@/components/ui/section-heading";
import { ToolCard } from "@/components/tools/tool-card";
import { toToolCardData } from "@/components/tools/tool-data";
import { cn } from "@/lib/cn";

const APPLICATION_CATEGORY: Record<ToolCategory, string> = {
  "play-store": "DeveloperApplication",
  images: "MultimediaApplication",
  design: "DesignApplication",
  legal: "BusinessApplication",
};

interface ToolPageProps {
  locale: Locale;
  slug: ToolSlug;
  /** The interactive tool, rendered by the route so each page only loads its own code. */
  children: ReactNode;
  /** Editors use the full content width. */
  wide?: boolean;
}

export function ToolPage({ locale, slug, children, wide = false }: ToolPageProps) {
  const dict = getDictionary(locale);
  const ui = getToolUi(locale);
  const content = getToolContent(locale, slug);
  const tool = getTool(slug);
  const name = dict.toolList[slug].name;
  const href = localizePath(toolPath(slug), locale);

  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: dict.toolPage.tools, href: localizePath(categoryPath(null), locale) },
    { name, href },
  ];

  const related = tool.related.map((relatedSlug) => getTool(relatedSlug));
  const guides = getGuidesForTool(locale, slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd({
            name,
            description: content.seoDescription,
            href,
            locale,
            category: APPLICATION_CATEGORY[tool.categories[0]],
          }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(content.faq),
        ]}
      />

      <div className="border-b border-border bg-surface/60">
        <Container className={cn("py-8 sm:py-10", wide && "max-w-7xl")}>
          <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
          <div className="mt-5 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">{name}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{content.intro}</p>
            {tool.usesFiles && <PrivacyNote className="mt-5">{ui.common.privacy}</PrivacyNote>}
          </div>
        </Container>
      </div>

      <Container className={cn("py-8 sm:py-10", wide && "max-w-7xl")}>{children}</Container>

      <section className="border-t border-border bg-surface py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {format(dict.toolPage.howToTitle, { tool: name })}
            </h2>
            <ol className="mt-6 space-y-4">
              {content.howTo.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{dict.toolPage.featuresTitle}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.features.map((feature) => (
                <li key={feature.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq" className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 id="faq" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dict.toolPage.faqTitle}
          </h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {content.faq.map((item) => (
              <details key={item.question} className="group px-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-medium text-foreground">{item.question}</h3>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 text-base leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {guides.length > 0 && (
        <section aria-labelledby="related-guides" className="border-t border-border py-14 sm:py-20">
          <Container>
            <SectionHeading
              id="related-guides"
              title={dict.toolPage.guidesTitle}
              description={dict.toolPage.guidesSubtitle}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={localizePath(blogPath(guide.slug), locale)}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6"
                  >
                    <BookOpen aria-hidden="true" className="size-5 text-primary-text" />
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{guide.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{guide.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-text">
                      {dict.blog.readGuide}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="related-tools" className="border-t border-border py-14 sm:py-20">
        <Container>
          <SectionHeading
            id="related-tools"
            title={dict.toolPage.relatedTitle}
            description={dict.toolPage.relatedSubtitle}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedTool) => (
              <li key={relatedTool.slug}>
                <ToolCard
                  tool={toToolCardData(relatedTool, locale, dict)}
                  labels={{ comingSoon: dict.common.comingSoon, openTool: dict.common.openTool }}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
