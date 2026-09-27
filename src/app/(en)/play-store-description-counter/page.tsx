import { getToolUi } from "@/i18n/get-tool-ui";
import { PlayStoreDescriptionCounter } from "@/components/tools/play-store-description-counter/play-store-description-counter";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("en", "play-store-description-counter");

export default function Page() {
  const ui = getToolUi("en");
  return (
    <ToolPage locale="en" slug="play-store-description-counter">
      <PlayStoreDescriptionCounter locale="en" strings={ui.playStoreDescriptionCounter} />
    </ToolPage>
  );
}
