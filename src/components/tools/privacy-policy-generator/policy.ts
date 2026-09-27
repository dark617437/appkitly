export type PolicyLanguage = "en" | "tr";

export type DataType =
  | "name"
  | "email"
  | "phone"
  | "location"
  | "camera"
  | "contacts"
  | "deviceIds"
  | "usage"
  | "diagnostics"
  | "purchases";

export type ServiceKey = "googlePlayServices" | "admob" | "firebaseAnalytics" | "crashlytics" | "facebook";

export interface PolicyInput {
  appName: string;
  developerName: string;
  email: string;
  website: string;
  effectiveDate: string;
  android: boolean;
  ios: boolean;
  data: Record<DataType, boolean>;
  services: Record<ServiceKey, boolean>;
  otherServices: string;
  accounts: boolean;
  children: boolean;
  language: PolicyLanguage;
}

export type Inline = string | { text: string; href: string };

export type PolicyBlock = { type: "p"; content: Inline[] } | { type: "ul"; items: Inline[][] };

export interface PolicySection {
  heading: string;
  blocks: PolicyBlock[];
}

export interface Policy {
  title: string;
  effective: string;
  sections: PolicySection[];
}

export const SERVICES: Record<ServiceKey, { name: string; url: string }> = {
  googlePlayServices: { name: "Google Play Services", url: "https://policies.google.com/privacy" },
  admob: { name: "Google AdMob", url: "https://support.google.com/admob/answer/6128543" },
  firebaseAnalytics: { name: "Google Analytics for Firebase", url: "https://firebase.google.com/support/privacy" },
  crashlytics: { name: "Firebase Crashlytics", url: "https://firebase.google.com/support/privacy" },
  facebook: { name: "Meta (Facebook) SDK", url: "https://www.facebook.com/privacy/policy/" },
};

/** Adds https:// when missing and rejects anything that isn't an http(s) URL. */
export function safeUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function listJoin(items: string[], language: PolicyLanguage): string {
  return new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(items);
}

function formatDate(iso: string, language: PolicyLanguage): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", { dateStyle: "long" }).format(date);
}

