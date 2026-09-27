---
title: "App Store Screenshot Sizes Guide"
description: "The iPhone and iPad screenshot sizes App Store Connect accepts, which ones are required and how to prepare them quickly."
date: 2026-09-26
updated: 2026-09-26
tools: play-store-screenshot-maker, image-compressor, app-icon-resizer
---

App Store Connect is strict about screenshot sizes: it only accepts images that match one of Apple's exact device resolutions. The good news is that you don't need screenshots for every iPhone. Here is what is required and which sizes to use.

## General requirements

| Requirement | Value |
| --- | --- |
| Format | JPEG or PNG, RGB, flattened, no transparency |
| Number | 1 to 10 screenshots per display size and language |
| Orientation | Portrait or landscape |

## iPhone screenshot sizes

If your app runs on iPhone, you need screenshots for the **6.9-inch** display. If you don't provide them, App Store Connect asks for **6.5-inch** screenshots instead. Apple scales these down for smaller iPhones, so one set is usually enough.

| Display | Portrait sizes | Landscape sizes |
| --- | --- | --- |
| 6.9-inch | 1320 × 2868, 1290 × 2796, 1260 × 2736 | 2868 × 1320, 2796 × 1290, 2736 × 1260 |
| 6.5-inch | 1284 × 2778, 1242 × 2688 | 2778 × 1284, 2688 × 1242 |
| 5.5-inch | 1242 × 2208 | 2208 × 1242 |

## iPad screenshot sizes

If your app runs on iPad, you also need screenshots for the **13-inch** iPad display:

| Display | Portrait sizes | Landscape sizes |
| --- | --- | --- |
| 13-inch | 2064 × 2752, 2048 × 2732 | 2752 × 2064, 2732 × 2048 |

## Create App Store screenshots

You can prepare App Store screenshots with the same editor we built for Google Play:

1. Open the [Play Store Screenshot Maker](/play-store-screenshot-maker).
2. Under **Canvas size**, choose **Custom** and enter an App Store size, for example 1290 × 2796.
3. Upload your screenshot, pick a template and write a caption.
4. Export the PNG. It has no transparency, as Apple requires.

The editor will point out that such tall sizes don't meet Google Play's ratio rule. That warning only applies to Google Play, so you can ignore it for the App Store.

## Tips

- **Put your best screen first.** The first screenshots appear in search results, where most people decide whether to open your page.
- **Use captions.** A short headline above or below each screenshot explains what people are looking at.
- **Keep text away from the edges.** Leave margins so captions don't feel cramped on smaller displays.
- **Localize.** Upload translated screenshots for each language your app supports.
- **Keep files reasonable.** If a PNG is very large, save it as a high-quality JPG with the [Image Compressor](/image-compressor).

Don't forget your App Store icon: a 1024 × 1024 PNG without transparency. The [App Icon Resizer](/app-icon-resizer) creates it along with the Google Play and Android sizes.

> Apple adds new display sizes when new devices are released. Check App Store Connect Help for the latest list before you submit.
