import videojs from 'video.js'
import Anime from './Anime'

window.videojs = videojs

const root = document.getElementById('root')
window.anime = new Anime(root)
