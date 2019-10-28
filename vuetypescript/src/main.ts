import Vue from 'vue'
import Component from 'vue-class-component'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/element-ui/index'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
