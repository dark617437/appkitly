---
title: "Ekran Görüntülerini Kalite Kaybı Olmadan Sıkıştırma"
description: "Mağaza ekran görüntülerini gözle görülür kalite kaybı olmadan küçült: hangi format, hangi kalite ve sonucun nasıl kontrol edileceği."
date: 2026-09-26
updated: 2026-09-26
tools: image-compressor, image-converter, play-store-screenshot-maker
---

Büyük ekran görüntüleri web siteni yavaşlatır, projeni şişirir ve mağaza yükleme sınırlarını aşabilir. İyi haber şu: Doğru formatı ve kaliteyi seçtiğin sürece çoğu ekran görüntüsü, gözle görülür bir fark olmadan boyutunun yarısını veya daha fazlasını kaybedebilir.

## Ekran görüntüleri neden sıkıştırılmalı?

- **Mağaza sınırları.** Google Play en fazla 8 MB'lık ekran görüntülerini kabul eder. Ayrıntılı PNG ekran görüntüleri bu sınırı aşabilir.
- **Daha hızlı sayfalar.** Tanıtım sayfandaki ekran görüntüleri daha hızlı yüklenir ve sayfanın daha iyi sıralanmasına yardımcı olur.
- **Daha küçük projeler.** Pazarlama klasörlerin ve kod depoların yönetilebilir kalır.

## Doğru formatı seç

| Format | En uygun olduğu yer | Not |
| --- | --- | --- |
| PNG | Düz arayüzler, metin, ikonlar | Varsayılan olarak kayıpsızdır. Renk sayısı azaltıldığında çok küçülür. |
| JPG | Fotoğraflar, gradyanlar, mağaza ekran görüntüleri | Küçük dosyalar. Şeffaflık yok. |
| WebP | Web siteleri | Aynı kalitede JPG'den küçüktür. Şeffaflığı destekler. |

**Mağaza yüklemeleri** için JPG veya PNG'de kal: Google Play ekran görüntüleri için JPEG veya 24 bit PNG ister, App Store ise JPEG ve PNG kabul eder. WebP'yi, tüm modern tarayıcıların desteklediği web siten için kullan.

## Hangi kaliteyi kullanmalısın?

| Kullanım | Format | Kalite |
| --- | --- | --- |
| Mağaza ekran görüntüleri | JPG | 80–90 |
| Web sitesi görselleri | WebP | 75–85 |
| Az renkli düz arayüz | PNG | 256 renk (kalite 99 civarı) |
| İnce yazılar içeren görseller | JPG veya WebP | 85–95 |

Aralığın ortasından başla, sonra karşılaştır. Bir fark fark edene kadar kaliteyi düşür ve bir adım geri dön.

## Bir ekran görüntüsünü adım adım sıkıştır

1. [Görsel Sıkıştırıcı](/tr/image-compressor)'yı aç ve ekran görüntünü yükle.
2. Kaliteyi 80'e ayarla.
3. Çıktı formatını seç: orijinali koru ya da JPG veya WebP'ye geç.
4. Karşılaştırma çubuğunu metin, gradyan ve keskin kenar içeren alanların üzerinde sürükle.
5. Sıkıştırılmış dosyayı indir.

Her şey tarayıcında çalışır; bu yüzden henüz yayınlanmamış tasarımlar bile cihazından çıkmaz.

## Sonucu nasıl kontrol edersin?

Sıkıştırmanın ilk görüldüğü yerlere yakınlaş:

- **Metin:** Küçük etiketler bulanık hareler olmadan net kalmalı.
- **Gradyanlar:** Yumuşak arka planlar görünür bantlara dönüşmemeli.
- **Kenarlar:** İkonlar ve düğmeler temiz dış hatlarını korumalı.

Sorun görürsen kaliteyi biraz artır veya format değiştir. Düz arayüzler genellikle PNG olarak, fotoğraflar ve gradyanlar ise JPG olarak daha iyi görünür.

## Diğer ipuçları

- **Önce boyutlandır.** İhtiyacın olandan iki kat büyük bir görsel dört kat daha fazla piksel içerir. Ekran görüntülerini gerçekten kullandığın boyutta dışa aktar.
- **Orijinalleri sakla.** Tek dosyanı değil, kopyalarını sıkıştır ve aynı JPG'yi tekrar tekrar sıkıştırmaktan kaçın.
- **Emin değilsen Google Play için JPG kullan.** Paleti azaltılmış sıkıştırılmış PNG'ler 8 bit görsellerdir. Play Console birini reddederse onu JPG'ye [dönüştür](/tr/image-converter).

Yeni ekran görüntüleri mi hazırlıyorsun? Önce [Play Store Ekran Görüntüsü Oluşturucu](/tr/play-store-screenshot-maker) ile oluştur, daha küçük dosyalara ihtiyacın varsa sonra sıkıştır.
