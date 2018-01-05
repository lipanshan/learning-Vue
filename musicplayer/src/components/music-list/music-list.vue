<template>
  <div class="music-list" ref="musicListWrapper">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div ref="bgImageTag" class="bg-image" :style="backgroundImage">
      <div ref="fliterTag" class="filter"></div>
      <div v-show="playBtn && list && list.length" class="play-wrapper">
        <div class="play" @click="randomPlay">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <loading v-show="!list || !list.length" class="loading" slot="loading"></loading>
    <div ref="bgLayer" class="bg-layer"></div>
    <scroll v-if="list" :list="list" :class="{'overflowHidden': switchClass}" class="list" :probeType="probeType"  @scrollEvent="listenScroll" :style="calculateListTop" ref="scrollList">
      <song-list :rankIconShow="rankIcon" :list="list" @select="selectItem"></song-list>
    </scroll>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import '../../common/sass/variable'
  @import '../../common/sass/mixin'

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position: absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      width: 80%
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
      z-index: 50
      @include no-wrap
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .filter
        display: none
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(255, 255, 255, 0.4)
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 40px
      bottom: 0
      width: 100%
      background: $color-background
      &.overflowHidden
        overflow: hidden
      .song-list-wrapper
        padding: 20px 30px
        .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
</style>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll'
  import songList from 'base/song-list'
  import loading from 'base/loading'
  import {prefixStyle} from 'common/js/dom'
  import {mapGetters, mapActions} from 'vuex'
  import {mixinPlayer} from 'common/js/mixin'

  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  const TOP_LEN = 40
  const IMG_HEIGHT = 70
  const BLUR_MAX_VAL = 250
  export default {
    mixins: [mixinPlayer],
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      rankIcon: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        probeType: 3,
        scrollYMax: 0,
        scrollY: 0,
        switchClass: true,
        playBtn: true
      }
    },
    computed: {
      backgroundImage () {
        return `background-image: url(${this.bgImage})`
      },
      calculateListTop () {
        this.scrollYMax = this.$refs.bgImageTag ? (this.$refs.bgImageTag.clientHeight - TOP_LEN) : 0
        return this.$refs.bgImageTag && `top: ${this.$refs.bgImageTag.clientHeight}px`
      },
      ...mapGetters([
        'currentIndex',
        'playList'
      ])
    },
    watch: {
      'scrollY' (pos) {
        let y = Math.max(pos, -this.scrollYMax)
        this.$refs.bgLayer.style[transform] = `translate3d(0, ${y}px, 0)`
        this.switchClass = pos > 0
        if (pos < -this.scrollYMax) {
          this.$refs.bgImageTag.style.zIndex = 10
          this.$refs.bgImageTag.style.paddingTop = `${TOP_LEN}px`
          this.playBtn = false
        } else {
          this.playBtn = true
          if (pos > 3) {
            let percent = 1 + pos / (pos + this.scrollYMax)
            this.$refs.bgImageTag.style[transform] = `scaleY(${percent})`
            this.$refs.bgImageTag.style.zIndex = 10
            this.$refs.fliterTag.style.display = 'block'
            this.$refs.fliterTag.style[backdrop] = `blur(${Math.max(BLUR_MAX_VAL, pos)}px)`
          } else {
            this.$refs.bgImageTag.style.paddingTop = `${IMG_HEIGHT}%`
            this.$refs.bgImageTag.style.transform = 'scaleY(1)'
            this.$refs.bgImageTag.style.zIndex = 0
            this.$refs.fliterTag.style[backdrop] = 'blur(0)'
            this.$refs.fliterTag.style.display = 'none'
          }
        }
      },
      'list' (n, o) {
        this.$nextTick(() => {
          this.handlePlayingList(this.playList)
        })
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      listenScroll (pos) {
        this.scrollY = pos.y
      },
      selectItem (item, index) {
        this.selectPlayer({
          list: this.list,
          index
        })
      },
      randomPlay () {
        this.randomPlayer({
          'list': this.list,
          'index': this.currentIndex
        })
      },
      handlePlayingList (playList) {
        if (this.$refs.scrollList) {
          let bottom = playList.length ? '60px' : ''
          this.$refs.scrollList.$el.style.bottom = bottom
          this.$refs.scrollList.refresh()
        }
      },
      ...mapActions([
        'selectPlayer',
        'randomPlayer'
      ])
    },
    components: {
      songList,
      scroll,
      loading
    }
  }
</script>
