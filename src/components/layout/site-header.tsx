import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { blogPath } from "@/lib/blog";
import { categoryPath } from "@/lib/tools";
import { Container } from "@/components/ui/container";
import { DesktopNav, MobileNav, type NavItem } from "./header-nav";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items: NavItem[] = [
    { href: localizePath(categoryPath(null), locale), label: dict.nav.tools },
    { href: localizePath(categoryPath("play-store"), locale), label: dict.nav.playStore },
    { href: localizePath(categoryPath("images"), locale), label: dict.nav.images },
    { href: localizePath(categoryPath("design"), locale), label: dict.nav.design },
    { href: localizePath(blogPath(), locale), label: dict.nav.blog },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Container className="relative flex h-16 items-center gap-6">
        <Link
          href={localizePath("/", locale)}
          aria-label={dict.common.homeLabel}
          className="rounded-md"
        >
          <Logo />
        </Link>

        <DesktopNav items={items} label={dict.nav.label} />

        <div className="ml-auto flex items-center gap-1.5">
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
          <ThemeToggle label={dict.nav.switchTheme} />
          <MobileNav
            items={items}
            label={dict.nav.label}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
          />
        </div>
      </Container>
    </header>
  );
}
