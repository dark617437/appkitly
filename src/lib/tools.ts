export const toolCategories = ["play-store", "images", "design", "legal"] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type ToolIconName =
  | "screenshot"
  | "feature-graphic"
  | "icon-resizer"
  | "compressor"
  | "converter"
  | "privacy"
  | "text-counter"
  | "palette"
  | "gradient";

export type ToolCategoryIconName = "store" | "images" | "design" | "legal";

/**
 * "available" tools link to their own page. "coming-soon" tools are listed
 * so users can see what is planned, but they are never presented as usable.
 */
export type ToolStatus = "available" | "coming-soon";

export type ToolSlug =
  | "play-store-screenshot-maker"
  | "feature-graphic-maker"
  | "app-icon-resizer"
  | "image-compressor"
  | "image-converter"
  | "privacy-policy-generator"
  | "play-store-description-counter"
  | "color-palette-generator"
  | "gradient-generator";

export interface Tool {
  slug: ToolSlug;
  categories: ToolCategory[];
  icon: ToolIconName;
  status: ToolStatus;
  popular: boolean;
  /** The tool reads user files; its page shows the on-device privacy note. */
  usesFiles: boolean;
  related: ToolSlug[];
}

export const categoryIcons: Record<ToolCategory, ToolCategoryIconName> = {
  "play-store": "store",
  images: "images",
  design: "design",
  legal: "legal",
};

export const tools: Tool[] = [
  {
    slug: "play-store-screenshot-maker",
    categories: ["play-store"],
    icon: "screenshot",
    status: "available",
    popular: true,
    usesFiles: true,
    related: ["feature-graphic-maker", "image-compressor", "app-icon-resizer"],
  },
  {
    slug: "feature-graphic-maker",
    categories: ["play-store"],
    icon: "feature-graphic",
    status: "available",
    popular: true,
    usesFiles: true,
    related: ["play-store-screenshot-maker", "app-icon-resizer", "gradient-generator"],
  },
  {
    slug: "app-icon-resizer",
    categories: ["images", "play-store"],
    icon: "icon-resizer",
    status: "available",
    popular: true,
    usesFiles: true,
    related: ["image-compressor", "image-converter", "play-store-screenshot-maker"],
  },
  {
    slug: "image-compressor",
    categories: ["images"],
    icon: "compressor",
    status: "available",
    popular: true,
    usesFiles: true,
    related: ["image-converter", "app-icon-resizer", "play-store-screenshot-maker"],
  },
  {
    slug: "image-converter",
    categories: ["images"],
    icon: "converter",
    status: "available",
    popular: true,
    usesFiles: true,
    related: ["image-compressor", "app-icon-resizer", "feature-graphic-maker"],
  },
  {
    slug: "privacy-policy-generator",
    categories: ["legal", "play-store"],
    icon: "privacy",
    status: "available",
    popular: true,
    usesFiles: false,
    related: ["play-store-description-counter", "app-icon-resizer", "feature-graphic-maker"],
  },
  {
    slug: "play-store-description-counter",
    categories: ["play-store"],
    icon: "text-counter",
    status: "available",
    popular: true,
    usesFiles: false,
    related: ["privacy-policy-generator", "play-store-screenshot-maker", "feature-graphic-maker"],
  },
  {
    slug: "color-palette-generator",
    categories: ["design"],
    icon: "palette",
    status: "available",
    popular: true,
    usesFiles: false,
    related: ["gradient-generator", "feature-graphic-maker", "play-store-screenshot-maker"],
  },
  {
    slug: "gradient-generator",
    categories: ["design"],
    icon: "gradient",
    status: "available",
    popular: true,
    usesFiles: false,
    related: ["color-palette-generator", "feature-graphic-maker", "play-store-screenshot-maker"],
  },
];

export function getTool(slug: ToolSlug): Tool {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function isToolCategory(value: string): value is ToolCategory {
  return (toolCategories as readonly string[]).includes(value);
}

export function toolPath(slug: string): string {
  return `/${slug}`;
}

export function categoryPath(category: ToolCategory | null): string {
  return category ? `/tools/${category}` : "/tools";
}

export function toolsInCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.categories.includes(category));
}
