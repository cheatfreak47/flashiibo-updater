# Flashiibo Pro Updater Client
A hastily made electron update tool for [Flashiibo Pro](https://flashiibo.com/). Made with love for those who refuse to use anything other than FireFox. Uses [web-bluetooth-dfu](https://github.com/thegecko/web-bluetooth-dfu) by thegecko.

## Requirements:
- Windows 10 or newer
- Any Bluetooth 4.0 or newer Bluetooth radio/adapter
- A Flashiibo Pro device

## How to use:
 1. Download `flashiibo-pro-updater-v105-setup.exe` from below.
   <sup>*(or download the portable version if you prefer)*</sup>
 2. Run installer and complete setup, and run the program. (or run the portable version.)
   <sup>*(If installed you may run it anytime from the Start Menu)*</sup>
 3. Put your Flashiibo Pro into DFU Update mode by going to Settings → Firmware Update.
   <sup>*(Advanced users: If you wish to sideload your own firmware zip, you may click the "Load Firmware File" button on the bottom right.)*</sup>
 4. Click on "Start Update" to push the firmware to your Flashiibo Pro.

## Features
- Finds the latest firmware for Flashiibo automatically
- Optional firmware sideload button for advanced users
- Web Bluetooth support for Flashiibo hardware
- Automatic Flashiibo Pro device selection

## Build Instructions
1. Install [Node.js](https://nodejs.org/en/download)
2. Clone this repo: `git clone https://github.com/cheatfreak47/flashiibo-updater.git`
3. Open cmd in the repo location and install dependencies: `npm install`.
4. Open cmd in the repo location and build: `npm run build`.
