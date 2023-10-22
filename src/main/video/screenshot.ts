import { path } from '@ffmpeg-installer/ffmpeg'
import { join } from 'path'

import ffmpeg, { ScreenshotsConfig } from 'fluent-ffmpeg'

// Set ffmpeg path
const ffmpegPath = path.replace('app.asar', 'app.asar.unpacked')
ffmpeg.setFfmpegPath(ffmpegPath)

// Take screenshots
function screenshot(path: string, attrs: ScreenshotsConfig): Promise<void> {
  if (!attrs.folder || !attrs.filename) {
    throw new Error('Please provide a necessary parameters for the screenshot')
  }

  return new Promise((resolve, reject) => {
    ffmpeg(path)
      .on('end', resolve)
      .on('error', reject)
      .seekInput('1:00.000')
      .output(join(attrs.folder!, attrs.filename!))
      .outputOptions('-frames', '1', '-vf', 'scale=300:-1')
      .run()
  })
}

interface SpritesheetOptions {
  fps?: number
  tiles: number
  output: string
}

function createSpritesheet(path: string, attrs: SpritesheetOptions): Promise<void> {
  const { fps = 1, tiles } = attrs

  console.log(decodeURIComponent(path), fps, attrs)

  return new Promise((resolve, reject) => {
    ffmpeg(decodeURIComponent(path))
      .on('end', resolve)
      .on('error', reject)
      .output(attrs.output)
      .outputOptions(
        '-frames',
        '1',
        '-q:v',
        '8',
        '-vf',
        `fps=${fps},scale=213:120,tile=${tiles}x${tiles}`
      )
      .run()
  })
}

// createSpritesheet('D:\\Anime\\5-toubun no Hanayome∽\\EP.1.v0.1693672827.360p.mp4', {
//   output: 'D:\\Anime\\thumb1.jpg',
//   fps: 1,
//   tiles: 38
// })

export { screenshot, createSpritesheet }
