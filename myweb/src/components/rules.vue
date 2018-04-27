<template>
  <transition name="modelShow">
    <div v-show="modelFlag" class="rules-wrap">
      <div class="content">
        <div class="rules-info">
          <div class="rule-title">
            <div class="line"></div>
            <h1></h1>
            <div class="line"></div>
          </div>
          <div class="rule-content">
            <div class="section1">
              <p>听音乐&nbsp;猜食材产地</p>
              <p><strong>每天</strong>用时最短的前三名</p>
              <p>新典餐厅</p>
              <p>10道菜双人晚餐</p>
              <p>凯宾买单</p>
            </div>
            <div class="section2">
              <p>排行榜每日0:00归零</p>
              <p>活动时间：2018年x年x月&nbsp;-&nbsp;2018年x年x月0点</p>
              <p class="italic">请发送截图至 <strong>“北京燕莎中心饭店”</strong>微信公众号领奖</p>
            </div>
            <div class="section1">
              <p>Listen to the music</p>
              <p>Guess where the food comes from</p>
              <p>The fastest will have</p>
              <p>10-course dinner for TWO at Signature's</p>
              <p>ON THE HOUSE!</p>
            </div>
            <div class="section2">
              <p>Ranking will be updated daily</p>
              <p>From x/x/2018 to x/x/2018</p>
              <p class="italic">Contact Wechat account: <strong>Kempinski_Beijing</strong>to</p>
              <p>collect the prize</p>
            </div>
          </div>
        </div>
        <div @click="modelHide()" class="close"></div>
      </div>
      <div class="mask"></div>
    </div>
  </transition>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  @import '../common/scss/variable.scss';
  .rules-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    transition: all 0.4s;
    overflow: auto;
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: $color-000;
      opacity: 0.6;
      filter: alpha(opacify=60);
    }
    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      -ms-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      .rules-info {
        padding-bottom: 20px;
        width: 320px;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        -ms-border-radius: 12px;
        border-radius: 12px;
        background-color: $color-f36;
        .rule-title {
          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flex;
          display: flex;
          padding: 19px 42px 0;
          -webkit-justify-content: center;
          -moz-justify-content: center;
          -ms-justify-content: center;
          justify-content: center;
          -webkit-align-items: center;
          -moz-align-items: center;
          -ms-align-items: center;
          align-items: center;
          .line {
            flex: 1;
            height: 2px;
            background: $color-fff;
          }
          &>h1 {
             width: 121px;
             height: 49px;
             -webkit-border-radius: 98px;
             -moz-border-radius: 98px;
             -ms-border-radius: 98px;
             border-radius: 98px;
             border: 2px solid $color-fff;
             background: url(../common/image/rules-title.png) no-repeat center center;
             background-size: 59px 28px;
           }
        }
        .rule-content {
          color: $color-fff;
          .section1 {
            padding-top: 16px;
            font-size: $font-size-small;
            line-height: 20px;
            text-align: center;
            &>p>strong {
               font-size: $font-size-large
             }
          }
          .section2 {
            margin-top: 18px;
            padding-left: 25px;
            padding-right: 25px;
            font-size: $font-size-small-m;
            line-height: 20px;
            .italic {
              font-style: italic;
            }
          }
        }
      }
      .close {
        margin: 27px auto 0;
        width: 34px;
        height: 34px;
        background: url(../common/image/close-icon.png) no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
  }
  .modelShow-enter,.modelShow-leave-to {
    opacity: 0;
    transform: scaleZ(0.1);
  }
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      modelFlag: false
    };
  },
  methods: {
    modelShow () {
      this.modelFlag = true;
    },
    modelHide () {
      this.modelFlag = false;
    }
  }
};
</script>
