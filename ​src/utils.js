import { URL } from 'url';
import path from 'path';

// Fungsi untuk membersihkan URL dan memastikan URL valid
export function validateUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Mengubah URL menjadi jalur folder lokal yang aman
export function urlToLocalPath(targetUrl, currentUrl, assetUrl) {
    try {
        const baseUrlObj = new URL(targetUrl);
        const currentUrlObj = new URL(currentUrl);
        
        // Resolve relative URL berdasarkan URL halaman saat ini
        const resolvedUrl = new URL(assetUrl, currentUrlObj.href);
        
        // Pastikan aset berasal dari domain yang sama (mencegah download eksternal CDN jika tidak mau)
        if (resolvedUrl.hostname !== baseUrlObj.hostname) {
            return { absoluteUrl: resolvedUrl.href, localPath: null, isExternal: true };
        }

        let pathname = resolvedUrl.pathname;
        if (pathname.endsWith('/')) {
            pathname += 'index.html';
        }

        // Jika tidak ada ekstensi, anggap sebagai html (routing dinamis)
        if (!path.extname(pathname)) {
            pathname += '.html';
        }

        // Buat local path yang rapi
        const localPath = path.join(baseUrlObj.hostname, pathname);
        
        return {
            absoluteUrl: resolvedUrl.href,
            localPath: localPath,
            isExternal: false
        };
    } catch (error) {
        return { absoluteUrl: null, localPath: null, isExternal: true };
    }
}
