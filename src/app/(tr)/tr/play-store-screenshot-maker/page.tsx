import { getToolUi } from "@/i18n/get-tool-ui";
import { PlayStoreScreenshotMaker } from "@/components/tools/play-store-screenshot-maker/play-store-screenshot-maker";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "play-store-screenshot-maker");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="play-store-screenshot-maker" wide>
      <PlayStoreScreenshotMaker
        locale="tr"
        strings={ui.playStoreScreenshotMaker}
        editor={ui.editor}
        common={ui.common}
        dropzone={ui.dropzone}
      />
    </ToolPage>
  );
}
