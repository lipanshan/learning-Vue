<template>
 <div class="player" @touchstart="autoPlay"  v-show="playList.length">
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
       <div class="middle"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd">
         <div class="middle-l" ref="cdWrapper">
           <div class="cd-wrapper" ref="cdImageWrapper">
             <div class="cd" ref="bigImageWrapper">
               <img ref="bigImage" class="image" :class="cdClass" :src="currentSong.image">
             </div>
           </div>
           <div class="playing-lyric-wrapper">
             <div class="playing-lyric" v-html="currentPlayingLyric"></div>
           </div>
         </div>
         <scroll v-if="lyric && lyric.lines.length" class="middle-r" ref="lyricList" :data="lyric.lines">
           <div class="lyric-wrapper">
             <div v-if="lyric && lyric.lines">
               <p ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum ===index}"
                  v-for="(line,index) in lyric.lines">{{line.txt}}</p>
             </div>
           </div>
         </scroll>
       </div>
       <div class="bottom">
         <div class="dot-wrapper">
           <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
           <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
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
             <i @click.stop="toggleFavorite" :class="changeFavoriteIcon" ></i>
           </div>
         </div>
       </div>
     </div>
   </transition>
   <transition name="mini">
     <div v-show="!fullScreen" @click="fullScreenChange" class="mini-player">
      <div class="icon" ref="miniImageWrapper">
        <div ref="miniImageWrap">
          <img :src="currentSong.image" ref="miniImage" :class="cdClass" width="40" height="40" alt="">
        </div>
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
   <audio ref="audioTag" :src="currentSongUrl" @play="playFn" @canplay="ready" @timeupdate="updateTime" @ended="playEnd" @error="audioError"></audio>
   <song-list ref="songList"></song-list>
 </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
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
              .image
                width: 100%
                height: 100%
                border-radius: 50%
                &.play
                  animation: rotateImage 20s linear infinite
                  &.pause
                    animation-play-state: paused

          .playing-lyric-wrapper
            width: 80%
            margin: 15px auto 0
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
        bottom: 25px
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
              padding-right: 5px
              text-align: left
            &.time-r
              padding-right: 5px
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
      height: 40px
      padding: 0 10px 0 20px
      & > div
        width: 40px
        height: 40px
        img
          border-radius: 50%
          &.play
            animation: rotateImage 10s linear infinite
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

    @keyframes rotateImage
      100%
        transform: rotate(360deg)

