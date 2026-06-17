# DiabetaFuzzy: Implementasi Metode Fuzzy Sugeno Berbasis Web

Repository ini berisi kode sumber (*source code*) aplikasi berbasis web untuk mendeteksi tingkat risiko diabetes melitus menggunakan **Sistem Inferensi Fuzzy (FIS) Metode Sugeno**. Aplikasi dirancang menggunakan teknologi *Front-End* murni (**HTML, CSS, dan JavaScript**) tanpa *back-end* atau database eksternal, sehingga komputasi logika *fuzzy* berjalan sepenuhnya di sisi klien (*client-side*).

---

## 📌 Deskripsi Proyek

Aplikasi ini mengimplementasikan logika *fuzzy* untuk memetakan kondisi kesehatan pengguna menjadi indikator risiko diabetes (Rendah, Sedang, atau Tinggi). Sistem memproses **4 variabel input** medis dengan total **32 aturan inferensi (*Fuzzy Rules*)** yang dievaluasi secara *real-time*.

### Variabel Input & Parameter Kurva Keanggotaan:
1. **Umur (Tahun):** Muda `[20, 20, 35, 45]`, Dewasa `[35, 45, 55, 65]`, Tua `[55, 65, 75, 75]`
2. **BMI ($kg/m^2$):** Rendah `[15, 15, 18.5, 23]`, Sedang `[18.5, 23, 27.5, 30]`, Tinggi `[27.5, 30, 40, 40]`
3. **Gula Darah Puasa (mg/dL):** Normal `[70, 70, 90, 100]`, Pra-Diabetes `[95, 105, 125, 135]`, Tinggi `[126, 140, 200, 200]`
4. **Aktivitas Fisik (Menit/Minggu):** Rendah `[0, 0, 60, 150]`, Sedang `[90, 150, 210, 270]`, Tinggi `[240, 300, 300, 300]`

### Variabel Output:
* **Skor Risiko Diabetes:** Skala 0 - 100 (Model Sugeno Orde-Nol / Konstanta tegas).

---

## 🛠️ Fitur Utama

* **Fuzzifikasi Real-time:** Menampilkan grafik/nilai derajat keanggotaan ($\mu$) langsung saat pengguna menggeser *slider* input.
* **Mesin Inferensi Otomatis:** Mengevaluasi 32 aturan *fuzzy* menggunakan fungsi implikasi `MIN`.
* **Defuzzifikasi Rata-Rata Terbobot (*Weighted Average*):** Menghitung nilai *crisp* output akhir secara presisi.
* **Visualisasi *Gauge Chart*:** Menampilkan hasil akhir skor risiko dalam bentuk grafik busur interaktif.
* **Penyimpanan Lokal (*Local Storage*):** Menyimpan riwayat hasil skrining kesehatan langsung di peramban web pengguna tanpa database SQL.

---

## 📁 Struktur Dokumen Kode

* `index.html` — Struktur antarmuka pengguna (UI), *form* input slider, dan kontainer visualisasi hasil.
* `style.css` — Desain tampilan antarmuka dengan tema gelap modern (*modern dark theme*), responsif untuk perangkat seluler dan desktop.
* `fuzzy.js` — Logika inti *Fuzzy Inference System* (Fuzzifikasi, Evaluasi Rule, Defuzzifikasi) serta manajemen interaksi DOM.

---

## 🚀 Cara Menjalankan Aplikasi

Karena aplikasi ini dibangun menggunakan arsitektur *Client-Side Front-End Only*, Anda tidak memerlukan instalasi *server* lokal (seperti XAMPP, Node.js, atau Python server).

1. **Clone Repository ini:**
   ```bash
   git clone [https://github.com/username/diabetafuzzy-sugeno.git](https://github.com/username/diabetafuzzy-sugeno.git)
