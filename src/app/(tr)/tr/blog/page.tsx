import { BlogIndexPage } from "@/views/blog-pages";
import { blogIndexMetadata } from "@/views/page-metadata";

export const metadata = blogIndexMetadata("tr");

export default function Page() {
  return <BlogIndexPage locale="tr" />;
}