const copy = {
  en: {
    title: (app: string) => `Privacy Policy for ${app}`,
    effective: (date: string) => `Effective date: ${date}`,
    stores: { android: "Google Play", ios: "the App Store", both: "Google Play and the App Store" },
    intro: (developer: string, app: string, stores: string) =>
      `This Privacy Policy explains how ${developer} ("we", "us" or "our") collects, uses and shares information when you use the ${app} mobile application (the "App")${stores ? `, available on ${stores}` : ""}. By using the App, you agree to the practices described in this policy.`,
    collectHeading: "Information We Collect",
    collectNone:
      "The App does not collect, store or share any personal information. All features work on your device.",
    provided: (items: string) => `Information you provide: When you use certain features, you may give us your ${items}.`,
    providedItems: { name: "name", email: "email address", phone: "phone number" },
    automatic: "Information collected automatically:",
    automaticItems: {
      deviceIds:
        "Device information, such as your device model, operating system version and device identifiers (for example, the advertising ID).",
      usage: "Usage data, such as the features you use and how long you use the App.",
      diagnostics: "Crash reports and diagnostic data that help us find and fix problems.",
    },
    permissions: "Permissions you grant:",
    permissionItems: {
      location:
        "Location: With your permission, the App uses your device's location to provide location-based features. You can turn off location access in your device settings at any time.",
      camera: "Camera and photos: With your permission, the App accesses your camera or photo library only for the features that need it.",
      contacts: "Contacts: With your permission, the App accesses your contacts only for the features that need it.",
    },
    purchases: (store: string) =>
      `Purchases: In-app purchases are processed by ${store}. We do not receive or store your payment card details.`,
    purchaseStore: { android: "Google Play", ios: "Apple", both: "Google Play or Apple" },
    accountInfo:
      "Account information: When you create an account, we collect the information needed to create and manage it, such as your email address.",
    servicesCollect:
      "Information collected by third-party services: The services listed in this policy may automatically collect information such as device identifiers and usage data.",
    useHeading: "How We Use Information",
    useIntro: "We use the information described above to:",
    uses: {
      provide: "Provide, operate and maintain the App",
      improve: "Understand how the App is used and improve it",
      fix: "Find and fix technical problems",
      support: "Respond to your questions and support requests",
      ads: "Show advertising, which helps keep the App free",
      purchases: "Process purchases and restore them on your devices",
      security: "Protect the security of the App and its users",
    },
    servicesHeading: "Third-Party Services",
    servicesIntro:
      "The App uses the following third-party services, which may collect information used to identify you. Each service is governed by its own privacy policy:",
    sharingHeading: "How We Share Information",
    sharingIntro: "We do not sell your personal information. We share information only:",
    sharing: [
      "With the service providers listed in this policy, who process it on our behalf",
      "When required by law, for example to comply with a court order or other legal process",
      "When necessary to protect our rights, your safety or the safety of others",
    ],
    retentionHeading: "Data Retention",
    retention:
      "We keep personal information only for as long as it is needed to provide the App and for the purposes described in this policy, unless a longer period is required by law.",
    deletionHeading: "Account and Data Deletion",
    deletion: (email: Inline) => [
      "You can request the deletion of your account and the personal data associated with it at any time by contacting us at ",
      email,
      ". We will delete your data, except information we are required to keep by law.",
    ],
    securityHeading: "Security",
    security:
      "We use reasonable measures to protect your information. However, no method of transmission over the internet or method of electronic storage is completely secure.",
    childrenHeading: "Children's Privacy",
    childrenGeneral:
      "The App is not directed to children under the age of 13, and we do not knowingly collect personal information from them. If you believe a child has provided us with personal information, please contact us so we can delete it.",
    childrenDirected:
      "The App is designed for an audience that includes children. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. If you are a parent or guardian and believe your child has provided personal information, please contact us so we can delete it.",
    rightsHeading: "Your Rights",
    rights: (email: Inline) => [
      "Depending on where you live, you may have the right to access, correct or delete your personal information, or to object to certain uses of it. To exercise these rights, contact us at ",
      email,
      ".",
    ],
    changesHeading: "Changes to This Policy",
    changes:
      "We may update this Privacy Policy from time to time. We will post the new version on this page and update the effective date above.",
    contactHeading: "Contact Us",
    contact: (email: Inline, website: Inline | null) =>
      website
        ? ["If you have any questions about this Privacy Policy, contact us at ", email, " or visit ", website, "."]
        : ["If you have any questions about this Privacy Policy, contact us at ", email, "."],
  },
  tr: {
    title: (app: string) => `${app} Gizlilik Politikası`,
    effective: (date: string) => `Yürürlük tarihi: ${date}`,
    stores: { android: "Google Play", ios: "App Store", both: "Google Play ve App Store" },
    intro: (developer: string, app: string, stores: string) =>
      `Bu Gizlilik Politikası, ${developer} ("biz") olarak ${stores ? `${stores} üzerinde yayınlanan ` : ""}${app} mobil uygulamasını ("Uygulama") kullandığında bilgilerini nasıl topladığımızı, kullandığımızı ve paylaştığımızı açıklar. Uygulamayı kullanarak bu politikada açıklanan uygulamaları kabul etmiş olursun.`,
    collectHeading: "Topladığımız Bilgiler",
    collectNone: "Uygulama hiçbir kişisel bilgi toplamaz, saklamaz veya paylaşmaz. Tüm özellikler cihazında çalışır.",
    provided: (items: string) => `Senin verdiğin bilgiler: Bazı özellikleri kullandığında bize ${items} bilgilerini verebilirsin.`,
    providedItems: { name: "adın", email: "e-posta adresin", phone: "telefon numaran" },
    automatic: "Otomatik olarak toplanan bilgiler:",
    automaticItems: {
      deviceIds:
        "Cihaz modeli, işletim sistemi sürümü ve cihaz tanımlayıcıları (örneğin reklam kimliği) gibi cihaz bilgileri.",
      usage: "Kullandığın özellikler ve Uygulamayı ne kadar süre kullandığın gibi kullanım verileri.",
      diagnostics: "Sorunları bulup düzeltmemize yardımcı olan çökme raporları ve teşhis verileri.",
    },
    permissions: "Verdiğin izinler:",
    permissionItems: {
      location:
        "Konum: İznin olduğunda Uygulama, konuma dayalı özellikler sunmak için cihazının konumunu kullanır. Konum erişimini istediğin zaman cihaz ayarlarından kapatabilirsin.",
      camera: "Kamera ve fotoğraflar: İznin olduğunda Uygulama, kameraya veya fotoğraf galerine yalnızca bunlara ihtiyaç duyan özellikler için erişir.",
      contacts: "Kişiler: İznin olduğunda Uygulama, kişilerine yalnızca bunlara ihtiyaç duyan özellikler için erişir.",
    },
    purchases: (store: string) =>
      `Satın almalar: Uygulama içi satın almalar ${store} tarafından işlenir. Ödeme kartı bilgilerini almayız ve saklamayız.`,
    purchaseStore: { android: "Google Play", ios: "Apple", both: "Google Play veya Apple" },
    accountInfo:
      "Hesap bilgileri: Bir hesap oluşturduğunda, hesabı oluşturmak ve yönetmek için gereken e-posta adresin gibi bilgileri toplarız.",
    servicesCollect:
      "Üçüncü taraf hizmetlerin topladığı bilgiler: Bu politikada listelenen hizmetler, cihaz tanımlayıcıları ve kullanım verileri gibi bilgileri otomatik olarak toplayabilir.",
    useHeading: "Bilgileri Nasıl Kullanırız",
    useIntro: "Yukarıda açıklanan bilgileri şu amaçlarla kullanırız:",
    uses: {
      provide: "Uygulamayı sunmak, çalıştırmak ve sürdürmek",
      improve: "Uygulamanın nasıl kullanıldığını anlamak ve onu geliştirmek",
      fix: "Teknik sorunları bulmak ve düzeltmek",
      support: "Sorularına ve destek taleplerine yanıt vermek",
      ads: "Uygulamanın ücretsiz kalmasına yardımcı olan reklamları göstermek",
      purchases: "Satın almaları işlemek ve cihazlarında geri yüklemek",
      security: "Uygulamanın ve kullanıcılarının güvenliğini korumak",
    },
    servicesHeading: "Üçüncü Taraf Hizmetler",
    servicesIntro:
      "Uygulama, seni tanımlamak için kullanılabilecek bilgiler toplayabilen aşağıdaki üçüncü taraf hizmetleri kullanır. Her hizmet kendi gizlilik politikasına tabidir:",
    sharingHeading: "Bilgileri Nasıl Paylaşırız",
    sharingIntro: "Kişisel bilgilerini satmayız. Bilgileri yalnızca şu durumlarda paylaşırız:",
    sharing: [
      "Bu politikada listelenen ve bilgileri bizim adımıza işleyen hizmet sağlayıcılarla",
      "Mahkeme kararı veya başka bir yasal süreç gibi yasaların gerektirdiği durumlarda",
      "Haklarımızı, senin güvenliğini veya başkalarının güvenliğini korumak için gerekli olduğunda",
    ],
    retentionHeading: "Veri Saklama",
    retention:
      "Kişisel bilgileri, yasaların daha uzun bir süre gerektirmediği durumlarda, yalnızca Uygulamayı sunmak ve bu politikada açıklanan amaçlar için gerektiği sürece saklarız.",
    deletionHeading: "Hesap ve Veri Silme",
    deletion: (email: Inline) => [
      "Hesabının ve hesabınla ilişkili kişisel verilerin silinmesini istediğin zaman ",
      email,
      " adresinden bizimle iletişime geçerek talep edebilirsin. Yasal olarak saklamamız gereken bilgiler dışındaki verilerini sileriz.",
    ],
    securityHeading: "Güvenlik",
    security:
      "Bilgilerini korumak için makul önlemler alırız. Ancak internet üzerinden iletim veya elektronik saklama yöntemlerinin hiçbiri tamamen güvenli değildir.",
    childrenHeading: "Çocukların Gizliliği",
    childrenGeneral:
      "Uygulama 13 yaşından küçük çocuklara yönelik değildir ve bu çocuklardan bilerek kişisel bilgi toplamayız. Bir çocuğun bize kişisel bilgi verdiğini düşünüyorsan, silebilmemiz için lütfen bizimle iletişime geç.",
    childrenDirected:
      "Uygulama, çocukları da içeren bir kitle için tasarlanmıştır. 13 yaşından küçük çocuklardan, doğrulanabilir ebeveyn izni olmadan bilerek kişisel bilgi toplamayız. Ebeveyn veya vasi olarak çocuğunun kişisel bilgi verdiğini düşünüyorsan, silebilmemiz için lütfen bizimle iletişime geç.",
    rightsHeading: "Hakların",
    rights: (email: Inline) => [
      "Yaşadığın yere bağlı olarak (örneğin KVKK veya GDPR kapsamında) kişisel bilgilerine erişme, bunları düzeltme veya silme ve bazı kullanımlarına itiraz etme hakkın olabilir. Bu haklarını kullanmak için ",
      email,
      " adresinden bizimle iletişime geçebilirsin.",
    ],
    changesHeading: "Bu Politikadaki Değişiklikler",
    changes:
      "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Yeni sürümü bu sayfada yayınlar ve yukarıdaki yürürlük tarihini güncelleriz.",
    contactHeading: "İletişim",
    contact: (email: Inline, website: Inline | null) =>
      website
        ? ["Bu Gizlilik Politikası hakkında sorun varsa ", email, " adresinden bize ulaşabilir veya ", website, " adresini ziyaret edebilirsin."]
        : ["Bu Gizlilik Politikası hakkında sorun varsa ", email, " adresinden bize ulaşabilirsin."],
  },
};

