<template>
  <transition name="fade">
  <div v-show="flag" class="share-wrap">
    <div @click="hide()" class="share-img"></div>
    <div class="mask"></div>
  </div>
  </transition>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .share-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    transition: all 0.4s;
    &.fade-enter,&.fade-leave-to {
      opacity: 0.1;
      transform: scale(0.1);
    }
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background-color: #000000;
      opacity: 0.8;
    }
    .share-img {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 242px;
      background: url(../common/image/share.png) no-repeat right 0;
      background-size: 375px 242px;
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
