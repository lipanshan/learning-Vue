<template>
  <transition name="move">
  <div class="answer-result">
    <div class="bg">
      <div class="title"></div>
      <h1>8:42</h1>
    </div>
    <div class="footer">
      <div class="button-group">
        <div @click="share()" class="button">
          <i class="icon"></i>
          <i class="button-txt"></i>
        </div>
        <div @click="ranking()" class="button">
          <i class="icon"></i>
          <i class="button-txt"></i>
        </div>
      </div>
      <div @click="retry()" class="retry"></div>
    </div>
    <div class="bg3"></div>
    <share-popup ref="sharePopupWrap"></share-popup>
  </div>
  </transition>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .answer-result {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: url(../common/image/result-bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    transition: all 0.4s;
    &.move-enter,&.move-leave-to {
      transform: translateY(100%);
    }
    .bg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 198px;
      overflow: auto;
      background: url(../common/image/result-bg2.png) no-repeat 0 0;
      background-size: 100% 198px;
      .title {
        margin-top: 49px;
        height: 35px;
        background: url(../common/image/scores.png) no-repeat center 0;
        background-size: 78px 35px;
      }
      &>h1 {
        font-size: 33px;
        line-height: 70px;
        color: #ffffff;
        text-align: center;
        font-weight: 800;
      }
    }
    .bg3 {
      position: absolute;
      top: 214px;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: url(../common/image/result-bg3.png) no-repeat center 0;
      background-size: 350px 268px;
    }
    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      .button-group {
        display: flex;
        justify-content: center;
        .button {
          flex: 0 0 141px;
          margin: 0 7px;
          padding-top: 11px;
          padding-bottom: 12px;
          border-radius: 10px;
          background-color: #f36713;
          &:nth-child(1) {
            &>.icon {
               background: url(../common/image/share-icon.png) no-repeat 0 0;
               background-size: 21px 20px;
             }
            .button-txt {
              background: url(../common/image/sharefrend.png) no-repeat 0 0;
              background-size: 69px 24px;
            }
           }
          &:nth-child(2) {
            &>.icon {
               background: url(../common/image/ranking.png) no-repeat 0 0;
               background-size: 21px 20px;
             }
            .button-txt {
              background: url(../common/image/see-ranking.png) no-repeat 0 0;
              background-size: 69px 24px;
            }
          }
          &>.icon {
            margin: auto;
            display: block;
            width: 21px;
            height: 20px;
           }
          .button-txt {
            margin: auto;
            display: block;
            margin-top: 5px;
            width: 69px;
            height: 24px;
          }
        }
      }
      .retry {
        margin: 14px auto 18px;
        width: 141px;
        height: 45px;
        background: url(../common/image/retry.png) no-repeat center center #fcdea8;
        background-size: 55px 24px;
        border-radius: 8px;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
import sharePopup from '@/components/share';
export default {
  name: 'answerResult',
  data () {
    return {};
  },
  methods: {
    retry () {
      this.$router.push({
        path: '/home2'
      });
    },
    share () {
      this.$refs.sharePopupWrap.show();
    },
    ranking () {
      this.$router.push({
        path: '/ranking'
      });
    }
  },
  components: {
    sharePopup
  }
};
</script>
