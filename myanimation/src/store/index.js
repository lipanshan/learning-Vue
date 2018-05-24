import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NOOD_ENV !== 'production'
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
