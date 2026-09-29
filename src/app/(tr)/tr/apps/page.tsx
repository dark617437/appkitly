import { OurAppsPage } from "@/views/our-apps";
import { ourAppsMetadata } from "@/views/page-metadata";

export const metadata = ourAppsMetadata("tr");

export default function Page() {
  return <OurAppsPage locale="tr" />;
}
