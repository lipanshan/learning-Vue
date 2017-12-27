<template>
  <transition name="move">
    <music-list :list="singerInfoData" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .move-enter-active, .move-leave-active
    transition: all 0.3s linear
  .move-enter, .move-leave-to
    transform: translate3d(100%, 0, 0)
</style>
<script type="text/ecmascript-6">
  import {getSingerInfo} from 'api/singer'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  import musicList from 'components/music-list/music-list'
  const ERROR_OK = 0
  export default {
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      }
    },
    created () {
      this._getSingerInfo()
    },
    data () {
      return {
        singerInfoData: null
      }
    },
    methods: {
      _getSingerInfo () {
        if (!this.singer.id) {
          this.$router.push({
            path: '/singer'
          })
          return
        }
        getSingerInfo(this.singer.id).then((res) => {
          if (res.code === ERROR_OK) {
            this.singerInfoData = this._normalizeSongerInfoData(res.data.list)
          }
        })
      },
      _normalizeSongerInfoData (list) {
        let arr = []
        list.forEach((value, index) => {
          arr.push(createSong(value.musicData))
        })
        return arr
      }
    },
    components: {
      musicList
    }
  }
</script>