export interface PolicyPlaceholders {
  appName: string;
  developerName: string;
  email: string;
  date: string;
}

export function generatePolicy(input: PolicyInput, placeholders: PolicyPlaceholders): Policy {
  const t = copy[input.language];
  const app = input.appName.trim() || placeholders.appName;
  const developer = input.developerName.trim() || placeholders.developerName;
  const emailText = input.email.trim() || placeholders.email;
  const email: Inline = input.email.trim() ? { text: emailText, href: `mailto:${emailText}` } : emailText;
  const websiteUrl = safeUrl(input.website);
  const website: Inline | null = websiteUrl ? { text: input.website.trim(), href: websiteUrl } : null;
  const date = input.effectiveDate ? formatDate(input.effectiveDate, input.language) : placeholders.date;

  const platform = input.android && input.ios ? "both" : input.ios ? "ios" : input.android ? "android" : null;
  const stores = platform ? t.stores[platform] : "";

  const { data, services } = input;
  const otherServices = input.otherServices
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const hasServices = Object.values(services).some(Boolean) || otherServices.length > 0;
  const collectsAnything = Object.values(data).some(Boolean) || hasServices || input.accounts;

  const sections: PolicySection[] = [];

  // Information we collect
  const collect: PolicyBlock[] = [];
  const providedKeys = (["name", "email", "phone"] as const).filter((key) => data[key]);
  if (providedKeys.length) {
    collect.push({
      type: "p",
      content: [t.provided(listJoin(providedKeys.map((key) => t.providedItems[key]), input.language))],
    });
  }
  const automaticKeys = (["deviceIds", "usage", "diagnostics"] as const).filter((key) => data[key]);
  if (automaticKeys.length) {
    collect.push({ type: "p", content: [t.automatic] });
    collect.push({ type: "ul", items: automaticKeys.map((key) => [t.automaticItems[key]]) });
  }
  const permissionKeys = (["location", "camera", "contacts"] as const).filter((key) => data[key]);
  if (permissionKeys.length) {
    collect.push({ type: "p", content: [t.permissions] });
    collect.push({ type: "ul", items: permissionKeys.map((key) => [t.permissionItems[key]]) });
  }
  if (data.purchases) {
    collect.push({ type: "p", content: [t.purchases(t.purchaseStore[platform ?? "both"])] });
  }
  if (input.accounts && !data.email && !data.name) {
    collect.push({ type: "p", content: [t.accountInfo] });
  }
  if (hasServices && automaticKeys.length === 0) {
    collect.push({ type: "p", content: [t.servicesCollect] });
  }
  if (!collectsAnything) {
    collect.push({ type: "p", content: [t.collectNone] });
  }
  sections.push({ heading: t.collectHeading, blocks: collect });

  // How we use information
  if (collectsAnything) {
    const uses: string[] = [t.uses.provide];
    if (data.usage || services.firebaseAnalytics) uses.push(t.uses.improve);
    if (data.diagnostics || services.crashlytics) uses.push(t.uses.fix);
    if (data.email || data.name || data.phone || input.accounts) uses.push(t.uses.support);
    if (services.admob || services.facebook) uses.push(t.uses.ads);
    if (data.purchases) uses.push(t.uses.purchases);
    uses.push(t.uses.security);
    sections.push({
      heading: t.useHeading,
      blocks: [
        { type: "p", content: [t.useIntro] },
        { type: "ul", items: uses.map((use) => [use]) },
      ],
    });
  }

  // Third-party services
  if (hasServices) {
    const items: Inline[][] = (Object.keys(SERVICES) as ServiceKey[])
      .filter((key) => services[key])
      .map((key) => [{ text: SERVICES[key].name, href: SERVICES[key].url }]);
    otherServices.forEach((name) => items.push([name]));
    sections.push({
      heading: t.servicesHeading,
      blocks: [
        { type: "p", content: [t.servicesIntro] },
        { type: "ul", items },
      ],
    });
  }

  if (collectsAnything) {
    sections.push({
      heading: t.sharingHeading,
      blocks: [
        { type: "p", content: [t.sharingIntro] },
        { type: "ul", items: t.sharing.map((item) => [item]) },
      ],
    });
    sections.push({ heading: t.retentionHeading, blocks: [{ type: "p", content: [t.retention] }] });
  }

  if (input.accounts) {
    sections.push({ heading: t.deletionHeading, blocks: [{ type: "p", content: t.deletion(email) }] });
  }

  sections.push({ heading: t.securityHeading, blocks: [{ type: "p", content: [t.security] }] });
  sections.push({
    heading: t.childrenHeading,
    blocks: [{ type: "p", content: [input.children ? t.childrenDirected : t.childrenGeneral] }],
  });
  if (collectsAnything) {
    sections.push({ heading: t.rightsHeading, blocks: [{ type: "p", content: t.rights(email) }] });
  }
  sections.push({ heading: t.changesHeading, blocks: [{ type: "p", content: [t.changes] }] });
  sections.push({ heading: t.contactHeading, blocks: [{ type: "p", content: t.contact(email, website) }] });

  return {
    title: t.title(app),
    effective: t.effective(date),
    sections: [
      { heading: "", blocks: [{ type: "p", content: [t.intro(developer, app, stores)] }] },
      ...sections,
    ],
  };
}

