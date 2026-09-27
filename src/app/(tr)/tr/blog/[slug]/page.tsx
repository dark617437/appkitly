import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { BlogPostPage } from "@/views/blog-pages";
import { blogPostMetadata } from "@/views/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("tr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tr/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata("tr", slug);
}

export default async function Page({ params }: PageProps<"/tr/blog/[slug]">) {
  const { slug } = await params;
  return <BlogPostPage locale="tr" slug={slug} />;
}
