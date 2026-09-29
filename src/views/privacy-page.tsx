import { ExternalLink } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { formatPostDate } from "@/lib/blog";
import { developerPageUrl, privacyPath } from "@/lib/our-apps";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

/** Date of the last change to the privacy texts (YYYY-MM-DD). */
const UPDATED = "2026-09-27";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const text = dict.privacyPage;
  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: text.title, href: localizePath(privacyPath, locale) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div className="border-b border-border bg-surface/60">
        <Container className="max-w-3xl py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{text.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{text.intro}</p>
          <p className="mt-4 text-sm text-muted">
            {format(text.updated, { date: formatPostDate(UPDATED, locale) })}
          </p>
        </Container>
      </div>
      <Container className="max-w-3xl py-10 sm:py-14">
        <div className="prose-content">
          {text.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section>
            <h2>{text.contactHeading}</h2>
            <p>
              {text.contactBody}{" "}
              <a href={developerPageUrl(locale)} target="_blank" rel="noopener noreferrer">
                {text.contactLink}
                <ExternalLink aria-hidden="true" className="ml-1 inline size-3.5 align-[-0.1em]" />
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
