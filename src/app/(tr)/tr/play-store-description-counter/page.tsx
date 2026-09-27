import { getToolUi } from "@/i18n/get-tool-ui";
import { PlayStoreDescriptionCounter } from "@/components/tools/play-store-description-counter/play-store-description-counter";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "play-store-description-counter");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="play-store-description-counter">
      <PlayStoreDescriptionCounter locale="tr" strings={ui.playStoreDescriptionCounter} />
    </ToolPage>
  );
}
