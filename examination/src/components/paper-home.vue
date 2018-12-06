<template>
  <div class="paper-wrapper">
    <header>
      <myHeader></myHeader>
    </header>
    <div class="container">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import myHeader from '@/components/v-header'
import paperList from '@/components/paper-list'
export default {
  name: 'paperHome',
  components: {
    myHeader,
    paperList
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.paper-wrapper
  display: flex
  flex-direction: column
  height: 100%
  overflow-y: hidden
  &>header
    height: 46px
    flex: 0 0 46px
  .container
    flex: 1
    padding-top: 16px
    padding-bottom: 16px
    background: linear-gradient(-90deg, $color-gradient-1 0, $color-gradient-1 100%)
    overflow: hidden
</style>
