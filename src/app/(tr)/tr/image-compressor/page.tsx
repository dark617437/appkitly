import { getToolUi } from "@/i18n/get-tool-ui";
import { ImageCompressor } from "@/components/tools/image-compressor/image-compressor";
import { ToolPage } from "@/views/tool-page";
import { toolMetadata } from "@/views/page-metadata";

export const metadata = toolMetadata("tr", "image-compressor");

export default function Page() {
  const ui = getToolUi("tr");
  return (
    <ToolPage locale="tr" slug="image-compressor">
      <ImageCompressor locale="tr" strings={ui.imageCompressor} common={ui.common} dropzone={ui.dropzone} />
    </ToolPage>
  );
}
