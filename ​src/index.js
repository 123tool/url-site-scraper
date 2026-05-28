import readline from 'readline';
import colors from 'colors';
import { validateUrl } from './utils.js';
import { startScraping } from './scraper.js';

// Buat interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function TampilkanBanner() {
    console.clear();
    console.log(`
==================================================
   🌐  URL SITE SCRAPER & CLONER (PRO VERSION)  🌐
        Created by: SPY-E / Indonesia OSINT
==================================================
[!] Tujuan: Edukasi & Analisis Struktur Front-End
[!] Info: PHP script tidak dapat diambil via URL.
==================================================
`.cyan.bold);
}

function Main() {
    TampilkanBanner();
    
    rl.question('[?] Masukkan URL Website Target (Contoh: https://example.com): '.yellow, async (inputUrl) => {
        // 1. Validasi Input URL
        if (!inputUrl) {
            console.log(`[!] URL tidak boleh kosong!`.red);
            rl.close();
            return;
        }

        // Otomatis tambahkan https:// jika user lupa mengetiknya
        if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
            inputUrl = 'https://' + inputUrl;
        }

        if (!validateUrl(inputUrl)) {
            console.log(`[❌] URL yang kamu masukkan tidak valid! Periksa kembali.`.red);
            rl.close();
            return;
        }

        // 2. Jalankan Engine Scraper
        console.log(`\n[~] Menghubungi server target...`.grey);
        await startScraping(inputUrl);
        
        // Selesai dan tutup interface terminal
        rl.close();
    });
}

// Eksekusi program utama
Main();
