import { getToolUi } from "@/i18n/get-tool-ui";
import { ImageConverter } from "@/components/tools/image-converter/image-converter";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("en", "image-converter");

export default function Page() {
  const ui = getToolUi("en");
  return (
    <ToolPage locale="en" slug="image-converter">
      <ImageConverter locale="en" strings={ui.imageConverter} common={ui.common} dropzone={ui.dropzone} />
    </ToolPage>
  );
}
