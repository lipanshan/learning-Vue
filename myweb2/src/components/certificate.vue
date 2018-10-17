<template>
  <div class="certificate-wrap">
    <div class="min-avatar-wrap">
      <div class="avatar-box">
        <img src="static/image/avatar.jpg" alt="头像">
      </div>
      <h1 class="name">牧歌</h1>
    </div>
    <div class="resulte-wrap">
      <div class="split-line"></div>
      <p class="txt">恭喜您</p>
      <p class="name">【共建高校团队】</p>
      <p class="txt2">课程学习成绩为<span class="red">95分</span></p>
      <div class="result">合格</div>
    </div>
    <div class="time-wrap">
      <p class="text">学习时间</p>
      <p class="time">2017年10月10日00:00至2017年10月10日00:00</p>
    </div>
    <div class="background">
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.certificate-wrap
  position: relative
  .background
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: url(../common/image/certificate-bg.jpg) no-repeat 0 0
    background-size: 100% 100%
    z-index: -1
  .min-avatar-wrap
    margin-top: 94px
    .avatar-box
      margin: 0 auto
      width: 73px
      height: 73px
      border-radius: 50%
      overflow: hidden
      &>img
        width: 73px
        height: 73px
  .name
    font-size: $font-size-small
    line-height: $font-size-small + 14px
    color: $color-text
    text-align: center
  .resulte-wrap
    margin-top: 13px
    .split-line
      margin: 0 88px
      height: 15px
      overflow: hidden
      background: url(../common/image/split-line.png) no-repeat 0 0
      background-size: 100% 15px
    .txt
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 22px
      color: $color-text
      text-align: center
    .name
      font-size: $font-size-medium-s
      line-height: $font-size-medium-s + 16px
      color: $color-text-d
      text-align: center
    .txt2
      @extend .name
      color: $color-text
      &>.red
        color: $color-text-red
    .result
      margin: 39px auto 0
      width: 194px
      height: 45px
      background: url(../common/image/border.png) no-repeat 0 0px
      background-size: 194px 45px
      font-size: $font-size-medium-m
      line-height: $font-size-medium-m + 27px
      color: $color-text-red
      text-align: center
  .time-wrap
    margin-top: 50px
    .text
      font-size: $font-size-small-m
      line-height: $font-size-small-m + 8px
      color: $color-text-d
      text-align: center
    .time
      @extend .text
      font-size: $font-size-small-s
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>
