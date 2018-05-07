import Vue from 'vue';
import Router from 'vue-router';
import main from '@/components/main';
import home from '@/components/home';
import homeTxt from '@/components/home-txt';
import answerResult from '@/components/answerResult';
import rankingList from '@/components/ranking';
import rankingList2 from '@/components/ranking2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'main',
      component: main
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/home2',
      name: 'homeTxt',
      component: homeTxt
    },
    {
      path: '/result',
      name: 'answerResult',
      component: answerResult
    },
    {
      path: '/ranking',
      name: 'rankingList',
      component: rankingList
    },
    {
      path: '/ranking2',
      name: 'rankingList2',
      component: rankingList2
    },
    {
      path: '*',
      redirect: {name: 'main'}
    }
  ]
});
