import { join } from 'path'

const options: Electron.BrowserWindowConstructorOptions = {
  title: 'Anime Player',
  // icon: join(__dirname, '../../resources/icon.png'),
  frame: false,
  width: 940,
  height: 600,
  minWidth: 100,
  minHeight: 60,
  show: true,
  autoHideMenuBar: true,
  backgroundColor: '#000',

  webPreferences: {
    sandbox: false,
    preload: join(__dirname, '../preload/index.js'),
    nodeIntegration: true,
    contextIsolation: false
    // devTools: true
  }
}

export default options
