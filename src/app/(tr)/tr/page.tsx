import { HomePage } from "@/views/home-page";
import { homeMetadata } from "@/views/page-metadata";

export const metadata = homeMetadata("tr");

export default function Page() {
  return <HomePage locale="tr" />;
}
