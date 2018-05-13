import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import coursePage from '@/components/courses'
import userPage from '@/components/user'
import consultPage from '@/components/consult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/course',
      name: 'courseInfo',
      component: coursePage
    },
    {
      path: '/consult',
      name: 'consultInfo',
      component: consultPage
    },
    {
      path: '/user',
      name: 'userCenter',
      component: userPage
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
