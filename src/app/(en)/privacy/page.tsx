import { PrivacyPage } from "@/views/privacy-page";
import { privacyMetadata } from "@/views/page-metadata";

export const metadata = privacyMetadata("en");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
