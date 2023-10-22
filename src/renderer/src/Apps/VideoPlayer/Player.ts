import videojs from 'video.js'
import vttThumbnails from 'videojs-vtt-thumbnails'
import Player from 'video.js/dist/types/player'
import { VideoJsHotkeysOptions } from 'videojs-hotkeys'

// @ts-ignore -> VideoJS now doesn't export these options
import type { VideoJsPlayerOptions } from '@types/video.js'

console.log(vttThumbnails)

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
  plugins: {
    hotkeys: hotkeysOptions,
    vttThumbnails: {
      showTimestamp: true
    }
    // vttThumbnails: {
    //   src: 'http://127.0.0.1:7777/thumb.vtt',
    //   showTimestamp: false
    // }
  }
}

videojs.registerPlugin('vttThumbnails', vttThumbnails)

async function initializeVideoJs(): Promise<Player> {
  await import('videojs-hotkeys')
  return videojs('vplayer', options)
}

export default initializeVideoJs
