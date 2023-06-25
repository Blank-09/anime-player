const fs = require('fs')
const path = require('path')

import { PathLike } from 'fs'

export function getFilesAndFolders(dir: string): Array<PathLike> {
  return fs.readdirSync(dir).map((file) => path.join(dir, file))
}

export function getFolders(dir: string): Array<PathLike> {
  return getFilesAndFolders(dir).filter((file) => {
    try {
      return fs.lstatSync(file).isDirectory()
    } catch {
      return false
    }
  })
}

export function getFiles(dir: string, format?: RegExp): Array<PathLike> {
  let filter = (file: PathLike): boolean => fs.lstatSync(file).isFile()

  if (format !== undefined)
    filter = (file: PathLike): boolean => format.test(path.extname(file.toString()))

  return getFilesAndFolders(dir).filter(filter)
}
