import type { ToolSlug } from "@/lib/tools";
import type { ToolContent } from "./en";

export const trToolContent: Record<ToolSlug, ToolContent> = {
  "play-store-screenshot-maker": {
    seoTitle: "Ücretsiz Play Store Ekran Görüntüsü Oluşturucu",
    seoDescription:
      "Google Play Store için profesyonel ekran görüntülerini ücretsiz ve online oluştur. Üyelik gerekmez. Dosyaların cihazında kalır.",
    intro:
      "Sade uygulama ekran görüntülerini özenli Google Play görsellerine dönüştür. Arka plan, başlık ve alt başlık ekle, ardından tam istediğin boyutta PNG olarak indir.",
    howTo: [
      "Bir tuval boyutu seç. Telefon sayfaları için 1080 × 1920 çoğu durumda iyi bir seçimdir.",
      "Uygulamanın ekran görüntüsünü PNG, JPG veya WebP olarak yükle.",
      "Bir şablon seç; ardından arka planı, metinleri ve ekran görüntüsünün konumunu ayarla.",
      "PNG'yi dışa aktar ve Google Play Console'daki mağaza sayfana yükle.",
    ],
    features: [
      {
        title: "Tam dışa aktarma boyutu",
        body: "PNG, ekrandaki önizleme boyutunda değil, seçtiğin tuval boyutunda eksiksiz oluşturulur.",
      },
      {
        title: "Google Play'e hazır",
        body: "Dışa aktarılan dosyalar, Google Play'in istediği şekilde alfa kanalı olmayan 24 bit PNG'dir.",
      },
      {
        title: "Beş şablon",
        body: "Minimal, Gradyan, Sade, Cesur veya Koyu ile başla; tüm renkleri, metinleri ve konumları değiştir.",
      },
      {
        title: "Tam kontrol",
        body: "Ekran görüntünü taşı, boyutlandır ve döndür, köşelerini yuvarla ve gölge ekle. Her değişikliği geri alabilir veya yineleyebilirsin.",
      },
    ],
    faq: [
      {
        question: "Google Play ekran görüntüleri hangi boyutta olmalı?",
        answer:
          "Google Play, kenarları 320 px ile 3.840 px arasında olan JPEG veya 24 bit PNG ekran görüntülerini kabul eder ve uzun kenar kısa kenarın iki katından fazla olamaz. Dikey ekran görüntüleri için 1080 × 1920 güvenli bir seçimdir.",
      },
      {
        question: "Kaç ekran görüntüsüne ihtiyacım var?",
        answer:
          "Yayınlamak için en az iki ekran görüntüsü gerekir ve her cihaz türü için en fazla sekiz tane ekleyebilirsin. Google, uygulamanın Google Play'de öne çıkarılabilmesi için en az 1080 px çözünürlükte en az dört ekran görüntüsü önerir.",
      },
      {
        question: "1080 × 2340 seçince neden uyarı çıkıyor?",
        answer:
          "Bu boyutta uzun kenar kısa kenarın iki katından fazladır ve Google Play bunu mağaza ekran görüntüsü olarak kabul etmez. Bu boyut, örneğin web sitende kullanmak için yine de işine yarayabilir.",
      },
      {
        question: "App Store ekran görüntüleri de oluşturabilir miyim?",
        answer:
          "Evet. Özel seçeneğini seç ve Apple'ın istediği boyutu gir; örneğin 6,5 inç iPhone ekranları için 1242 × 2688. Güncel boyutları App Store ekran görüntüsü boyutları rehberimizde bulabilirsin.",
      },
      {
        question: "Ekran görüntülerim bir sunucuya yükleniyor mu?",
        answer: "Hayır. Editör tamamen tarayıcında çalışır ve son görsel cihazında oluşturulur.",
      },
    ],
  },
  "feature-graphic-maker": {
    seoTitle: "Öne Çıkan Grafik Oluşturucu (1024×500) – Ücretsiz",
    seoDescription:
      "1024×500 Google Play öne çıkan grafiğini ücretsiz ve online tasarla. Uygulama ikonunu, bir ekran görüntüsünü ve başlığını ekle, mağazaya hazır PNG olarak indir.",
    intro:
      "Uygulamanı Google Play'de temsil eden 1024 × 500 bannerı tasarla. Uygulama ikonunu, bir ekran görüntüsünü ve kısa bir mesajı bir araya getir, yüklemeye hazır bir PNG indir.",
    howTo: [
      "Uygulama Vitrini veya Minimal gibi bir şablon seç.",
      "Uygulama ikonunu ve istersen uygulamanın bir ekran görüntüsünü yükle.",
      "Başlığı ve alt başlığı düzenle, öğeleri sürükleyerek yerleştir.",
      "PNG'yi dışa aktar ve Google Play Console'da öne çıkan grafik olarak ekle.",
    ],
    features: [
      {
        title: "Her zaman 1024 × 500",
        body: "Önizleme ekranında ne kadar büyük görünürse görünsün, her dışa aktarma Google Play'in istediği tam boyuttadır.",
      },
      {
        title: "Şeffaflık sorunu yok",
        body: "PNG, alfa kanalı olmadan 24 bit olarak kaydedilir; böylece Play Console dosyayı kabul eder.",
      },
      {
        title: "Tuval üzerinde düzenle",
        body: "Öğeleri sürükleyerek taşı, tutamaçlarla boyutlandır ve döndür ya da kaydırıcılarla tam değer gir.",
      },
      {
        title: "Beş şablon",
        body: "Minimal, Uygulama Vitrini, Gradyan, Koyu ve Sade şablonlarıyla tek tıkla iyi bir başlangıç yap.",
      },
    ],
    faq: [
      {
        question: "Google Play öne çıkan grafik boyutu nedir?",
        answer:
          "1024 × 500 piksel; JPEG veya şeffaflık içermeyen 24 bit PNG olarak. Bu araç her zaman tam olarak bu boyutta dışa aktarır.",
      },
      {
        question: "Öne çıkan grafik nerede görünür?",
        answer:
          "Google Play bu görseli birçok yerde kullanır; örneğin mağaza sayfanın üst kısmında ve eklediysen tanıtım videonun kapak görseli olarak.",
      },
      {
        question: "Öne çıkan grafiğe ne koymalıyım?",
        answer:
          "Sade tut: uygulama ikonun veya adın, kısa bir mesaj ve uygulamanı gösteren bir görsel. Önemli metinleri kenarlardan uzak tut ve telefonda zor okunan küçük yazılardan kaçın.",
      },
      {
        question: "Bannerdan daha uzun bir ekran görüntüsü kullanabilir miyim?",
        answer:
          "Evet. Göstermek istediğin kısım görünecek şekilde taşı ve boyutlandır. 1024 × 500 alanın dışında kalan kısımlar dışa aktarmada kesilir.",
      },
      {
        question: "Tasarımım bir yere yükleniyor mu?",
        answer: "Hayır. İkonun ve ekran görüntülerin tarayıcında işlenir ve cihazından hiç çıkmaz.",
      },
    ],
  },
  "app-icon-resizer": {
    seoTitle: "Ücretsiz İkon Boyutlandırıcı: 512×512 ve 1024×1024",
    seoDescription:
      "Uygulama ikonunu Google Play için 512×512, App Store için 1024×1024 ve tüm Android başlatıcı boyutlarına getir. Ücretsiz, hızlı ve gizli.",
    intro:
      "Yüksek çözünürlüklü tek bir ikon yükle ve ihtiyacın olan tüm boyutları al: Google Play için 512 × 512, App Store için 1024 × 1024 ve Android başlatıcı ikonları için 48–192 px.",
    howTo: [
      "Kare bir PNG, JPG veya WebP ikon yükle; tercihen 1024 × 1024 px veya daha büyük.",
      "İhtiyacın olan boyutları seç.",
      "Bir arka plan seç: şeffaflığı koru ya da beyaz, siyah veya özel bir renkle doldur.",
      "Tek bir PNG indir ya da seçtiğin tüm boyutları ZIP dosyası olarak indir.",
    ],
    features: [
      {
        title: "Mağaza ve başlatıcı boyutları",
        body: "App Store için 1024 × 1024, Google Play için 512 × 512 ve mdpi'dan xxxhdpi'a kadar beş Android yoğunluğu.",
      },
      {
        title: "Net küçük ikonlar",
        body: "İkonlar adım adım küçültülür; böylece 48 px ve 72 px ikonlar bulanık veya tırtıklı değil, net görünür.",
      },
      {
        title: "Arka plan seçenekleri",
        body: "Şeffaflığı koru ya da örneğin App Store ikonu için beyaz, siyah veya istediğin bir renkle doldur.",
      },
      {
        title: "ZIP olarak indir",
        body: "Seçtiğin tüm boyutları, adında ölçüleri yazan dosyalarla tek bir ZIP içinde al.",
      },
    ],
    faq: [
      {
        question: "Google Play için ikon hangi boyutta olmalı?",
        answer:
          "En fazla 1 MB, 512 × 512 PNG (32 bit, alfa kanallı). Yuvarlatılmış maskeyi ve gölgeyi Google Play kendisi uygular; bu yüzden köşeleri yuvarlatılmamış, tam kare bir ikon yükle.",
      },
      {
        question: "App Store için ikon hangi boyutta olmalı?",
        answer:
          "Şeffaflık içermeyen 1024 × 1024 PNG. İkonunda şeffaf alanlar varsa indirmeden önce bir arka plan rengi seç.",
      },
      {
        question: "Android başlatıcı ikon boyutları nelerdir?",
        answer:
          "48 × 48 (mdpi), 72 × 72 (hdpi), 96 × 96 (xhdpi), 144 × 144 (xxhdpi) ve 192 × 192 (xxxhdpi). Güncel Android uygulamaları ayrıca uyarlanabilir (adaptive) ikon da içerir; bunu Android Studio'daki Image Asset Studio ile tasarımından oluşturabilirsin.",
      },
      {
        question: "Görselim kare değilse ne olur?",
        answer:
          "En-boy oranını koru açıkken görselin tamamı karenin içine sığar ve boş kalan alan seçtiğin arka planla dolar. Kapatırsan görsel kareyi dolduracak şekilde esnetilir.",
      },
      {
        question: "Dosyalarım yükleniyor mu?",
        answer: "Hayır. Boyutlandırma tarayıcında yapılır ve görsellerin cihazından hiç çıkmaz.",
      },
    ],
  },
  "image-compressor": {
    seoTitle: "Ücretsiz Görsel Sıkıştırıcı: PNG, JPG ve WebP",
    seoDescription:
      "PNG, JPG ve WebP görselleri ücretsiz ve online sıkıştır. Öncesini ve sonrasını karşılaştır, ne kadar küçüldüğünü gör ve hemen indir. Dosyaların cihazından çıkmaz.",
    intro:
      "Ekran görüntülerini, ikonları ve mağaza görsellerini gözle görülür kalite kaybı olmadan küçült. Kaliteyi ayarla, sonucu orijinalle karşılaştır ve daha küçük dosyayı indir.",
    howTo: [
      "Bir PNG, JPG veya WebP görsel yükle.",
      "Kaliteyi ayarla. Ekran görüntüleri için 70 ile 85 arası iyi bir başlangıçtır.",
      "Orijinal formatı koru ya da daha küçük bir dosya için WebP veya JPG'ye dönüştür.",
      "Sonucu kontrol etmek için karşılaştırma çubuğunu sürükle, ardından indir.",
    ],
    features: [
      {
        title: "Akıllı PNG sıkıştırma",
        body: "PNG dosyaları, TinyPNG'ye benzer şekilde renk sayısı azaltılarak küçültülür ve şeffaflık korunur.",
      },
      {
        title: "Öncesi ve sonrası",
        body: "Karşılaştırma çubuğu, orijinal ve sıkıştırılmış görseli yan yana gösterir.",
      },
      {
        title: "Net kazanç",
        body: "İndirmeden önce orijinal boyutu, yeni boyutu ve kazandığın yüzdeyi gör.",
      },
      {
        title: "Gizlilik öncelikli",
        body: "Sıkıştırma tarayıcında çalışır. Görsellerin hiçbir sunucuya yüklenmez.",
      },
    ],
    faq: [
      {
        question: "PNG sıkıştırma nasıl çalışıyor?",
        answer:
          "Araç, görseli daha küçük bir renk paletine indirir; bu da PNG dosyalarını çok daha küçük yapar. Kalite düştükçe renk sayısı azalır. 100'de PNG kayıpsız kalır.",
      },
      {
        question: "Hangi kalite ayarını kullanmalıyım?",
        answer:
          "80 civarında başla. Fotoğraflar ve ekran görüntüleri 70–85 arasında genellikle aynı görünür. Görselde ince yazılar veya gradyanlar varsa daha yüksek bir değer dene ve karşılaştır.",
      },
      {
        question: "Sıkıştırılmış dosya neden orijinalden büyük?",
        answer:
          "Orijinal dosya büyük ihtimalle zaten iyi optimize edilmiştir. Daha düşük bir kalite veya WebP gibi başka bir çıktı formatı dene.",
      },
      {
        question: "Mağaza ekran görüntüleri için hangi formatı kullanmalıyım?",
        answer:
          "Google Play ekran görüntüleri için JPEG veya 24 bit PNG ister, App Store ise JPEG ve PNG kabul eder. Mağaza ekran görüntüleri için 80–90 kalitede JPG genellikle en güvenli küçük seçenektir.",
      },
      {
        question: "Görsellerim yükleniyor mu?",
        answer: "Hayır. Her şey cihazında gerçekleşir; bu yüzden araç gizli tasarımlarla da güvenle kullanılabilir.",
      },
    ],
  },
  "image-converter": {
    seoTitle: "Ücretsiz Görsel Dönüştürücü: PNG, JPG ve WebP",
    seoDescription:
      "Görselleri PNG, JPG ve WebP arasında ücretsiz ve online dönüştür. Kaliteyi ve arka plan rengini seç, sonucu önizle ve indir. Yükleme gerekmez.",
    intro:
      "PNG, JPG ve WebP görselleri tarayıcında dönüştür. Bir mağaza, web sitesi veya araç yalnızca tek bir formatı kabul ettiğinde işine yarar.",
    howTo: [
      "Bir PNG, JPG veya WebP görsel yükle.",
      "Dönüştürmek istediğin formatı seç.",
      "JPG veya WebP için kaliteyi, JPG'ye dönüştürürken de şeffaf alanlar için bir arka plan rengini ayarla.",
      "Dönüştür'e bas, önizlemeyi kontrol et ve yeni dosyayı indir.",
    ],
    features: [
      {
        title: "Tüm yaygın dönüşümler",
        body: "PNG'den JPG veya WebP'ye, JPG'den PNG veya WebP'ye ve WebP'den PNG veya JPG'ye.",
      },
      {
        title: "Şeffaflık korunur",
        body: "PNG ve WebP şeffaflığı korur. JPG için şeffaf alanları dolduracak rengi sen seçersin.",
      },
      {
        title: "Kalite kontrolü",
        body: "Dosya boyutu ile ayrıntı arasındaki dengeyi kurmak için JPG ve WebP kalitesini ayarla.",
      },
      {
        title: "Hiçbir şey yüklenmez",
        body: "Dönüştürme tarayıcında yapılır; görsellerin cihazında kalır.",
      },
    ],
    faq: [
      {
        question: "Google Play ve App Store görselleri için hangi formatı kullanmalıyım?",
        answer:
          "Uygulama ikonları için PNG kullan. Ekran görüntüleri ve öne çıkan grafik için Google Play JPEG veya 24 bit PNG, App Store ise JPEG veya PNG kabul eder.",
      },
      {
        question: "Şeffaf arka plan neden beyaz oldu?",
        answer:
          "JPG şeffaflığı desteklemez; bu yüzden şeffaf pikseller seçtiğin arka plan rengiyle doldurulur. Şeffaflığı korumak için PNG veya WebP'ye dönüştür.",
      },
      {
        question: "Dönüştürmek görsel kalitesini artırır mı?",
        answer:
          "Hayır. Dönüştürme, görselde olmayan ayrıntıyı ekleyemez. Düşük kalitede JPG veya WebP'ye dönüştürmek bazı ayrıntıları kaybettirebilir; görseli sonra düzenleyeceksen kaliteyi yüksek tut.",
      },
      {
        question: "Dosya boyutu sınırı var mı?",
        answer: "Görseller en fazla 20 MB olabilir.",
      },
    ],
  },
  "color-palette-generator": {
    seoTitle: "Ücretsiz Renk Paleti Oluşturucu (Uygulama Tasarımı)",
    seoDescription:
      "Uygulaman için uyumlu beş renkli paletler oluştur. Beğendiğin renkleri kilitle, ince ayar yap ve HEX kodlarını veya CSS değişkenlerini tek tıkla kopyala.",
    intro:
      "Uygulamanın arayüzü, ikonu veya mağaza görselleri için bir renk düzeni bul. Paletler oluştur, beğendiğin renkleri koru ve kodlarını kopyala.",
    howTo: [
      "Yeni bir palet için Palet oluştur'a veya boşluk tuşuna bas.",
      "Korumak istediğin renkleri kilitle. Kilitli renkler yeniden oluşturduğunda değişmez.",
      "Herhangi bir rengi renk seçiciyle ince ayarla.",
      "Tek bir HEX kodunu, tüm kodları veya paleti CSS değişkenleri olarak kopyala.",
    ],
    features: [
      {
        title: "Uyumlu paletler",
        body: "Renkler, algısal bir renk uzayında renk uyumu kurallarına göre seçilir ve açıktan koyuya sıralanır.",
      },
      {
        title: "Kilitle ve yenile",
        body: "Beğendiğin renkleri koru, geri kalanlar için yeni seçenekler oluştur.",
      },
      {
        title: "Okunaklı etiketler",
        body: "Her rengin etiketi, kolay okunması için koyu veya açık yazıya otomatik geçer.",
      },
      {
        title: "Tek tıkla kopyala",
        body: "Tasarım araçların için HEX kodlarını, web siten için CSS değişkenlerini kopyala.",
      },
    ],
    faq: [
      {
        question: "Paletler nasıl oluşturuluyor?",
        answer:
          "Her palet rastgele bir renk tonu ve analog, tamamlayıcı veya üçlü renkler gibi bir uyum kuralıyla başlar. Renkler açıktan koyuya yayılır; böylece palet arka planlar, yüzeyler ve metinler için kullanılabilir.",
      },
      {
        question: "Renkleri uygulamamda nasıl kullanırım?",
        answer:
          "HEX kodlarını tasarım aracına, Android colors.xml dosyasına, Jetpack Compose veya Flutter temana ya da SwiftUI'a kopyala. Web siteleri için CSS değişkenlerini kopyala.",
      },
      {
        question: "Oluşturulan renkler erişilebilir mi?",
        answer:
          "Otomatik olarak değil. Kullandığın metin ve arka plan çiftlerinin kontrastını kontrol et. WCAG, normal metin için en az 4,5:1 kontrast oranı önerir.",
      },
      {
        question: "Beğendiğim bir rengi koruyabilir miyim?",
        answer: "Evet. Rengin üzerindeki kilit düğmesine bas; yeni palet oluşturduğunda o renk aynı kalır.",
      },
    ],
  },
  "gradient-generator": {
    seoTitle: "Ücretsiz CSS Gradyan Oluşturucu",
    seoDescription:
      "Canlı önizlemeyle doğrusal ve dairesel CSS gradyanları oluştur. Renkleri seç, açıyı ayarla ve kullanıma hazır CSS kodunu ücretsiz kopyala.",
    intro:
      "Uygulama arka planları, düğmeler ve mağaza görselleri için yumuşak doğrusal veya dairesel gradyanlar oluştur, CSS kodunu tek tıkla kopyala.",
    howTo: [
      "Doğrusal veya dairesel bir gradyan seç.",
      "En fazla beş renk seç ve her birinin nerede başlayacağını ayarla.",
      "Açıyı ya da dairesel gradyanın şeklini ve merkezini ayarla.",
      "CSS'i kopyala ve stil dosyana yapıştır.",
    ],
    features: [
      { title: "Canlı önizleme", body: "Her değişikliği büyük bir önizlemede anında gör." },
      { title: "Beş renge kadar", body: "Renk ekle ve her birinin gradyan üzerindeki konumunu ayarla." },
      { title: "Hazır ve rastgele", body: "Seçilmiş hazır gradyanlardan başla ya da aracın rastgele bir gradyan önermesine izin ver." },
      {
        title: "Kullanıma hazır CSS",
        body: "Kod, gradyandan önce düz renkli bir yedek satır da içerir.",
      },
    ],
    faq: [
      {
        question: "Gradyanı web sitemde nasıl kullanırım?",
        answer:
          "CSS'i kopyala ve öğenin kuralına yapıştır. İlk satır çok eski tarayıcılar için düz bir renk, ikinci satır gradyanı tanımlar.",
      },
      {
        question: "Gradyanı Android veya iOS uygulamasında kullanabilir miyim?",
        answer:
          "Evet, aynı renkleri ve açıyı kullan. Android'de bir gradient drawable veya Jetpack Compose'da Brush, iOS'ta ise SwiftUI'daki LinearGradient ile uygulayabilirsin.",
      },
      {
        question: "Doğrusal ve dairesel gradyan arasındaki fark nedir?",
        answer:
          "Doğrusal gradyan, seçtiğin açıda düz bir çizgi boyunca renk değiştirir. Dairesel gradyan ise bir merkez noktasından daire veya elips şeklinde yayılır.",
      },
      {
        question: "Bir gradyanda kaç renk olabilir?",
        answer: "Bu araç iki ile beş arasında rengi destekler; bu da neredeyse her tasarım için yeterlidir.",
      },
    ],
  },
  "privacy-policy-generator": {
    seoTitle: "Ücretsiz Uygulama Gizlilik Politikası Oluşturucu",
    seoDescription:
      "Android veya iOS uygulaman için dakikalar içinde gizlilik politikası oluştur. Verileri ve hizmetleri seç, İngilizce veya Türkçe olarak indir.",
    intro:
      "Uygulaman hakkında birkaç soruyu yanıtla; web sitende yayınlayabileceğin ve Google Play ile App Store'dan bağlantı verebileceğin anlaşılır bir gizlilik politikası al.",
    howTo: [
      "Uygulama adını, geliştirici veya şirket adını ve bir iletişim e-postasını gir.",
      "Uygulamanın topladığı verileri ve kullandığı üçüncü taraf hizmetleri seç.",
      "Politikanın dilini seç: İngilizce veya Türkçe.",
      "Metni kopyala ya da HTML veya Markdown olarak indir ve herkese açık bir adreste yayınla.",
    ],
    features: [
      {
        title: "Sadece geçerli olanlar",
        body: "Bölümler yanıtlarına göre değişir; böylece politika uygulamanın gerçekte ne yaptığını anlatır.",
      },
      {
        title: "Yaygın hizmetler hazır",
        body: "Google Play Hizmetleri, AdMob, Google Analytics for Firebase, Crashlytics ve Meta SDK, politikalarının bağlantılarıyla birlikte.",
      },
      {
        title: "İngilizce ve Türkçe",
        body: "Siteyi hangi dilde kullanırsan kullan, politikayı iki dilden birinde oluşturabilirsin.",
      },
      {
        title: "Kolayca yayınla",
        body: "Düz metni kopyala ya da hazır bir HTML sayfası veya Markdown dosyası indir.",
      },
    ],
    faq: [
      {
        question: "Uygulamamın gizlilik politikasına ihtiyacı var mı?",
        answer:
          "Evet. Google Play her uygulama için bir gizlilik politikası bağlantısı ister, Apple da App Store'daki her uygulama için bunu zorunlu tutar. Adresi Play Console'a ve App Store Connect'e eklersin.",
      },
      {
        question: "Politikayı nerede yayınlamalıyım?",
        answer:
          "Herkesin açabileceği bir web sayfasında; örneğin web sitende veya GitHub Pages'te. Google Play PDF'leri veya giriş yapmayı gerektiren sayfaları kabul etmez.",
      },
      {
        question: "Bu, Veri güvenliği formunun yerine geçer mi?",
        answer:
          "Hayır. Play Console'daki Veri güvenliği bölümü ve App Store Connect'teki Uygulama Gizliliği bilgileri ayrı formlardır. Oradaki yanıtlarının gizlilik politikanla uyumlu olduğundan emin ol.",
      },
      {
        question: "Oluşturulan politika hukuki danışmanlık mıdır?",
        answer:
          "Hayır. Bu bir başlangıç şablonudur. Dikkatlice incele ve uygulamana ve tabi olduğun yasalara (örneğin KVKK veya GDPR) göre uyarla.",
      },
      {
        question: "Yanıtlarım saklanıyor mu?",
        answer: "Hayır. Politika tarayıcında oluşturulur ve girdiğin hiçbir bilgi bir yere gönderilmez.",
      },
    ],
  },
  "play-store-description-counter": {
    seoTitle: "Play Store Açıklama Karakter Sayacı",
    seoDescription:
      "Google Play uygulama adı (30), kısa açıklama (80) ve tam açıklama (4.000) için karakterleri say, uygulama adını yaygın mağaza kurallarına göre kontrol et.",
    intro:
      "Google Play mağaza sayfanı her alan için canlı karakter sayısıyla yaz ve göndermeden önce uygulama adındaki yaygın sorunları yakala.",
    howTo: [
      "Uygulama adını yaz veya yapıştır.",
      "Uygulamanın tek satırlık özeti olan kısa açıklamayı ekle.",
      "Tam açıklamanı ekle.",
      "Uyarıları düzelt, ardından metni Google Play Console'a kopyala.",
    ],
    features: [
      {
        title: "Üç sınırın hepsi",
        body: "Uygulama adı için 30, kısa açıklama için 80 ve tam açıklama için 4.000 karakter.",
      },
      {
        title: "Canlı ilerleme",
        body: "İlerleme çubukları sınıra yaklaşınca turuncuya, sınır aşılınca kırmızıya döner.",
      },
      {
        title: "Uygulama adı kontrolleri",
        body: "Emoji, tanıtım kelimeleri, tamamen büyük harfler ve tekrarlanan semboller için uyarılar.",
      },
      { title: "Kelime sayısı", body: "Tam açıklamanın kaç kelime olduğunu gör." },
    ],
    faq: [
      {
        question: "Google Play karakter sınırları nelerdir?",
        answer:
          "Uygulama adı en fazla 30, kısa açıklama en fazla 80 ve tam açıklama en fazla 4.000 karakter olabilir.",
      },
      {
        question: "Uygulama adında emoji kullanabilir miyim?",
        answer:
          "Hayır. Google Play'in meta veri politikası, uygulama adlarında emojiye, ifade simgelerine ve tekrarlanan özel karakterlere izin vermez.",
      },
      {
        question: "Uygulama adında hangi kelimelerden kaçınmalıyım?",
        answer:
          "Mağaza performansı, sıralama veya kampanya çağrıştıran kelimelerden kaçın; örneğin “ücretsiz”, “en iyi”, “#1”, “yeni”, “indirim” veya İngilizce “free”, “best”, “top”.",
      },
      {
        question: "Karakterler nasıl sayılıyor?",
        answer:
          "Boşluklar ve satır sonları dahil her Unicode karakter bir kez sayılır. “ş” veya “é” gibi aksanlı harfler tek karakter sayılır.",
      },
      {
        question: "Metnim kaydediliyor mu?",
        answer: "Hayır. Metnin tarayıcında kalır ve sayfadan ayrıldığında silinir.",
      },
    ],
  },
};
