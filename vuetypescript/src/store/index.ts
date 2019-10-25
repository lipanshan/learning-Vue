import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type key = string | symbol | number

export default new Vuex.Store({
  state: {
    a: 111,
    b: 222,
    c: 333,
    d: {
      e: [1, 2, 3],
      f: {
        g: 'abc',
        j: 'dddd'
      }
    }
  },
  getters: {
    a(state) {
      return state.a
    },
    b(state) {
      return state.b
    },
    d(state) {
      return state.d
    },
    'de'(state) {
      return state.d.e
    }
  },
  mutations: {
    addM(state, value) {
      state.a += value
    }
  },
  actions: {
    addA({ commit, dispatch, state }, value) {
      setTimeout((): void => {
        commit('addM', value)
      }, 1000)
    },
    addAA({ dispatch, state }, value) {
      setTimeout((): void => {
        dispatch('addA', value)
      }, 1500)
    }
  },
  modules: {
  }
})
