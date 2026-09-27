import type { ToolSlug } from "@/lib/tools";

export interface ToolContent {
  /** Page title without the site name, e.g. "Free Play Store Screenshot Maker". */
  seoTitle: string;
  seoDescription: string;
  /** Lead paragraph under the H1. */
  intro: string;
  howTo: string[];
  features: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
}

export const enToolContent: Record<ToolSlug, ToolContent> = {
  "play-store-screenshot-maker": {
    seoTitle: "Free Play Store Screenshot Maker",
    seoDescription:
      "Create professional Google Play Store screenshots online for free. No signup required. Your files stay on your device.",
    intro:
      "Turn plain app screenshots into polished Google Play listing images. Add a background, a headline and a subtitle, then export a PNG at the exact size you need.",
    howTo: [
      "Choose a canvas size. 1080 × 1920 works well for most phone listings.",
      "Upload a screenshot of your app as a PNG, JPG or WebP file.",
      "Pick a template, then adjust the background, the texts and the position of your screenshot.",
      "Export the PNG and upload it to your store listing in Google Play Console.",
    ],
    features: [
      {
        title: "Exact export size",
        body: "The PNG is rendered at the full canvas size you choose, not at the size of the preview on your screen.",
      },
      {
        title: "Ready for Google Play",
        body: "Exports are 24-bit PNG files without an alpha channel, the format Google Play asks for.",
      },
      {
        title: "Five templates",
        body: "Start from Minimal, Gradient, Clean, Bold or Dark, then change every color, text and position.",
      },
      {
        title: "Full control",
        body: "Move, resize and rotate your screenshot, round its corners and add a shadow. Undo and redo any change.",
      },
    ],
    faq: [
      {
        question: "What size should Google Play screenshots be?",
        answer:
          "Google Play accepts JPEG or 24-bit PNG screenshots with sides between 320 px and 3,840 px, and the longer side can't be more than twice the shorter side. 1080 × 1920 for portrait screenshots is a safe choice.",
      },
      {
        question: "How many screenshots do I need?",
        answer:
          "You need at least two screenshots to publish and can add up to eight per device type. Google recommends at least four screenshots with a resolution of at least 1080 px so your app can be promoted on Google Play.",
      },
      {
        question: "Why does 1080 × 2340 show a warning?",
        answer:
          "Its long side is more than twice its short side, which Google Play doesn't accept for store screenshots. The size is still useful elsewhere, for example on your website.",
      },
      {
        question: "Can I create App Store screenshots too?",
        answer:
          "Yes. Choose Custom and enter the size Apple asks for, such as 1242 × 2688 for 6.5-inch iPhone displays. Our App Store screenshot sizes guide lists the current sizes.",
      },
      {
        question: "Are my screenshots uploaded to a server?",
        answer: "No. The editor runs entirely in your browser, and the final image is created on your device.",
      },
    ],
  },
  "feature-graphic-maker": {
    seoTitle: "Free Feature Graphic Maker for Google Play (1024×500)",
    seoDescription:
      "Design a 1024×500 Google Play feature graphic online for free. Add your app icon, a screenshot and a headline, then export a store-ready PNG.",
    intro:
      "Design the 1024 × 500 banner that represents your app on Google Play. Combine your app icon, a screenshot and a short message, then export a PNG that is ready to upload.",
    howTo: [
      "Pick a template, such as App Showcase or Minimal.",
      "Upload your app icon and, if you like, a screenshot of your app.",
      "Edit the title and subtitle, and drag the elements into place.",
      "Export the PNG and add it as the feature graphic in Google Play Console.",
    ],
    features: [
      {
        title: "Always 1024 × 500",
        body: "Every export has the exact size Google Play requires, no matter how large the preview is on your screen.",
      },
      {
        title: "No transparency issues",
        body: "The PNG is saved as 24-bit without an alpha channel, so Play Console accepts it.",
      },
      {
        title: "Edit on the canvas",
        body: "Drag elements to move them, use the handles to resize and rotate, or type exact values with the sliders.",
      },
      {
        title: "Five templates",
        body: "Minimal, App Showcase, Gradient, Dark and Clean give you a good starting point in one click.",
      },
    ],
    faq: [
      {
        question: "What is the Google Play feature graphic size?",
        answer:
          "1024 × 500 pixels, as a JPEG or a 24-bit PNG without transparency. This tool always exports at exactly that size.",
      },
      {
        question: "Where is the feature graphic shown?",
        answer:
          "Google Play uses it in several places, including at the top of your store listing and as the cover image of your promo video if you add one.",
      },
      {
        question: "What should I put on my feature graphic?",
        answer:
          "Keep it simple: your app icon or name, one short message and a visual of your app. Keep important text away from the edges and avoid small text that is hard to read on phones.",
      },
      {
        question: "Can I use a screenshot that is taller than the banner?",
        answer:
          "Yes. Move and resize it so the part you want to show is visible. Anything outside the 1024 × 500 area is simply cut off in the export.",
      },
      {
        question: "Is my artwork uploaded?",
        answer: "No. Your icon and screenshots are processed in your browser and never leave your device.",
      },
    ],
  },
  "app-icon-resizer": {
    seoTitle: "Free App Icon Resizer: 512×512, 1024×1024 & Android",
    seoDescription:
      "Resize your app icon to 512×512 for Google Play, 1024×1024 for the App Store and every Android launcher size. Free, fast and private.",
    intro:
      "Upload one high-resolution icon and get every size you need: 512 × 512 for Google Play, 1024 × 1024 for the App Store and 48–192 px for Android launcher icons.",
    howTo: [
      "Upload a square PNG, JPG or WebP icon, ideally 1024 × 1024 px or larger.",
      "Select the sizes you need.",
      "Choose a background: keep the transparency or fill it with white, black or a custom color.",
      "Download a single PNG, or all selected sizes as a ZIP file.",
    ],
    features: [
      {
        title: "Store and launcher sizes",
        body: "1024 × 1024 for the App Store, 512 × 512 for Google Play and the five Android densities from mdpi to xxxhdpi.",
      },
      {
        title: "Sharp small icons",
        body: "Icons are scaled down in steps, which keeps 48 px and 72 px icons crisp instead of blurry or jagged.",
      },
      {
        title: "Background options",
        body: "Keep transparency, or fill it with white, black or any color, for example for the App Store icon.",
      },
      {
        title: "ZIP download",
        body: "Get every selected size in one ZIP file, named with its dimensions.",
      },
    ],
    faq: [
      {
        question: "What icon size does Google Play need?",
        answer:
          "A 512 × 512 PNG (32-bit, with alpha) of up to 1 MB. Google Play applies the rounded mask and shadow itself, so upload a full-square icon without rounded corners.",
      },
      {
        question: "What icon size does the App Store need?",
        answer:
          "A 1024 × 1024 PNG without transparency. If your icon has transparent areas, choose a background color before downloading.",
      },
      {
        question: "What are the Android launcher icon sizes?",
        answer:
          "48 × 48 (mdpi), 72 × 72 (hdpi), 96 × 96 (xhdpi), 144 × 144 (xxhdpi) and 192 × 192 (xxxhdpi). Modern Android apps also include an adaptive icon, which Android Studio's Image Asset Studio can create from your artwork.",
      },
      {
        question: "What happens if my image isn't square?",
        answer:
          "With Keep aspect ratio turned on, the whole image fits inside the square and the empty space uses your background. Turn it off to stretch the image so it fills the square.",
      },
      {
        question: "Are my files uploaded?",
        answer: "No. Resizing happens in your browser and your images never leave your device.",
      },
    ],
  },
  "image-compressor": {
    seoTitle: "Free Image Compressor for PNG, JPG and WebP",
    seoDescription:
      "Compress PNG, JPG and WebP images online for free. Compare before and after, see how much you saved and download instantly. Files never leave your device.",
    intro:
      "Shrink screenshots, icons and store graphics without visible quality loss. Adjust the quality, compare the result with the original and download the smaller file.",
    howTo: [
      "Upload a PNG, JPG or WebP image.",
      "Set the quality. A value between 70 and 85 is a good start for screenshots.",
      "Keep the original format or convert to WebP or JPG for a smaller file.",
      "Drag the comparison slider to check the result, then download it.",
    ],
    features: [
      {
        title: "Smart PNG compression",
        body: "PNG files are shrunk by reducing the number of colors, similar to TinyPNG, while keeping transparency.",
      },
      {
        title: "Before and after",
        body: "A comparison slider shows the original and the compressed image side by side.",
      },
      {
        title: "Clear savings",
        body: "See the original size, the new size and the percentage you saved before you download.",
      },
      {
        title: "Private by design",
        body: "Compression runs in your browser. Your images are never uploaded to a server.",
      },
    ],
    faq: [
      {
        question: "How does PNG compression work?",
        answer:
          "The tool reduces the image to a smaller color palette, which makes PNG files much smaller. Lower quality means fewer colors. At 100 the PNG stays lossless.",
      },
      {
        question: "Which quality setting should I use?",
        answer:
          "Start around 80. Photos and screenshots usually look the same at 70–85. If the image has fine text or gradients, try a higher value and compare.",
      },
      {
        question: "Why is my compressed file larger than the original?",
        answer:
          "The original was probably already well optimized. Try a lower quality or another output format, such as WebP.",
      },
      {
        question: "Which format should I use for store screenshots?",
        answer:
          "Google Play asks for JPEG or 24-bit PNG screenshots, and the App Store accepts JPEG and PNG. JPG at quality 80–90 is usually the safest small option for store screenshots.",
      },
      {
        question: "Are my images uploaded?",
        answer: "No. Everything happens on your device, so the tool also works with confidential designs.",
      },
    ],
  },
  "image-converter": {
    seoTitle: "Free Image Converter: PNG, JPG and WebP",
    seoDescription:
      "Convert images between PNG, JPG and WebP online for free. Choose the quality and background color, preview the result and download it. No upload needed.",
    intro:
      "Convert PNG, JPG and WebP images in your browser. Handy when a store, website or tool accepts only one format.",
    howTo: [
      "Upload a PNG, JPG or WebP image.",
      "Choose the format you want to convert to.",
      "Set the quality for JPG or WebP, and a background color for transparent areas when converting to JPG.",
      "Press Convert, check the preview and download the new file.",
    ],
    features: [
      {
        title: "All common conversions",
        body: "PNG to JPG or WebP, JPG to PNG or WebP, and WebP to PNG or JPG.",
      },
      {
        title: "Transparency handled",
        body: "PNG and WebP keep transparency. For JPG you choose the color that fills transparent areas.",
      },
      {
        title: "Quality control",
        body: "Set the quality for JPG and WebP to balance file size and detail.",
      },
      {
        title: "Nothing is uploaded",
        body: "Conversion happens in your browser, so your images stay on your device.",
      },
    ],
    faq: [
      {
        question: "Which format should I use for Google Play and App Store assets?",
        answer:
          "Use PNG for app icons. For screenshots and the feature graphic, Google Play accepts JPEG or 24-bit PNG, and the App Store accepts JPEG or PNG.",
      },
      {
        question: "Why did the transparent background turn white?",
        answer:
          "JPG doesn't support transparency, so transparent pixels are filled with the background color you choose. Convert to PNG or WebP to keep transparency.",
      },
      {
        question: "Does converting improve image quality?",
        answer:
          "No. Converting can't add detail that isn't there. Converting to JPG or WebP at a low quality can remove some detail, so keep the quality high if you plan to edit the image later.",
      },
      {
        question: "Is there a file size limit?",
        answer: "Images can be up to 20 MB.",
      },
    ],
  },
  "color-palette-generator": {
    seoTitle: "Free Color Palette Generator for App Design",
    seoDescription:
      "Generate harmonious five-color palettes for your app. Lock the colors you like, fine-tune them and copy HEX codes or CSS variables in one click.",
    intro:
      "Find a color scheme for your app's interface, icon or store graphics. Generate palettes, keep the colors you like and copy the codes.",
    howTo: [
      "Press Generate palette, or the Space bar, to create a new palette.",
      "Lock the colors you want to keep. Locked colors stay when you generate again.",
      "Fine-tune any color with the color picker.",
      "Copy a single HEX code, all codes or the palette as CSS variables.",
    ],
    features: [
      {
        title: "Harmonious palettes",
        body: "Colors are based on color harmony rules in a perceptual color space, arranged from light to dark.",
      },
      {
        title: "Lock and regenerate",
        body: "Keep the colors you like and generate new options for the rest.",
      },
      {
        title: "Readable labels",
        body: "Each color's label switches between dark and light text so it stays easy to read.",
      },
      {
        title: "Copy in one click",
        body: "Copy HEX codes for design tools or CSS variables for your website.",
      },
    ],
    faq: [
      {
        question: "How are the palettes created?",
        answer:
          "Each palette starts from a random hue and a harmony rule, such as analogous, complementary or triadic colors. Colors are spread from light to dark so the palette works for backgrounds, surfaces and text.",
      },
      {
        question: "How do I use the colors in my app?",
        answer:
          "Copy the HEX codes into your design tool, Android colors.xml, a Jetpack Compose or Flutter theme, or SwiftUI. For websites, copy the CSS variables.",
      },
      {
        question: "Are the generated colors accessible?",
        answer:
          "Not automatically. Check the contrast of the text and background pairs you use. WCAG recommends a contrast ratio of at least 4.5:1 for normal text.",
      },
      {
        question: "Can I keep a color I like?",
        answer: "Yes. Press the lock button on a color and it stays the same when you generate a new palette.",
      },
    ],
  },
  "gradient-generator": {
    seoTitle: "Free CSS Gradient Generator (Linear & Radial)",
    seoDescription:
      "Create linear and radial CSS gradients with a live preview. Pick colors, set the angle and copy ready-to-use CSS code for free.",
    intro:
      "Build smooth linear or radial gradients for app backgrounds, buttons and store graphics, then copy the CSS in one click.",
    howTo: [
      "Choose a linear or radial gradient.",
      "Pick up to five colors and set where each one starts.",
      "Set the angle, or the shape and center of a radial gradient.",
      "Copy the CSS and paste it into your stylesheet.",
    ],
    features: [
      { title: "Live preview", body: "See every change immediately in a large preview." },
      { title: "Up to five colors", body: "Add colors and set the position of each one along the gradient." },
      { title: "Presets and random", body: "Start from a curated preset, or let the tool suggest a random gradient." },
      {
        title: "Ready-to-use CSS",
        body: "The code includes a solid color fallback line before the gradient.",
      },
    ],
    faq: [
      {
        question: "How do I use the gradient on my website?",
        answer:
          "Copy the CSS and paste it into the rule for your element. The first line sets a solid color for very old browsers, the second line sets the gradient.",
      },
      {
        question: "Can I use the gradient in an Android or iOS app?",
        answer:
          "Yes, use the same colors and angle. On Android you can use a gradient drawable or a Brush in Jetpack Compose, and on iOS a LinearGradient in SwiftUI.",
      },
      {
        question: "What is the difference between linear and radial gradients?",
        answer:
          "A linear gradient changes color along a straight line at the angle you choose. A radial gradient spreads out from a center point as a circle or an ellipse.",
      },
      {
        question: "How many colors can a gradient have?",
        answer: "This tool supports two to five colors, which covers almost every design.",
      },
    ],
  },
  "privacy-policy-generator": {
    seoTitle: "Free Privacy Policy Generator for Mobile Apps",
    seoDescription:
      "Create a privacy policy for your Android or iOS app in minutes. Choose the data you collect and the services you use, then copy or download it in English or Turkish.",
    intro:
      "Answer a few questions about your app and get a clear privacy policy you can publish on your website and link from Google Play and the App Store.",
    howTo: [
      "Enter your app name, your developer or company name and a contact email.",
      "Select the data your app collects and the third-party services it uses.",
      "Choose the language of the policy: English or Turkish.",
      "Copy the text, or download it as HTML or Markdown, and publish it at a public URL.",
    ],
    features: [
      {
        title: "Only what applies",
        body: "Sections change with your answers, so the policy describes what your app actually does.",
      },
      {
        title: "Common services included",
        body: "Google Play Services, AdMob, Google Analytics for Firebase, Crashlytics and the Meta SDK, with links to their policies.",
      },
      {
        title: "English and Turkish",
        body: "Generate the policy in either language, whatever language you use the site in.",
      },
      {
        title: "Easy to publish",
        body: "Copy plain text, or download a ready-made HTML page or a Markdown file.",
      },
    ],
    faq: [
      {
        question: "Does my app need a privacy policy?",
        answer:
          "Yes. Google Play requires a privacy policy link for every app, and Apple requires one for every app on the App Store. You add the URL in Play Console and in App Store Connect.",
      },
      {
        question: "Where should I publish the policy?",
        answer:
          "On a public web page that anyone can open, such as your website or GitHub Pages. Google Play doesn't accept PDFs or pages that require signing in.",
      },
      {
        question: "Does this replace the Data safety form?",
        answer:
          "No. The Data safety section in Play Console and the App Privacy details in App Store Connect are separate forms. Make sure your answers there match your privacy policy.",
      },
      {
        question: "Is the generated policy legal advice?",
        answer:
          "No. It's a starting template. Review it carefully and adapt it to your app and to the laws that apply to you, such as GDPR or KVKK.",
      },
      {
        question: "Are my answers stored?",
        answer: "No. The policy is generated in your browser and nothing you enter is sent anywhere.",
      },
    ],
  },
  "play-store-description-counter": {
    seoTitle: "Play Store Description Character Counter",
    seoDescription:
      "Count characters for your Google Play app name (30), short description (80) and full description (4,000), and check your app name against common listing rules.",
    intro:
      "Write your Google Play store listing with live character counts for every field, and catch common app name issues before you submit.",
    howTo: [
      "Type or paste your app name.",
      "Add your short description, the one-line summary of your app.",
      "Add your full description.",
      "Fix any warnings, then copy the text into Google Play Console.",
    ],
    features: [
      {
        title: "All three limits",
        body: "30 characters for the app name, 80 for the short description and 4,000 for the full description.",
      },
      {
        title: "Live progress",
        body: "Progress bars turn amber near the limit and red when you go over it.",
      },
      {
        title: "App name checks",
        body: "Warnings for emoji, promotional words, all capital letters and repeated symbols.",
      },
      { title: "Word count", body: "See how many words your full description has." },
    ],
    faq: [
      {
        question: "What are the Google Play character limits?",
        answer:
          "The app name can be up to 30 characters, the short description up to 80 characters and the full description up to 4,000 characters.",
      },
      {
        question: "Can I use emoji in my app name?",
        answer:
          "No. Google Play's metadata policy doesn't allow emoji, emoticons or repeated special characters in app names.",
      },
      {
        question: "Which words should I avoid in my app name?",
        answer:
          "Avoid words that suggest store performance, rankings or promotions, such as “free”, “best”, “#1”, “top”, “new” or “sale”.",
      },
      {
        question: "How are characters counted?",
        answer:
          "Every Unicode character counts once, including spaces and line breaks. Letters with accents, such as “ş” or “é”, count as one character.",
      },
      {
        question: "Is my text saved?",
        answer: "No. Your text stays in your browser and is cleared when you leave the page.",
      },
    ],
  },
};
