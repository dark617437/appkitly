"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { formatCount } from "@/i18n/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { ToolCard, type ToolCardData } from "./tool-card";

export interface CategoryFilter {
  key: string | null;
  label: string;
  href: string;
}

export interface ToolsExplorerStrings {
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  toolCount: { one: string; other: string };
  noResultsTitle: string;
  noResultsBody: string;
  clearSearch: string;
  comingSoon: string;
  openTool: string;
}

interface ToolsExplorerProps {
  locale: string;
  tools: ToolCardData[];
  filters: CategoryFilter[];
  activeCategory: string | null;
  strings: ToolsExplorerStrings;
}

/** Case- and accent-insensitive, so "gorsel" also finds "Görsel". */
function normalize(value: string, locale: string) {
  return value
    .toLocaleLowerCase(locale)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ı/g, "i");
}

export function ToolsExplorer({ locale, tools, filters, activeCategory, strings }: ToolsExplorerProps) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const terms = normalize(query.trim(), locale).split(/\s+/).filter(Boolean);
  const visible = terms.length
    ? tools.filter((tool) => {
        const haystack = normalize(`${tool.name} ${tool.description}`, locale);
        return terms.every((term) => haystack.includes(term));
      })
    : tools;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label={strings.filterLabel} className="scrollbar-none -mx-4 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {filters.map((filter) => {
              const active = filter.key === activeCategory;
              return (
                <li key={filter.href}>
                  <Link
                    href={filter.href}
                    scroll={false}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted hover:border-border-strong hover:text-foreground",
                    )}
                  >
                    {filter.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="w-full lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            {strings.searchLabel}
          </label>
          <Input
            id={searchId}
            type="search"
            icon={<Search />}
            placeholder={strings.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {formatCount(locale, visible.length, strings.toolCount)}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tool) => (
            <li key={tool.slug}>
              <ToolCard
                tool={tool}
                headingLevel="h2"
                labels={{ comingSoon: strings.comingSoon, openTool: strings.openTool }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="size-8 text-muted" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">{strings.noResultsTitle}</h2>
          <p className="mt-1 max-w-sm text-sm text-muted">{strings.noResultsBody}</p>
          <Button variant="secondary" size="sm" className="mt-5" onClick={() => setQuery("")}>
            {strings.clearSearch}
          </Button>
        </div>
      )}
    </div>
  );
}
