import { OurAppsPage } from "@/views/our-apps";
import { ourAppsMetadata } from "@/views/page-metadata";

export const metadata = ourAppsMetadata("en");

export default function Page() {
  return <OurAppsPage locale="en" />;
}
