import Player from 'video.js/dist/types/player'
import initializeVideoJs from './Player'
import VideoListItem from './VideoListItem'
import App from '../App'

import SearchBar from '../../components/SearchBar'
import { searchBarContainer } from '../../components/SearchBar/htmlElements'
import { playlistDiv, videoSection } from './htmlElements'

import { custom_sort } from '../../utils'
import { createVTTFiles } from '../../utils/screenshot'
import * as utils from '../../utils/fs'

export default class VideoPlayer extends App {
  //
  public player?: Player
  public playlist: VideoListItem[] = []
  public current = 0
  public baseDir = 'D:\\Anime\\'
  public videoElement: HTMLVideoElement

  public constructor(parent: Element) {
    super()
    parent.appendChild(videoSection)
    videoSection.appendChild(searchBarContainer)
    this.activate()
    this.createVideoList(this.baseDir)
    this.videoElement = videoSection.querySelector('video')!
  }

  public async activate(): Promise<void> {
    this.player = await initializeVideoJs()
    console.log(this.player)

    SearchBar(this.baseDir, (path: string, isHidden: boolean) => {
      console.log(path, isHidden)
      this.createVideoList(path)
    })

    playlistDiv.onclick = (e): void => {
      const target = e.target! as HTMLDivElement
      const item = target.closest('.playlist--item')! as HTMLDivElement

      if (!item) return

      this.current = parseInt(item.id)
      this.resetActivePlaylist()
      this.scrollPlaylistTo(this.current)
      this.setVideoSource(item.dataset.path!)
      item.classList.add('active')
    }

    this.videoElement.onloadedmetadata = async (): Promise<void> => {
      const src = this.player!.src()?.split('://')[1]
      const vtt = await this.createVTT(src, this.player!.duration())
      console.log(src, vtt)
      // @ts-ignore -> The plugin is not typed
      this.player.vttThumbnails.src(`priviliged://${vtt}`)

      setTimeout(() => {
        // @ts-ignore -> The plugin is not typed
        this.player.vttThumbnails.vttData = this.player.vttThumbnails.vttData.map((i) => {
          i.css.background = i.css.background.replace(':/', '://D://.vtt//')
          return i
        })
      }, 1000)
    }
  }

  public setVideoSource(path: string): void {
    this.player!.src(`priviliged://${path}`)
  }

  public createVideoList(path: string): void {
    playlistDiv.innerHTML = ''
    const files = utils.getFiles(path, /.(mp4|mkv)$/).sort(custom_sort)

    for (let i = 0; i < files.length; i++) {
      const item = new VideoListItem(files[i].toString(), i)
      playlistDiv.appendChild(item.element)
    }
  }

  public override deactivate(): void {
    throw new Error('Method not implemented.')
  }

  public override show(): void {
    throw new Error('Method not implemented.')
  }

  public override hide(): void {
    throw new Error('Method not implemented.')
  }

  public clickVideoListAt(index: number): void {
    if (0 <= index && index < playlistDiv.children.length) {
      // @ts-ignore -> The Child element definitely have click property
      playlistDiv.children[index].click()
    }
  }

  public next(): void {
    this.clickVideoListAt(++this.current)
  }

  public previous(): void {
    this.clickVideoListAt(--this.current)
  }

  private async createVTT(src?: string, duration?: number): Promise<string> {
    if (src && typeof duration === 'number' && !isNaN(duration))
      return await createVTTFiles(src, { duration })

    // @ts-ignore -> It will be undefined only if the video is not loaded
    return await createVTTFiles(this.player.src(), {
      duration: this.player?.duration() || 1425
    })
  }

  private async setImageRecursively(i = 0): Promise<void> {
    if (this.playlist.length > i) {
      await this.playlist[i].setImage()
      this.setImageRecursively(++i)
    }
  }

  private resetActivePlaylist(): void {
    playlistDiv.querySelector('.active')?.classList.remove('active')
  }

  private scrollPlaylistTo(index: number): void {
    playlistDiv.parentElement!.scroll({
      top: VideoListItem.CONTAINER_WIDTH * index,
      behavior: 'smooth'
    })
  }
}
