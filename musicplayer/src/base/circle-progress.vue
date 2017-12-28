<template>
  <div class="circle-pregress">
    <div class="left">
      <div class="circle-left" ref="circleLeft"></div>
    </div>
    <div class="right">
      <div class="circle-right" ref="clrcleRight"></div>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .circle-pregress
    position: relative
    width: 30px
    height: 30px
    .left
      position: absolute
      top: 0
      left: 0
      overflow: hidden
      width: 50%
      height: 100%
      .circle-left
        width: 26px
        height: 26px
        border: 2px solid transparent
        border-right-color: #ffcd32
        border-bottom-color: #ffcd32
        transform: rotate(-45deg)
        border-radius: 50%
    .right
      position: absolute
      top: 0
      right: 0
      overflow: hidden
      width: 50%
      height: 100%
      .circle-right
        width: 26px
        height: 26px
        border: 2px solid transparent
        border-radius: 50%
        border-left-color: #ffcd32
        border-bottom-color: #ffcd32
        transform: translate3d(-50%, 0, 0) rotate(45deg)
</style>
<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
  const CENTER_NUM = 0.5
  const RIGHT_INIT = 45
  const LEFT_INIT = -45
  export default {
    props: {
      percent: {
        type: Number,
        default: 100
      },
      size: {
        type: Number,
        default: 30
      }
    },
    watch: {
      percent (newPercent) {
        if (newPercent > CENTER_NUM) {
          this._leftMove(newPercent)
          this._rightMove(CENTER_NUM)
        } else {
          this._rightMove(newPercent)
          this._leftMove(CENTER_NUM)
        }
      }
    },
    methods: {
      _leftMove (p) {
        this.$nextTick(() => {
          this.$refs.circleLeft.style[transform] = `rotate(${LEFT_INIT + (p - CENTER_NUM) * 360}deg)`
        })
      },
      _rightMove (p) {
        this.$nextTick(() => {
          this.$refs.clrcleRight.style[transform] = `translate3d(-50%, 0, 0) rotate(${RIGHT_INIT + p * 360}deg)`
        })
      }
    }
  }
</script>
