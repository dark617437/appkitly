import { getToolUi } from "@/i18n/get-tool-ui";
import { PrivacyPolicyGenerator } from "@/components/tools/privacy-policy-generator/privacy-policy-generator";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "privacy-policy-generator");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="privacy-policy-generator">
      <PrivacyPolicyGenerator locale="tr" strings={ui.privacyPolicyGenerator} common={ui.common} />
    </ToolPage>
  );
}
