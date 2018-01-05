<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text" v-text="title">
    </p>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import "../common/sass/variable"
  @import "../common/sass/mixin"

  .no-result
    text-align: center
    .no-result-icon
      width: 86px
      height: 90px
      margin: 0 auto
      @include bg-image('no-result')
      background-size: 86px 90px
    .no-result-text
      margin-top: 30px
      font-size: $font-size-medium
      color: $color-text-d
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '抱歉，什么都没有'
      }
    }
  }
</script>
