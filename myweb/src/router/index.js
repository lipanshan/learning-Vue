import Vue from 'vue';
import Router from 'vue-router';
import main from '@/components/main';
import mobile from '@/components/mobile/mobile';
import about from '@/components/about';
import pc from '@/components/pc/pc';

Vue.use(Router);

export default new Router({
  'mode': 'history',
  routes: [
    {
      path: '/index',
      name: 'main',
      component: main
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/pc',
      name: 'pc',
      component: pc
    },
    {
      path: '*',
      redirect: {name: 'main'}
    }
  ]
});
