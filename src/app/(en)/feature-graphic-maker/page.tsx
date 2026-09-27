import { getToolUi } from "@/i18n/get-tool-ui";
import { FeatureGraphicMaker } from "@/components/tools/feature-graphic-maker/feature-graphic-maker";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("en", "feature-graphic-maker");

export default function Page() {
  const ui = getToolUi("en");
  return (
    <ToolPage locale="en" slug="feature-graphic-maker" wide>
      <FeatureGraphicMaker
        locale="en"
        strings={ui.featureGraphicMaker}
        editor={ui.editor}
        common={ui.common}
        dropzone={ui.dropzone}
      />
    </ToolPage>
  );
}
