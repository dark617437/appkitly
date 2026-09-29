import type { ReactNode } from "react";

/**
 * Keeps a tool's main action within thumb reach on phones and tablets.
 * Hidden on large screens, where the action sits next to the result.
 */
export function MobileActionBar({ children, summary }: { children: ReactNode; summary?: ReactNode }) {
  return (
    <>
      {/* Reserves space so the bar never covers the end of the page. */}
      <div aria-hidden="true" className="h-24 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(0_0_0/0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {summary && <div className="min-w-0 flex-1 text-sm text-muted">{summary}</div>}
          <div className={summary ? "flex shrink-0 gap-2" : "flex flex-1 gap-2 [&>*]:flex-1"}>{children}</div>
        </div>
      </div>
    </>
  );
}
