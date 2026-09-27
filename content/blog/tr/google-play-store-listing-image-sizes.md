---
title: "Google Play Mağaza Sayfası Görsel Boyutları"
description: "Google Play mağaza sayfası için gereken tüm görseller tek yerde: ikon, öne çıkan grafik, ekran görüntüleri, TV bannerı ve metin sınırları."
date: 2026-09-26
updated: 2026-09-26
tools: app-icon-resizer, feature-graphic-maker, play-store-screenshot-maker, play-store-description-counter
---

Bir Google Play mağaza sayfası, her birinin kendi boyutu ve formatı olan birkaç görsele ihtiyaç duyar. Bu özet, Play Console'u açmadan önce her şeyi hazırlayabilmen için hepsini tek bir yerde topluyor.

## Zorunlu görseller

Her uygulamanın şu üçüne ihtiyacı vardır:

| Görsel | Boyut | Format | En büyük dosya boyutu |
| --- | --- | --- | --- |
| Uygulama ikonu | 512 × 512 px | 32 bit PNG (alfa kanallı) | 1 MB |
| Öne çıkan grafik | 1024 × 500 px | JPEG veya 24 bit PNG (alfa kanalı olmadan) | 15 MB |
| Telefon ekran görüntüleri | Kenar başına 320–3.840 px | JPEG veya 24 bit PNG (alfa kanalı olmadan) | Her biri 8 MB |

Yayınlamak için en az iki ekran görüntüsü gerekir. Ekran görüntülerinde uzun kenar kısa kenarın iki katından fazla olamaz; bu yüzden dikey telefon ekran görüntüleri için 1080 × 1920 güvenli bir boyuttur.

## Diğer cihazlar için ekran görüntüleri

Uygulaman başka cihaz türlerini de destekliyorsa onlar için de ekran görüntüsü ekle:

| Cihaz | Yaygın boyut | Not |
| --- | --- | --- |
| 7 inç tablet | 1200 × 1920 | En fazla 8 ekran görüntüsü |
| 10 inç tablet | 1600 × 2560 | En fazla 8 ekran görüntüsü |
| Chromebook | 1920 × 1080 | Genellikle yatay en iyi sonucu verir |
| Android TV | 1920 × 1080 | Uygulamanı TV'de gösterir |
| Wear OS | Kare | Uygulamanı saatte çalışırken göster |

Tüm ekran görüntüleri, telefon ekran görüntüleriyle aynı format ve oran kurallarına uyar. Daha fazla ayrıntı için [Google Play ekran görüntüsü boyutları rehberimize](/tr/blog/google-play-screenshot-sizes) göz at.

Android TV uygulamaları ayrıca TV ana ekranında gösterilen 1280 × 720 px boyutunda bir **TV bannerına** ihtiyaç duyar.

## Tanıtım videosu

Tanıtım videosu isteğe bağlıdır. Bir dosya değil, YouTube adresi eklersin. Bir video eklediğinde öne çıkan grafiğin videonun kapak görseli olarak kullanılır; bu yüzden üzerinde oynat düğmesiyle de iyi göründüğünden emin ol.

## Metin sınırları

Görseller sayfanın sadece yarısıdır. Metin sınırları şunlardır:

| Alan | Sınır |
| --- | --- |
| Uygulama adı | 30 karakter |
| Kısa açıklama | 80 karakter |
| Tam açıklama | 4.000 karakter |

Metinlerini [Play Store Açıklama Sayacı](/tr/play-store-description-counter) ile kontrol et. Sayaç ayrıca Google Play'in izin vermediği emojiler ve tanıtım kelimeleri için uygulama adını da kontrol eder.

## Yayınlamadan önce kontrol listesi

- [ ] Köşeleri yuvarlatılmamış, tam kare 512 × 512 uygulama ikonu
- [ ] Şeffaflık içermeyen 1024 × 500 öne çıkan grafik
- [ ] En az 2, tercihen 1080 px veya daha büyük 4 ya da daha fazla telefon ekran görüntüsü
- [ ] Uygulaman tabletleri destekliyorsa tablet ekran görüntüleri
- [ ] Sınırlar içinde uygulama adı, kısa açıklama ve tam açıklama
- [ ] Bir gizlilik politikası adresi

## Görsellerini oluştur

- İkonunu [Uygulama İkonu Boyutlandırıcı](/tr/app-icon-resizer) ile boyutlandır.
- Bannerını [Öne Çıkan Grafik Oluşturucu](/tr/feature-graphic-maker) ile tasarla.
- Uygulama ekran görüntülerini [Play Store Ekran Görüntüsü Oluşturucu](/tr/play-store-screenshot-maker) ile mağaza görsellerine dönüştür.

> Google, Play Console gereksinimlerini zaman zaman günceller. Emin olamadığında Play Console Yardım Merkezi'ni kontrol et.
