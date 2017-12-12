<template>
    <div class="m-header">
      <div class="icon"></div>
      <h1 class="text">Music Player</h1>
      <router-link tag="div" class="mine" to="/user">
        <i class="icon-mine"></i>
      </router-link>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0

    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      margin-right: 9px
      width: 30px
      height: 32px
      @include bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      font-size: $font-size-large
      line-height: 44px
    .mine
      position: absolute
      right: 0
      top: 0

      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    }
  }
</script>
