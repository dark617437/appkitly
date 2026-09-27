import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/root-document";
import { rootMetadata, rootViewport } from "@/views/page-metadata";
import "../globals.css";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
