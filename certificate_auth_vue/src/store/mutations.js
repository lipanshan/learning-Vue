import * as types from './mutations-type'

const mutations = {
  [types.SET_USERNAME] (state, username) {
    state.username = username
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar
  }
}
export default mutations