import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { categoryPath, toolCategories, tools, toolsInCategory, type ToolCategory } from "@/lib/tools";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { toToolCardData } from "@/components/tools/tool-data";
import { ToolsExplorer, type CategoryFilter } from "@/components/tools/tools-explorer";

/** Lists all tools, or the tools of one category when `category` is set. */
export function ToolsPage({ locale, category }: { locale: Locale; category: ToolCategory | null }) {
  const dict = getDictionary(locale);
  const heading = category ? dict.categories[category] : null;

  const listed = category ? toolsInCategory(category) : tools;

  const filters: CategoryFilter[] = [
    { key: null, label: dict.tools.allCategories, href: localizePath(categoryPath(null), locale) },
    ...toolCategories.map((key) => ({
      key,
      label: dict.categories[key].shortName,
      href: localizePath(categoryPath(key), locale),
    })),
  ];

  const breadcrumbs = [
    { name: dict.toolPage.home, href: localizePath("/", locale) },
    { name: dict.toolPage.tools, href: localizePath(categoryPath(null), locale) },
    ...(category ? [{ name: dict.categories[category].name, href: localizePath(categoryPath(category), locale) }] : []),
  ];

  return (
    <div className="py-10 sm:py-14">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container>
        <Breadcrumbs items={breadcrumbs} label={dict.toolPage.breadcrumbLabel} />
        <header className="mt-5 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {heading ? heading.name : dict.tools.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {heading ? heading.description : dict.tools.subtitle}
          </p>
        </header>

        <div className="mt-10">
          <ToolsExplorer
            // Reset the search field when switching category.
            key={category ?? "all"}
            locale={locale}
            tools={listed.map((tool) => toToolCardData(tool, locale, dict))}
            filters={filters}
            activeCategory={category}
            strings={{
              searchLabel: dict.tools.searchLabel,
              searchPlaceholder: dict.tools.searchPlaceholder,
              filterLabel: dict.tools.filterLabel,
              toolCount: dict.tools.toolCount,
              noResultsTitle: dict.tools.noResultsTitle,
              noResultsBody: dict.tools.noResultsBody,
              clearSearch: dict.tools.clearSearch,
              comingSoon: dict.common.comingSoon,
              openTool: dict.common.openTool,
            }}
          />
        </div>
      </Container>
    </div>
  );
}
