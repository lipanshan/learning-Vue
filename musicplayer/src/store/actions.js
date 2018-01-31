import * as types from '../store/mutation-types'
import {randowArray, findIndex} from '../common/js/randomarray'
import {playMode} from '../store/config'
import {saveFavorite, deleteFavorite, loadFavorite, saveSearchHistory, deleteSearchHistory, loadWorld, saveHistorySong, loadHistorySong, deleteAllSearchHistory, deleteHistorySong} from 'common/js/cache'

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
export const deleteSong = function ({commit, state}, song) {
  let newPlayList = state.playList.slice()
  let ind = findIndex(newPlayList, song)
  let currentIndex = state.currentIndex
  if (ind < state.currentIndex) {
    currentIndex = state.currentIndex - 1
  } else {
    currentIndex = state.currentIndex
  }
  newPlayList.splice(ind, 1)
  commit(types.SET_PLAYLIST, newPlayList)
  commit(types.SET_SEQUENCELIST, newPlayList)
  commit(types.SET_CURRENTINDEX, currentIndex)
}
export const deleteSongList = function ({commit, state}) {
  commit(types.SET_PLAYING, false)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCELIST, [])
  commit(types.SET_CURRENTINDEX, 0)
}
export const storageFavorite = function ({commit, state}, song) {
  let list = loadFavorite()
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === song.id) {
      commit(types.SET_FAVORITELIST, deleteFavorite(song))
      return false
    }
  }
  commit(types.SET_FAVORITELIST, saveFavorite(song))
}
export const loadStorageFavorite = function ({commit, state}) {
  commit(types.SET_FAVORITELIST, loadFavorite())
}
export const deleteSearchHistoryWord = function ({commit, state}, item) {
  commit(types.SET_SEARCHWORDLIST, deleteSearchHistory(item))
}
export const saveSearchHistoryWord = function ({commit, state}, item) {
  commit(types.SET_SEARCHWORDLIST, saveSearchHistory(item))
}
export const loadSearchHistoryWord = function ({commit, state}) {
  commit(types.SET_SEARCHWORDLIST, loadWorld())
}
export const saveSearchHistorySong = function ({commit, state}, song) {
  commit(types.SET_SEARCHSONGLIST, saveHistorySong(song))
}
export const deleteSearchHistorySong = function ({commit, state}, song) {
  commit(types.SET_SEARCHSONGLIST, deleteHistorySong(song))
}
export const loadSearchHistorySong = function ({commit, state}) {
  commit(types.SET_SEARCHSONGLIST, loadHistorySong())
}
export const deleteSearchHistoryList = function ({commit, state}) {
  commit(types.SET_SEARCHWORDLIST, deleteAllSearchHistory())
}
export const addSongToPlayList = function ({commit, state}, song) {
  let newPlayList = state.playList.slice()
  let curIndex = state.currentIndex
  let flag = newPlayList.some((s, i) => {
    return s.id === song.id
  })
  if (!flag) {
    let curSong = newPlayList.splice(curIndex, 1, song)
    newPlayList.splice(curIndex, 0, curSong[0])
  }
  commit(types.SET_PLAYLIST, newPlayList)
  commit(types.SET_SEQUENCELIST, newPlayList)
  commit(types.SET_PLAYING, state.playing)
}
