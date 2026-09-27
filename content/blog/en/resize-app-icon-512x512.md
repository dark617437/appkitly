---
title: "How to Resize an App Icon to 512x512"
description: "A step-by-step guide to creating the 512 × 512 Google Play icon from your artwork, plus the App Store and Android launcher sizes, without losing quality."
date: 2026-09-26
updated: 2026-09-26
tools: app-icon-resizer, image-converter, feature-graphic-maker
---

Google Play asks for a 512 × 512 app icon, the App Store for a 1024 × 1024 one, and Android needs several smaller launcher sizes. Resizing one image into all of them is easy, but a few details decide whether the result looks sharp or blurry.

## Google Play icon requirements

| Requirement | Value |
| --- | --- |
| Size | 512 × 512 px |
| Format | 32-bit PNG (with alpha) |
| File size | Up to 1,024 KB |
| Shape | Full square, without rounded corners |

Google Play applies rounded corners and a shadow to your icon automatically. If you add your own rounded corners or shadow, the icon ends up with a double border or looks smaller than other icons. Upload a full-square image and let Google Play handle the shape.

## Start from a large image

Always resize **down**, never up. Scaling a 256 px image to 512 px makes it blurry, and no tool can add the missing detail. Start from:

- a 1024 × 1024 PNG or larger, or
- the original vector file (SVG, Figma, Illustrator), exported at 1024 × 1024.

If your source file is a JPG or WebP, the [Image Converter](/image-converter) can turn it into a PNG, but it can't recreate transparency that was lost.

## Resize your icon step by step

1. Open the [App Icon Resizer](/app-icon-resizer).
2. Upload your 1024 × 1024 icon.
3. Select **512 × 512**. Select the other sizes you need as well.
4. Choose a background. Keep it transparent for Google Play, or pick a color if your icon should have a solid background.
5. Download the PNG, or all sizes as a ZIP file.

The resizer scales the image down in several steps. This keeps edges clean at small sizes, where a single large jump from 1024 px to 48 px would look jagged.

## Other icon sizes you'll need

| Where | Size | Notes |
| --- | --- | --- |
| App Store | 1024 × 1024 | PNG without transparency |
| Google Play | 512 × 512 | 32-bit PNG, up to 1 MB |
| Android xxxhdpi | 192 × 192 | Launcher icon |
| Android xxhdpi | 144 × 144 | Launcher icon |
| Android xhdpi | 96 × 96 | Launcher icon |
| Android hdpi | 72 × 72 | Launcher icon |
| Android mdpi | 48 × 48 | Launcher icon |

The App Store doesn't accept icons with transparency. If your icon has transparent areas, choose a background color for the 1024 × 1024 version.

Modern Android apps also provide an **adaptive icon**, made of a separate foreground and background layer. Android Studio's Image Asset Studio creates adaptive icons from your artwork. The PNG sizes above are still used for older devices and for places such as your store listing.

## Tips for an icon that works at every size

- **Keep it simple.** One recognizable shape reads better at 48 px than a detailed illustration.
- **Avoid small text.** Letters become unreadable at launcher sizes. A single letter or your logo works better.
- **Check it small.** Look at the 48 px and 96 px versions before you publish.
- **Stay under 1 MB.** A 512 × 512 PNG is almost always far below the limit. If yours isn't, simplify noise or fine gradients in the artwork.

Once your icon is ready, use it in your [feature graphic](/feature-graphic-maker) so your listing looks consistent.
