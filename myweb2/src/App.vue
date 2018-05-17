<template>
  <div id="app" class="app">
    <div class="container">
      <router-view/>
    </div>
    <footer class="footer">
      <v-menu @select="selectFn"></v-menu>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import vMenu from '@/components/mainmenu'
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
    selectFn (index) {
      this.$router.push({
        path: `/${index}`
      })
    }
  },
  components: {
    vMenu
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import './common/sass/mixin.sass'
body
  background-color: $color-theme-bg
.app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  .container
    position: absolute
    top: 0
    right: 0
    bottom: 55px
    left: 0
    z-index: 10
    transition: all 0.4s
    overflow: hidden
  .footer
    position: absolute
    right: 0
    bottom: 0
    left: 0
    width: 100%
    background-color: $color-theme
</style>
