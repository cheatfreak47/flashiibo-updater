const fetch = require('node-fetch').default;
const { JSDOM } = require('jsdom');

const FIRMWARE_URL = 'https://www.flashiibo.com/manual/pro/firmware';

async function getLatestFirmware() {
    try {
        // 1. Fetch the page
        const response = await fetch(FIRMWARE_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // 2. Find the magic span (now more fault tolerant)
        const allSpans = [...document.querySelectorAll('span')];
        const firmwareSpan = allSpans.find(span =>
            span.textContent.trim().includes('Stable Firmware')
        );

        if (!firmwareSpan) throw new Error('Could not locate firmware version span');

        // 3. Find subsequent download link
        const allElements = document.querySelectorAll('*');
        let foundSpan = false;

        for (const el of allElements) {
            if (!foundSpan && el === firmwareSpan) {
                foundSpan = true;
                continue;
            }

            if (foundSpan && el.tagName === 'A' &&
                el.href.includes('downloads.flashiibo.com') &&
                el.href.endsWith('.zip')) {
                return {
                    url: el.href,
                    version: extractVersionFromUrl(el.href)
                };
            }
        }

        throw new Error('No valid download link found after firmware span');
    } catch (err) {
        console.error('Scraping failed:', err);
        throw err; // Re-throw for caller to handle
    }
}

function extractVersionFromUrl(url) {
    // Matches both YY.MM.DD and vX.Y.Z formats
    const versionMatch = url.match(/(\d{2,4}\.\d{1,2}\.\d{1,2})|(v\d+\.\d+\.\d+)/i);
    return versionMatch ? versionMatch[0] : 'unknown';
}

module.exports = { getLatestFirmware };
