<template>
  <div class="progress-bar" @click="progressClick">
    <div ref="barInner" class="bar-inner">
      <div ref="progressBarNUM" class="progress"></div>
      <div ref="progressBtnWrapper"
           @touchstart="progressTouchStart"
           @touchmove="progressTouchMove"
           @touchend="progressTouchEnd"
           class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
<script type="text/ecmascript-6">
  const BTN_LEFT = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      'percent' (newNum) {
        this.progressChange(newNum)
      }
    },
    data () {
      return {
        touch: {}
      }
    },
    methods: {
      progressChange (newNum) {
        if (newNum > 0) {
          this._setProgressPos(newNum)
        }
      },
      progressTouchStart (e) {
        this.touch.initTouch = true
        this.touch.startX = e.touches[0].pageX
        this.touch.currentX = this.$refs.progressBarNUM.getBoundingClientRect().width
      },
      progressTouchMove (e) {
        if (!this.touch.initTouch) {
          return false
        }
        let moveToX = e.touches[0].pageX - this.touch.startX
        let maxW = this.$refs.barInner.getBoundingClientRect().width
        this.touch.percent = Math.min(1, Math.max(0, (moveToX + this.touch.currentX) / maxW))
        this._setProgressPos(this.touch.percent)
      },
      progressTouchEnd () {
        this.touch.initTouch = false
        this.$emit('triggerProgressChange', this.touch.percent)
      },
      progressClick (e) {
        let maxW = this.$refs.barInner.getBoundingClientRect().width
        let precent = e.offsetX / maxW
        this._setProgressPos(precent)
        this.$emit('triggerProgressChange', precent)
      },
      _setProgressPos (newNum) {
        let maxW = this.$refs.barInner.getBoundingClientRect().width
        let w = Math.round(maxW * newNum)
        let l = Math.round((maxW - BTN_LEFT) * newNum)
        this.$refs.progressBarNUM.style.width = `${w}px`
        this.$refs.progressBtnWrapper.style.transform = `translate3d(${l}px, 0, 0)`
      }
    }
  }
</script>
