import {playMode} from '../store/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: 0,
  favoriteList: [],
  searchSongList: [],
  searchWordList: []
}
export default state
