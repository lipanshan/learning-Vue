<template>
  <div class="home">
    <transition name="fade">
      <div v-show="!envelope" @click="nextPage()" class="bg">
        <img src="../common/image/bg-txt.png" alt="">
      </div>
    </transition>
    <transition name="move">
      <div @click="openEnvelope()" v-show="envelope" class="envelope"></div>
    </transition>
    <div class="bottom-title"></div>
  </div>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .home {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: url(../common/image/bg.png) no-repeat 0 0;
    background-size: 100% 100%;

    .bg {
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: flex;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-align-items: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 67px;
      left: 0;
      z-index: 10;
      transition: all 0.4s 0.4s;
      overflow: auto;

      &.fade-enter, &.fade-leave-to {
        transform:  translate3d(0, -50%, 0);
        z-index: -1;
      }
      &>img {
        width: 267px;
        height: 394px;
       }
    }
    .envelope {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 246px;
      z-index: 2;
      background: url(../common/image/envelope.png) no-repeat center 0;
      background-size: 100% 100%;
      transition: all 0.4s;
      &.move-enter,&.move-leave-to {
        height: 0;
      }
    }
    .bottom-title {
      position: absolute;
      bottom: 36px;
      left: 50%;
      transform: translateX(-50%);
      width: 186px;
      height: 31px;
      background: url(../common/image/bottom-title.png) no-repeat 0 0;
      background-size: 186px 31px;

    }
  }
</style>
<script type="text/ecmascript-6">
export default {
  name: 'home',
  data () {
    return {
      envelope: true
    };
  },
  methods: {
    openEnvelope () {
      this.envelope = false;
    },
    nextPage () {
      this.$router.push({
        path: '/home2'
      });
    }
  }
};
</script>
