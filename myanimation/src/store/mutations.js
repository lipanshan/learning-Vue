import * as types from './mutation-type'

const mutations = {
  [types.SET_LIST] (state, list) {
    state.list = list
  },
  [types.ADD_COUNT] (state, count) {
    state.count = count
  },
  [types.REDUCE_COUNT] (state, count) {
    state.count = count
  }
}
export default mutations
