import { getToolUi } from "@/i18n/get-tool-ui";
import { GradientGenerator } from "@/components/tools/gradient-generator/gradient-generator";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "gradient-generator");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="gradient-generator">
      <GradientGenerator strings={ui.gradientGenerator} common={ui.common} />
    </ToolPage>
  );
}
