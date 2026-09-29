import type { OurAppId } from "@/lib/our-apps";
import type { ToolCategory, ToolSlug } from "@/lib/tools";

export const en = {
  meta: {
    defaultTitle: "AppKitly – Free Tools for App Developers",
    defaultDescription:
      "Free online tools for mobile app developers. Create store graphics, resize app icons, optimize images and prepare your app for Google Play and the App Store.",
    toolsTitle: "All Tools for App Developers",
    toolsDescription:
      "Browse free tools for app developers: store screenshots, feature graphics, app icon resizing, image compression, color palettes and more.",
    categoryTitle: "{category} for App Developers",
  },
  common: {
    skipToContent: "Skip to content",
    homeLabel: "AppKitly home",
    comingSoon: "Coming soon",
    openTool: "Open tool",
    viewAllTools: "View all tools",
    closeNotification: "Close notification",
  },
  toolPage: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    tools: "Tools",
    relatedTitle: "Related tools",
    relatedSubtitle: "Other free tools that help with the same release.",
    howToTitle: "How to use the {tool}",
    featuresTitle: "Features",
    faqTitle: "Frequently asked questions",
    guidesTitle: "Related guides",
    guidesSubtitle: "Learn more about the store requirements behind this tool.",
  },
  blog: {
    title: "Guides for App Developers",
    metaTitle: "Google Play & App Store Guides for App Developers",
    description:
      "Practical guides to Google Play and App Store screenshots, app icons, feature graphics and store listings.",
    readingTime: "{minutes} min read",
    updated: "Updated {date}",
    readGuide: "Read guide",
    relatedTools: "Tools used in this guide",
    allGuides: "All guides",
    latestTitle: "Latest guides",
    latestSubtitle: "Store requirements and practical tips, explained simply.",
  },
  nav: {
    label: "Main navigation",
    tools: "All Tools",
    playStore: "Play Store",
    images: "Image Tools",
    design: "Design",
    blog: "Blog",
    apps: "Our Apps",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTheme: "Switch between light and dark theme",
    language: "Language",
  },
  home: {
    eyebrow: "Free tools for app developers",
    heroTitleLead: "Everything You Need to",
    heroTitleAccent: "Launch Your App",
    heroSubtitle:
      "Free tools for app developers. Create store graphics, resize app icons, optimize images and prepare your app for Google Play and the App Store.",
    exploreTools: "Explore Tools",
    playStoreTools: "Play Store Tools",
    highlights: ["Free to use", "No sign-up required", "English & Türkçe"],
    specsLabel: "Common Google Play listing requirements",
    specs: [
      { value: "512 × 512", label: "App icon" },
      { value: "1024 × 500", label: "Feature graphic" },
      { value: "9:16", label: "Phone screenshots" },
      { value: "80", label: "Short description characters" },
    ],
    popularTitle: "Popular Tools",
    popularSubtitle:
      "The essentials for shipping a polished store listing, from graphics to images and colors.",
    categoriesTitle: "Browse by Category",
    categoriesSubtitle: "Find the right tool for each step of your release.",
    principlesTitle: "Built for the way developers ship",
    principles: [
      {
        title: "Free to use",
        body: "No accounts, no trials and no watermarks. Open a tool and get your work done.",
      },
      {
        title: "Private by design",
        body: "Every tool runs in your browser. Your files never leave your device.",
      },
      {
        title: "Made for store requirements",
        body: "Tools are built around the image sizes and limits used by Google Play and the App Store.",
      },
    ],
    ctaTitle: "Find the tool for your next release",
    ctaBody: "Browse every AppKitly tool in one place and filter by category.",
    ctaButton: "Browse all tools",
  },
  tools: {
    title: "All Tools",
    subtitle:
      "Free tools for preparing store graphics, images, colors and listing content for your app.",
    searchLabel: "Search tools",
    searchPlaceholder: "Search tools…",
    filterLabel: "Filter by category",
    allCategories: "All",
    toolCount: { one: "{count} tool", other: "{count} tools" },
    noResultsTitle: "No tools found",
    noResultsBody: "Try a different search term or choose another category.",
    clearSearch: "Clear search",
  },
  categories: {
    "play-store": {
      name: "Play Store Tools",
      shortName: "Play Store",
      description:
        "Create screenshots, feature graphics and listing content for your Google Play store page.",
    },
    images: {
      name: "Image Tools",
      shortName: "Images",
      description: "Resize app icons, compress screenshots and convert images between formats.",
    },
    design: {
      name: "Design Tools",
      shortName: "Design",
      description: "Generate color palettes and gradients for your app's interface and store assets.",
    },
    legal: {
      name: "Legal & Policy Tools",
      shortName: "Legal",
      description: "Prepare the policy documents app stores require before you publish.",
    },
  } satisfies Record<ToolCategory, { name: string; shortName: string; description: string }>,
  toolList: {
    "play-store-screenshot-maker": {
      name: "Play Store Screenshot Maker",
      description:
        "Place your app screenshots on backgrounds with captions and export store-ready images.",
    },
    "feature-graphic-maker": {
      name: "Feature Graphic Maker",
      description: "Design the 1024×500 feature graphic shown at the top of your Google Play listing.",
    },
    "app-icon-resizer": {
      name: "App Icon Resizer",
      description: "Resize one icon into 512×512, 1024×1024 and the other sizes your app needs.",
    },
    "image-compressor": {
      name: "Image Compressor",
      description: "Reduce PNG, JPG and WebP file sizes while keeping your images sharp.",
    },
    "image-converter": {
      name: "Image Converter",
      description: "Convert images between PNG, JPG and WebP formats.",
    },
    "privacy-policy-generator": {
      name: "Privacy Policy Generator",
      description: "Create a privacy policy for your app based on the data it collects.",
    },
    "play-store-description-counter": {
      name: "Play Store Description Counter",
      description: "Check your app title, short description and full description against character limits.",
    },
    "color-palette-generator": {
      name: "Color Palette Generator",
      description: "Generate five-color palettes, lock the colors you like and copy HEX codes.",
    },
    "gradient-generator": {
      name: "Gradient Generator",
      description: "Build linear and radial gradients and copy the CSS code.",
    },
  } satisfies Record<ToolSlug, { name: string; description: string }>,
  ourApps: {
    metaTitle: "Our Android Apps",
    metaDescription:
      "Android apps by Incipient Apps, the team behind AppKitly: prayer times, a Qibla compass, a status saver, a word game and a football quiz.",
    title: "Our Apps",
    intro: "AppKitly is made by Incipient Apps. Here are the Android apps we build and publish on Google Play.",
    viewOnPlay: "View on Google Play",
    viewOnPlayLabel: "{name} on Google Play (opens in a new tab)",
    developerPage: "All our apps on Google Play",
    homeTitle: "From the team behind AppKitly",
    homeSubtitle: "We build Android apps too. Take a look at what we've published on Google Play.",
    allApps: "See our apps",
    list: {
      "ezan-vakti": {
        name: "Ezan Vakti: Namaz Kuran",
        category: "Lifestyle",
        description:
          "Prayer times with adhan alerts, the Holy Quran, a Qibla finder, dhikr, religious days and the Ramadan imsak calendar in one simple app.",
      },
      "durum-indirici": {
        name: "Status Downloader Status Saver",
        category: "Tools",
        description: "Save the statuses your contacts share and create eye-catching posts with a built-in design studio.",
      },
      "kelime-koprusu": {
        name: "Word Bridge Battle",
        category: "Word game",
        description:
          "A relaxing word puzzle: build words from the given letters, complete the bridges and travel through colorful space-themed levels.",
      },
      "kabe-yonu": {
        name: "Kabe Yönü: Kıble Pusulası",
        category: "Lifestyle",
        description:
          "Find the Qibla anywhere with a precise compass, a map view and a camera-based AR mode, plus a digital dhikr counter.",
      },
      "football-striker": {
        name: "Football Striker: Quiz Game",
        category: "Trivia",
        description:
          "A football quiz for true fans: test what you know about World Cups, transfers, Champions League legends and more.",
      },
    } satisfies Record<OurAppId, { name: string; category: string; description: string }>,
  },
  privacyPage: {
    metaTitle: "Privacy",
    metaDescription:
      "How AppKitly handles your data: tools run in your browser, files never leave your device and visits are counted anonymously without cookies.",
    title: "Privacy",
    intro: "AppKitly is a set of free tools that run in your browser. We built it to collect as little data as possible.",
    updated: "Last updated: {date}",
    sections: [
      {
        heading: "Your files stay on your device",
        body: "Every tool runs in your browser. The images, icons, screenshots and texts you use in the tools are processed on your device and are never uploaded to our servers or anyone else's.",
      },
      {
        heading: "Anonymous visit statistics",
        body: "We use Vercel Web Analytics to count page views and see which pages are useful. It records anonymous information such as the page visited, the referring website, the country and the device type. It doesn't use cookies and doesn't identify you personally.",
      },
      {
        heading: "Settings saved in your browser",
        body: "When you switch between the light and dark theme, your choice is saved in your browser's local storage so the site remembers it. It never leaves your device.",
      },
      {
        heading: "Hosting",
        body: "The site is hosted by Vercel. Like any web host, Vercel processes technical data such as IP addresses to deliver pages and keep the service secure.",
      },
      {
        heading: "Links to other websites",
        body: "Links to Google Play and other websites are covered by those websites' own privacy policies.",
      },
      {
        heading: "Changes",
        body: "If we change how AppKitly handles data, we will update this page and the date above.",
      },
    ],
    contactHeading: "Contact",
    contactBody: "You can reach us through the contact details on our",
    contactLink: "Google Play developer page",
  },
  footer: {
    tagline: "Free online tools for mobile app developers.",
    categories: "Categories",
    explore: "Explore",
    home: "Home",
    allTools: "All tools",
    blog: "Blog",
    apps: "Our apps",
    privacy: "Privacy",
    language: "Language",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;
