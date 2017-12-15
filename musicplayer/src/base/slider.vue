<template>
  <div class="slider" ref="sliderWrapper">
    <div class="slider-list" ref="sliderListWrapper">
      <slot></slot>
    </div>
    <div class="dots">
      <div class="dot" v-show="dotList.length" v-for="(item, index) in dotList" :class="{active: item === nowIndex}"></div>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .slider
    .slider-list
      position: relative
      overflow: hidden
      white-space: nowrap
      font-size: 0
      .slider-item
        display: inline-block
        vertical-align: top
        text-align: center
        overflow: hidden
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
          img
            display: block
            width: 100%
    .dots
      position: absolute
      left: 50%
      bottom: 10px
      transform: translateX(-50%)
      .dot
        display: inline-block
        vertical-align: middle
        margin-right: 5px
        margin-left: 5px
        width: 10px
        height: 10px
        border-radius: 10px
        background-color: #ffffff
        font-size: 0
        &.active
          width: 20px


</style>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    props: {
      autoPlay: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        scroll: null,
        dotList: [],
        nowIndex: 1,
        timer: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this._initDots()
        this._initSlider()
        this._initSliderList()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        this._initSliderList()
        if (this.autoPlay) {
          clearInterval(this.timer)
          this._play()
        }
        this.scroll.refresh()
      }, false)
    },
    methods: {
      _initDots () {
        let len = this.$refs.sliderListWrapper.children.length
        for (let i = 0; i < len; i++) {
          let ind = this.loop ? i + 1 : i
          this.dotList.push(ind)
        }
      },
      _initSliderList () {
        let listWidth = 0
        let list = this.$refs.sliderListWrapper.children
        let imgWidth = this.$refs.sliderWrapper.clientWidth
        for (let child of list) {
          addClass(child, 'slider-item')
          child.style.width = imgWidth + 'px'
          listWidth += imgWidth
        }
        if (this.loop) {
          listWidth += 2 * imgWidth
        }
        this.$refs.sliderListWrapper.style.width = listWidth + 'px'
      },
      _initSlider () {
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.sliderWrapper, {
            scrollX: true,
            scrollY: false,
            snap: {
              loop: this.loop,
              threshold: 0.3,
              speed: 200
            },
            snapLoop: this.loop,
            snapSpeed: 400,
            momentum: false,
            snapThreshold: 0.2,
            click: true
          })
          this.scroll.on('scrollStart', () => {
            clearInterval(this.timer)
          })
          this.scroll.on('scrollEnd', (ev) => {
            let num = this.scroll.currentPage.pageX
            this.nowIndex = num
            if (this.loop) {
              clearInterval(this.timer)
              this._play()
            }
          })
        })
      },
      _play () {
        this.timer = setInterval(() => {
          let now = this.scroll.currentPage.pageX
          let next = now + 1
          this.scroll.goToPage(next, 0, 400)
        }, this.interval)
      }
    },
    destory () {
      clearInterval(this.timer)
    }
  }
</script>
