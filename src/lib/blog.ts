import "server-only";
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import type { Locale } from "@/i18n/config";
import type { ToolSlug } from "./tools";

/**
 * Blog posts are Markdown files in content/blog/<locale>/<slug>.md. A translation
 * uses the same file name in the other locale's folder, which links the two for hreflang.
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO dates (YYYY-MM-DD). */
  date: string;
  updated: string;
  tools: ToolSlug[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

const markdown = new Marked({ gfm: true, async: false });

function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`Missing frontmatter in ${file}`);
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^"(.*)"$/, "$1");
    data[key] = value;
  }
  return { data, body: match[2] };
}

function renderMarkdown(body: string): string {
  const html = markdown.parse(body) as string;
  return (
    html
      // Wide tables scroll inside their own box on small screens.
      .replace(/<table>/g, '<div class="table-wrap"><table>')
      .replace(/<\/table>/g, "</table></div>")
      // Task list boxes are decorative, not form fields.
      .replace(/<input[^>]*type="checkbox"[^>]*>\s*/g, '<span class="task-box" aria-hidden="true"></span>')
      // External links open in a new tab.
      .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
  );
}

function readingMinutes(text: string): number {
  const words = text.replace(/[#|*_>`-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const cache = new Map<Locale, Post[]>();

function loadPosts(locale: Locale): Post[] {
  const cached = cache.get(locale);
  if (cached) return cached;

  const dir = path.join(BLOG_DIR, locale);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((file) => file.endsWith(".md")) : [];
  const posts = files.map((file): Post => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, body } = parseFrontmatter(raw, file);
    for (const key of ["title", "description", "date"]) {
      if (!data[key]) throw new Error(`Missing "${key}" in ${locale}/${file}`);
    }
    return {
      slug: file.replace(/\.md$/, ""),
      locale,
      title: data.title,
      description: data.description,
      date: data.date,
      updated: data.updated || data.date,
      tools: (data.tools ?? "")
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean) as ToolSlug[],
      readingMinutes: readingMinutes(body),
      html: renderMarkdown(body),
    };
  });

  posts.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
  cache.set(locale, posts);
  return posts;
}

function toMeta(post: Post): PostMeta {
  const meta: PostMeta & { html?: string } = { ...post };
  delete meta.html;
  return meta;
}

export function getPosts(locale: Locale): PostMeta[] {
  return loadPosts(locale).map(toMeta);
}

export function getPost(locale: Locale, slug: string): Post | null {
  return loadPosts(locale).find((post) => post.slug === slug) ?? null;
}

/** Guides that mention a tool, used for internal links on tool pages. */
export function getGuidesForTool(locale: Locale, tool: ToolSlug): PostMeta[] {
  return getPosts(locale).filter((post) => post.tools.includes(tool));
}

export function blogPath(slug?: string): string {
  return slug ? `/blog/${slug}` : "/blog";
}

export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
