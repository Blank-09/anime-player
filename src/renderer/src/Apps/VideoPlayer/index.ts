import initializeVideoJs from './Player'
import VideoListItem from './VideoListItem'
import App from '../App'

import { playlistDiv, videoSection } from './htmlElements'
import { searchBarContainer } from '../../components/SearchBar/htmlElements'
import { custom_sort } from '../../utils'

import * as utils from '../../utils/fs'
import SearchBar from '../../components/SearchBar'
import Player from 'video.js/dist/types/player'

export default class VideoPlayer extends App {
  //
  public player?: Player
  public playlist: VideoListItem[] = []
  public current = 0

  public constructor(parent: Element) {
    super()
    parent.appendChild(videoSection)
    videoSection.appendChild(searchBarContainer)
    this.activate()
    this.createVideoList()
  }

  public async activate(): Promise<void> {
    this.player = await initializeVideoJs()

    SearchBar('D:\\Anime\\', (path: string, isHidden: boolean) => {
      console.log(path, isHidden)
    })

    playlistDiv.onclick = (e): void => {
      const target = e.target! as HTMLDivElement
      const item = target.closest('.playlist--item')

      if (!item) return

      this.current = parseInt(item.id)
      this.resetActivePlaylist()
      this.scrollPlaylistTo(this.current)
      item.classList.add('active')
    }
  }

  public createVideoList(): void {
    const files = utils.getFiles('D:\\Anime\\Clannad (Dub)', /.(mp4|mkv)$/).sort(custom_sort)

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
