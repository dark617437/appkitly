# AppKitly

Free online tools for mobile app developers, in English and Turkish. Built with Next.js (App Router),
TypeScript and Tailwind CSS.

Every tool runs in the browser: images and texts are processed on the user's device and never uploaded.
The whole site is prerendered at build time and needs no server-side runtime, database or API keys.

## Tools

| Tool | URL |
| --- | --- |
| Play Store Screenshot Maker | `/play-store-screenshot-maker` |
| Feature Graphic Maker (1024×500) | `/feature-graphic-maker` |
| App Icon Resizer | `/app-icon-resizer` |
| Image Compressor | `/image-compressor` |
| Image Converter | `/image-converter` |
| Color Palette Generator | `/color-palette-generator` |
| Gradient Generator | `/gradient-generator` |
| Privacy Policy Generator | `/privacy-policy-generator` |
| Play Store Description Counter | `/play-store-description-counter` |

Turkish pages live under `/tr` (for example `/tr/app-icon-resizer`).

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
npm run start    # serve the production build
```

## Deployment

1. Push the project to a Git repository (GitHub, GitLab or Bitbucket).
2. Import it in Vercel (or another host that supports Next.js). No build settings need to change.
3. Set `NEXT_PUBLIC_SITE_URL` to your public domain, e.g. `https://appkitly.com`. It is used for
   canonical URLs, hreflang, Open Graph images, the sitemap and robots.txt. On Vercel it can be left
   unset: the production domain is detected automatically.
4. Submit `https://your-domain/sitemap.xml` in Google Search Console.

## Structure

```
content/blog/{en,tr}/     Blog posts as Markdown. The same file name in both folders links translations.
src/
  app/
    (en)/                 English routes, served at the root
    (tr)/tr/              Turkish routes, served under /tr
    og/[locale]/[key]/    Social sharing images, generated at build time
    global-not-found.tsx  404 page
    sitemap.ts, robots.ts, icon.svg
  assets/fonts/           Geist fonts for social images (SIL Open Font License, see OFL.txt)
  components/
    editor/               Shared canvas editor used by the screenshot and feature graphic makers
    tools/<slug>/         One folder per tool
    ui/                   Buttons, form controls, file dropzone, toasts, breadcrumbs
    layout/               Header, footer, theme and language switchers
  i18n/
    dictionaries/         Site texts (en, tr)
    tool-ui/              Texts inside the tools (en, tr)
    tool-content/         SEO titles, how-to steps, features and FAQs per tool (en, tr)
  lib/                    Tool registry, image/PNG/ZIP helpers, SEO and structured data, blog loader
  views/                  Page bodies shared by both locales
```

## Adding a tool

1. Add it to `src/lib/tools.ts` with `status: "coming-soon"`. It is listed but not linked.
2. Add its name and description to both dictionaries in `src/i18n/dictionaries/`.
3. Build the tool in `src/components/tools/<slug>/`, add its UI texts to `src/i18n/tool-ui/` and its page
   content to `src/i18n/tool-content/`.
4. Create the route in `src/app/(en)/<slug>/` and `src/app/(tr)/tr/<slug>/`, then set its status to
   `"available"`. It then gets a page, a social image and a sitemap entry.

## Adding a blog post

Create `content/blog/en/<slug>.md` (and the Turkish version in `content/blog/tr/<slug>.md`):

```markdown
---
title: "Post title"
description: "One or two sentences for search results."
date: 2026-09-26
updated: 2026-09-26
tools: app-icon-resizer, image-compressor
---

Markdown content…
```

`tools` lists related tool slugs: they are shown under the post, and the post appears as a related guide
on those tool pages.
