import { PrivacyPage } from "@/views/privacy-page";
import { privacyMetadata } from "@/views/page-metadata";

export const metadata = privacyMetadata("tr");

export default function Page() {
  return <PrivacyPage locale="tr" />;
}
