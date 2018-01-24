<template>
  <transition name="move-fade">
    <div v-show="toggleList" @click="hideList" class="play-list">
      <div @click.stop="showList" class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="modeClass" @click.stop="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span @click="confirmClearList" class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContentWrapper" :probeType="3" class="list-content" :data="playList">
          <transition-group name="list" tag="ul">
            <li class="item" v-for="(item, index) in playList" :key="item.id">
              <i class="current" :class="currentPlayIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span @click="changeLike(item)" class="like"><i :class="changeLikeIcon(item)"></i></span>
              <span @click="deleteSong(item)" class="delete"><i class="icon-delete"></i></span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">{{text}}</span>
          </div>
        </div>
        <div @click.stop="hideList" class="list-close"><span>关闭</span></div>
      </div>
      <confirm ref="confirm" class="confirm" @clearHistory="clearPlayList" text="是否清空歌曲列表" confirmSure="清空"></confirm>
    </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../../common/sass/variable'
  @import '../../common/sass/mixin'
  .play-list
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: $color-background-d
    z-index: 300
    &.move-fade-enter-active, &.move-fade-leave-active
      transition: opacity 0.3s
      opacity: 1
      .play-list
        transition: all 0.3s
        transform: translate3d(0, 0, 0)
    &.move-fade-enter, &.move-fade-leave-to
      opacity: 0
      .play-list
        transform: translate3d(0, -100%, 0)
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            @include extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            @include no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            @include extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playMode} from '../../store/config'
  import scroll from 'base/scroll'
  import confirm from 'base/confirm'
  const MODE_NUM = 2
  export default {
    created () {
      this.loadStorageFavorite()
    },
    computed: {
      ...mapGetters([
        'mode',
        'currentIndex',
        'playList',
        'favoriteList'
      ]),
      modeText () {
        if (playMode.sequence === this.mode) {
          return '循环播放'
        }
        if (playMode.loop === this.mode) {
          return '单曲循环'
        }
        if (playMode.random === this.mode) {
          return '随机播放'
        }
      },
      modeClass () {
        if (playMode.sequence === this.mode) {
          return 'icon-sequence'
        }
        if (playMode.loop === this.mode) {
          return 'icon-loop'
        }
        if (playMode.random === this.mode) {
          return 'icon-random'
        }
      }
    },
    data () {
      return {
        toggleList: false,
        text: '添加歌曲到队列',
        boll: false
      }
    },
    methods: {
      hideList () {
        this.toggleList = false
      },
      showList () {
        this.toggleList = true
      },
      changeMode () {
        let num = this.mode + 1
        num = num > MODE_NUM ? 0 : num
        this.SET_MODE(num)
      },
      changeLikeIcon (item) {
        let arr = this.favoriteList.slice()
        for (let i = 0; i < arr.length; i++) {
          if (item.id === arr[i].id) {
            return 'icon-favorite'
          }
        }
        return 'icon-not-favorite'
      },
      changeLike (item) {
        this.storageFavorite(item)
      },
      deleteSong (item) {
        let len = this.playList.length
        if (len <= 1) {
          this.deleteSongList()
          return false
        }
        this.deleteSong(item)
      },
      confirmClearList () {
        this.$refs.confirm.show()
      },
      clearPlayList () {
        this.deleteSongList()
      },
      currentPlayIcon (item) {
        let currentSong = this.playList[this.currentIndex]
        return item.id === currentSong.id ? 'icon-play' : ''
      },
      ...mapMutations([
        'SET_MODE'
      ]),
      ...mapActions([
        'deleteSong',
        'deleteSongList',
        'storageFavorite',
        'loadStorageFavorite'
      ])
    },
    components: {
      scroll,
      confirm
    }
  }
</script>
