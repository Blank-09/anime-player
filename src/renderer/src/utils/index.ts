import { PathLike } from 'fs'
import { HTMLElementsOptionsMap } from './types/HTMLElementsOptionsMap'

const path = require('path')

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: HTMLElementsOptionsMap<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] {
  return setAttributeOf(document.createElement(tagName), options)
}

/**
 * FIXME: Replacing any with other types
 */

export function setAttributeOf<T>(element: T, attrs?: object): T {
  for (const attr in attrs) {
    const objVal = element[attr],
      attrVal = attrs[attr]

    if (typeof objVal === 'function') objVal(...attrVal)
    else if (typeof attrVal === 'object') setAttributeOf(objVal, attrVal)
    else element[attr] = attrVal
  }

  return element
}

export function replaceVariables(str: string, obj: object): string {
  for (const attr in obj) {
    const val: string = obj[attr]
    str = str.replace(attr, val)
  }
  return str
}

/**
 * TODO: Make the below function optimized
 */

export function custom_sort(a: string | PathLike, b: string | PathLike): number {
  const c: string = path.basename(a.toString())
  const d: string = path.basename(b.toString())

  const str1 = c.match(/\D*/g) ?? ['']
  const str2 = d.match(/\D*/g) ?? ['']
  const num1 = c.match(/\d+/g) ?? ['']
  const num2 = d.match(/\d+/g) ?? ['']

  const index = Math.min(str1.length, str2.length, num1.length, num2.length)

  for (let i = 0; i < index; i++) {
    const s1 = str1[i].toUpperCase()
    const s2 = str2[i].toUpperCase()

    if (s1 < s2) return -1

    if (s1 == s2) {
      const n1 = parseInt(num1[i])
      const n2 = parseInt(num2[i])

      if (n1 != n2) return n1 - n2
      else continue
    }

    return 0
  }

  return 0
}
