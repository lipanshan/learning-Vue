import * as types from './mutations-type'

export const setUsername = function ({commit}, username) {
  commit(types.SET_USERNAME, username)
}
export const setAvatar = function ({commit}, avatar) {
  commit(types.SET_AVATAR, avatar)
 
}