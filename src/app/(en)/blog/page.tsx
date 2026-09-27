import { BlogIndexPage } from "@/views/blog-pages";
import { blogIndexMetadata } from "@/views/page-metadata";

export const metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