</style>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {getSongPlayUrl, getSongLyric} from 'api/singer'
  import {prefixStyle} from 'common/js/dom'
  import progressBar from 'base/progress-bar'
  import circleProgress from 'base/circle-progress'
  import {playMode} from '../../store/config'
  import {Base64} from 'js-base64'
  import Lyric from 'lyric-parser'
  import scroll from 'base/scroll'
  import songList from 'components/playlist/playlist'
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
        currentSongLyric: null,
        lyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        currentPlayingLyric: null,
        togglePlagList: false,
        autoPlayFlag: true
      }
    },
    created () {
      this.olPlayList = this.playList
      this.touch = {}
      this.loadStorageFavorite()
      this.loadSearchHistorySong()
    },
    computed: {
      ...mapGetters([
        'playing',
        'fullScreen',
        'playList',
        'currentSong',
        'currentIndex',
        'mode',
        'sequenceList',
        'favoriteList'
      ]),
      cdClass () {
        if (!this.playing && this.$refs.bigImage && this.$refs.bigImageWrapper) {
          let iTransition = window.getComputedStyle(this.$refs.bigImage).transform
          let cTransition = window.getComputedStyle(this.$refs.bigImageWrapper).transform
          this.$refs.bigImageWrapper.style.transform = cTransition === 'none' ? iTransition : iTransition.concat('', cTransition)
        }
        if (!this.playing && this.$refs.miniImageWrap && this.$refs.miniImage) {
          let iTransition = window.getComputedStyle(this.$refs.miniImage).transform
          let cTransition = window.getComputedStyle(this.$refs.miniImageWrap).transform
          this.$refs.miniImageWrap.style.transform = cTransition === 'none' ? iTransition : iTransition.concat('', cTransition)
        }
        return this.playing ? 'play' : 'pause'
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
      },
      changeFavoriteIcon () {
        for (let i = 0; i < this.favoriteList.length; i++) {
          if (this.favoriteList[i].id === this.currentSong.id) {
            return 'icon-favorite'
          }
        }
        return 'icon-not-favorite'
      }
    },
    watch: {
      'currentSong' (n, o) {
        if (!n || !n.url) {
          this.currentSongUrl = ''
          return false
        }
        if (n.id === o.id) { return false }
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
            this._formatLyric()
          }
        })
        if (n.id !== undefined) {
          this.saveSearchHistorySong(n)
        }
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
        this.$refs.songList.showList()
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
        this.songReady = false
        if (this.lyric) {
          this.lyric.stop()
          this.lyric.play()
        }
        let index = this.currentIndex + 1
        if (index >= this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        this.setPlaying(true)
      },
      prev () {
        if (!this.songReady) {
          return false
        }
        this.songReady = false
        if (this.lyric) {
          this.lyric.stop()
          this.lyric.play()
        }
        let index = this.currentIndex - 1
        if (index <= 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        this.setPlaying(true)
      },
      togglePlay () {
        if (!this.songReady) {
          return false
        }
        const audio = this.$refs.audioTag
        let audioFlag = !this.playing
        this.setPlaying(audioFlag)
        audioFlag ? audio.play() : audio.pause()
        if (this.lyric) {
          this.lyric.togglePlay()
        }
      },
      ready () {
        this.songReady = true
        if (this.lyric) {
          this.lyric.play()
        }
      },
      audioError (msg) {
        this.songReady = true
      },
      updateTime (e) {
        let currentTime = e.target.currentTime
        this.currentTime = currentTime
      },
      triggerProgressChange (percent) {
        let currentTime = percent * this.songAllTime
        this.$refs.audioTag.currentTime = currentTime
        this.setPlaying(true)
        if (this.lyric) {
          this.lyric.stop()
          this.lyric.seek(currentTime * 1000)
        }
      },
      changeMode () {
        let index = this.mode + 1
        index = index % MODE_NUM
        this.changePlayMode(index)
        if (this.lyric) {
          this.lyric.togglePlay()
          this.lyric.togglePlay()
        }
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
        if (this.lyric) {
          this.lyric.stop()
          this.lyric.play()
        }
      },
      touchStart (e) {
        this.touch.initTouch = true
        let touches = e.touches[0]
        this.touch.startX = touches.pageX
        this.touch.startY = touches.pageY
      },
      touchMove (e) {
        if (!this.touch.initTouch || !this.currentSongLyric) {
          return
        }
        let touches = e.touches[0]
        this.touch.detalX = touches.pageX - this.touch.startX
        this.touch.detalY = touches.pageY - this.touch.startY
        if (Math.abs(this.touch.detalX) < Math.abs(this.touch.detalY)) {
          return
        }
        let moveX = null
        if (this.currentShow === 'cd') {
          moveX = Math.min(0, Math.max(-window.innerWidth, this.touch.detalX))
        } else {
          moveX = Math.min(0, Math.max(-window.innerWidth, this.touch.detalX - window.innerWidth))
        }
        this.touch.percent = Math.max(0, Math.min(1, Math.abs(moveX / window.innerWidth)))
        this.$refs.lyricList.$el.style[transition] = 'all 0s'
        this.$refs.cdWrapper.style.opacity = 1 - this.touch.percent
        this.$refs.lyricList.$el.style[transform] = `translate3d(${moveX}px, 0, 0)`
      },
      touchEnd () {
        if (!this.touch.initTouch || !this.currentSongLyric) {
          return
        }
        this.$refs.lyricList.$el.style[transition] = 'all 0.4s'
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.4) {
            this.$refs.lyricList.$el.style[transform] = `translate3d(${-window.innerWidth}px, 0, 0)`
            this.$refs.cdWrapper.style.opacity = 0
            this.currentShow = 'lyric'
          } else {
            this.$refs.lyricList.$el.style[transform] = 'translate3d(0, 0, 0)'
            this.$refs.cdWrapper.style.opacity = 1
          }
        } else {
          if (this.touch.percent < 0.6 && this.touch.percent > 0) {
            this.$refs.lyricList.$el.style[transform] = 'translate3d(0, 0, 0)'
            this.$refs.cdWrapper.style.opacity = 1
            this.currentShow = 'cd'
          } else {
            this.$refs.lyricList.$el.style[transform] = `translate3d(${-window.innerWidth}px, 0, 0)`
            this.$refs.cdWrapper.style.opacity = 0
          }
        }
        this.touch.initTouch = false
        this.touch.percent = 0
      },
      toggleFavorite () {
        this.storageFavorite(this.currentSong)
      },
      autoPlay () {
        if (!this.autoPlayFlag) {
          return false
        }
        this.$refs.audioTag.play()
        this.autoPlayFlag = false
      },
      playFn () {
        this.songReady = true
      },
      _formatSongTime (t) {
        let m = '00' + Math.floor(t / 60)
        let mLen = '' + Math.floor(t / 60)
        let min = m.substring(mLen.length, mLen.length + 2)
        let s = '00' + Math.floor(t % 60)
        let sLen = '' + Math.floor(t % 60)
        let sec = s.substring(sLen.length, sLen.length + 2)
        return min + ':' + sec
      },
      _formatLyric () {
        if (this.lyric) {
          this.lyric.stop()
          this.lyric = null
        }
        let decodeLyric = Base64.decode(this.currentSongLyric)
        this.lyric = new Lyric(decodeLyric, this.handler)
        if (this.songReady) {
          this.lyric.play()
        }
      },
      handler ({lineNum, txt}) {
        this.currentLineNum = lineNum
        this.currentPlayingLyric = txt
        if (lineNum > 5) {
          this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[lineNum - 5], 1000)
        } else {
          this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[0], 1000)
        }
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
        setPlayList: 'SET_PLAYLIST'
      }),
      ...mapActions([
        'loadStorageFavorite',
        'storageFavorite',
        'loadSearchHistorySong',
        'saveSearchHistorySong',
        'changePlayMode'
      ])
    },
    components: {
      progressBar,
      circleProgress,
      scroll,
      songList
    }
  }
</script>
