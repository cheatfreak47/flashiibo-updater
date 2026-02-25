# Flashiibo Pro Web Updater
A browser-based firmware updater for [Flashiibo Pro](https://flashiibo.com/). Uses [web-bluetooth-dfu](https://github.com/thegecko/web-bluetooth-dfu) by thegecko.

## Supported Browsers
✅ **Microsoft Edge** (native support)
✅ **Google Chrome** (native support)
✅ **Brave** *(requires enabling flag)*

*For Brave users:*
1. Visit `brave://flags/#brave-web-bluetooth-api`
2. **Enable** the Web Bluetooth API flag
3. Restart browser

## How to Use
1. Visit the hosted updater page (URL TBD)
2. Put your Flashiibo Pro into Firmware Update mode.
3. Click **Start Update**
4. Select your Flashiibo Pro
5. Wait for the update to complete!

## Features
- One-click firmware updates
- Automatic detection of latest firmware version
- Manual firmware file loading (for advanced users)

## Technical Notes
- Requires browser with Web Bluetooth support
- Firmware files are cached in browser storage
- All processing happens locally (no firmware uploads to servers)