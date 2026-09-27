---
title: "Google Play Öne Çıkan Grafik Boyutu Rehberi"
description: "1024 × 500 Google Play öne çıkan grafiği hakkında her şey: tam boyut ve format, nerede göründüğü ve her ekranda işe yarayan bir tasarımın nasıl yapılacağı."
date: 2026-09-26
updated: 2026-09-26
tools: feature-graphic-maker, app-icon-resizer, gradient-generator
---

Öne çıkan grafik (feature graphic), Google Play sayfanın üst kısmındaki geniş bannerdır. Play Console ana mağaza sayfan için bir öne çıkan grafik ister ve bu, büyük ve dikkat çekici bir görseli kontrol edebildiğin az sayıdaki yerden biridir. Bilmen gerekenler şunlar.

## Öne çıkan grafik boyutu ve formatı

| Gereksinim | Değer |
| --- | --- |
| Boyut | 1024 × 500 px |
| Format | JPEG veya 24 bit PNG (alfa kanalı olmadan) |
| Dosya boyutu | En fazla 15 MB |

Boyut sabittir: Play Console tam olarak 1024 × 500 piksel olmayan bir öne çıkan grafiği kabul etmez. Sık yapılan bir hata, şeffaflık içeren bir PNG dışa aktarmaktır. Görsel opak görünse bile alfa kanalı yüklemenin başarısız olmasına yol açabilir; bu yüzden JPEG veya 24 bit PNG olarak dışa aktar.

## Öne çıkan grafik nerede görünür?

Google Play öne çıkan grafiği birçok yerde gösterir. Mağaza sayfanın üst kısmında görünebilir ve bir tanıtım videosu eklediğinde videonun kapak görseli olarak kullanılır. Google, uygulaman mağazada öne çıkarıldığında da bu görseli kullanır.

Farklı yerleşimlerde ve farklı ekran boyutlarında göründüğü için görsel ölçeklenebilir ve kırpılabilir. Tasarlarken bunu aklında tut.

## Tasarım ipuçları

- **Önemli içeriği ortada tut.** Görsel kırpıldığında önemli bir şeyin kesilmemesi için kenarlarda biraz boşluk bırak.
- **Az kelime kullan.** Uygulama adın ve kısa bir mesaj yeterlidir. Uzun cümleler telefonlarda okunmaz hale gelir.
- **Yazıları büyük ve yüksek kontrastlı yap.** Banner genellikle 1024 px genişliğinden çok daha küçük gösterilir.
- **Uygulamanı veya markanı göster.** Uygulama ikonun, renkli bir arka plan üzerinde bir ekran görüntüsü veya sade bir çizim iyi çalışır.
- **Dürüst ol.** Mağaza rozetleri, sıralamalar, "#1" veya fiyat iddiaları ekleme. Google Play'in meta veri politikası, mağaza görsellerinde yanıltıcı veya tanıtım amaçlı metinlere izin vermez.
- **Ekran görüntülerinle uyumlu olsun.** Aynı renkleri ve yazı tiplerini kullanmak sayfanın özenli görünmesini sağlar.

## Sık yapılan hatalar

| Hata | Çözüm |
| --- | --- |
| Yanlış boyut, ör. 1024 × 512 | Tam olarak 1024 × 500 dışa aktar |
| Şeffaflık içeren PNG | JPEG veya alfa kanalı olmayan 24 bit PNG dışa aktar |
| Kenarlara çok yakın metin | Metni ortaya doğru taşı |
| Çok küçük yazı | Başlık için en az 48 px kullan |
| Karmaşık arka plan | Düz bir renk veya yumuşak bir gradyan kullan |

## Birkaç dakikada öne çıkan grafik oluştur

1. [Öne Çıkan Grafik Oluşturucu](/tr/feature-graphic-maker)'yu aç. Tuval her zaman 1024 × 500'dür.
2. Bir şablon seç, örneğin **Uygulama Vitrini**.
3. Uygulama ikonunu yükle. Sadece büyük bir sürümün varsa önce [Uygulama İkonu Boyutlandırıcı](/tr/app-icon-resizer) ile doğru boyutları oluştur.
4. Bir ekran görüntüsü yükle, başlığını ve alt başlığını yaz, her şeyi sürükleyerek yerleştir.
5. PNG'yi dışa aktar. Dosya, Play Console'a hazır şekilde şeffaflık içermeyen 24 bit PNG olarak kaydedilir.

Markana uygun bir arka plan mı lazım? [Gradyan Oluşturucu](/tr/gradient-generator) ile bir tane oluştur ve aynı renkleri öne çıkan grafikte kullan.

> Google, öne çıkan grafiğin gösterilme şeklini zaman zaman değiştirir. Güncel bilgiler için Play Console Yardım Merkezi'ni kontrol et.
