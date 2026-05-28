import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';
import colors from 'colors';
import fsJson from '../config/default.json' assert { type: 'json' };
import { urlToLocalPath } from './utils.js';
import { downloadAsset } from './downloader.js';

export async function startScraping(targetUrl) {
    try {
        console.log(`[+] Memulai kloning untuk website: ${targetUrl.green}`);
        
        // 1. Ambil source HTML utama dari URL target
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': fsJson.userAgent },
            timeout: fsJson.timeout
        });

        const html = response.data;
        const $ = cheerio.load(html);
        
        // Buat mapping local path untuk index utama
        const mainPathInfo = urlToLocalPath(targetUrl, targetUrl, '/index.html');
        const tasks = [];

        console.log(`[+] Memproses dan mengekstrak aset website...`.yellow);

        // 2. Ekstrak dan proses CSS (<link rel="stylesheet">)
        $('link[rel="stylesheet"]').each((i, el) => {
            const href = $(el).attr('href');
            if (href) {
                const asset = urlToLocalPath(targetUrl, targetUrl, href);
                if (asset.localPath) {
                    tasks.push(downloadAsset(asset.absoluteUrl, asset.localPath));
                    // Ubah link di HTML ke file lokal (menggunakan path relatif agar aman)
                    $(el).attr('href', path.relative(path.dirname(mainPathInfo.localPath), asset.localPath).replace(/\\/g, '/'));
                }
            }
        });

        // 3. Ekstrak dan proses JavaScript (<script src="...">)
        $('script[src]').each((i, el) => {
            const src = $(el).attr('src');
            if (src) {
                const asset = urlToLocalPath(targetUrl, targetUrl, src);
                if (asset.localPath) {
                    tasks.push(downloadAsset(asset.absoluteUrl, asset.localPath));
                    $(el).attr('src', path.relative(path.dirname(mainPathInfo.localPath), asset.localPath).replace(/\\/g, '/'));
                }
            }
        });

        // 4. Ekstrak dan proses Gambar (<img src="...">) jika diaktifkan di konfigurasi
        if (fsJson.downloadImages) {
            $('img[src]').each((i, el) => {
                const src = $(el).attr('src');
                if (src && !src.startsWith('data:')) { // Lewati jika gambar berupa Base64
                    const asset = urlToLocalPath(targetUrl, targetUrl, src);
                    if (asset.localPath) {
                        tasks.push(downloadAsset(asset.absoluteUrl, asset.localPath));
                        $(el).attr('src', path.relative(path.dirname(mainPathInfo.localPath), asset.localPath).replace(/\\/g, '/'));
                    }
                }
            });
        }

        // Tunggu semua proses download aset selesai secara paralel (Asynchronous multi-thread performance)
        if (tasks.length > 0) {
            console.log(`[+] Mengunduh ${tasks.length} komponen aset secara paralel...`.cyan);
            await Promise.all(tasks);
        }

        // 5. Simpan file HTML utama website yang sudah dimodifikasi ke lokal
        const finalHtmlPath = path.join(fsJson.outputDir, mainPathInfo.localPath);
        await fs.ensureDir(path.dirname(finalHtmlPath));
        await fs.writeFile(finalHtmlPath, $.html(), 'utf-8');

        console.log(`\n[✔] SELESAI! Website berhasil dikloning sepenuhnya.`.green.bold);
        console.log(`[📂] Output file disimpan di: ${finalHtmlPath.cyan}\n`);

    } catch (error) {
        console.error(`\n[❌] Terjadi kesalahan fatal saat scraping: ${error.message}`.red.bold);
    }
}
