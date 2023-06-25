const ipc = window.electron.ipcRenderer

const maxResBtn = //
  document.getElementById('maxResBtn')! as HTMLButtonElement

const minimizeBtn = //
  document.getElementById('minimizeBtn')! as HTMLButtonElement

const closeBtn = //
  document.getElementById('closeBtn')! as HTMLButtonElement

const icon = //
  maxResBtn.querySelector('i')! as HTMLElement

const titleBar = //
  document.getElementById('titlebar')! as HTMLElement

let isMaximized = false

// Event Handlers

window.onfocus = (): void => {
  titleBar.classList.add('focused')
}

window.onblur = (): void => {
  titleBar.classList.remove('focused')
}

maxResBtn.onclick = (): void => {
  ipc.send('win:state', isMaximized ? 'unmaximize' : 'maximize')
}

minimizeBtn.onclick = (): void => {
  ipc.send('win:state', 'minimize')
}

closeBtn.onclick = (): void => {
  ipc.send('win:state', 'close')
}

// IPC Handler

ipc.on('win:state', (_e, msg) => {
  if (msg === 'unmaximize') changeMaxResBtn(false)
  if (msg === 'maximize') changeMaxResBtn(true)
})

/**
 * Util Functions
 */
function changeMaxResBtn(isMaximizedApp: boolean): void {
  if (isMaximizedApp) {
    maxResBtn.title = 'Restore'
    icon.classList.remove('fa-window-maximize')
    icon.classList.add('fa-window-restore')
  }

  //
  else {
    maxResBtn.title = 'Maximize'
    icon.classList.remove('fa-window-restore')
    icon.classList.add('fa-window-maximize')
  }

  isMaximized = isMaximizedApp
}
