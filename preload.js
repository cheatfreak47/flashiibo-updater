const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  downloadFirmware: () => ipcRenderer.invoke('download-firmware'),
  readFirmware: (path) => ipcRenderer.invoke('read-firmware', path),
  onUpdateStatus: (callback) => ipcRenderer.on('update-status', callback)
})
