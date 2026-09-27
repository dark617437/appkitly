---
title: "Uygulama İkonu 512x512 Boyutuna Nasıl Getirilir?"
description: "Tasarımından 512 × 512 Google Play ikonunu ve App Store ile Android başlatıcı boyutlarını kalite kaybı olmadan oluşturmak için adım adım rehber."
date: 2026-09-26
updated: 2026-09-26
tools: app-icon-resizer, image-converter, feature-graphic-maker
---

Google Play 512 × 512, App Store 1024 × 1024 boyutunda bir uygulama ikonu ister; Android ise birkaç küçük başlatıcı boyutuna ihtiyaç duyar. Tek bir görseli bu boyutların hepsine getirmek kolaydır, ancak sonucun net mi bulanık mı olacağını birkaç ayrıntı belirler.

## Google Play ikon gereksinimleri

| Gereksinim | Değer |
| --- | --- |
| Boyut | 512 × 512 px |
| Format | 32 bit PNG (alfa kanallı) |
| Dosya boyutu | En fazla 1.024 KB |
| Şekil | Köşeleri yuvarlatılmamış, tam kare |

Google Play, ikonuna yuvarlatılmış köşeleri ve gölgeyi otomatik olarak uygular. Kendi yuvarlatılmış köşelerini veya gölgeni eklersen ikon çift kenarlı olur ya da diğer ikonlardan küçük görünür. Tam kare bir görsel yükle ve şekli Google Play'e bırak.

## Büyük bir görselle başla

Her zaman **küçült**, asla büyütme. 256 px'lik bir görseli 512 px'e büyütmek onu bulanıklaştırır ve hiçbir araç eksik ayrıntıyı geri getiremez. Şunlardan biriyle başla:

- 1024 × 1024 veya daha büyük bir PNG ya da
- 1024 × 1024 olarak dışa aktarılmış orijinal vektör dosya (SVG, Figma, Illustrator).

Kaynak dosyan JPG veya WebP ise [Görsel Dönüştürücü](/tr/image-converter) onu PNG'ye çevirebilir, ancak kaybolmuş şeffaflığı geri getiremez.

## İkonunu adım adım boyutlandır

1. [Uygulama İkonu Boyutlandırıcı](/tr/app-icon-resizer)'yı aç.
2. 1024 × 1024 ikonunu yükle.
3. **512 × 512**'yi seç. İhtiyacın olan diğer boyutları da seç.
4. Bir arka plan seç. Google Play için şeffaf bırak ya da ikonunun düz bir arka planı olacaksa bir renk seç.
5. PNG'yi ya da tüm boyutları ZIP dosyası olarak indir.

Boyutlandırıcı görseli birkaç adımda küçültür. Bu, küçük boyutlarda kenarları temiz tutar; 1024 px'ten 48 px'e tek seferde yapılan büyük bir küçültme tırtıklı görünürdü.

## İhtiyacın olacak diğer ikon boyutları

| Nerede | Boyut | Not |
| --- | --- | --- |
| App Store | 1024 × 1024 | Şeffaflık içermeyen PNG |
| Google Play | 512 × 512 | 32 bit PNG, en fazla 1 MB |
| Android xxxhdpi | 192 × 192 | Başlatıcı ikonu |
| Android xxhdpi | 144 × 144 | Başlatıcı ikonu |
| Android xhdpi | 96 × 96 | Başlatıcı ikonu |
| Android hdpi | 72 × 72 | Başlatıcı ikonu |
| Android mdpi | 48 × 48 | Başlatıcı ikonu |

App Store şeffaflık içeren ikonları kabul etmez. İkonunda şeffaf alanlar varsa 1024 × 1024 sürümü için bir arka plan rengi seç.

Güncel Android uygulamaları ayrıca ayrı bir ön plan ve arka plan katmanından oluşan **uyarlanabilir (adaptive) ikon** da sağlar. Android Studio'daki Image Asset Studio, tasarımından uyarlanabilir ikonlar oluşturur. Yukarıdaki PNG boyutları eski cihazlar ve mağaza sayfan gibi yerler için hâlâ kullanılır.

## Her boyutta işe yarayan bir ikon için ipuçları

- **Sade tut.** Tanınabilir tek bir şekil, 48 px'de ayrıntılı bir çizimden daha iyi okunur.
- **Küçük yazılardan kaçın.** Harfler başlatıcı boyutlarında okunmaz hale gelir. Tek bir harf veya logon daha iyi çalışır.
- **Küçük boyutta kontrol et.** Yayınlamadan önce 48 px ve 96 px sürümlerine bak.
- **1 MB'ın altında kal.** 512 × 512 bir PNG neredeyse her zaman sınırın çok altındadır. Seninki değilse, tasarımdaki gürültüyü veya ince gradyanları sadeleştir.

İkonun hazır olduğunda, sayfanın tutarlı görünmesi için onu [öne çıkan grafiğinde](/tr/feature-graphic-maker) de kullan.
