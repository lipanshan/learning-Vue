import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/components/home.vue')), 'chunkname0')
const paperHome = r => require.ensure([], () => r(require('@/components/paper-home.vue')), 'chunkname1')
const paperList = r => require.ensure([], () => r(require('@/components/paper-list.vue')), 'chunkname2')
const forgetPassword = r => require.ensure([], () => r(require('@/components/forget-password.vue')), 'chunkname1')
const longPaper = r => require.ensure([], () => r(require('@/components/long-paper.vue')), 'chunkname3')
const shortPaper = r => require.ensure([], () => r(require('@/components/short-paper.vue')), 'chunkname4')
const admin = r => require.ensure([], () => r(require('@/components/admin.vue')), 'chunkname5')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Home',
      component: Home,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/paperHome',
      name: 'paperHome',
      component: paperHome,
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [
        {
          path: 'paperList',
          name: 'paperList',
          component: paperList
        },
        {
          // path: '/paper/:id/type/:type_id',
          path: 'longPaper/:id',
          // path: '/paper',
          name: 'longPaper',
          component: longPaper
        },
        {
          path: 'shortPaper/:id',
          name: 'shortPaper',
          component: shortPaper
        }
      ]
    },
    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: '',
          name: 'admin'
        }
      ]
    },
    {
      path: '/',
      redirect: '/paperHome/paperList'
    }
  ]
})
