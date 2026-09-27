import { ToolsPage } from "@/views/tools-page";
import { toolsMetadata } from "@/views/page-metadata";

export const metadata = toolsMetadata("en", null);

export default function Page() {
  return <ToolsPage locale="en" category={null} />;
}
