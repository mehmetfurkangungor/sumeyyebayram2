/**
 * Sümeyye & Bayram - Dijital Nişan Davetiyesi Veri ve Yapılandırma Dosyası
 * 
 * Bu dosyadaki bilgileri değiştirerek davetiyeyi kolayca özelleştirebilirsiniz.
 */

export const invitationData = {
  // Çift Bilgileri
  bride: "Sümeyye",
  groom: "Bayram",
  brideInitials: "S",
  groomInitials: "B",
  eventTitle: "Nişan Töreni",

  // Tarih ve Saat
  // "Tarih & Saat yakında eklenecek" şeklinde placeholder. 
  // Gerçek tarih girildiğinde geri sayım sayacı otomatik olarak çalışacaktır.
  eventDateText: "Tarih & Saat yakında eklenecek",
  
  // Geri sayım için hedef tarih (Format: YYYY-MM-DDTHH:mm:ss)
  // Örn: "2026-09-15T19:00:00". Eğer boş bırakılırsa, geri sayım alanında şık bir "Yakında Tarih Açıklanacak" mesajı gösterilir.
  countdownTargetDate: "", 

  // Konum Bilgileri
  location: {
    title: "Ümraniye / İstanbul",
    address: "İnkılap Mahallesi, Ümraniye / İstanbul",
    googleMapsUrl: "#", // Google Haritalar linki buraya gelecek
  },

  // WhatsApp Katılım (RSVP) Bilgisi
  rsvp: {
    phoneNumber: "905000000000", // WhatsApp numarası (ülke kodu dahil, örn: 905XXXXXXXXX)
    messageTemplate: "Merhaba, Sümeyye ve Bayram'ın nişan davetine katılım sağlayacağım.",
    deadlineText: "Katılım durumunuzu bildirmeniz rica olunur.",
  },

  // Romantik Giriş Metinleri
  romanticQuote: {
    title: "İki Kalp, Tek Ritim",
    text: "Hayatımızın en özel, en anlamlı gününe adım atarken, siz değerli dostlarımızı da bu heyecana ortak olmaya davet ediyoruz. Sevgiyle, el ele yeni bir başlangıca..."
  },

  // Aşk Hikayemiz Bölümü (Love Story)
  loveStory: {
    title: "Aşk Hikayemiz",
    subtitle: "Gönülden birbirimize bağlandığımız o güzel yolculuk...",
    timeline: [
      {
        year: "İlk Karşılaşma",
        title: "Kesişen Yollar",
        description: "Hayatımızın en tatlı tesadüfüyle yollarımız birleşti. Bakışlarımızda geleceğin umudunu hissettik."
      },
      {
        year: "Zamanla Büyüyen Sevgi",
        title: "Ortak Hayaller",
        description: "Birlikte geçirilen her an, paylaşılan her gülüş sevgimizi daha da derinleştirdi. Hayallerimizi ortak kıldık."
      },
      {
        year: "Ve Şimdi...",
        title: "Sonsuzluğa Doğru",
        description: "Bir ömür boyu el ele yürümek için ilk resmi adımımızı nişan törenimizle atıyoruz."
      }
    ]
  },

  // Günün Programı / Akış (Timeline)
  program: [
    {
      time: "19:00",
      title: "Misafirlerin Karşılanması",
      description: "Bu tatlı heyecan başlarken kapılarımız sizler için açılıyor."
    },
    {
      time: "19:30",
      title: "Yüzük Töreni",
      description: "Ömürlük sözümüzü verirken, nişan yüzüklerimiz takılıyor."
    },
    {
      time: "20:30",
      title: "Pasta Kesimi & İkramlar",
      description: "Tatlı bir başlangıç ve lezzetli ikramlar eşliğinde kutlama."
    },
    {
      time: "21:00",
      title: "Müzik & Eğlence",
      description: "Gecenin ilerleyen saatlerine kadar dans ve müzikle coşuyoruz."
    }
  ],

  // Kapanış Mesajı
  closingMessage: {
    text: "Bu mutlu günümüzde yanımızda olmanız dileğiyle...",
    signature: "Sümeyye & Bayram"
  }
};
