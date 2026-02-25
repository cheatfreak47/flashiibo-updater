const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fetch = require('node-fetch').default;
const { downloadFirmware } = require('./downloader')
const fs = require('fs')

let mainWindow

// Enable experimental web platform features for Web Bluetooth
app.commandLine.appendSwitch('enable-experimental-web-platform-features')
app.commandLine.appendSwitch('enable-web-bluetooth')

function createWindow() {
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 650,
    minHeight: 540,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableBluetooth: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // ===== BLUETOOTH DEVICE SELECTION =====
  mainWindow.webContents.on('select-bluetooth-device', (event, devices, callback) => {
    event.preventDefault()
    const device = devices.find(d =>
      d.deviceName?.toLowerCase().includes('flashiibo dfu')
    )
    device ? callback(device.deviceId) : setTimeout(() => callback(''), 1500)
  })

  // ===== FIRMWARE DOWNLOAD HANDLER =====
  ipcMain.handle('download-firmware', async () => {
    try {
      const response = await fetch('https://www.flashiibo.com/downloads/pro-firmware-config.json');
      if (!response.ok) throw new Error(`Failed to fetch firmware info (HTTP ${response.status})`);

      const { version, url } = await response.json();
      const downloaded = await downloadFirmware(url);

      return {
        success: true,
        version: version,
        path: downloaded.path
      };
    } catch (err) {
      console.error('Firmware download failed:', err);
      return {
        success: false,
        error: err.message
      };
    }
  });

  // ===== FIRMWARE FILE HANDLER =====
  ipcMain.handle('read-firmware', async (event, filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) reject(err)
        resolve(new Uint8Array(data).buffer)
      })
    })
  })

  // Load the update UI
  mainWindow.loadFile('web.html')

  // Center window
  mainWindow.setPosition(
    Math.floor((width - mainWindow.getSize()[0]) / 2),
    Math.floor((height - mainWindow.getSize()[1]) / 2)
  )
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
