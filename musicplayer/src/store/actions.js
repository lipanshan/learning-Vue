import * as types from '../store/mutation-types'
import {randowArray, findIndex} from '../common/js/randomarray'
import {playMode} from '../store/config'

export const selectPlayer = function ({commit, state}, {list, index}) {
  commit(types.SET_CURRENTINDEX, findIndex(list, list[index]))
  if (state.mode === playMode.random) {
    commit(types.SET_PLAYLIST, randowArray(list))
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEM, true)
  commit(types.SET_MODE, 0)
}
export const randomPlayer = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCELIST, list)
  list = randowArray(list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, findIndex(list, list[index]))
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEM, true)
  commit(types.SET_MODE, 2)
}
