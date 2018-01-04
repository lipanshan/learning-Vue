// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastClick from 'fastclick'
import lazyLoad from 'vue-lazyload'
fastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(lazyLoad, {
  loading: require('common/image/default.png'),
  error: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
