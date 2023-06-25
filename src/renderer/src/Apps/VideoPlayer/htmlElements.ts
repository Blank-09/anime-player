import { createElement } from '../../utils'
import templates from '../../html/templates'

// Section Tag (Parent)
export const videoSection = createElement('section', {
  id: 'video-section position-relative',
  innerHTML: templates.html,
  className: 'video-section position-relative container-fluid g-0'
})! as HTMLElement

// Div Elements
export const playlistDiv = //
  videoSection.querySelector('#playlist')! as HTMLDivElement
