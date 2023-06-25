import VideoPlayer from './Apps/VideoPlayer'

export default class Anime {
  //

  public VIDEOPLAYER: VideoPlayer
  // public SETTINGS = new Settings();

  constructor(public element: HTMLDivElement) {
    this.VIDEOPLAYER = new VideoPlayer(element)
  }
}
