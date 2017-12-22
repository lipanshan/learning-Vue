import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEM] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCELIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_CURRENTINDEX] (state, num) {
    state.currentIndex = num
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  }
}
export default mutations
