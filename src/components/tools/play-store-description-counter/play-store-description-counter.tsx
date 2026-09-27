"use client";

import { useState } from "react";
import { CircleCheck, Eraser, TriangleAlert } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { format, formatCount } from "@/i18n/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type FieldKey = "title" | "short" | "full";

const LIMITS: Record<FieldKey, number> = { title: 30, short: 80, full: 4000 };

// Words Google Play's metadata policy treats as promotional in titles (English and Turkish).
const PROMO_WORDS = [
  "free",
  "best",
  "top",
  "#1",
  "no. 1",
  "new",
  "sale",
  "discount",
  "on sale",
  "bedava",
  "ücretsiz",
  "en iyi",
  "indirim",
  "yeni",
];

const EMOJI = /\p{Extended_Pictographic}/u;
const REPEATED_SYMBOLS = /([!?$*#@€£%&~^+=|])\1{2,}/u;

/** Counts Unicode characters, so accented letters like "ş" count once. */
function countCharacters(text: string): number {
  return Array.from(text).length;
}

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

function findPromoWords(title: string, locale: string): string[] {
  const lower = title.toLocaleLowerCase(locale);
  return PROMO_WORDS.filter((word) => {
    // Escape regex syntax only; other escapes are invalid with the unicode flag.
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, "u").test(lower);
  });
}

interface CounterProps {
  locale: string;
  strings: ToolUiStrings["playStoreDescriptionCounter"];
}

export function PlayStoreDescriptionCounter({ locale, strings }: CounterProps) {
  const [values, setValues] = useState<Record<FieldKey, string>>({ title: "", short: "", full: "" });

  const fields: { key: FieldKey; label: string; hint: string; placeholder: string; rows?: number }[] = [
    { key: "title", label: strings.appName, hint: strings.appNameHint, placeholder: strings.appNamePlaceholder },
    {
      key: "short",
      label: strings.shortDescription,
      hint: strings.shortHint,
      placeholder: strings.shortPlaceholder,
      rows: 2,
    },
    {
      key: "full",
      label: strings.fullDescription,
      hint: strings.fullHint,
      placeholder: strings.fullPlaceholder,
      rows: 12,
    },
  ];

  const title = values.title;
  const issues: string[] = [];
  if (title.trim()) {
    if (EMOJI.test(title)) issues.push(strings.checkEmoji);
    const promo = findPromoWords(title, locale);
    if (promo.length) issues.push(format(strings.checkPromo, { words: promo.map((w) => `“${w}”`).join(", ") }));
    const letters = title.replace(/[^\p{L}]/gu, "");
    if (letters.length > 3 && letters === letters.toLocaleUpperCase(locale) && letters !== letters.toLocaleLowerCase(locale)) {
      issues.push(strings.checkCaps);
    }
    if (REPEATED_SYMBOLS.test(title)) issues.push(strings.checkRepeated);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
      <Card className="space-y-7 p-5 sm:p-6">
        {fields.map((field) => (
          <CounterField
            key={field.key}
            id={`counter-${field.key}`}
            label={field.label}
            hint={field.hint}
            placeholder={field.placeholder}
            rows={field.rows}
            value={values[field.key]}
            limit={LIMITS[field.key]}
            onChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
            strings={strings}
            locale={locale}
            showWords={field.key === "full"}
          />
        ))}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => setValues({ title: "", short: "", full: "" })}
            disabled={!values.title && !values.short && !values.full}
          >
            <Eraser aria-hidden="true" />
            {strings.clear}
          </Button>
        </div>
      </Card>

      <Card className="space-y-4 p-5 sm:p-6 lg:sticky lg:top-24">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{strings.checksTitle}</h2>
        <div aria-live="polite">
          {!title.trim() ? (
            <p className="text-sm text-muted">{strings.checksEmpty}</p>
          ) : issues.length === 0 ? (
            <p className="flex gap-2 text-sm text-emerald-700 dark:text-emerald-400">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {strings.checksOk}
            </p>
          ) : (
            <ul className="space-y-3">
              {issues.map((issue) => (
                <li key={issue} className="flex gap-2 text-sm text-amber-800 dark:text-amber-200">
                  <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  {issue}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted">{strings.checksNote}</p>
      </Card>
    </div>
  );
}

interface CounterFieldProps {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  limit: number;
  rows?: number;
  onChange: (value: string) => void;
  strings: ToolUiStrings["playStoreDescriptionCounter"];
  locale: string;
  showWords?: boolean;
}

function CounterField({
  id,
  label,
  hint,
  placeholder,
  value,
  limit,
  rows,
  onChange,
  strings,
  locale,
  showWords,
}: CounterFieldProps) {
  const count = countCharacters(value);
  const ratio = Math.min(1, count / limit);
  const over = count > limit;
  const near = !over && count >= limit * 0.9;
  const status = over
    ? format(strings.over, { count: count - limit })
    : formatCount(locale, limit - count, strings.remaining);

  const inputClass = cn(
    "w-full min-w-0 rounded-lg border bg-card px-3.5 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/80 focus-visible:outline-2 focus-visible:outline-offset-0 sm:text-sm",
    over
      ? "border-red-500 focus-visible:outline-red-500/40"
      : "border-border hover:border-border-strong focus-visible:border-ring focus-visible:outline-ring/40",
  );

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span
          className={cn(
            "font-mono text-sm tabular-nums",
            over ? "font-semibold text-red-600 dark:text-red-400" : near ? "text-amber-700 dark:text-amber-300" : "text-muted",
          )}
        >
          {count} / {limit}
        </span>
      </div>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={`${id}-status ${id}-hint`}
          aria-invalid={over}
          className={cn(inputClass, "resize-y py-2.5 leading-relaxed")}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={`${id}-status ${id}-hint`}
          aria-invalid={over}
          className={cn(inputClass, "h-10")}
        />
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-surface ring-1 ring-border" aria-hidden="true">
        <div
          className={cn(
            "h-full rounded-full transition-[width]",
            over ? "bg-red-500" : near ? "bg-amber-500" : "bg-primary",
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs">
        <p id={`${id}-hint`} className="text-muted">
          {hint}
        </p>
        <p
          id={`${id}-status`}
          className={cn(over ? "font-medium text-red-600 dark:text-red-400" : "text-muted")}
        >
          {status}
          {showWords && ` · ${formatCount(locale, countWords(value), strings.words)}`}
        </p>
      </div>
    </div>
  );
}
