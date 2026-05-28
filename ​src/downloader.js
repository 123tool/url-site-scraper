import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import ProgressBar from 'progress';
import colors from 'colors';
import fsJson from '../config/default.json' assert { type: 'json' };

export async function downloadAsset(url, localPath) {
    // Tentukan path lengkap folder tujuan penyimpanan
    const fullPath = path.join(fsJson.outputDir, localPath);
    
    // Jika file sudah ada, lewati agar hemat bandwidth dan cepat
    if (await fs.pathExists(fullPath)) {
        return;
    }

    try {
        // Pastikan direktori/folder tujuan sudah dibuat
        await fs.ensureDir(path.dirname(fullPath));

        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            headers: { 'User-Agent': fsJson.userAgent },
            timeout: fsJson.timeout
        });

        const totalLength = response.headers['content-length'];

        // Jika server mengirimkan informasi ukuran file, tampilkan Progress Bar yang interaktif
        if (totalLength) {
            const progressBar = new ProgressBar(`-> Downloading ${path.basename(localPath).cyan} [:bar] :percent :etas`, {
                width: 40,
                complete: '=',
                incomplete: ' ',
                renderThrottle: 1,
                total: parseInt(totalLength, 10)
            });

            response.data.on('data', (chunk) => progressBar.tick(chunk.length));
        }

        // Simpan stream data ke file lokal
        const writer = fs.createWriteStream(fullPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

    } catch (error) {
        // Log error jika aset gagal didownload (misal 404 Not Found atau 403 Forbidden)
        console.error(`[ERR]`.red + ` Gagal mendownload aset: ${url} -> ${error.message}`);
    }
}
