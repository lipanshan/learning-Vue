<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <player></player>
  </div>
</template>

<script>
  import 'common/sass/index'
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import player from 'components/player/player'

  export default {
    name: 'app',
    components: {
      MHeader,
      Tab,
      player
    }
  }
</script>

<style>
</style>
