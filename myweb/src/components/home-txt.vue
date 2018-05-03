<template>
  <transition name="fade">
    <div class="txt">
      <div @click="rulesInfo()" class="rules">
        <i></i>
      </div>
      <div class="content"></div>
      <div @click="start()" class="bottom-button"></div>
      <my-model ref="myModelWrap"></my-model>
    </div>
  </transition>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  html,body {
    height: 100%;
    background: url(../common/image/bg.png) no-repeat 0 0;
    background-size: 100% 100%;
  }
  .txt {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: url(../common/image/bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    transition: all 0.4s;
    &.fade-enter, &.fade-leave-to {
      transform: translate3d(0, 100%, 0);
    }
    .rules {
      position: absolute;
      top: 22px;
      right: 15px;
      width: 104px;
      height: 41px;
      border: 2px solid #000000;
      border-radius: 9px;
      &>i {
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 89px;
        height: 27px;
        background: url(../common/image/rules.png) no-repeat 0 0;
        background-size: 89px 27px;
       }
    }
    &>.content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 320px;
      height: 404px;
      background: url(../common/image/rules-center.png) no-repeat 0 0;
      background-size: 320px 404px;
    }
    .bottom-button {
      position: absolute;
      left: 50%;
      bottom: 14px;
      transform: translateX(-50%);
      width: 78px;
      height: 57px;
      background: url(../common/image/start-game.png) no-repeat 0 0;
      background-size: 78px 57px;
    }
  }
</style>
<script type="text/ecmascript-6">
import myModel from '@/components/rules';
export default {
  name: 'homeTxt',
  data () {
    return {
    };
  },
  methods: {
    rulesInfo () {
      this.$refs.myModelWrap.modelShow();
    },
    start () {
      this.$router.push({
        path: '/result'
      });
    }
  },
  components: {
    myModel
  }
};
</script>
