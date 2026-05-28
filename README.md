## URL Site Scraper & Cloner

Aplikasi berbasis **Node.js** yang dirancang khusus untuk mengunduh (*cloning*) seluruh aset *front-end* dari sebuah situs web melalui URL secara otomatis. Alat ini sangat berguna untuk tujuan pendidikan, analisis UI/UX, audit struktur kode, atau pembuatan dokumentasi luring (*offline documentation*).

---

## Fitur

* **⚡ High-Performance Parallel Download:** Mengunduh puluhan aset (CSS, JS, Gambar) secara bersamaan menggunakan arsitektur *asynchronous* Node.js.
* **🔗 Smart Path Rewriting:** Otomatis mengubah tautan URL online menjadi jalur file lokal (*relative path*) sehingga situs web hasil kloning dapat dibuka secara *offline-friendly*.
* **📊 Interactive Progress Bar:** Menampilkan visualisasi proses pengunduhan aset secara *real-time* di terminal.
* **🎨 Beautiful CLI Interface:** Tampilan terminal yang rapi dan interaktif dengan kode warna (*colored output*).
* **⚙️ Configurable Engine:** Dapat diatur dengan mudah melalui file konfigurasi JSON (Ubah User-Agent, batas waktu *timeout*, filter aset, dll).

---

## Teknologi

Alat ini dibangun menggunakan ekosistem **Node.js** dengan beberapa pustaka pihak ketiga:
* [Axios](https://github.com/axios/axios) - Untuk menangani HTTP Request yang cepat dan andal.
* [Cheerio](https://github.com/cheeriojs/cheerio) - Untuk melakukan *parsing* dan manipulasi DOM HTML (seperti jQuery).
* [Fs-Extra](https://github.com/jprichardson/node-fs-extra) - Untuk manajemen pembuatan file dan folder lokal yang intensif.
* [Progress](https://github.com/visionmedia/node-progress) - Untuk menampilkan bilah kemajuan (*progress bar*) di terminal.

---

## Panduan Instalasi

## 1. Prasyarat
Pastikan kamu sudah menginstal **Node.js** (versi 16 atau yang lebih baru) di komputermu. Kamu bisa mengunduhnya di [nodejs.org](https://nodejs.org/).

## 2. Kloning / Salin Proyek
Masuk ke dalam direktori tempat kamu menyimpan source code ini melalui Terminal atau Command Prompt :
```bash
cd url-site-scraper
```
## 3. Instal Dependencies
​Jalankan perintah berikut untuk mengunduh dan menginstal semua pustaka pendukung yang dibutuhkan :
```
npm install
```
## 4. Jalankan Aplikasi
​Jalankan skrip utama menggunakan perintah :
```
npm start
```
## 5. Masukkan URL Target
​Masukkan URL situs web yang ingin kamu analisis (contoh: `https://example.com`) pada kolom input yang tersedia di terminal, lalu tekan Enter.

## Kustomisasi Konfigurasi
​Kamu bisa menyesuaikan perilaku scraper ini dengan mengubah nilai di dalam file `config/default.json` :
```
{
  "userAgent": "Mozilla/5.0 ...",  // Identitas browser saat melakukan request
  "timeout": 15000,                // Batas waktu tunggu server merespons (milidetik)
  "downloadImages": true,          // Ubah ke false jika tidak ingin mendownload gambar
  "downloadFonts": true,           // Mengaktifkan/menonaktifkan unduhan font web
  "outputDir": "./cloned_websites" // Folder utama penyimpanan hasil kloning
}
```

## ⚠️ Disclaimer

*​Alat ini dibuat HANYA UNTUK TUJUAN PENDIDIKAN, STUDI BANDING, DAN ANALISIS STRUKTUR KODE. Penyalahgunaan alat ini untuk tindakan plagiarisme, pencurian kekayaan intelektual (mengaku-ngaku karya orang lain), atau menggandakan situs web untuk tujuan penipuan (phishing) adalah tindakan ilegal dan bukan merupakan tanggung jawab pembuat program. Gunakan dengan bijak dan hormati hak cipta developer lain!*
