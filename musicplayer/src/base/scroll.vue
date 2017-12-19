<template>
  <div class="better-scroll" ref="scrollWrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
    <slot name="serialNum"></slot>
    <slot name="fixedTitle"></slot>
    <slot name="loading"></slot>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        scroll: null
      }
    },
    mounted () {
      setTimeout(() => {
        this.$nextTick(() => {
          this._initScroll()
        })
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.scrollWrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.scrollWrapper, {
          probeType: this.probeType,
          click: this.click
        })
        this.onscroll()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollToElement (el) {
        this.scroll && this.scroll.scrollToElement(el)
      },
      onscroll () {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scrollEvent', pos)
        })
      }
    },
    watch: {
      data () {
        this.scroll && this.refresh()
      }
    }
  }
</script>
