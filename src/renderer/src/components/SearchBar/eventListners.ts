import { unhighlight, highlight } from './highlightSearchText'
import {
  folderListDiv,
  searchBarDiv,
  searchInput,
  searchSettingsBtn,
  searchSettingsCloseBtn,
  searchSettingsDiv,
  showHiddenFoldersCheckBox,
  toggleSearchBtn
} from './htmlElements'

/**
 * Click Events
 */
searchSettingsCloseBtn.onclick = searchSettingsBtn.onclick = (): void => {
  searchSettingsDiv.classList.toggle('show')
}

toggleSearchBtn.onclick = (): void => {
  const isShowing = searchBarDiv.classList.contains('show')
  searchBarDiv.classList[isShowing ? 'remove' : 'add']('show')
  searchSettingsDiv.classList.remove('show')
}

/**
 * Change Events
 */

showHiddenFoldersCheckBox.onchange = (): void => {
  const addRemove = showHiddenFoldersCheckBox.checked ? 'add' : 'remove'
  folderListDiv.classList[addRemove]('showHiddenFolders')
}

/**
 * Keyup Events
 *
 * FIXME: Add troddling to prevent from calling
 * everytime this event is called
 */

searchInput.onkeyup = async function (): Promise<void> {
  // const { unhighlight, highlight } = (await import("./highlightSearchText"));
  /**
   * Initializing search
   *  - When input is not empty
   *  - And adding "searching" classname to the parent element
   */

  const isEmpty: boolean = searchInput.value.trim().length == 0
  folderListDiv.classList[!isEmpty ? 'add' : 'remove']('searching')

  unhighlight()
  if (isEmpty) return // Nothing to Mark
  highlight()
}
