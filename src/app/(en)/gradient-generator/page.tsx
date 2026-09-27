import { getToolUi } from "@/i18n/get-tool-ui";
import { GradientGenerator } from "@/components/tools/gradient-generator/gradient-generator";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("en", "gradient-generator");

export default function Page() {
  const ui = getToolUi("en");
  return (
    <ToolPage locale="en" slug="gradient-generator">
      <GradientGenerator strings={ui.gradientGenerator} common={ui.common} />
    </ToolPage>
  );
}
