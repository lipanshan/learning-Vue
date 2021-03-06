import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import rank from 'components/rank/rank'
import singer from 'components/singer/singer'
import search from 'components/search/search'
import singerInfo from 'components/singerinfo/singerinfo'
import rankSongInfo from 'components/rank-song-info/rank-song-info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerInfo
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: rankSongInfo
        }
      ]
    },
    {
      path: '/search',
      component: search
    }
  ]
})
