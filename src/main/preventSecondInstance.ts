import { app, BrowserWindow } from 'electron'
import { extname } from 'path'

export default function preventSecondInstance(win: BrowserWindow): void {
  // Prevent second instance
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) return app.quit(), process.exit(0)

  app.on('second-instance', (_e, argv) => {
    const args = [...argv].filter((arg) => extname(arg) != '.exe')
    win.webContents.send('protocol', args)

    if (!win.isVisible()) win.show()
    if (win.isMinimized()) win.restore()

    return win.focus()
  })
}
