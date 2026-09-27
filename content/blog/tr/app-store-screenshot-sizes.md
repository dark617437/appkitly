---
title: "App Store Ekran Görüntüsü Boyutları Rehberi"
description: "App Store Connect'in kabul ettiği iPhone ve iPad ekran görüntüsü boyutları, hangilerinin zorunlu olduğu ve nasıl hızlıca hazırlanacağı."
date: 2026-09-26
updated: 2026-09-26
tools: play-store-screenshot-maker, image-compressor, app-icon-resizer
---

App Store Connect ekran görüntüsü boyutları konusunda katıdır: Yalnızca Apple'ın cihaz çözünürlüklerinden biriyle birebir eşleşen görselleri kabul eder. İyi haber şu ki her iPhone için ayrı ekran görüntüsüne ihtiyacın yok. Neyin zorunlu olduğu ve hangi boyutların kullanılacağı aşağıda.

## Genel gereksinimler

| Gereksinim | Değer |
| --- | --- |
| Format | JPEG veya PNG; RGB, tek katman, şeffaflık yok |
| Sayı | Ekran boyutu ve dil başına 1 ile 10 arası ekran görüntüsü |
| Yön | Dikey veya yatay |

## iPhone ekran görüntüsü boyutları

Uygulaman iPhone'da çalışıyorsa **6,9 inç** ekran için ekran görüntülerine ihtiyacın var. Bunları sağlamazsan App Store Connect bunun yerine **6,5 inç** ekran görüntüleri ister. Apple bunları daha küçük iPhone'lar için küçültür; bu yüzden genellikle tek bir set yeterlidir.

| Ekran | Dikey boyutlar | Yatay boyutlar |
| --- | --- | --- |
| 6,9 inç | 1320 × 2868, 1290 × 2796, 1260 × 2736 | 2868 × 1320, 2796 × 1290, 2736 × 1260 |
| 6,5 inç | 1284 × 2778, 1242 × 2688 | 2778 × 1284, 2688 × 1242 |
| 5,5 inç | 1242 × 2208 | 2208 × 1242 |

## iPad ekran görüntüsü boyutları

Uygulaman iPad'de çalışıyorsa **13 inç** iPad ekranı için de ekran görüntülerine ihtiyacın var:

| Ekran | Dikey boyutlar | Yatay boyutlar |
| --- | --- | --- |
| 13 inç | 2064 × 2752, 2048 × 2732 | 2752 × 2064, 2732 × 2048 |

## App Store ekran görüntüleri oluştur

App Store ekran görüntülerini Google Play için yaptığımız editörle hazırlayabilirsin:

1. [Play Store Ekran Görüntüsü Oluşturucu](/tr/play-store-screenshot-maker)'yu aç.
2. **Tuval boyutu** altında **Özel**'i seç ve bir App Store boyutu gir; örneğin 1290 × 2796.
3. Ekran görüntünü yükle, bir şablon seç ve bir başlık yaz.
4. PNG'yi dışa aktar. Dosya, Apple'ın istediği gibi şeffaflık içermez.

Editör, bu kadar uzun boyutların Google Play'in oran kuralına uymadığını belirtecektir. Bu uyarı yalnızca Google Play için geçerlidir; App Store için göz ardı edebilirsin.

## İpuçları

- **En iyi ekranını başa koy.** İlk ekran görüntüleri arama sonuçlarında görünür ve çoğu kişi sayfanı açıp açmamaya orada karar verir.
- **Başlık kullan.** Her ekran görüntüsünün üstünde veya altında kısa bir başlık, insanların neye baktığını açıklar.
- **Metni kenarlardan uzak tut.** Başlıkların küçük ekranlarda sıkışık durmaması için kenar boşluğu bırak.
- **Çevir.** Uygulamanın desteklediği her dil için çevrilmiş ekran görüntüleri yükle.
- **Dosyaları makul boyutta tut.** Bir PNG çok büyükse [Görsel Sıkıştırıcı](/tr/image-compressor) ile yüksek kaliteli bir JPG olarak kaydet.

App Store ikonunu unutma: şeffaflık içermeyen 1024 × 1024 bir PNG. [Uygulama İkonu Boyutlandırıcı](/tr/app-icon-resizer), Google Play ve Android boyutlarıyla birlikte bunu da oluşturur.

> Apple, yeni cihazlar çıktıkça yeni ekran boyutları ekler. Göndermeden önce güncel liste için App Store Connect Yardım sayfasını kontrol et.
