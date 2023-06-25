import BrowserWindowConstructorOptions from './BrowserWindowConstructorOptions'
import createContextMenu from './contextMenu'
import webContentsHandler from './Handlers'

import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import path from 'path'
import createTray from './tray'
import preventSecondInstance from './preventSecondInstance'

export default function createWindow(): BrowserWindow {
  // options?: Electron.BrowserWindowConstructorOptions | undefined
  const mainWindow = new BrowserWindow(BrowserWindowConstructorOptions)
  mainWindow.removeMenu()

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  createContextMenu(mainWindow)
  createTray(mainWindow)
  webContentsHandler(mainWindow)
  preventSecondInstance(mainWindow)

  return mainWindow
}
