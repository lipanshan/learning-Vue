<template>
  <transition name="drop">
    <div v-show="showFlag" class="add-tip" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import "../common/sass/variable"

  .add-tip
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      transform: translate3d(0, -100%, 0)
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        showFlag: false,
        tipTimer: null
      }
    },
    methods: {
      show () {
        this.showFlag = true
        clearTimeout(this.tipTimer)
        this.tipTimer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>
