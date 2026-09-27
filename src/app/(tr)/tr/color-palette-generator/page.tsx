import { getToolUi } from "@/i18n/get-tool-ui";
import { ColorPaletteGenerator } from "@/components/tools/color-palette-generator/color-palette-generator";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "color-palette-generator");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="color-palette-generator">
      <ColorPaletteGenerator strings={ui.colorPaletteGenerator} common={ui.common} />
    </ToolPage>
  );
}
