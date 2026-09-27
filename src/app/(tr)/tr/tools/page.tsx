import { ToolsPage } from "@/views/tools-page";
import { toolsMetadata } from "@/views/page-metadata";

export const metadata = toolsMetadata("tr", null);

export default function Page() {
  return <ToolsPage locale="tr" category={null} />;
}
