import { BrowserWindow, ipcMain as ipc, shell } from 'electron'

export default function handler(window: BrowserWindow): void {
  //

  // Make all links open with the browser, not with the application
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url)
    return { action: 'deny' }
  })

  //

  // IPC Main Handlers
  ipc.on('win:state', (_e, state) => {
    switch (state) {
      case 'minimize':
        window.minimize()
        break

      case 'maximize':
        window.maximize()
        break

      case 'unmaximize':
        window.unmaximize()
        break

      case 'close':
        window.close()
        break
    }
  })

  // State Change

  window.on('unmaximize', () => {
    window.webContents.send('win:state', 'unmaximize')
  })

  window.on('maximize', () => {
    window.webContents.send('win:state', 'maximize')
  })
}
