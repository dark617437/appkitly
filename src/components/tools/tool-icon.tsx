import {
  Blend,
  Images,
  Layers,
  type LucideIcon,
  PanelsTopLeft,
  Palette,
  RefreshCw,
  Scaling,
  ShieldCheck,
  Shrink,
  Smartphone,
  Store,
  TextCursorInput,
} from "lucide-react";
import type { ToolCategoryIconName, ToolIconName } from "@/lib/tools";

const icons: Record<ToolIconName | ToolCategoryIconName, LucideIcon> = {
  screenshot: Smartphone,
  "feature-graphic": PanelsTopLeft,
  "icon-resizer": Scaling,
  compressor: Shrink,
  converter: RefreshCw,
  privacy: ShieldCheck,
  "text-counter": TextCursorInput,
  palette: Palette,
  gradient: Blend,
  store: Store,
  images: Images,
  design: Layers,
  legal: ShieldCheck,
};

export function ToolIcon({
  name,
  className,
}: {
  name: ToolIconName | ToolCategoryIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} />;
}
