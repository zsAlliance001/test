import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  close: () => ipcRenderer.send('window-close'),
  showNotification: (title: string, body: string) =>
    ipcRenderer.send('show-notification', { title, body }),
  getStore: (key: string) => ipcRenderer.invoke('get-store', key),
  setStore: (key: string, value: unknown) => ipcRenderer.invoke('set-store', key, value),
  onTrayToggle: (callback: () => void) => {
    ipcRenderer.on('tray-toggle', callback)
    return () => ipcRenderer.removeListener('tray-toggle', callback)
  },
  onTrayReset: (callback: () => void) => {
    ipcRenderer.on('tray-reset', callback)
    return () => ipcRenderer.removeListener('tray-reset', callback)
  }
})
