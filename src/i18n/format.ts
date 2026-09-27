/** Replaces `{name}` placeholders in a translated string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function formatCount(
  locale: string,
  count: number,
  forms: { one: string; other: string },
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  return format(rule === "one" ? forms.one : forms.other, { count });
}
