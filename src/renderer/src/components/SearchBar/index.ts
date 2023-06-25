import { createElement } from '../../utils'
import { getFolders } from '../../utils/fs'
import {
  folderListDiv,
  dirnameElement,
  searchInput,
  currentFolderBtn,
  previousFolderBtn
} from './htmlElements'

import './eventListners'

const { basename, dirname, join } = require('path')
const winattr = require('winattr')

let currentDir = ''
let currentPath = ''

function clearActiveFolder(): void {
  folderListDiv.querySelector('.active')?.classList.remove('active')
}

function onclickHandler(): void {
  // @ts-ignore -> It is passed to Onclick Handler
  const folderName = String(this.innerText)
  const receivedPath = join(currentDir, folderName)

  if (currentPath === receivedPath) return
  currentPath = receivedPath

  clearActiveFolder()

  // @ts-ignore -> It is passed to Onclick Handler
  this.classList.add('active')
  // @ts-ignore -> It is passed to Onclick Handler
  callback(receivedPath, this.classList.contains('hidden') ?? false)
}

currentFolderBtn.addEventListener('click', onclickHandler)
previousFolderBtn.ondblclick = (): void => showFoldersOf(dirname(currentDir))

function showFoldersOf(path: string): void {
  currentFolderBtn.classList.add('active')
  folderListDiv.classList.remove('searching') // if user searched something

  // resetting the values
  folderListDiv.innerHTML = ''
  searchInput.value = ''
  currentDir = path

  const folderList: HTMLParagraphElement[] = []
  const folders = getFolders(path)
  const name = basename(path)
  const isEmpty = name.trim().length == 0

  dirnameElement.title = path
  dirnameElement.innerText = !isEmpty ? name : path.substring(0, 2)

  folderList.push(currentFolderBtn, previousFolderBtn)

  for (const folderPath of folders) {
    const folderName = basename(folderPath.toString())
    const listItem = createElement('p', {
      innerText: folderName,
      onclick: onclickHandler,
      ondblclick: () => showFoldersOf(join(path, folderName))
    })

    if (winattr.getSync(folderPath).hidden) listItem.classList.add('hidden')
    folderList.push(listItem)
  }

  folderListDiv.append(...folderList)
}

let callback: (path: string, isHidden: boolean) => void

function SearchBar(initialPath: string, cb: (path: string, isHidden: boolean) => void): void {
  showFoldersOf(initialPath)
  callback = cb
}

export default SearchBar
