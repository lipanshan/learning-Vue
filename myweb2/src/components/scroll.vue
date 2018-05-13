<template>
  <div class="scroll-wrap" ref="scrollWrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
</style>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'
export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: [Number, String],
      default: 1
    },
    list: {
      type: [Array, Object],
      default () {
        return []
      }
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
      if (!this.$refs.scrollWrapper || this.scroll) return false
      this.scroll = new Bscroll(this.$refs.scrollWrapper, {
        click: this.click,
        probeType: this.probeType
      })
      this.scroll.on('scroll', (pos) => {
        this.$emit('onscroll', pos)
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    'list' () {
      if (this.scroll !== null) {
        this.refresh()
      }
    }
  }
}
</script>
