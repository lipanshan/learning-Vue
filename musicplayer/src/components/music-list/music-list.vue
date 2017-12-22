<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div ref="bgImageTag" class="bg-image" :style="backgroundImage">
      <div class="filter"></div>
    </div>
    <loading v-show="!list || !list.length" class="loading" slot="loading"></loading>
    <div ref="bgLayer" class="bg-layer"></div>
    <scroll v-if="list" :list="list" :class="{'overflowHidden': switchClass}" class="list" :probeType="probeType"  @scrollEvent="listenScroll" :style="calculateListTop" ref="scrollList">
      <song-list :list="list"></song-list>
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
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
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
  const TOP_LEN = 40
  export default {
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
      }
    },
    data () {
      return {
        probeType: 3,
        scrollYMax: 0,
        scrollY: 0,
        switchClass: true
      }
    },
    computed: {
      backgroundImage () {
        return `background-image: url(${this.bgImage})`
      },
      calculateListTop () {
        this.scrollYMax = this.$refs.bgImageTag ? (this.$refs.bgImageTag.clientHeight - TOP_LEN) : 0
        return this.$refs.bgImageTag && `top: ${this.$refs.bgImageTag.clientHeight}px`
      }
    },
    watch: {
      'scrollY' (pos) {
        let y = Math.max(pos, -this.scrollYMax)
        this.$refs.bgLayer.style.transform = `translate3d(0, ${y}px, 0)`
        this.$refs.bgLayer.style.WebkitTransform = `translate3d(0, ${y}px, 0)`
        this.switchClass = pos > 0
        if (pos < -this.scrollYMax) {
          this.$refs.bgImageTag.style.zIndex = 10
          this.$refs.bgImageTag.style.paddingTop = `${TOP_LEN}px`
        } else {
          if (pos > 0) {
            let percent = 1 + pos / (pos + this.scrollYMax)
            this.$refs.bgImageTag.style.transform = `scaleY(${percent})`
            this.$refs.bgImageTag.style.zIndex = 10
          } else {
            this.$refs.bgImageTag.style.paddingTop = '70%'
            this.$refs.bgImageTag.style.transform = 'scaleY(1)'
            this.$refs.bgImageTag.style.zIndex = 0
          }
        }
      }
    },
    methods: {
      back () {
        this.$router.push({
          path: '/singer'
        })
      },
      listenScroll (pos) {
        this.scrollY = pos.y
      }
    },
    components: {
      songList,
      scroll,
      loading
    }
  }
</script>
