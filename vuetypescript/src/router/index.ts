import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about/',
    name: '',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '',
        alias: 'test-router1',
        component: () => import(/* webpackChunkName: "test1" */ '../views/test1.vue'),
        beforeEnter(to: any, from: any, next: any): void {
          console.log('beforeEnter', to.path, from.path)
          next()
        }
      },
      {
        path: 'test-router2',
        component: () => import(/* webpackChunkName: "test2" */ '../views/test2.vue')
      },
      {
        path: 'test-router3',
        component: () => import(/* webpackChunkName: "test3" */ '../views/test3.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to: any, from: any, next: any): void => {
  console.log('beforeeach', to.path, from.path)
  next()
})
router.afterEach((to: any, from: any): void => {
  console.log('aftereach', to.path, from.path)
})
