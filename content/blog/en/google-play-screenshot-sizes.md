---
title: "Google Play Screenshot Sizes: Complete Guide"
description: "The screenshot sizes, formats and limits Google Play accepts, the sizes we recommend for phones and tablets, and tips for screenshots that get installs."
date: 2026-09-26
updated: 2026-09-26
tools: play-store-screenshot-maker, image-compressor, feature-graphic-maker
---

Screenshots are often the first thing people look at on your Google Play listing, long before they read your description. If they are the wrong size, Play Console rejects them. If they are hard to read, people scroll past. This guide covers both.

## Google Play screenshot requirements

These are the rules Play Console applies to phone and tablet screenshots:

| Requirement | Value |
| --- | --- |
| Format | JPEG or 24-bit PNG (no alpha channel) |
| Shortest side | At least 320 px |
| Longest side | At most 3,840 px |
| Aspect ratio | The longest side can't be more than twice the shortest side |
| File size | Up to 8 MB per screenshot |
| Number of screenshots | At least 2 to publish, up to 8 per device type |

The aspect ratio rule is the one that catches most developers. Many modern phones have tall screens, for example 1080 × 2400. That is a ratio of 2.22, so a raw screenshot from such a phone is **rejected**. You need to crop it or place it on a canvas with an accepted ratio.

## Recommended screenshot sizes

Any size that follows the rules above is accepted, but these sizes are a safe choice:

| Device | Portrait | Landscape |
| --- | --- | --- |
| Phone | 1080 × 1920 | 1920 × 1080 |
| 7-inch tablet | 1200 × 1920 | 1920 × 1200 |
| 10-inch tablet | 1600 × 2560 | 2560 × 1600 |

For phones, 1080 × 1920 (9:16) is the most common choice. It also meets Google's recommendation for apps that want to be promoted on Google Play: provide **at least four screenshots with a resolution of at least 1080 px**, such as 1080 × 1920 in portrait or 1920 × 1080 in landscape.

## Why screenshots get rejected

- **The ratio is too tall.** A 1080 × 2340 or 1080 × 2400 screenshot is more than twice as tall as it is wide.
- **The PNG has transparency.** Google Play wants 24-bit PNG files. A PNG exported with an alpha channel can be refused, even if it looks fully opaque.
- **The image is too small or too large.** Screenshots from old devices can be under 320 px, and some tablet screenshots are wider than 3,840 px.
- **The file is too big.** Very detailed PNG files can go over 8 MB. Saving them as JPG usually fixes this.

The [Play Store Screenshot Maker](/play-store-screenshot-maker) avoids all four problems: it exports 24-bit PNG files at the exact size you choose and warns you when a size breaks the ratio rule.

## Tips for screenshots that convert

1. **Lead with your strongest feature.** Many people only see the first two or three screenshots, so put your main benefit first.
2. **Add short captions.** One line per screenshot, written as a benefit ("Plan your week in seconds"), works better than a feature list.
3. **Make text large.** Your screenshots appear small on phones. If a caption is hard to read on a 1080 px wide image at arm's length, it is too small.
4. **Keep a consistent style.** Use the same background, font and caption position on every screenshot so they look like a set.
5. **Show the real app.** Screenshots must show your app accurately. Don't show features the app doesn't have.
6. **Localize the captions.** If your listing is available in several languages, translate the captions too. It often has a noticeable effect on installs.

## Make your screenshots

1. Take screenshots of your app on a device or emulator.
2. Open the [Play Store Screenshot Maker](/play-store-screenshot-maker) and choose 1080 × 1920.
3. Upload a screenshot, pick a template and write a caption.
4. Export the PNG and repeat for the next screenshot, keeping the same template.

If a file is too large, reduce it with the [Image Compressor](/image-compressor) and save it as JPG, which Google Play always accepts. When your screenshots are ready, create a matching [feature graphic](/feature-graphic-maker) as well.

> Google updates Play Console requirements from time to time. Check the Play Console Help Center before you publish if something looks different.