// --- Renderers ------------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineToHtml(content: Inline[]): string {
  return content
    .map((part) =>
      typeof part === "string"
        ? escapeHtml(part)
        : `<a href="${escapeHtml(part.href)}">${escapeHtml(part.text)}</a>`,
    )
    .join("");
}

function escapeMarkdown(value: string): string {
  return value.replace(/([\\`*_[\]<>])/g, "\\$1");
}

function inlineToMarkdown(content: Inline[]): string {
  return content
    .map((part) =>
      typeof part === "string" ? escapeMarkdown(part) : `[${escapeMarkdown(part.text)}](${part.href})`,
    )
    .join("");
}

function inlineToText(content: Inline[]): string {
  return content
    .map((part) =>
      typeof part === "string" ? part : part.href.startsWith("mailto:") || part.text === part.href ? part.text : `${part.text} (${part.href})`,
    )
    .join("");
}

export function policyToHtmlBody(policy: Policy): string {
  const parts = [`<h1>${escapeHtml(policy.title)}</h1>`, `<p><em>${escapeHtml(policy.effective)}</em></p>`];
  for (const section of policy.sections) {
    if (section.heading) parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(`<p>${inlineToHtml(block.content)}</p>`);
      else parts.push(`<ul>\n${block.items.map((item) => `  <li>${inlineToHtml(item)}</li>`).join("\n")}\n</ul>`);
    }
  }
  return parts.join("\n");
}

export function policyToHtmlDocument(policy: Policy, language: PolicyLanguage): string {
  return `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(policy.title)}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; line-height: 1.65; color: #1f2937; }
  h1 { line-height: 1.25; }
  h2 { margin-top: 2em; }
  a { color: #4338ca; }
</style>
</head>
<body>
${policyToHtmlBody(policy)}
</body>
</html>
`;
}

export function policyToMarkdown(policy: Policy): string {
  const lines = [`# ${escapeMarkdown(policy.title)}`, "", `_${escapeMarkdown(policy.effective)}_`, ""];
  for (const section of policy.sections) {
    if (section.heading) lines.push(`## ${escapeMarkdown(section.heading)}`, "");
    for (const block of section.blocks) {
      if (block.type === "p") lines.push(inlineToMarkdown(block.content), "");
      else lines.push(...block.items.map((item) => `- ${inlineToMarkdown(item)}`), "");
    }
  }
  return lines.join("\n");
}

export function policyToText(policy: Policy): string {
  const lines = [policy.title, policy.effective, ""];
  for (const section of policy.sections) {
    if (section.heading) lines.push(section.heading.toUpperCase(), "");
    for (const block of section.blocks) {
      if (block.type === "p") lines.push(inlineToText(block.content), "");
      else lines.push(...block.items.map((item) => `• ${inlineToText(item)}`), "");
    }
  }
  return lines.join("\n");
}
