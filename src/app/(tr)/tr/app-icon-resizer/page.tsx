import { getToolUi } from "@/i18n/get-tool-ui";
import { AppIconResizer } from "@/components/tools/app-icon-resizer/app-icon-resizer";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "app-icon-resizer");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="app-icon-resizer">
      <AppIconResizer locale="tr" strings={ui.appIconResizer} common={ui.common} dropzone={ui.dropzone} />
    </ToolPage>
  );
}
