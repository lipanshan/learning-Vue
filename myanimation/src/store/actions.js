import * as types from './mutation-type'
export const removeItem = function ({commit, state}, {index}) {
  let arr = JSON.parse(JSON.stringify(state.list))
  arr.splice(index, 1)
  commit(types.SET_LIST, arr)
}
export const addItem = function ({commit, state}, {list}) {
  commit(types.SET_LIST, list)
}
export const shuffleList = function ({commit, state}, {list}) {
  commit(types.SET_LIST, list)
}
export const addCountA = function ({commit, state}, {count}) {
  commit(types.ADD_COUNT, count)
}
export const reduceCountA = function ({commit, state}, {count}) {
  commit(types.REDUCE_COUNT, count)
}
