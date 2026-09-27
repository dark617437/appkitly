import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeScript } from "@/components/layout/theme-script";
import { Logo } from "@/components/layout/logo";
import { buttonStyles } from "@/components/ui/button";
import { geistMono, geistSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `404 – Page not found | ${siteConfig.name}`,
  description: "The page you are looking for does not exist.",
};

/** Served for any URL that matches no route, in either language. */
export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <header className="border-b border-border">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="rounded-md">
              <Logo />
            </Link>
          </div>
        </header>

        <main className="bg-grid flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md text-center">
            <p className="font-mono text-sm font-semibold text-primary-text">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
            <p className="mt-3 text-base text-muted">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <p lang="tr" className="mt-4 text-sm text-muted">
              Aradığın sayfa bulunamadı veya taşınmış olabilir.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className={buttonStyles({ size: "lg" })}>
                <ArrowLeft aria-hidden="true" />
                Back to home
              </Link>
              <Link href="/tr" hrefLang="tr" lang="tr" className={buttonStyles({ size: "lg", variant: "secondary" })}>
                Ana sayfaya dön
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
