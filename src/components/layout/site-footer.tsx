import Link from "next/link";
import type { ReactNode } from "react";
import { localeInfo, localizePath, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";
import { blogPath } from "@/lib/blog";
import { ourAppsPath, privacyPath } from "@/lib/our-apps";
import { categoryPath, toolCategories } from "@/lib/tools";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

const linkClass = "text-sm text-muted transition-colors hover:text-foreground";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link href={localizePath("/", locale)} aria-label={dict.common.homeLabel} className="inline-block rounded-md">
            <Logo />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
        </div>

        <FooterColumn title={dict.footer.categories}>
          {toolCategories.map((category) => (
            <li key={category}>
              <Link href={localizePath(categoryPath(category), locale)} className={linkClass}>
                {dict.categories[category].name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={dict.footer.explore}>
          <li>
            <Link href={localizePath("/", locale)} className={linkClass}>
              {dict.footer.home}
            </Link>
          </li>
          <li>
            <Link href={localizePath(categoryPath(null), locale)} className={linkClass}>
              {dict.footer.allTools}
            </Link>
          </li>
          <li>
            <Link href={localizePath(blogPath(), locale)} className={linkClass}>
              {dict.footer.blog}
            </Link>
          </li>
          <li>
            <Link href={localizePath(ourAppsPath, locale)} className={linkClass}>
              {dict.footer.apps}
            </Link>
          </li>
          <li>
            <Link href={localizePath(privacyPath, locale)} className={linkClass}>
              {dict.footer.privacy}
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={dict.footer.language}>
          {locales.map((option) => (
            <li key={option}>
              <a href={localizePath("/", option)} hrefLang={option} lang={option} className={linkClass}>
                {localeInfo[option].label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </Container>

      <div className="border-t border-border">
        <Container className="py-6">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}
