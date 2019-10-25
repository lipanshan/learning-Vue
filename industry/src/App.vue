<template>
  <div id="app">
    <router-view/>
    <div class="mask" v-show="mask"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'mask'
    ])
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: auto
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
}
</style>
