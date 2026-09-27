import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { ToolIconName, ToolStatus } from "@/lib/tools";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { ToolIcon } from "./tool-icon";

/** Serializable, already-translated tool data so the card works in server and client trees. */
export interface ToolCardData {
  slug: string;
  name: string;
  description: string;
  icon: ToolIconName;
  status: ToolStatus;
  href: string;
  categoryLabels: string[];
}

interface ToolCardProps {
  tool: ToolCardData;
  labels: { comingSoon: string; openTool: string };
  headingLevel?: "h2" | "h3";
}

export function ToolCard({ tool, labels, headingLevel: Heading = "h3" }: ToolCardProps) {
  const available = tool.status === "available";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl transition-colors",
            available
              ? "bg-primary-soft text-primary-soft-foreground group-hover:bg-primary group-hover:text-primary-foreground"
              : "bg-primary-soft text-primary-soft-foreground",
          )}
        >
          <ToolIcon name={tool.icon} className="size-5" />
        </span>
        {!available && (
          <Badge>
            <Clock aria-hidden="true" className="size-3" />
            {labels.comingSoon}
          </Badge>
        )}
      </div>

      <Heading className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {tool.name}
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {tool.categoryLabels.map((label) => (
          <span key={label} className="text-xs font-medium text-muted">
            #{label}
          </span>
        ))}
        {available && (
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary-text">
            {labels.openTool}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const shell = "flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6";

  if (available) {
    return (
      <Link
        href={tool.href}
        className={cn(
          shell,
          "group transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-indigo-500/5",
        )}
      >
        {content}
      </Link>
    );
  }

  // Not a link: unreleased tools must not look or behave like working ones.
  return <article className={shell}>{content}</article>;
}
