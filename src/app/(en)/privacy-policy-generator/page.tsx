import { getToolUi } from "@/i18n/get-tool-ui";
import { PrivacyPolicyGenerator } from "@/components/tools/privacy-policy-generator/privacy-policy-generator";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("en", "privacy-policy-generator");

export default function Page() {
  const ui = getToolUi("en");
  return (
    <ToolPage locale="en" slug="privacy-policy-generator">
      <PrivacyPolicyGenerator locale="en" strings={ui.privacyPolicyGenerator} common={ui.common} />
    </ToolPage>
  );
}
