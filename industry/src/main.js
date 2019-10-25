// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import atui from 'at-ui'
import 'at-ui-style'
import $ from 'jquery'
import 'reset-css'
import store from './store'
import '@/assets/js/resetdate'
import '../static/css/main.css'
import VueI18n from 'vue-i18n'
import zhLocale from 'at-ui/dist/locale/zh-CN'
import {DatePicker} from 'element-ui'
import 'babel-polyfill'
import axios from 'axios'
Vue.use(VueI18n)
Vue.use(atui)
Vue.use(DatePicker)
const i18n = new VueI18n({
	locale:'zh',
	fallbackLocale:'zh',
	messages:{
		"zh":{ ...zhLocale }
	}
})
atui.i18n ((key,value) => i18n.t(key,value))
axios.interceptors.response.use((response) => {
  if (response.data.ret === 499) {
    window.localStorage.setItem('username', '')
  }
  return response
}, err => {
  console.log(err)
  return Promise.reject(err)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
