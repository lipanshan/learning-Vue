import Vue from 'vue'
import Router from 'vue-router'
const Login = r => require.ensure([], () => require('@/components/login'), '')
const Layout = r => require.ensure([], () => require('@/components/admin'), '')
const Home = r => require.ensure([], () => require('@/components/home'), '')
const ipRisk = r => require.ensure([], () => require('@/components/Risk/ipRisk'), '')
const password = r => require.ensure([], () => require('@/components/password/password'), '')
const riskWarning = r => require.ensure([], () => require('@/components/Risk/riskWarning'), '')
const upgrade = r => require.ensure([], () => require('@/components/upgrade/upgrade'), '')
const portLog = r => require.ensure([], () => require('@/components/Risk/portLog'), '')
const netWork = r => require.ensure([], () => require('@/components/setnetwork'), '')
const setSystem = r => require.ensure([], () => require('@/components/setsystem'), '')
const setDeployment = r => require.ensure([], () => require('@/components/setdeployment'), '')
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      meta: {
        requiresAuth: false
      },
      component: Login,
      beforeEnter (to, from, next) {
        const flag = window.localStorage.getItem('username')
        if (flag) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      meta: {
        requiresAuth: true
      },
      component: Layout,
      beforeEnter (to, from, next) {
        const flag = window.localStorage.getItem('username')
        if (flag) {
          next()
        } else {
          next({path: '/login'})
        }
      },
      children: [
        {
          path: 'home',
          component: Home,
          meta: {
            requiresAuth: true
          },
          alias: ''
        },
        {
          path: 'riskWarning',
          component:riskWarning,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'portLog',
          component:portLog,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'upgrade',
          component:upgrade,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'ipRisk',
          component:ipRisk,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'password',
          component:password,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'setnetwork',
          meta: {
            requiresAuth: true
          },
          component: netWork
        },
        {
          path: 'setsystem',
          meta: {
            requiresAuth: true
          },
          component: setSystem
        },
        {
          path: 'setdeployment',
          meta: {
            requiresAuth: true
          },
          component: setDeployment
        }
      ]
    },
    {
      path: '/*',
      redirect: '/admin'
    }
  ]
})
export default router
