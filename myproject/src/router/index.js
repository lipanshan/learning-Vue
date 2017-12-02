import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import rattings from '@/components/rattings/rattings';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/rattings',
      name: 'rattings',
      component: rattings
    },
    {
      path: '*',
      redirect: 'goods'
    }
  ]
});
