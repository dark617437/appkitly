"use client";

import { useId, useState, type ReactNode } from "react";
import { normalizeHex } from "@/lib/color";
import { cn } from "@/lib/cn";

const fieldLabel = "text-sm font-medium text-foreground";

// --- Range slider ------------------------------------------------------------

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Formats the value shown next to the label, e.g. "80%" or "24px". */
  format?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = String,
  disabled,
  className,
}: RangeFieldProps) {
  const id = useId();
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={fieldLabel}>
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-xs text-muted tabular-nums">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

// --- Color picker with hex input -------------------------------------------

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  hideLabel?: boolean;
}

export function ColorField({ label, value, onChange, className, hideLabel }: ColorFieldProps) {
  const id = useId();
  // While typing, show the draft; commit only valid colors.
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className={cn(fieldLabel, hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(event) => {
            setDraft(null);
            onChange(event.target.value);
          }}
          aria-label={label}
          className="size-10 shrink-0 cursor-pointer rounded-lg border border-border bg-card p-1 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
        />
        <input
          id={id}
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          value={draft ?? value}
          onChange={(event) => {
            setDraft(event.target.value);
            const normalized = normalizeHex(event.target.value);
            if (normalized) onChange(normalized);
          }}
          onBlur={() => setDraft(null)}
          aria-invalid={draft !== null && !normalizeHex(draft)}
          className="h-10 w-full min-w-0 rounded-lg border border-border bg-card px-3 font-mono text-sm text-foreground uppercase shadow-sm hover:border-border-strong focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40 aria-invalid:border-red-500"
        />
      </div>
    </div>
  );
}

// --- Segmented control (radio group) ----------------------------------------

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  hideLabel?: boolean;
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  /** Stretch options to fill the available width. */
  fill?: boolean;
}

export function SegmentedControl<T extends string>({
  label,
  hideLabel,
  value,
  options,
  onChange,
  className,
  fill = true,
}: SegmentedControlProps<T>) {
  const name = useId();
  return (
    <fieldset className={cn("min-w-0 space-y-2", className)}>
      <legend className={cn(fieldLabel, "mb-2", hideLabel && "sr-only")}>{label}</legend>
      <div
        className={cn(
          "flex flex-wrap gap-1 rounded-lg border border-border bg-surface p-1",
          !fill && "inline-flex",
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "relative flex min-h-9 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors select-none hover:text-foreground",
              "has-[:checked]:bg-card has-[:checked]:text-foreground has-[:checked]:shadow-sm",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
              "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
              fill && "flex-1",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// --- Switch -------------------------------------------------------------------

interface SwitchFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function SwitchField({ label, description, checked, onChange, className }: SwitchFieldProps) {
  const id = useId();
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <label htmlFor={id} className={cn(fieldLabel, "cursor-pointer")}>
          {label}
        </label>
        {description && (
          <p id={`${id}-description`} className="mt-0.5 text-xs leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      <span className="relative inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-describedby={description ? `${id}-description` : undefined}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full border border-border-strong bg-surface transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
        />
        <span
          aria-hidden="true"
          className="absolute top-1 left-1 size-4 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform peer-checked:translate-x-5"
        />
      </span>
    </div>
  );
}

// --- Checkbox chip ------------------------------------------------------------

interface CheckboxChipProps {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxChip({ label, description, checked, onChange }: CheckboxChipProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors select-none hover:border-border-strong",
        "has-[:checked]:border-primary has-[:checked]:bg-primary-soft",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 cursor-pointer accent-[var(--primary)]"
      />
      <span className="min-w-0">
        <span className="block font-medium text-foreground">{label}</span>
        {description && <span className="block text-xs text-muted">{description}</span>}
      </span>
    </label>
  );
}

// --- Text fields ----------------------------------------------------------------

const textFieldBase =
  "w-full min-w-0 rounded-lg border border-border bg-card px-3.5 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/80 hover:border-border-strong focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40 sm:text-sm";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "url" | "number" | "date";
  multiline?: boolean;
  rows?: number;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  inputMode?: "text" | "numeric" | "email" | "url";
  autoComplete?: string;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline,
  rows = 4,
  hint,
  required,
  className,
  maxLength,
  min,
  max,
  inputMode,
  autoComplete = "off",
}: TextFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-600 dark:text-red-400">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
          className={cn(textFieldBase, "resize-y py-2.5 leading-relaxed")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          min={min}
          max={max}
          inputMode={inputMode}
          autoComplete={autoComplete}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
          className={cn(textFieldBase, "h-10")}
        />
      )}
      {hint && (
        <div id={hintId} className="text-xs text-muted">
          {hint}
        </div>
      )}
    </div>
  );
}

// --- Panel section -------------------------------------------------------------

export function ControlSection({
  title,
  children,
  className,
  action,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

// --- Select -----------------------------------------------------------------------

interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}

export function SelectField<T extends string>({ label, value, options, onChange, className }: SelectFieldProps<T>) {
  const id = useId();
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-10 w-full cursor-pointer rounded-lg border border-border bg-card px-3 text-base text-foreground shadow-sm hover:border-border-strong focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
