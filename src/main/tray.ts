/**
 * TRAY
 */

import { app, Tray, Menu, MenuItem, BrowserWindow } from 'electron'
import createWindow from './createWindow'
import icon from '../../resources/icon.png?asset'

const getAllWindows = (): number => BrowserWindow.getAllWindows().length

export default function createTray(win: Electron.BrowserWindow): void {
  // const icon = nativeImage.createFromDataURL(icon)
  const tray = new Tray(icon)
  const contextMenu = new Menu()

  // TODO: To show that the app is running even if the app is closed
  tray.on('click', () => {
    if (getAllWindows() === 0) createWindow()
    app.focus()
  })

  contextMenu.append(
    new MenuItem({
      label: 'Relaunch',
      click: (): void => {
        if (getAllWindows() !== 0) win.close()
        app.quit(), app.relaunch()
      }
    })
  )

  contextMenu.append(
    new MenuItem({
      label: 'hide',
      click: (): void => {
        if (getAllWindows() === 0) createWindow()
        win.hide()
      }
    })
  )

  contextMenu.append(
    new MenuItem({
      label: 'Show',
      click: (): void => {
        if (getAllWindows() === 0) createWindow()
        win.show()
      }
    })
  )

  contextMenu.append(new MenuItem({ role: 'about' }))

  contextMenu.append(
    new MenuItem({
      label: 'Exit',
      click: (): void => {
        if (getAllWindows() !== 0) win.close()
        app.quit()
      }
    })
  )

  tray.setToolTip('Anime Player (active)')
  tray.setContextMenu(contextMenu)
}
