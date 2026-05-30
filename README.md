# Sümeyye & Bayram - Dijital Nişan Davetiyesi

Bu proje; React, Vite ve Framer Motion kullanılarak tasarlanmış, modern, mobil öncelikli (mobile-first), zarif ve tek sayfalık animasyonlu bir dijital nişan davetiyesi web sitesidir.

## Özellikler

* **Zarf Açılış Deneyimi:** Site, altın mühürlü ("S & B") krem tonlarında bir zarf ile açılır. Mühüre dokunulduğunda zarf şık bir animasyonla açılır ve içinden davetiye notu yükselerek ekranı kaplar. Zarf kaybolduktan sonra sayfa kaydırılabilir hale gelir.
* **Sürekli Partikül Efekti:** Zarf açıldıktan sonra arka planda altın pullar ve yeşil yapraklar hafifçe süzülmeye devam eder.
* **10 Farklı Bölüm:**
  1. Açılış zarf sahnesi
  2. Nişan davetiyesi kahraman kartı (Hero)
  3. "İki kalp tek ritim" romantik metin bölümü
  4. Canlı geri sayım sayacı (Tarih girildiğinde otomatik aktif olur)
  5. Detaylı etkinlik bilgileri (Tarih, Saat, Konum)
  6. Google Maps entegrasyonu (Haritada Göster butonu)
  7. Günün Programı / Akışı
  8. Aşk Hikayesi zaman tüneli
  9. LCV / Katılım Bilgisi Bildirme (WhatsApp entegrasyonlu buton)
  10. Kapanış & İmzalar
* **Aesthetic design:** Yüksek kaliteli arka plan, glassmorphism kartlar, altın parıltılar, Cormorant Garamond / Great Vibes / Inter font kombinasyonu ve akıcı scroll animasyonları.
* **Kolay Yapılandırma:** Tüm metinler, tarihler, WhatsApp ve harita bağlantıları tek bir dosyadan (`src/invitationData.js`) yönetilebilir.

---

## Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Bağımlılıkları Yükleme
Proje dizininde bir terminal açıp aşağıdaki komutu çalıştırarak gerekli paketleri yükleyin:
```bash
npm install
```

### 2. Yerel Sunucuyu Başlatma (Geliştirme Modu)
Projeyi yerelde (`http://localhost:5173` adresinde) test etmek için:
```bash
npm run dev
```

### 3. Yayına Hazırlama (Build)
Üretim sürümünü derlemek için:
```bash
npm run build
```

---

## Davetiyeyi Özelleştirme

Tüm içerikleri değiştirmek için tek yapmanız gereken **`src/invitationData.js`** dosyasını düzenlemektir.

### Tarih ve Geri Sayımı Aktif Etme
1. **`eventDateText`**: Ekranda yazı olarak görünecek tarih bilgisidir. (Örn: `"15 Eylül 2026, Salı - 19:30"`)
2. **`countdownTargetDate`**: Geri sayımın sayabilmesi için gerçek tarih formatında girilmelidir. (Örn: `"2026-09-15T19:30:00"`)
   * **Önemli:** Eğer bu alan boş (`""`) bırakılırsa, geri sayım alanında otomatik olarak şık bir *"Tarih & Saat Açıklandığında Sayaç Aktif Olacaktır"* ibaresi görüntülenir.

---

## GitHub Pages Deployment

Projeyi GitHub Pages'e yüklemek için Vite base path ayarı yapılandırılmıştır.

Derleme (build) sırasında GitHub Pages depo isminizi base path olarak ayarlamak için terminalde aşağıdaki komutla derleme yapabilirsiniz:

**Windows PowerShell:**
```powershell
$env:VITE_BASE_PATH="/depo-adi/"; npm run build
```

**macOS/Linux:**
```bash
VITE_BASE_PATH="/depo-adi/" npm run build
```

Derlenen `dist` klasörü içerisindeki dosyaları doğrudan GitHub Pages dalına (branch) yükleyip yayınlayabilirsiniz.
