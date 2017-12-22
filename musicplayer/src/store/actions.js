import * as types from '../store/mutation-types'

export const selectPlayer = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING, false)
  commit(types.SET_FULLSCREEM, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_MODE, 1)
  commit(types.SET_CURRENTINDEX, index)
}
