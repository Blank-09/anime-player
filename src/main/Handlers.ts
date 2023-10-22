import { BrowserWindow, dialog, ipcMain as ipc, shell } from 'electron'
import { screenshot, createVTTFiles } from './video'
import { ScreenshotsConfig } from 'fluent-ffmpeg'
import { VTTOptions } from './video/vtt'

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

  // Open Dialog

  ipc.handle('open:dialog', async () => {
    // Open folder
    const result = await dialog.showOpenDialog(window, {
      properties: ['openDirectory'],
      title: 'Select a folder',
      buttonLabel: 'Open',
      defaultPath: 'D:\\Anime\\'
    })

    return result.filePaths
  })

  // Ffmpeg

  ipc.handle('ffmpeg:screenshot', async (_e, path: string, options: ScreenshotsConfig) => {
    await screenshot(path, options)
  })

  ipc.handle('ffmpeg:spritesheet', async (_e, path: string, options: VTTOptions) => {
    return await createVTTFiles(path, options)
  })
}
