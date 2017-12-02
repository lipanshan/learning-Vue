<template>
  <div class="header-wrap">
    <div class="header">
      <div class="header-top">
        <div class="img-wrap">
          <a href="javascript:;" class="img-box">
            <img v-bind:src="seller.avatar" alt="图片">
          </a>
        </div>
        <div class="title-wrap">
          <h1>
            <img src="./brand@2x.png" alt="" class="icon">
            <span class="h1-text">{{seller.name}}</span>
          </h1>
          <h2>
            {{seller.description}}/ <span class="num">{{seller.deliveryTime}}</span>分钟到达
          </h2>
          <p  v-if="seller.supports">
            <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
            <span>{{seller.supports[0].description}}</span></p>
        </div>
        <div class="more" v-if="seller.supports" v-on:click="showShadow($event)">
          {{seller.supports.length}}个 <span class="icon-more icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="header-bottom" v-on:click="showShadow($event);">
        <img src="./bulletin@2x.png" alt="" class="icon">
        <span class="desc-wrap">{{seller.bulletin}}</span>
      </div>
    </div>
    <div class="header-bg"></div>
    <transition name="fade">
      <div class="box-wrap" v-show="shadowBox">
        <div class="content-wrap">
          <div class="content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap-48">
              <star v-bind:size="48" v-bind:score="seller.score"></star>
            </div>
            <div class="line-title-wrap">
              <div class="line"></div>
              <p class="title">优惠信息</p>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="list-info">
              <li v-for="(item, index) in seller.supports" class="list-item">
                <span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
                <p class="txt">{{item.description}}</p>
              </li>
            </ul>
            <div class="line-title-wrap">
              <div class="line"></div>
              <p class="title">商家公告</p>
              <div class="line"></div>
            </div>
            <p class="description">{{seller.bulletin}}</p>
          </div>
        </div>
        <div v-on:click="hideShadow" class="footer icon-close"></div>
    </div>
    </transition>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../common/minix.scss";
  .header-wrap {
    position: relative;
    .header {
      background-color: rgba(7, 17, 27, 0.5);
      header {
        height: 100px;
      }
      .header-top {
        display: flex;
        position: relative;
        .img-wrap {
          display:flex;
          margin-left: 24px;
          margin-top: 24px;
          margin-right: 16px;
          width: 64px;
          height: 64px;
          border-radius: 4px;
          img {
            width: 64px;
            height: 64px;
           }
        }
        .title-wrap {
          margin-top: 26px;
          text-align: left;
          h1 {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            color: rgb(255,255,255);
            vertical-align: middle;
            .icon {
              display: inline-block;
              width: 30px;
              height: 18px;
              vertical-align: middle;
            }
          }
          h2 {
            font-size: 12px;
            line-height: 12px;
            color: rgb(255,255,255);
            margin-top: 8px;
            font-weight: 200;
            vertical-align: middle;
          }
          p {
            margin-top: 10px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(255,255,255);
            vertical-align: middle;
            .icon {
              display: inline-block;
              width: 12px;
              height: 12px;
              vertical-align: middle;

              &.decrease {
                  background-repeat: no-repeat;
                  background-size: 12px 12px;
                  @include bg-image('./decrease_1@2x.png');
               }
              &.discount {
                 background-repeat: no-repeat;
                 background-size: 12px 12px;
                 @include bg-image('./discount_1@2x.png');
               }
              &.special {
                 background-repeat: no-repeat;
                 background-size: 12px 12px;
                  @include bg-image('./special_1@2x.png');
               }
              &.invoice {
                 background-repeat: no-repeat;
                 background-size: 12px 12px;
                @include bg-image('./invoice_1@2x.png');
               }
              &.guarantee {
                 background-repeat: no-repeat;
                 background-size: 12px 12px;
                  @include bg-image('./guarantee_1@2x.png');
               }
            }
            span {
              display: inline-block;
              font-size: 10px;
              line-height: 12px;
              vertical-align: middle;
              margin-left: 4px;
            }
          }
        }
        .more {
          position: absolute;
          right: 12px;
          top: 67px;
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
          color: rgb(255,255,255);
          padding: 6px 8px;
          border-radius: 24px;
          background-color: rgba(0,0,0,0.2);
          vertical-align: middle;
          .icon-more {
            vertical-align: middle;
          }
        }
      }
    }
    .header-bottom {
      display: flex;
      margin-top: 18px;
      height: 28px;
      background-color: rgba(7,17,27,0.2);
      align-items: center;
      padding-right: 22px;
      position: relative;
      &:after {
         font-family: 'customFonts' !important;
          content:"\E905";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
         display: block;
         width: 10px;
         margin-right: 12px;
         color: #ffffff;
         font-size: 10px;
         line-height: 28px;
       }
      img {
        display: flex;
        width: 22px;
        height: 12px;
        margin-left: 12px;
        margin-right: 4px;
      }
      .desc-wrap {
        margin-right: 4px;
        font-size: 10px;
        line-height: 28px;
        color: rgb(255,255,255);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .header-bg {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background: url(header-bg.png) no-repeat rgba(7, 17, 27, 0.2);
      background-size: 100% 100%;
      filter: blur(12px);
    }
    .box-wrap {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 500;
      background-color: rgba(7,17,27,0.8);
       overflow: auto;
      .content-wrap {
        min-height: 100%;
        .content {
          padding-bottom: 164px;
          padding-top: 164px;
          .name {
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
            text-align: center;
            color: rgb(255,255,255);
          }
          .star-wrap-48 {
            margin-top: 16px;
            height: 24px;
            text-align: center;
          }
          .line-title-wrap {
            margin-top: 28px;
            padding-left: 36px;
            padding-right: 36px;
            display: flex;
            aling-items: center;
            .line {
              display: flex;
              flex: 1;
            }
            .title {
              font-size: 14px;
              line-height: 14px;
              font-weight: 700;
              color: rgb(255,255,255);
              padding-left: 12px;
              padding-right: 12px;
            }
          }
          .list-info {
            margin-top: 24px;
            padding-left: 43px;
            padding-right: 43px;
            text-align: left;
            .list-item {
              margin-top: 6px;
              font-size: 0;
              white-space: nowrap;
              .icon {
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 16px;
                margin-right: 6px;

                &.decrease {
                   background-repeat: no-repeat;
                   background-size: 12px 12px;
                 @include bg-image('./decrease_1@2x.png');
                 }
                &.discount {
                   background-repeat: no-repeat;
                   background-size: 12px 12px;
                 @include bg-image('./discount_1@2x.png');
                 }
                &.special {
                   background-repeat: no-repeat;
                   background-size: 12px 12px;
                 @include bg-image('./special_1@2x.png');
                 }
                &.invoice {
                   background-repeat: no-repeat;
                   background-size: 12px 12px;
                 @include bg-image('./invoice_1@2x.png');
                 }
                &.guarantee {
                   background-repeat: no-repeat;
                   background-size: 12px 12px;
                 @include bg-image('./guarantee_1@2x.png');
                 }
              }
              .txt {
                display: inline-block;
                vertical-align: middle;
                font-size: 12px;
                line-height: 12px;
                color: rgb(255,255,255);
                font-weight: 200;
              }
            }
          }
          .description {
            margin-top: 24px;
            padding-left: 48px;
            padding-right: 48px;
            font-size: 12px;
            line-height: 24px;
            color: rgb(255,255,255);
            font-weight: 200;
            text-align: left;
          }
        }
      }
      .footer {
        font-size: 32px;
        line-height: 32px;
        color: rgba(255,255,255,0.5);
        margin-top: -64px;
        text-align: center;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
  }
</style>
<script type="text/ecmascript-6">
  import star from '../star/star';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        shadowBox: false
      };
    },
    created () {
      this.classMap = [
        'decrease', 'discount', 'special', 'invoice', 'guarantee'
      ];
    },
    components: {
      star
    },
    methods: {
      showShadow (ev) {
        this.shadowBox = true;
      },
      hideShadow (ev) {
        this.shadowBox = false;
      }
    }
  };
</script>
