<template>
    <div class="loading-wrap">
      <img src="src/common/image/loading.gif" alt="">
      <p class="loading-txt">{{text}}</p>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .loading-wrap
    position: relative
    width: 100%
    &>img
      position: absolute
      top: 0
      left: 50%
      display: block
      width: 20px
      height: 20px
      transform: translate(-50%, 0)
    .loading-txt
      position: absolute
      top: 30px
      left: 0
      width: 100%
      font-size: 14px
      line-heihgt: 20px
      color: #ffffff
      text-align: center
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '加载中……'
      }
    }
  }
</script>
