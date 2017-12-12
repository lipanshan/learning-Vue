<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
  </div>
</template>

<script>
  import 'common/sass/index'
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    name: 'app',
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style>
</style>
