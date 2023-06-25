import { Menu, MenuItem } from 'electron'

export default function createContextMenu(win: Electron.BrowserWindow): void {
  const ctxMenu = new Menu()

  ctxMenu.append(new MenuItem({ role: 'reload' }))
  ctxMenu.append(new MenuItem({ role: 'zoomIn' }))
  ctxMenu.append(new MenuItem({ role: 'zoomOut' }))
  ctxMenu.append(new MenuItem({ role: 'resetZoom' }))
  ctxMenu.append(new MenuItem({ role: 'editMenu' }))
  ctxMenu.append(new MenuItem({ role: 'about' }))
  ctxMenu.append(new MenuItem({ role: 'toggleDevTools' }))
  ctxMenu.append(new MenuItem({ role: 'close' }))

  win.webContents.on('context-menu', (_e, params) => {
    ctxMenu.popup({
      window: win,
      x: params.x,
      y: params.y
    })
  })
}
