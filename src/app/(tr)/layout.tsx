import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/root-document";
import { rootMetadata, rootViewport } from "@/views/page-metadata";
import "../globals.css";

export const metadata = rootMetadata("tr");
export const viewport = rootViewport;

export default function TurkishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
