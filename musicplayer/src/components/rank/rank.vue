<template>
  <div class="rank">
    <scroll class="toplist" :probeType="3" ref="topList" :data="topList">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item in topList">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic_v12"/>
          </div>
          <min-song-list :minList="item.songlist"></min-song-list>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      position: absolute
      width: 100%
      top: 0
      bottom: 0
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            @include no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 44px
</style>
<script type="text/ecmascript-6">
  import {rankGroupList} from 'api/rank'
  import scroll from 'base/scroll'
  import minSongList from 'base/min-song-list'
  import loading from 'base/loading'
  import {mixinPlayer} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  const ERROR_NUM = 0
  export default {
    mixins: [mixinPlayer],
    data () {
      return {
        topList: [],
        selectTopItem: null
      }
    },
    created () {
      this.getRankGroupList()
    },
    methods: {
      handlePlayingList (playList) {
        if (this.$refs.topList) {
          let bottom = playList.length ? '60px' : ''
          this.$refs.topList.$el.style.bottom = bottom
          this.$refs.topList.refresh()
        }
      },
      getRankGroupList () {
        rankGroupList().then((res) => {
          if (res.code === ERROR_NUM) {
            this.topList = res.data
          }
        })
      },
      selectItem (item) {
        this.selectTopItem = item
        this.setSinger(item)
        this.$router.push({
          path: `/rank/id=${item.topID}`
        })
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      scroll,
      minSongList,
      loading
    }
  }
</script>
