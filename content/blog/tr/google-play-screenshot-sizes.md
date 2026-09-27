---
title: "Google Play Ekran Görüntüsü Boyutları: Eksiksiz Rehber"
description: "Google Play'in kabul ettiği ekran görüntüsü boyutları, formatlar ve sınırlar, telefon ve tablet için önerilen boyutlar ve indirme getiren ekran görüntüleri için ipuçları."
date: 2026-09-26
updated: 2026-09-26
tools: play-store-screenshot-maker, image-compressor, feature-graphic-maker
---

Ekran görüntüleri, insanların Google Play sayfanda açıklamayı okumadan çok önce baktığı ilk şeylerden biridir. Boyutları yanlışsa Play Console onları reddeder. Okunmaları zorsa insanlar kaydırıp geçer. Bu rehber ikisini de ele alıyor.

## Google Play ekran görüntüsü gereksinimleri

Play Console'un telefon ve tablet ekran görüntülerine uyguladığı kurallar şunlardır:

| Gereksinim | Değer |
| --- | --- |
| Format | JPEG veya 24 bit PNG (alfa kanalı olmadan) |
| Kısa kenar | En az 320 px |
| Uzun kenar | En fazla 3.840 px |
| En-boy oranı | Uzun kenar, kısa kenarın iki katından fazla olamaz |
| Dosya boyutu | Ekran görüntüsü başına en fazla 8 MB |
| Ekran görüntüsü sayısı | Yayınlamak için en az 2, cihaz türü başına en fazla 8 |

Geliştiricilerin en çok takıldığı kural en-boy oranıdır. Birçok yeni telefonun ekranı uzundur; örneğin 1080 × 2400. Bu 2,22'lik bir orandır, yani böyle bir telefondan alınan ham ekran görüntüsü **reddedilir**. Görseli kırpman ya da kabul edilen orana sahip bir tuvale yerleştirmen gerekir.

## Önerilen ekran görüntüsü boyutları

Yukarıdaki kurallara uyan her boyut kabul edilir, ancak şu boyutlar güvenli bir seçimdir:

| Cihaz | Dikey | Yatay |
| --- | --- | --- |
| Telefon | 1080 × 1920 | 1920 × 1080 |
| 7 inç tablet | 1200 × 1920 | 1920 × 1200 |
| 10 inç tablet | 1600 × 2560 | 2560 × 1600 |

Telefonlar için en yaygın seçim 1080 × 1920'dir (9:16). Bu boyut, Google Play'de öne çıkarılmak isteyen uygulamalar için Google'ın önerisini de karşılar: **en az 1080 px çözünürlükte en az dört ekran görüntüsü**, örneğin dikey için 1080 × 1920 veya yatay için 1920 × 1080.

## Ekran görüntüleri neden reddedilir?

- **Oran fazla uzun.** 1080 × 2340 veya 1080 × 2400 bir ekran görüntüsünün yüksekliği, genişliğinin iki katından fazladır.
- **PNG'de şeffaflık var.** Google Play 24 bit PNG ister. Alfa kanallı dışa aktarılan bir PNG, tamamen opak görünse bile reddedilebilir.
- **Görsel çok küçük veya çok büyük.** Eski cihazlardan alınan ekran görüntüleri 320 px'in altında, bazı tablet ekran görüntüleri ise 3.840 px'ten geniş olabilir.
- **Dosya çok büyük.** Çok ayrıntılı PNG dosyaları 8 MB'ı aşabilir. JPG olarak kaydetmek genellikle sorunu çözer.

[Play Store Ekran Görüntüsü Oluşturucu](/tr/play-store-screenshot-maker) bu dört sorunun hepsini önler: seçtiğin boyutta 24 bit PNG dosyaları dışa aktarır ve bir boyut oran kuralını bozduğunda seni uyarır.

## İndirme getiren ekran görüntüleri için ipuçları

1. **En güçlü özelliğinle başla.** Birçok kişi sadece ilk iki veya üç ekran görüntüsünü görür; bu yüzden ana faydanı en başa koy.
2. **Kısa başlıklar ekle.** Her ekran görüntüsü için fayda olarak yazılmış tek bir satır ("Haftanı saniyeler içinde planla"), bir özellik listesinden daha iyi çalışır.
3. **Yazıları büyük tut.** Ekran görüntülerin telefonlarda küçük görünür. 1080 px genişliğindeki bir görselde bir başlığı kol mesafesinden okumak zorsa, yazı fazla küçüktür.
4. **Tutarlı bir stil kullan.** Her ekran görüntüsünde aynı arka planı, yazı tipini ve başlık konumunu kullan; böylece bir set gibi görünürler.
5. **Gerçek uygulamayı göster.** Ekran görüntüleri uygulamanı doğru yansıtmalıdır. Uygulamada olmayan özellikleri gösterme.
6. **Başlıkları çevir.** Mağaza sayfan birden fazla dilde yayındaysa başlıkları da çevir. Bunun indirmelere genellikle belirgin bir etkisi olur.

## Ekran görüntülerini hazırla

1. Uygulamanın ekran görüntülerini bir cihazda veya emülatörde al.
2. [Play Store Ekran Görüntüsü Oluşturucu](/tr/play-store-screenshot-maker)'yu aç ve 1080 × 1920'yi seç.
3. Bir ekran görüntüsü yükle, bir şablon seç ve bir başlık yaz.
4. PNG'yi dışa aktar ve aynı şablonla bir sonraki ekran görüntüsüne geç.

Bir dosya fazla büyükse [Görsel Sıkıştırıcı](/tr/image-compressor) ile küçült ve Google Play'in her zaman kabul ettiği JPG formatında kaydet. Ekran görüntülerin hazır olduğunda, onlarla uyumlu bir [öne çıkan grafik](/tr/feature-graphic-maker) de oluştur.

> Google, Play Console gereksinimlerini zaman zaman günceller. Bir şey farklı görünüyorsa yayınlamadan önce Play Console Yardım Merkezi'ni kontrol et.
