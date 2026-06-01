export interface ElectronAPI {
  minimize: () => void
  close: () => void
  showNotification: (title: string, body: string) => void
  getStore: (key: string) => Promise<unknown>
  setStore: (key: string, value: unknown) => Promise<void>
  onTrayToggle: (callback: () => void) => () => void
  onTrayReset: (callback: () => void) => () => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
