import { createElement, replaceVariables } from '../../utils'
import templates from '../../html/templates'

const { basename, extname } = require('path')

export default class VideoListItem {
  public static CONTAINER_WIDTH = 108

  public name: string
  public element: HTMLDivElement

  public constructor(public path: string, id: number) {
    const name = basename(path)
    const ext = extname(path)

    this.name = name.substring(0, name.length - ext.length)

    // WARNING: Vunerable code (template strings)
    this.element = createElement('div', {
      id: id.toString(),
      className: 'playlist--item loading',
      innerHTML: replaceVariables(templates.template, {
        $name: name,
        $extension: ext.slice(1),
        $duration: '24:03',
        $dimension: '640x360'
      })
    })
  }
}
