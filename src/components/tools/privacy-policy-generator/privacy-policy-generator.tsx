"use client";

import { useState, useSyncExternalStore } from "react";
import { Copy, FileCode, FileText, Info } from "lucide-react";
import type { ToolUiStrings } from "@/i18n/tool-ui/en";
import { copyText, downloadText } from "@/lib/download";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileActionBar } from "@/components/ui/mobile-action-bar";
import {
  CheckboxChip,
  ControlSection,
  SegmentedControl,
  SwitchField,
  TextField,
} from "@/components/ui/form-controls";
import {
  generatePolicy,
  policyToHtmlDocument,
  policyToMarkdown,
  policyToText,
  SERVICES,
  type DataType,
  type Inline,
  type PolicyInput,
  type PolicyLanguage,
  type ServiceKey,
} from "./policy";

const DATA_TYPES: DataType[] = [
  "name",
  "email",
  "phone",
  "location",
  "camera",
  "contacts",
  "deviceIds",
  "usage",
  "diagnostics",
  "purchases",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Today's date only exists in the browser; the server renders an empty value.
const subscribeNever = () => () => {};

interface PrivacyPolicyGeneratorProps {
  locale: string;
  strings: ToolUiStrings["privacyPolicyGenerator"];
  common: ToolUiStrings["common"];
}

export function PrivacyPolicyGenerator({ locale, strings, common }: PrivacyPolicyGeneratorProps) {
  const [input, setInput] = useState<PolicyInput>(() => ({
    appName: "",
    developerName: "",
    email: "",
    website: "",
    effectiveDate: "",
    android: true,
    ios: false,
    data: Object.fromEntries(DATA_TYPES.map((key) => [key, false])) as Record<DataType, boolean>,
    services: Object.fromEntries(Object.keys(SERVICES).map((key) => [key, false])) as Record<ServiceKey, boolean>,
    otherServices: "",
    accounts: false,
    children: false,
    language: locale === "tr" ? "tr" : "en",
  }));
  const today = useSyncExternalStore(subscribeNever, todayIso, () => "");
  const effectiveDate = input.effectiveDate || today;

  const policy = generatePolicy(
    { ...input, effectiveDate },
    {
      appName: strings.placeholderApp,
      developerName: strings.placeholderDeveloper,
      email: strings.placeholderEmail,
      date: strings.placeholderDate,
    },
  );

  function update<K extends keyof PolicyInput>(key: K, value: PolicyInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  const missing: string[] = [];
  if (!input.appName.trim()) missing.push(strings.appName);
  if (!input.developerName.trim()) missing.push(strings.developerName);
  if (!EMAIL_PATTERN.test(input.email.trim())) missing.push(strings.email);
  const ready = missing.length === 0;

  const fileBase = (input.appName.trim() || "app")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  async function copyPolicy() {
    const ok = await copyText(policyToText(policy));
    if (ok) toast.success(common.copied);
    else toast.error(common.copyFailed);
  }

  function downloadHtml() {
    downloadText(policyToHtmlDocument(policy, input.language), `${fileBase}-privacy-policy.html`, "text/html");
  }

  return (
    <>
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <Card className="space-y-8 p-5 sm:p-6">
        <ControlSection title={strings.detailsTitle}>
          <TextField
            label={strings.appName}
            value={input.appName}
            onChange={(value) => update("appName", value)}
            required
            maxLength={100}
          />
          <TextField
            label={strings.developerName}
            value={input.developerName}
            onChange={(value) => update("developerName", value)}
            required
            maxLength={100}
          />
          <TextField
            label={strings.email}
            type="email"
            inputMode="email"
            value={input.email}
            onChange={(value) => update("email", value)}
            required
            autoComplete="email"
            hint={input.email && !EMAIL_PATTERN.test(input.email.trim()) ? strings.emailInvalid : undefined}
          />
          <TextField
            label={strings.website}
            type="url"
            inputMode="url"
            value={input.website}
            onChange={(value) => update("website", value)}
            placeholder="https://"
          />
          <TextField
            label={strings.effectiveDate}
            type="date"
            value={effectiveDate}
            onChange={(value) => update("effectiveDate", value)}
          />
        </ControlSection>

        <ControlSection title={strings.platformsTitle}>
          <div className="grid gap-2 min-[400px]:grid-cols-2">
            <CheckboxChip label="Android" description="Google Play" checked={input.android} onChange={(v) => update("android", v)} />
            <CheckboxChip label="iOS" description="App Store" checked={input.ios} onChange={(v) => update("ios", v)} />
          </div>
        </ControlSection>

        <ControlSection title={strings.dataTitle}>
          <p className="-mt-2 text-xs leading-relaxed text-muted">{strings.dataHint}</p>
          <div className="grid gap-2 min-[400px]:grid-cols-2">
            {DATA_TYPES.map((key) => (
              <CheckboxChip
                key={key}
                label={strings.dataTypes[key]}
                checked={input.data[key]}
                onChange={(checked) => update("data", { ...input.data, [key]: checked })}
              />
            ))}
          </div>
        </ControlSection>

        <ControlSection title={strings.servicesTitle}>
          <div className="grid gap-2">
            {(Object.keys(SERVICES) as ServiceKey[]).map((key) => (
              <CheckboxChip
                key={key}
                label={SERVICES[key].name}
                checked={input.services[key]}
                onChange={(checked) => update("services", { ...input.services, [key]: checked })}
              />
            ))}
          </div>
          <TextField
            label={strings.otherServices}
            value={input.otherServices}
            onChange={(value) => update("otherServices", value)}
            placeholder={strings.otherServicesPlaceholder}
            hint={strings.otherServicesHint}
          />
        </ControlSection>

        <ControlSection title={strings.moreTitle}>
          <SwitchField
            label={strings.accounts}
            description={strings.accountsHint}
            checked={input.accounts}
            onChange={(value) => update("accounts", value)}
          />
          <SwitchField
            label={strings.children}
            description={strings.childrenHint}
            checked={input.children}
            onChange={(value) => update("children", value)}
          />
        </ControlSection>

        <SegmentedControl<PolicyLanguage>
          label={strings.language}
          value={input.language}
          options={[
            { value: "en", label: "English" },
            { value: "tr", label: "Türkçe" },
          ]}
          onChange={(value) => update("language", value)}
        />
      </Card>

      <div className="space-y-4 lg:sticky lg:top-24">
        <Card className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={copyPolicy} disabled={!ready}>
              <Copy aria-hidden="true" />
              {strings.copy}
            </Button>
            <Button variant="secondary" disabled={!ready} onClick={downloadHtml}>
              <FileCode aria-hidden="true" />
              {strings.downloadHtml}
            </Button>
            <Button
              variant="secondary"
              disabled={!ready}
              onClick={() => downloadText(policyToMarkdown(policy), `${fileBase}-privacy-policy.md`, "text/markdown")}
            >
              <FileText aria-hidden="true" />
              {strings.downloadMarkdown}
            </Button>
          </div>
          {!ready && (
            <p className="text-sm text-amber-800 dark:text-amber-200" aria-live="polite">
              {strings.missing} {missing.join(", ")}
            </p>
          )}
          <p className="flex gap-2 rounded-lg bg-surface p-3 text-xs leading-relaxed text-muted">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {strings.disclaimer}
          </p>
        </Card>

        <Card className="p-5 sm:p-8">
          <article
            lang={input.language}
            aria-label={strings.previewLabel}
            // Scrollable, so keyboard users need to be able to focus it.
            tabIndex={0}
            // Scrolls inside its own box only on large screens; nested scrolling is awkward on phones.
            className="prose-content lg:max-h-[calc(100vh-18rem)] lg:overflow-y-auto lg:pr-1"
          >
            <h2 className="!mt-0 text-2xl">{policy.title}</h2>
            <p>
              <em>{policy.effective}</em>
            </p>
            {policy.sections.map((section, sectionIndex) => (
              <section key={sectionIndex}>
                {section.heading && <h3>{section.heading}</h3>}
                {section.blocks.map((block, blockIndex) =>
                  block.type === "p" ? (
                    <p key={blockIndex}>
                      <InlineContent content={block.content} />
                    </p>
                  ) : (
                    <ul key={blockIndex}>
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <InlineContent content={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </article>
        </Card>
      </div>
    </div>

    {ready && (
      <MobileActionBar>
        <div className="flex gap-2">
          <Button size="lg" className="flex-1" onClick={copyPolicy}>
            <Copy aria-hidden="true" />
            {strings.copy}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={downloadHtml}
            aria-label={strings.downloadHtml}
            title={strings.downloadHtml}
          >
            <FileCode aria-hidden="true" />
            HTML
          </Button>
        </div>
      </MobileActionBar>
    )}
    </>
  );
}

function InlineContent({ content }: { content: Inline[] }) {
  return (
    <>
      {content.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        ),
      )}
    </>
  );
}
