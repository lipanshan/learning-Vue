import {playMode} from '../store/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.loop,
  currentIndex: -1
}
export default state
