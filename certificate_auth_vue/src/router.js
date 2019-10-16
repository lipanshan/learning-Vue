import Vue from 'vue'
import Router from 'vue-router'

//import() 采用异步加载组件
const Login  = () => import('@/components/login') 
const backLayout = () => import('@/components/layout')
const layout = () => import('@/certificate-query/layout')
const StudentObtained = () => import('@/components/StudentCertificateObtained')
const StudentUnobtain = () => import('@/components/StudentCertificateUnobtain')
const StudentEditorObtained = () => import('@/components/StudentEditorObtained')
const StudentSeeObtained = () => import('@/components/StudentSeeObtained')
const StudentCreateUnobtain = () => import('@/components/StudentCreateUnobtain')
const StudentEditorUnobtain = () => import('@/components/StudentEditorUnobtain')
const StudentSeeUnobtain = () => import('@/components/StudentSeeUnobtain')
const system = () => import('@/components/Setsystem')
const firmCertificate = () => import('@/components/firm/firmCertificate.vue')
const editfirmCertificate = () => import('@/components/firm/editfirmCertificate.vue')
const viewfirmCertificate = () => import('@/components/firm/viewfirmCertificate.vue')
const certificateType = () => import('@/components/ctype/certificateType.vue')
const addCertificateType = () => import('@/components/ctype/addCertificateType.vue')
const editCertificateType = () => import('@/components/ctype/editCertificateType.vue')
const viewCertificateType = () => import('@/components/ctype/viewCertificateType.vue')
const trainingperiod = () => import('@/components/trainingPeriod/trainingperiod.vue')
const addtrainingperiod  = () => import('@/components/trainingPeriod/addtrainingperiod.vue')
const edittrainingperiod = () => import('@/components/trainingPeriod/edittrainingperiod.vue')
const viewtrainingperiod = () => import('@/components/trainingPeriod/viewtrainingperiod.vue')
const queryHome = () => import('@/certificate-query/Query')
const queryResult = () => import('@/certificate-query/QueryResult')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      meta: {
        requiresAuth: false
      },
      component: Login,
      beforeEnter (to, from, next) { //登录状态不能到登录页面
        const flag = window.localStorage.getItem('AuthenticationUsername')
        if (flag) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      component: backLayout,
      children: [
        {
          path: 'stuobtained',
          alias: '', //解决 /admin是空页面
          name: 'StudentCertificateObtained',
          component: StudentObtained
        },
        {
          path: 'stuobtained/editor',
          name: 'obtainededitor',
          component: StudentEditorObtained
        },
        {
          path: 'stuobtained/see',
          name: 'obtainedsee',
          component: StudentSeeObtained
        },
        {
          path: 'stuunobtain',
          name: 'StudentCertificateUnobtain',
          component: StudentUnobtain
        },
        {
          path: 'stuunobtain/create',
          name: 'unobtaincreate',
          component: StudentCreateUnobtain
        },
        {
          path: 'stuunobtain/editor',
          name: 'unobtaineditor',
          component: StudentEditorUnobtain
        },
        {
          path: 'stuunobtain/see',
          name: 'unobtainsee',
          component: StudentSeeUnobtain
        },
        {
          path: 'system',
          name: 'setsystem',
          component: system
        },
        {
          path: 'firmCertificate',
          name: 'firmCertificate',
          component: firmCertificate
        },
        {
          path: 'firmCertificate/edit',
          name: 'editfirmCertificate',
          component: editfirmCertificate
        },
        {
          path: 'firmCertificate/see',
          name: 'viewfirmCertificate',
          component: viewfirmCertificate
        },
        {
          path: 'certificateType/create',
          name: 'addCertificateType',
          component: addCertificateType
        },
        {
          path: 'certificateType',
          name: 'certificateType',
          component: certificateType
        },
        {
          path: 'certificateType/editor',
          name: 'editCertificateType',
          component: editCertificateType
        },
        {
          path: 'certificateType/see',
          name: 'viewCertificateType',
          component: viewCertificateType
        },
        {
          path: 'trainingperiod',
          name: 'trainingperiod',
          component: trainingperiod
        },
        {
          path: 'trainingperiod/create',
          name: 'addtrainingperiod',
          component: addtrainingperiod
        },
        {
          path: 'trainingperiod/editor',
          name: 'edittrainingperiod',
          component: edittrainingperiod
        },
        {
          path: 'trainingperiod/see',
          name: 'viewtrainingperiod',
          component: viewtrainingperiod
        }
      ],
      beforeEnter (to, from, next) { //未登录不能进入后台页面
        const flag = window.localStorage.getItem('AuthenticationUsername')
        if (!flag) {
          next({path: '/login'})
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          name: 'back',
          component: queryHome
        },
        {
          path: 'queryrResult',
          name: 'QueryrResult',
          component: queryResult
        }
      ]
    },
    {
      path: '/admin*',
      redirect: '/admin/stuobtained'
    },
    {
      path: '/login*',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
