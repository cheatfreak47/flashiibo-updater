const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch').default;
const AdmZip = require('adm-zip');

async function downloadFirmware(url, downloadDir = 'downloads') {
    try {
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);

        // Updated to use arrayBuffer() instead of buffer()
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const filename = path.basename(url);
        const tempPath = path.join(downloadDir, filename);

        await fs.promises.writeFile(tempPath, buffer);

        const zip = new AdmZip(tempPath);
        if (zip.getEntries().length === 0) {
            throw new Error('Downloaded file is not a valid ZIP archive');
        }

        return {
            path: tempPath,
            size: buffer.length,
            entries: zip.getEntries().map(e => e.entryName)
        };
    } catch (err) {
        console.error('Download failed:', err);
        throw err;
    }
}

module.exports = { downloadFirmware }