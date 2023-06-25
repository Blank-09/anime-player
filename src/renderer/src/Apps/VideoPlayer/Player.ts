import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import { VideoJsHotkeysOptions } from 'videojs-hotkeys'

// @ts-ignore -> VideoJS now doesn't export these options
import { VideoJsPlayerOptions } from '@types/video.js'

const hotkeysOptions: VideoJsHotkeysOptions = {
  alwaysCaptureHotkeys: true,
  captureDocumentHotkeys: true
}

const options: VideoJsPlayerOptions = {
  // Common Controls
  controls: true,
  loop: false,

  // Responsiveness
  responsive: true,
  fluid: true,
  aspectRatio: '16:9',

  // Other Controls
  playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4],

  // Plugins
  plugins: { hotkeys: hotkeysOptions }
}

async function initializeVideoJs(): Promise<Player> {
  await import('videojs-hotkeys')
  return videojs('vplayer', options)
}

export default initializeVideoJs
