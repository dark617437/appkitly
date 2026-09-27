import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isToolCategory, toolCategories } from "@/lib/tools";
import { ToolsPage } from "@/views/tools-page";
import { toolsMetadata } from "@/views/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return toolCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/tr/tools/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isToolCategory(category)) return {};
  return toolsMetadata("tr", category);
}

export default async function Page({ params }: PageProps<"/tr/tools/[category]">) {
  const { category } = await params;
  if (!isToolCategory(category)) notFound();
  return <ToolsPage locale="tr" category={category} />;
}
