<template>
  <transition name="fade">
  <div v-show="flag" class="qrcode">
    <div class="qrcode-content">
      <div class="top">
        <div class="title"></div>
        <div class="qucode-icon"></div>
      </div>
      <div @click="hide" class="close"></div>
    </div>
    <div class="mask"></div>
  </div>
  </transition>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
$color-000: #000000;
$color-fff: #ffffff;
$color-f36: #f36713;
$font-size-small-m: 22px;
$font-size-small: 28px;
$font-size-large: 32px;
  .qrcode {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    transition: all 0.4s;
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      transform: scale(0.1);
      transform-origin: top;
    }
    .qrcode-content {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      -ms-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      .top {
        margin: 0 auto;
        padding-top: 35px;
        padding-bottom: 20px;
        background: $color-fff;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        -ms-border-radius: 6px;
        border-radius: 12px;
        .title {
          margin: 0 auto;
          width: 184px;
          height: 48px;
          background: url(../common/image/qrcode-title.png) no-repeat 0 0;
          background-size: 184px 48px;
        }
        .qucode-icon {
          margin: 29px auto 0;
          width: 207px;
          height: 207px;
          background: url(../common/image/qrcode.png) no-repeat 0 0;
          background-size: 207px 207px;
        }
      }
      .close {
        margin: 27px auto 0;
        width: 34px;
        height: 34px;
        background: url(../common/image/close-icon.png) no-repeat 0 0;
        background-size: 34px 34px;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: $color-000;
      opacity: 0.6;
      filter: alpha(opacify=60);
    }
  }
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      flag: false
    };
  },
  methods: {
    show () {
      this.flag = true;
    },
    hide () {
      this.flag = false;
    }
  }
};
</script>
