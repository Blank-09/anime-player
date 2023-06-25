import Mark from 'mark.js'
import { folderListDiv, searchInput } from './htmlElements'

const instance = new Mark(folderListDiv)

export function highlight(): void {
  instance.mark(searchInput.value, { className: 'show' })
  showHilightedFoldersTo(true)
}

export function unhighlight(): void {
  showHilightedFoldersTo(false)
  instance.unmark()
}

function showHilightedFoldersTo(toShow: boolean): void {
  folderListDiv.querySelectorAll("mark[data-markjs='true']").forEach((element) => {
    element.parentElement?.classList[toShow ? 'add' : 'remove']('show')
  })
}
