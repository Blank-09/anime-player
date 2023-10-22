import { ScreenshotsConfig } from 'fluent-ffmpeg'

export function screenshot(path: string, options: ScreenshotsConfig): Promise<void> {
  return window.electron.ipcRenderer.invoke('ffmpeg:screenshot', path, options)
}

export function createVTTFiles(path: string, options: { duration: number }): Promise<string> {
  return window.electron.ipcRenderer.invoke('ffmpeg:spritesheet', path, options)
}
