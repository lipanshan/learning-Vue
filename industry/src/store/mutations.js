import * as types from './mutation-types'

const mutations = {
  [types.SET_USERNAME] (state, name) {
    state.username = name
    localStorage.setItem('username', name)
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar
  },
  [types.SET_MASK] (state, flag) {
    state.mask = flag
  },
  [types.SET_LEFTMENU] (state, arr) {
    state.leftMenu = arr
  },
  [types.SET_AUTHORIZE_INFO] (state, obj) {
    state.authorizeInfo = obj
  }
}
export default mutations
