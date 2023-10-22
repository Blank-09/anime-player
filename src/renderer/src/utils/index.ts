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
    if (s1 > s2) return 0

    const n1 = parseInt(num1[i])
    const n2 = parseInt(num2[i])

    if (n1 != n2) return n1 - n2
  }

  return 0
}

function numTo2DigitString(value: number): string {
  if (value < 10) return '0' + value
  return value.toString()
}

export function secondsToTimeFormat(val: number): string {
  //
  const sec = numTo2DigitString(Math.floor(val % 60))
  let min = Math.floor(val / 60)

  if (min < 60) return numTo2DigitString(min) + ':' + sec

  const hour = Math.floor(min / 60)
  min = min % 60

  return hour + ':' + min + ':' + sec
}
