import path from 'path'
import fs, { existsSync, mkdirSync } from 'fs'

// import { emptyDir } from 'fs-extra'
import { createSpritesheet } from './screenshot'

const isDev = process.env.NODE_ENV === 'development'

let VTT_FOLDER: string

if (isDev) {
  VTT_FOLDER = path.join('D:\\', '.vtt')
} else {
  VTT_FOLDER = path.join(process.resourcesPath, '.vtt')
}

if (!existsSync(VTT_FOLDER)) {
  mkdirSync(VTT_FOLDER, { recursive: true })
}

function numTo2DigitString(value: number): string {
  if (value < 10) return '0' + value
  return value.toString()
}

export function secondsToTimeFormat(val: number): string {
  const sec = numTo2DigitString(Math.floor(val % 60))
  let min = Math.floor(val / 60)

  if (min < 60) return numTo2DigitString(min) + ':' + sec

  const hour = Math.floor(min / 60)
  min = min % 60

  return hour + ':' + min + ':' + sec
}

export interface VTTOptions {
  // dimensions: { w: number; h: number };
  // step: number;
  duration: number
}

const vttFolderPath = path.join(VTT_FOLDER, 'thumb')
const w = 213,
  h = 120

function determineSteps(duration: number): number {
  // let steps = 1

  // duration

  // if (duration <= 60) steps = 0.5;
  // else if (duration <= 360) steps = 1;
  // else if (duration <= 600) steps = 2;
  // else if (duration <= 900) steps = 3;
  // else if (duration <= 1200) steps = 5;
  // else steps = 6;

  // return steps
  return 1
}

async function createVTTFiles(vPath: string, attr: VTTOptions): Promise<string> {
  const steps = determineSteps(attr.duration)
  const tiles = Math.floor(Math.sqrt(attr.duration)) + 1
  const rand = Math.floor(Math.random() * 10000)

  if (!existsSync(VTT_FOLDER)) mkdirSync(VTT_FOLDER, { recursive: true })
  // else emptyDir(VTT_FOLDER, (err) => console.log(err))

  await createSpritesheet(vPath, {
    output: vttFolderPath + rand + '.jpg',
    fps: steps,
    tiles
  })

  let vttResult = 'WEBVTT'
  let sec = 0

  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      const start = secondsToTimeFormat(sec)
      sec += steps

      if (sec > attr.duration) break
      const end = secondsToTimeFormat(sec)

      const timestamp = `\n\n${start}.000 --> ${end}.000`
      const image = `thumb${rand}.jpg#xywh=${j * w},${i * h},${w},${h}`

      vttResult += timestamp + '\n' + image
    }
  }

  // for (let i = 0, j = 0, k = 0; i <= attr.duration - steps; i += steps, j++) {
  //   if (i != 0 && i % tiles == 0) j = 0, k++;

  //   let start = secondsToTimeFormat(i);
  //   let end = secondsToTimeFormat(i + steps);
  //   let timestamp = `\n\n${start}.000 --> ${end}.000`;
  //   let image = `thumb${rand}.jpg#xywh=${j * w},${k * h},${w},${h}`;

  //   vttResult += timestamp + "\n" + image;
  // }

  const vttFilePath = vttFolderPath + rand + '.vtt'
  fs.writeFileSync(vttFilePath, vttResult, { encoding: 'utf-8' })

  return vttFilePath
}

export default createVTTFiles
export { VTT_FOLDER }
