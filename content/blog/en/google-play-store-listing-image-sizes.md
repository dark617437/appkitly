---
title: "Google Play Store Listing Image Sizes"
description: "Every Google Play store listing graphic in one place: app icon, feature graphic, phone and tablet screenshots, the Android TV banner, and the text limits."
date: 2026-09-26
updated: 2026-09-26
tools: app-icon-resizer, feature-graphic-maker, play-store-screenshot-maker, play-store-description-counter
---

A Google Play store listing needs several graphics, each with its own size and format. This cheat sheet collects them in one place so you can prepare everything before you open Play Console.

## Required graphics

Every app needs these three:

| Asset | Size | Format | Max file size |
| --- | --- | --- | --- |
| App icon | 512 × 512 px | 32-bit PNG (with alpha) | 1 MB |
| Feature graphic | 1024 × 500 px | JPEG or 24-bit PNG (no alpha) | 15 MB |
| Phone screenshots | 320–3,840 px per side | JPEG or 24-bit PNG (no alpha) | 8 MB each |

You need at least two screenshots to publish. For screenshots, the longest side can't be more than twice the shortest side, so 1080 × 1920 is a safe size for portrait phone screenshots.

## Screenshots for other devices

If your app supports other form factors, add screenshots for them too:

| Device | Common size | Notes |
| --- | --- | --- |
| 7-inch tablet | 1200 × 1920 | Up to 8 screenshots |
| 10-inch tablet | 1600 × 2560 | Up to 8 screenshots |
| Chromebook | 1920 × 1080 | Landscape usually works best |
| Android TV | 1920 × 1080 | Shows your app on a TV |
| Wear OS | Square | Show your app running on a watch |

All screenshots follow the same format and ratio rules as phone screenshots. For more detail, see our [Google Play screenshot sizes guide](/blog/google-play-screenshot-sizes).

Android TV apps also need a **TV banner** of 1280 × 720 px, shown on the TV home screen.

## Promo video

The promo video is optional. You add a YouTube URL, not a file. When you add one, your feature graphic is used as the video's cover image, so make sure it looks good with a play button on top.

## Text limits

Graphics are only half of your listing. These are the text limits:

| Field | Limit |
| --- | --- |
| App name | 30 characters |
| Short description | 80 characters |
| Full description | 4,000 characters |

Check your texts with the [Play Store Description Counter](/play-store-description-counter). It also warns about emoji and promotional words in your app name, which Google Play doesn't allow.

## Checklist before you publish

- [ ] 512 × 512 app icon, full square, without rounded corners
- [ ] 1024 × 500 feature graphic without transparency
- [ ] At least 2 phone screenshots, ideally 4 or more at 1080 px or larger
- [ ] Tablet screenshots, if your app supports tablets
- [ ] App name, short description and full description within the limits
- [ ] A privacy policy URL

## Create your graphics

- Resize your icon with the [App Icon Resizer](/app-icon-resizer).
- Design your banner with the [Feature Graphic Maker](/feature-graphic-maker).
- Turn app screenshots into listing images with the [Play Store Screenshot Maker](/play-store-screenshot-maker).

> Google updates Play Console requirements from time to time. When in doubt, check the Play Console Help Center.
