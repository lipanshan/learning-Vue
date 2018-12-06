<template>
    <div class="better-scroll-wrap" >
      <vue-scroll
        :ops="ops"
        @handle-scroll="handleScroll"
        @handle-scroll-complete="handleScrollEnd"
        class="better-scroll-cnt" ref="bScrollWrap">
        <slot></slot>
        <slot name="nothing"></slot>
      </vue-scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import vueScroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
Vue.use(vueScroll)
export default {
  name: 'scroll',
  props: {
    listData: {
      type: [Array, Object],
      required: true,
      default () {
        return []
      }
    },
    click: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'native'
    }
  },
  data () {
    return {
      scroll: null,
      ops: {
        mode: this.mode,
        keepalive: false,
        bar: {
          background: '#ccc',
          keepShow: true
        },
        scrollButton: {
          enable: false
        },
        scrollPanel: {
          easing: 'easeInQuad',
          speed: 200
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    handleScroll (pos) {
      this.$emit('scrollhandle', pos)
    },
    handleScrollEnd (data) {
      this.$emit('scrollendhandle', data)
    },
    scrollRefresh () {
      this.$refs.bScrollWrap.refresh()
    },
    scrollToPos (y) {
      this.$refs.bScrollWrap.scrollIntoView(`#${y}`)
    },
    scrollTo (data) {
      this.$refs.bScrollWrap.scrollTo(data)
    }
  },
  watch: {
    listData (n, o) {
      this.scrollRefresh()
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
.better-scroll-wrap
  height: 100%
  overflow: hidden
</style>
