import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { blogPath, formatPostDate, getPost, getPosts, type PostMeta } from "@/lib/blog";
import { ogImagePath } from "@/lib/og";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getTool } from "@/lib/tools";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ToolCard } from "@/components/tools/tool-card";
import { toToolCardData } from "@/components/tools/tool-data";

function PostMetaLine({ post, locale }: { post: PostMeta; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden="true" className="size-3.5" />
        {format(dict.blog.readingTime, { minutes: post.readingMinutes })}
      </span>
    </p>
  );
}

function PostCard({ post, locale, headingLevel: Heading = "h2" }: { post: PostMeta; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={localizePath(blogPath(post.slug), locale)}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <PostMetaLine post={post} locale={locale} />
      <Heading className="mt-3 text-lg font-semibold tracking-tight text-foreground">{post.title}</Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-text">
        {dict.blog.readGuide}
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function LatestGuides({ locale, limit = 3 }: { locale: Locale; limit?: number }) {
  const dict = getDictionary(locale);
  const posts = getPosts(locale).slice(0, limit);
  if (posts.length === 0) return null;
  return (
    <>
      <SectionHeading
        id="latest-guides"
        title={dict.blog.latestTitle}
        description={dict.blog.latestSubtitle}
        action={
          <Link
            href={localizePath(blogPath(), locale)}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-text hover:underline"
          >
            {dict.blog.allGuides}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        }
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} locale={locale} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </>
  );
}

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const posts = getPosts(locale);
  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: dict.nav.blog, href: localizePath(blogPath(), locale) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${siteConfig.name} – ${dict.blog.title}`,
            description: dict.blog.description,
            url: absoluteUrl(localizePath(blogPath(), locale)),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(localizePath(blogPath(post.slug), locale)),
              datePublished: post.date,
            })),
          },
        ]}
      />
      <div className="border-b border-border bg-surface/60">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
          <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {dict.blog.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{dict.blog.description}</p>
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function BlogPostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const post = getPost(locale, slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const href = localizePath(blogPath(slug), locale);
  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: dict.nav.blog, href: localizePath(blogPath(), locale) },
    { name: post.title, href },
  ];
  const relatedTools = post.tools.map((tool) => getTool(tool));
  const morePosts = getPosts(locale)
    .filter((other) => other.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            title: post.title,
            description: post.description,
            href,
            locale,
            date: post.date,
            updated: post.updated,
            image: ogImagePath(locale, `blog-${slug}`),
          }),
          breadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <article>
        <header className="border-b border-border bg-surface/60">
          <Container className="max-w-3xl py-10 sm:py-14">
            <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{post.description}</p>
            <div className="mt-5">
              <PostMetaLine post={post} locale={locale} />
              {post.updated !== post.date && (
                <p className="mt-1 text-sm text-muted">
                  {format(dict.blog.updated, { date: formatPostDate(post.updated, locale) })}
                </p>
              )}
            </div>
          </Container>
        </header>
        <Container className="max-w-3xl py-10 sm:py-14">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          <p className="mt-12">
            <Link
              href={localizePath(blogPath(), locale)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-text hover:underline"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {dict.blog.allGuides}
            </Link>
          </p>
        </Container>
      </article>

      {relatedTools.length > 0 && (
        <section aria-labelledby="guide-tools" className="border-t border-border bg-surface py-14 sm:py-20">
          <Container>
            <SectionHeading id="guide-tools" title={dict.blog.relatedTools} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((tool) => (
                <li key={tool.slug}>
                  <ToolCard
                    tool={toToolCardData(tool, locale, dict)}
                    labels={{ comingSoon: dict.common.comingSoon, openTool: dict.common.openTool }}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {morePosts.length > 0 && (
        <section aria-labelledby="more-guides" className="border-t border-border py-14 sm:py-20">
          <Container>
            <SectionHeading id="more-guides" title={dict.toolPage.guidesTitle} />
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {morePosts.map((other) => (
                <li key={other.slug}>
                  <PostCard post={other} locale={locale} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
