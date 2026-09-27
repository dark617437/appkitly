import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/i18n/config";
import { getOgEntries } from "@/lib/og";
import { siteConfig } from "@/lib/site";

// Every image is generated at build time; unknown keys return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getOgEntries(locale).map((entry) => ({ locale, key: `${entry.key}.png` })));
}

function loadFont(file: string): ArrayBuffer {
  const data = fs.readFileSync(path.join(process.cwd(), "src", "assets", "fonts", file));
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}

const LOGO = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#ffffff"/><rect x="8" y="8" width="7" height="7" rx="2" fill="#4f46e5"/><rect x="8" y="17" width="7" height="7" rx="2" fill="#4f46e5" fill-opacity="0.6"/><rect x="17" y="17" width="7" height="7" rx="2" fill="#4f46e5"/><circle cx="20.5" cy="11.5" r="3.5" fill="#a5b4fc"/></svg>`,
).toString("base64")}`;

/** Shortens text at a word boundary so it never ends mid-word. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[locale]/[key]">) {
  const { locale, key } = await params;
  const entry = isLocale(locale) ? getOgEntries(locale).find((item) => `${item.key}.png` === key) : undefined;
  if (!entry) return new Response("Not found", { status: 404 });

  const title = truncate(entry.title, 80);
  const host = new URL(siteConfig.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundImage: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
          <img src={LOGO} width={56} height={56} alt="" />
          <div style={{ marginLeft: 18, fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              fontSize: 24,
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              border: "1px solid rgba(255, 255, 255, 0.28)",
            }}
          >
            {entry.label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 48 ? 58 : 70,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.4, color: "#e0e7ff" }}>
            {truncate(entry.subtitle, 150)}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#c7d2fe" }}>{host}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: loadFont("Geist-Regular.ttf"), weight: 400, style: "normal" },
        { name: "Geist", data: loadFont("Geist-Bold.ttf"), weight: 700, style: "normal" },
      ],
    },
  );
}
