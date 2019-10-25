import * as types from './mutation-types'

export const setUsername = function ({commit, state}, name) {
  commit(types.SET_USERNAME, name)
  localStorage.setItem('username', name)
}
export const setAvatar = function ({commit, state}, avatar) {
  commit(types.SET_AVATAR, avatar)
}
export const setMask = function ({commit, state}, flag) {
  commit(types.SET_MASK, flag)
}
export const setLeftMenu = function ({commit, state}, arr) {
  commit(types.SET_LEFTMENU, arr)
}
export const setAuthorizeInfo = function ({commit, state}, obj) {
  commit(types.SET_AUTHORIZE_INFO, obj)
}
