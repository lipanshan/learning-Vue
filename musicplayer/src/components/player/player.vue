<template>
 <div class="player" v-show="playList.length">
   <transition name="normal"
               @enter="enter"
               @after-enter="afterEnter"
               @leave="leave"
               @after-leave="afterLeave">
     <div class="normal-player" v-show="fullScreen">
       <div class="background">
         <img width="100%" height="100%" :src="currentSong.image" >
       </div>
       <div class="top">
         <div class="back" @click="back">
           <i class="icon-back"></i>
         </div>
         <h1 class="title" v-html="currentSong.name"></h1>
         <h2 class="subtitle" v-html="currentSong.singer"></h2>
       </div>
       <div class="middle">
         <div class="middle-l">
           <div class="cd-wrapper" ref="cdImageWrapper">
             <div class="cd" :class="cdClass" >
               <img class="image" :src="currentSong.image">
             </div>
           </div>
           <div class="playing-lyric-wrapper">
             <div class="playing-lyric">歌词</div>
           </div>
         </div>
       </div>
       <div class="bottom">
         <div class="dot-wrapper">
           <span class="dot" ></span>
           <span class="dot"></span>
         </div>
         <div class="progress-wrapper">
           <span class="time time-l">{{_formatSongTime(currentTime)}}</span>
           <div class="progress-bar-wrapper">
              <progress-bar @triggerProgressChange="triggerProgressChange" :percent="percent"></progress-bar>
           </div>
           <span class="time time-r">{{_formatSongTime(songAllTime)}}</span>
         </div>
         <div class="operators">
           <div class="icon i-left">
             <i @click.stop="changeMode" :class="playModes"></i>
           </div>
           <div @click.stop="prev" class="icon i-left" >
             <i class="icon-prev"></i>
           </div>
           <div class="icon i-center" @click.stop="togglePlay">
             <i  :class="playIcon"></i>
           </div>
           <div @click.stop="next" class="icon i-right" >
             <i  class="icon-next"></i>
           </div>
           <div class="icon i-right">
             <i class="icon-not-favorite" ></i>
           </div>
         </div>
       </div>
     </div>
   </transition>
   <transition name="mini">
     <div v-show="!fullScreen" @click="fullScreenChange" class="mini-player">
      <div class="icon" ref="miniImageWrapper">
        <img :src="currentSong.image" :class="cdClass" width="40" height="40" alt="">
      </div>
       <div class="text">
         <h2 class="name" v-html="currentSong.name"></h2>
         <p class="desc" v-html="currentSong.singer"></p>
       </div>
       <div class="control" @click.stop="togglePlay">
         <circle-progress :percent="percent"><i :class="miniPlayIcon" ></i></circle-progress>
       </div>
       <div class="control" @click.stop="showPlayList">
         <i class="icon-playlist"></i>
       </div>
     </div>
   </transition>
   <audio ref="audioTag" :src="currentSongUrl" @canplay="ready" @timeupdate="updateTime" @ended="playEnd" @error="audioError">
     <source :src="currentSongUrl" type="audio/ogg">
     <source :src="currentSongUrl" type="audio/mpeg">
   </audio>
 </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import '../../common/sass/variable'
  @import '../../common/sass/mixin'

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position: absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          @include no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite forwards
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
              .middle-r
                display: inline-block
                vertical-align: top
                width: 100%
                height: 100%
                overflow: hidden
              .lyric-wrapper
                width: 80%
                margin: 0 auto
                overflow: hidden
                text-align: center
              .text
                line-height: 32px
                color: $color-text-l
                font-size: $font-size-medium
                &.current
                  color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
          font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite forwards
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        @include no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        @include no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {getSongPlayUrl, getSongLyric} from 'api/singer'
  import {prefixStyle} from 'common/js/dom'
  import progressBar from 'base/progress-bar'
  import circleProgress from 'base/circle-progress'
  import {playMode} from '../../store/config'
  import {randowArray, findIndex} from 'common/js/randomarray'
  const animation = prefixStyle('animation')
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  const MODE_NUM = 3
  const ERROR_NO = 0

  export default {
    data () {
      return {
        currentSongUrl: null,
        songReady: false,
        currentTime: 0,
        currentSongLyric: null
      }
    },
    created () {
      this.olPlayList = this.playList
    },
    computed: {
      ...mapGetters([
        'playing',
        'fullScreen',
        'playList',
        'currentSong',
        'currentIndex',
        'mode',
        'sequenceList'
      ]),
      cdClass () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniPlayIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      songAllTime () {
        return this.currentSong.duration
      },
      percent () {
        let p = this.currentTime / this.songAllTime
        return p
      },
      playModes () {
        if (this.mode === playMode.sequence) {
          return 'icon-sequence'
        }
        if (this.mode === playMode.loop) {
          return 'icon-loop'
        }
        if (this.mode === playMode.random) {
          return 'icon-random'
        }
      }
    },
    watch: {
      'currentSong' (n, o) {
        if (!n || !n.url || n.id === o.id) { return false }
        getSongPlayUrl(n.mid, n.url).then((res) => {
          if (res.code === ERROR_NO) {
            this.currentSongUrl = `http://dl.stream.qqmusic.qq.com/${res.data.items[0].filename}?vkey=${res.data.items[0].vkey}&guid=541193902&uin=0&fromtag=66`
            this.$nextTick(() => {
              this.$refs.audioTag.play()
            })
          }
        })
        getSongLyric(this.currentSong.mid).then((res) => {
          if (res.code === ERROR_NO) {
            this.currentSongLyric = res.lyric
          }
        })
      },
      playing (newPlaying) {
        if (!this.songReady) {
          return
        }
        this.$nextTick(() => {
          const audio = this.$refs.audioTag
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      fullScreenChange () {
        this.setFullScreen(true)
      },
      showPlayList () {
        console.log('显示播放列表')
      },
      enter (el, done) {
        const {x, y, scale} = this._initMovePos()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.2)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdImageWrapper, 'move', done)
      },
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdImageWrapper.style[animation] = ''
      },
      leave (el, done) {
        const {x, y, scale} = this._initMovePos()
        this.$refs.cdImageWrapper.style[transition] = 'all 0.4s linear'
        this.$refs.cdImageWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdImageWrapper.addEventListener('transitionend', done)
      },
      afterLeave () {
        this.$refs.cdImageWrapper.style[transition] = ''
        this.$refs.cdImageWrapper.style[transform] = ''
      },
      next () {
        if (!this.songReady) {
          return false
        }
        let index = this.currentIndex + 1
        if (index >= this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        this.$nextTick(() => {
          this.setPlaying(true)
        })
        this.songReady = false
      },
      prev () {
        if (!this.songReady) {
          return false
        }
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        this.$nextTick(() => {
          this.setPlaying(true)
        })
        this.songReady = false
      },
      togglePlay () {
        this.setPlaying(!this.playing)
      },
      ready () {
        this.songReady = true
      },
      audioError (msg) {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
        this._formatLyric()
      },
      triggerProgressChange (percent) {
        this.$refs.audioTag.currentTime = percent * this.songAllTime
        this.setPlaying(true)
      },
      changeMode () {
        let index = this.mode + 1
        index = index % MODE_NUM
        this.setPlayMode(index)
        let list = null
        if (this.mode === playMode.random) {
          list = randowArray(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.setCurrentIndex(findIndex(list, this.currentSong))
        this.setPlayList(list)
      },
      playEnd () {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop () {
        this.$refs.audioTag.currentTime = 0
        this.$refs.audioTag.play()
      },
      _formatSongTime (t) {
        let m = Math.floor(t / 60)
        let s = Math.floor(t % 60)
        return m + ':' + s
      },
      _formatLyric () {
        console.log(this.currentSongLyric)
      },
      _initMovePos () {
        const width = 40
        const offsetLeft = 20
        const bottom = 10
        const cdWidth = window.innerWidth * 0.8
        const cdTop = 80
        return {
          x: -(window.innerWidth / 2 - (width / 2 + offsetLeft)),
          y: window.innerHeight - cdTop - cdWidth / 2 - width / 2 - bottom,
          scale: width / cdWidth
        }
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEM',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setPlayMode: 'SET_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    components: {
      progressBar,
      circleProgress
    }
  }
</script>
