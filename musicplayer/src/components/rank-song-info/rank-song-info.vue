<template>
  <transition name="move" class="rank-song-info">
    <music-list :rankIcon="flag" :list="songList" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .move-enter-active, .move-leave-active
    transition: all 0.3s linear
  .move-enter, .move-leave-to
    transform: translate3d(100%, 0, 0)
</style>
<script type="text/ecmascript-6">
  import musicList from 'components/music-list/music-list'
  import {rankInfoList} from 'api/rank'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  const ERROR_NUM = 0
  export default {
    created () {
      this.getRankInfoList(this.singer)
    },
    data () {
      return {
        songList: null,
        flag: true
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title () {
        return this.singer.ListName
      },
      bgImage () {
        return this.singer.pic_v12
      }
    },
    methods: {
      getRankInfoList (selectRank) {
        rankInfoList(selectRank).then((res) => {
          if (res.code === ERROR_NUM) {
            this.songList = this._normalRankSongList(res.songlist)
          }
        })
      },
      _normalRankSongList (list) {
        let arr = []
        list.forEach((val) => {
          arr.push(createSong(val.data))
        })
        return arr
      }
    },
    components: {
      musicList
    }
  }
</script>
