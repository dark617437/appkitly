import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { BlogPostPage } from "@/views/blog-pages";
import { blogPostMetadata } from "@/views/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata("en", slug);
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <BlogPostPage locale="en" slug={slug} />;
}
