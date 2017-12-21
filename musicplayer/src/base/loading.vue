<template>
    <div class="loading-wrap">
      <div class="img-wrap">
      <img src="src/common/image/loading.gif" alt="">
      </div>
      <p class="loading-txt">{{text}}</p>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .loading-wrap
    position: relative
    width: 100%
    .img-wrap
      font-size: 0
      text-align: center
      &>img
        display: inline-block
        margin-top: 20px
        vertical-algin: top
        width: 20px
        height: 20px
    .loading-txt
      margin-top: 20px
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
