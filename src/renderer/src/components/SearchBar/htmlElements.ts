import { createElement } from '../../utils'
import templates from '../../html/templates'

export const searchBarContainer = createElement('div', {
  className: 'position-fixed bottom-0 left-0',
  innerHTML: templates.searchBar,
  style: {
    zIndex: '5',
    height: 'calc(100% - 28px)'
  }
})! as HTMLDivElement

export const searchBarDiv = //
  searchBarContainer.querySelector('#search')! as HTMLDivElement

export const searchSettingsDiv = //
  searchBarContainer.querySelector('#searchSettings')! as HTMLDivElement

export const folderListDiv = //
  searchBarDiv.querySelector('#searchBar--folders')! as HTMLDivElement

// Button Elements
export const searchSettingsCloseBtn = //
  searchSettingsDiv.querySelector('#searchSettingsCloseBtn')! as HTMLButtonElement

export const searchSettingsBtn = //
  searchBarDiv.querySelector('#searchSettingsBtn')! as HTMLButtonElement

export const toggleSearchBtn = //
  document.getElementById('toggle-search-bar-btn')! as HTMLButtonElement

export const changeDirBtn = //
  searchBarDiv.querySelector('#change-directory-btn')! as HTMLButtonElement

// Input Elements
export const showHiddenFoldersCheckBox = //
  searchSettingsDiv.querySelector('#showHiddenFolders')! as HTMLInputElement

export const searchInput = //
  searchBarDiv.querySelector('#searchBar')! as HTMLInputElement

// Paragraph Elements
export const dirnameElement = //
  searchBarDiv.querySelector('#searchBarCurrentDirName')! as HTMLParagraphElement

export const currentFolderBtn = createElement('p', {
  innerText: '.',
  title: 'Current Folder',
  className: 'current-folder active'
})

export const previousFolderBtn = createElement('p', {
  innerText: '..',
  title: 'Previous Folder',
  className: 'previous-folder'
})
