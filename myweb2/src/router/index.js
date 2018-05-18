import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import coursePage from '@/components/courses'
import userPage from '@/components/user'
import consultPage from '@/components/consult'
import courseInfo from '@/components/courseinfo'
import consultDeatil from '@/components/consultdeatil'
import regiserInfo from '@/components/registerinfo'
import certificateInfo from '@/components/certificate'
import commentInfo from '@/components/comment'

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
      name: 'course',
      component: coursePage,
      children: [
        {
          path: 'courseinfo',
          name: 'courseInfo',
          component: courseInfo
        }
      ]
    },
    {
      path: '/consult',
      name: 'consultInfo',
      component: consultPage,
      children: [
        {
          path: 'consultDeatil',
          name: 'consultDeatil',
          component: consultDeatil
        }
      ]
    },
    {
      path: '/user',
      name: 'userCenter',
      component: userPage,
      children: [
        {
          path: 'registerinfo',
          component: regiserInfo
        },
        {
          path: 'certificateinfo',
          component: certificateInfo
        },
        {
          path: 'commentinfo',
          component: commentInfo
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
