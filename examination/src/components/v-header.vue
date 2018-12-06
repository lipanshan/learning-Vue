<template>
<div class="v-header">
  <div class="left">
    <router-link  to="/paperHome/paperList" class="logo-wrap"><img src="../assets/images/logo.png" class="logo" alt=""></router-link>
    <h1>瑞星安全教育考试评测系统</h1>
  </div>
  <div class="right">
    <div class="avatar-wrap"><img src="../assets/images/avatar.png" alt=""><span class="user">peixun@rising.com.cn</span></div>
    <span class="exit-btn">安全退出</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'myHeader'
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.v-header
  height: 46px
  background-color: $bg-color-n
  &>.left
    float: left
    .logo-wrap
      margin-top: 14px
      padding-left: 24px
      padding-right: 21px
      float: left
      border-right: 1px solid $border-color-n
      height: 18px
      &>img
        display: block
        width: 110px
        height: 16px
    &>h1
      margin-top: 14px
      margin-left: 20px
      float: left
      font-size: 16px
      line-height: 18px
      color: $font-color-n
  &>.right
    padding-right: 14px
    float: right
    .avatar-wrap
      margin-top: 10px
      padding-right: 10px
      float: left
      &>img
        margin-right: 10px
        float: left
        width: 32px
        height: 32px
        border-radius: 50%
      &>span
        margin-top: 6px
        margin-bottom: 6px
        padding-right: 10px
        float: left
        font-size: 12px
        line-height: 18px
        border-right: 1px solid $color-lg
        color: $font-color-user
        cursor: pointer
    .exit-btn
      margin-top: 16px
      float: right
      font-size: 12px
      line-height: 18px
      color: $color-lg
</style>
