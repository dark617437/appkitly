import type { Dictionary } from "./en";

export const tr: Dictionary = {
  meta: {
    defaultTitle: "AppKitly – Uygulama Geliştiricileri İçin Ücretsiz Araçlar",
    defaultDescription:
      "Uygulama geliştiricileri için ücretsiz araçlar: mağaza görselleri oluştur, ikonları boyutlandır, görselleri küçült ve uygulamanı yayına hazırla.",
    toolsTitle: "Uygulama Geliştiricileri İçin Tüm Araçlar",
    toolsDescription:
      "Uygulama geliştiricileri için ücretsiz araçlar: mağaza ekran görüntüleri, öne çıkan grafikler, ikon boyutlandırma, görsel sıkıştırma, renk paletleri ve daha fazlası.",
    categoryTitle: "Uygulama Geliştiricileri İçin {category}",
  },
  common: {
    skipToContent: "İçeriğe geç",
    homeLabel: "AppKitly ana sayfa",
    comingSoon: "Yakında",
    openTool: "Aracı aç",
    viewAllTools: "Tüm araçları gör",
    closeNotification: "Bildirimi kapat",
  },
  toolPage: {
    breadcrumbLabel: "Sayfa yolu",
    home: "Ana sayfa",
    tools: "Araçlar",
    relatedTitle: "İlgili araçlar",
    relatedSubtitle: "Aynı sürüm için işine yarayacak diğer ücretsiz araçlar.",
    howToTitle: "{tool} nasıl kullanılır?",
    featuresTitle: "Özellikler",
    faqTitle: "Sıkça sorulan sorular",
    guidesTitle: "İlgili rehberler",
    guidesSubtitle: "Bu aracın arkasındaki mağaza gereksinimleri hakkında daha fazlasını öğren.",
  },
  blog: {
    title: "Uygulama Geliştiricileri İçin Rehberler",
    metaTitle: "Google Play ve App Store Rehberleri",
    description:
      "Google Play ve App Store ekran görüntüleri, uygulama ikonları, öne çıkan grafikler ve mağaza sayfaları hakkında pratik rehberler.",
    readingTime: "{minutes} dk okuma",
    updated: "Güncellendi: {date}",
    readGuide: "Rehberi oku",
    relatedTools: "Bu rehberde kullanılan araçlar",
    allGuides: "Tüm rehberler",
    latestTitle: "Son rehberler",
    latestSubtitle: "Mağaza gereksinimleri ve pratik ipuçları, sade bir dille.",
  },
  nav: {
    label: "Ana menü",
    tools: "Tüm Araçlar",
    playStore: "Play Store",
    images: "Görsel Araçları",
    design: "Tasarım",
    blog: "Blog",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    switchTheme: "Açık ve koyu tema arasında geçiş yap",
    language: "Dil",
  },
  home: {
    eyebrow: "Uygulama geliştiricileri için ücretsiz araçlar",
    heroTitleLead: "Uygulamanı Yayınlamak İçin",
    heroTitleAccent: "İhtiyacın Olan Her Şey",
    heroSubtitle:
      "Uygulama geliştiricileri için ücretsiz araçlar. Mağaza görselleri oluştur, uygulama ikonlarını boyutlandır, görselleri optimize et ve uygulamanı Google Play ile App Store'a hazırla.",
    exploreTools: "Araçları Keşfet",
    playStoreTools: "Play Store Araçları",
    highlights: ["Ücretsiz", "Üyelik gerekmez", "English & Türkçe"],
    specsLabel: "Google Play mağaza sayfası için temel gereksinimler",
    specs: [
      { value: "512 × 512", label: "Uygulama ikonu" },
      { value: "1024 × 500", label: "Öne çıkan grafik" },
      { value: "9:16", label: "Telefon ekran görüntüleri" },
      { value: "80", label: "Kısa açıklama karakteri" },
    ],
    popularTitle: "Popüler Araçlar",
    popularSubtitle:
      "Görsellerden renklere, özenli bir mağaza sayfası hazırlamak için ihtiyacın olan temel araçlar.",
    categoriesTitle: "Kategoriye Göre İncele",
    categoriesSubtitle: "Yayın sürecinin her adımı için doğru aracı bul.",
    principlesTitle: "Geliştiricilerin çalışma şekline göre tasarlandı",
    principles: [
      {
        title: "Ücretsiz",
        body: "Hesap, deneme süresi veya filigran yok. Aracı aç ve işini bitir.",
      },
      {
        title: "Gizlilik öncelikli",
        body: "Tüm araçlar tarayıcında çalışır. Dosyaların cihazından hiç çıkmaz.",
      },
      {
        title: "Mağaza gereksinimlerine uygun",
        body: "Araçlar, Google Play ve App Store'un kullandığı görsel boyutları ve sınırlar temel alınarak hazırlanır.",
      },
    ],
    ctaTitle: "Bir sonraki sürümün için doğru aracı bul",
    ctaBody: "Tüm AppKitly araçlarını tek yerde gör ve kategoriye göre filtrele.",
    ctaButton: "Tüm araçlara göz at",
  },
  tools: {
    title: "Tüm Araçlar",
    subtitle:
      "Uygulamanın mağaza görsellerini, resimlerini, renklerini ve sayfa içeriğini hazırlamak için ücretsiz araçlar.",
    searchLabel: "Araç ara",
    searchPlaceholder: "Araç ara…",
    filterLabel: "Kategoriye göre filtrele",
    allCategories: "Tümü",
    toolCount: { one: "{count} araç", other: "{count} araç" },
    noResultsTitle: "Araç bulunamadı",
    noResultsBody: "Farklı bir kelime dene veya başka bir kategori seç.",
    clearSearch: "Aramayı temizle",
  },
  categories: {
    "play-store": {
      name: "Play Store Araçları",
      shortName: "Play Store",
      description:
        "Google Play mağaza sayfan için ekran görüntüleri, öne çıkan grafikler ve sayfa içeriği hazırla.",
    },
    images: {
      name: "Görsel Araçları",
      shortName: "Görseller",
      description:
        "Uygulama ikonlarını boyutlandır, ekran görüntülerini sıkıştır ve görselleri farklı formatlara dönüştür.",
    },
    design: {
      name: "Tasarım Araçları",
      shortName: "Tasarım",
      description: "Uygulama arayüzün ve mağaza görsellerin için renk paletleri ve gradyanlar oluştur.",
    },
    legal: {
      name: "Yasal ve Politika Araçları",
      shortName: "Yasal",
      description: "Yayınlamadan önce uygulama mağazalarının istediği politika belgelerini hazırla.",
    },
  },
  toolList: {
    "play-store-screenshot-maker": {
      name: "Play Store Ekran Görüntüsü Oluşturucu",
      description:
        "Ekran görüntülerini arka planlar ve başlıklarla birleştir, mağazaya hazır görseller olarak indir.",
    },
    "feature-graphic-maker": {
      name: "Öne Çıkan Grafik Oluşturucu",
      description: "Google Play sayfanın en üstünde görünen 1024×500 öne çıkan grafiği tasarla.",
    },
    "app-icon-resizer": {
      name: "Uygulama İkonu Boyutlandırıcı",
      description: "Tek bir ikonu 512×512, 1024×1024 ve uygulamanın ihtiyaç duyduğu diğer boyutlara getir.",
    },
    "image-compressor": {
      name: "Görsel Sıkıştırıcı",
      description: "PNG, JPG ve WebP dosya boyutlarını görsellerin netliğini koruyarak küçült.",
    },
    "image-converter": {
      name: "Görsel Dönüştürücü",
      description: "Görselleri PNG, JPG ve WebP formatları arasında dönüştür.",
    },
    "privacy-policy-generator": {
      name: "Gizlilik Politikası Oluşturucu",
      description: "Uygulamanın topladığı verilere göre bir gizlilik politikası oluştur.",
    },
    "play-store-description-counter": {
      name: "Play Store Açıklama Sayacı",
      description: "Uygulama adını, kısa ve tam açıklamanı karakter sınırlarına göre kontrol et.",
    },
    "color-palette-generator": {
      name: "Renk Paleti Oluşturucu",
      description: "Beş renkli paletler oluştur, beğendiğin renkleri kilitle ve HEX kodlarını kopyala.",
    },
    "gradient-generator": {
      name: "Gradyan Oluşturucu",
      description: "Doğrusal ve dairesel gradyanlar oluştur, CSS kodunu kopyala.",
    },
  },
  footer: {
    tagline: "Mobil uygulama geliştiricileri için ücretsiz online araçlar.",
    categories: "Kategoriler",
    explore: "Keşfet",
    home: "Ana sayfa",
    allTools: "Tüm araçlar",
    blog: "Blog",
    language: "Dil",
    rights: "Tüm hakları saklıdır.",
  },
};
