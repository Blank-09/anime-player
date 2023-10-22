import { mkdirSync } from 'fs'
import { existsSync } from 'fs'
import path from 'path'

export const isPackaged = !location.href.startsWith('http')
export const THUMB_FOLDER = path.join(process.resourcesPath, '.thumb')
export const VTT_FOLDER = path.join(process.resourcesPath, '.vtt')
export const startTime = new Date()

// Create .vtt folder
if (!existsSync(VTT_FOLDER)) {
  mkdirSync(VTT_FOLDER, { recursive: true })
}

// @ts-ignore store startTime in window
window.startTime = startTime
