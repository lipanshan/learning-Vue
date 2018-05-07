<template>
  <div class="ranking-wrap">
     <header>
       <h1></h1>
       <div @click="showQrcode" class="button-wrap">
         <div class="button"></div>
       </div>
     </header>
    <div class="content">
      <div class="head">
        <div class="title"></div>
        <div class="title"></div>
        <div class="title"></div>
      </div>
      <div class="list-wrap" ref="listWrap">
        <transition-group name="flip-list" class="list" tag="ul" ref="contentWrap">
          <li v-for="(item, index) in list" class="item" :class="{'red': item.title.substring(2) <= 3}" :key="item.title">
            <v-touch class="cnt" :class="{'cnt-move': item.delete}" tag="div" @swipeleft="onSwipeLeft(item)" @swiperight="onSwipeRight(item)" >
              <p class="num">{{item.title.substring(2)}}</p>
              <div class="avatar-wrap">
                <img :src="item.src" alt="图片">
                <h2>{{item.title}}</h2>
              </div>
              <p class="time">{{item.time}}</p>
            </v-touch>
            <div  class="delete" @click="deleteFn(index)">删除</div>
          </li>
        </transition-group>
        <div ref="messageWrap" class="message-wrap">刷新成功</div>
        <div ref="messageIcon" class="message-icon"><i class="icon icon-rotate"></i></div>
        <div ref="messageWrap2" class="message-wrap message2">没有更多啦</div>
        <div ref="messageIcon2" class="message-icon message2"><i class="icon icon-rotate"></i></div>
      </div>
    </div>
    <qrcode ref="qrcodeWrap"></qrcode>
  </div>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .ranking-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: url(../common/image/bg1.png) no-repeat center 0 #ee6d1a;
    background-size: 100% 100%;
    &>header {
      margin-top: 28px;
      padding-left: 19px;
      padding-right: 19px;
      display: flex;
      justify-content: space-between;
      &>h1 {
        flex: 0 0 136px;
        width: 136px;
        height: 66px;
        background: url(../common/image/ranking-txt.png) no-repeat 0 0;
        background-size: 136px 66px;
       }
      .button-wrap {
        margin-top: 16px;
        width: 116px;
        height: 51px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        background: url(../common/image/button-txt.png) no-repeat center center;
        background-size: 92px 24px;
      }
     }
    .content {
      position: absolute;
      top: 127px;
      right: 20px;
      bottom: 10px;
      left: 18px;
      background-color: #ffffff;
      border-radius: 6px;
      .head {
        display: flex;
        justify-content: space-between;
        padding: 15px 15px 18px 15px;
        .title:nth-child(1) {
          flex: 0 0 39px;
          width: 39px;
          height: 28px;
          background: url(../common/image/ranking-list-txt1.png) no-repeat 0 0;
          background-size: 39px 28px;
        }
        .title:nth-child(2) {
          flex: 0 0 67px;
          width: 67px;
          height: 28px;
          background: url(../common/image/ranking-list-txt2.png) no-repeat 0 0;
          background-size: 67px 28px;
        }
        .title:nth-child(3) {
          flex: 0 0 59px;
          width: 59px;
          height: 28px;
          background: url(../common/image/ranking-list-txt3.png) no-repeat 0 0;
          background-size: 59px 28px;
        }
      }
      .list-wrap {
        position: absolute;
        top: 62px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        .message-wrap {
          position: absolute;
          top: -1px;
          right: 0;
          left: 0;
          height: 40px;
          z-index: 30;
          text-align: center;
          line-height: 40px;
          transform: translateY(-100%);
          transition: all 0.4s;
          background: #ffffff;
          &.message2 {
            top: auto;
            bottom: 0;
            transform: translateY(100%);
           }
        }
        .message-icon {
          position: absolute;
          top: -1px;
          right: 0;
          left: 0;
          height: 40px;
          z-index: 1;
          text-align: center;
          line-height: 40px;
          transform: translate3d(0, -100%, 0);
          transition: all 0.2s;
          &.message2 {
             top: auto;
             bottom: 0;
             transform: translate3d(0, 100%, 0);
           }
          &>.icon {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 30px;
            transition: all 0.4s;
            text-align: center;
            background: url(../common/image/refresh.png) no-repeat center center;
            background-size: 30px 30px;
           }
        }
        .list {
          position: relative;
          z-index: 20;
          margin-left: 15px;
          margin-right: 15px;
          min-height: 101%;
          overflow: hidden;
          .item {
            position: relative;
            overflow: hidden;
            &.flip-list-move {
              transition: all 1s;
            }
            &.flip-list-leave-active {
              transition: all 1s;
              position: absolute;
            }
            &.flip-list-leave-to {
              opacity: 0;
              transform: translate3d(-100%, 0, 0);
            }
            .cnt {
              position: relative;
              z-index: 10;
              display: flex;
              padding: 15px 0;
              border-top: 1px solid #e5e5e5;
              justify-content: space-between;
              background: #ffffff;
              transition: all 0.4s;
              &.cnt-move {
                  transform: translateX(-70px);
               }
              .num {
                flex: 0 0 50px;
                width: 50px;
                font-size: 15px;
                line-height: 40px;
                text-align: center;
                color: #000000;
              }
              .time {
                flex: 0 0 62px;
                width: 64px;
                font-size: 11px;
                line-height: 40px;
                text-align: center;
                color: #f36713;
              }
              .avatar-wrap {
                flex: 1;
                overflow: hidden;
                font-size: 0;
                text-align: center;
                white-space: nowrap;
                &>img {
                  vertical-align: top;
                  margin-right: 11px;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  overflow: hidden;
                }
                 &>h2 {
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    line-height: 40px;
                    white-space: nowrap;
                    color: #000000;
                  }
              }
            }
            &.red {
              .cnt {
                .num {
                  color: #f36713;
                }
              }
            }
            .delete {
              position: absolute;
              top: 1px;
              right: 3px;
              bottom: 1px;
              width: 70px;
              background: #cc3636;
              font-size: 18px;
              line-height: 70px;
              text-align: center;
              color: #ffffff;
              z-index: 1;
            }
          }
        }
      }
    }
    &.fade-enter,&.fade-leave-to {
      transform: translate3d(100%, 0, 0) scale(0.01);
    }
  }
</style>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll';
import qrcode from '@/components/qrcode';
export default {
  name: 'rankingList',
  data () {
    return {
      scroll: null,
      list: [],
      timer: null,
      count: 2
    };
  },
  mounted () {
    this._initList();
    this._initScroll();
  },
  methods: {
    _initList () {
      const INIT_NUM = 20;
      for (let i = 0; i < INIT_NUM; i++) {
        this.list.push({
          title: `胡歌${i + 1}`,
          src: './static/image/item.png',
          time: (() => `${Math.ceil(Math.random() * 60)}:${Math.ceil(Math.random() * 60)}`)(),
          delete: false
        });
      }
    },
    _initScroll () {
      this.scroll = new Bscroll(this.$refs.listWrap, {
        probeType: 3,
        click: true,
        bounce: true,
        pullDownRefresh: {
          threshold: 50,
          stop: 40
        },
        pullUpLoad: {
          threshold: -70
        }
      });
      this.scroll.on('pullingDown', () => {
        this.$refs.messageWrap.style.transform = 'translateY(0)';
        this.$refs.messageWrap.style.webkitTransform = 'translateY(0)';
        setTimeout(() => {
          this.$refs.messageWrap.style.transform = 'translateY(-100%)';
          this.$refs.messageWrap.style.webkitTransform = 'translateY(-100%)';
          this.scroll.finishPullDown();
        }, 5000);
      });
      this.scroll.on('pullingUp', () => {
        this.$refs.messageWrap2.style.webkitTransform = 'translateY(0)';
        this.$refs.messageWrap2.style.transform = 'translateY(0)';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let newArr = [];
          for (let i = 0; i < 10; i++) {
            newArr.push({
              title: `胡歌${i + this.count * 10 + 1}`,
              src: './static/image/item.png',
              time: (() => `${Math.ceil(Math.random() * 60)}:${Math.ceil(Math.random() * 60)}`)(),
              delete: false
            });
          }
          this.count++;
          this.list = this.list.concat(newArr);
          this.scroll.finishPullUp();
          this.scroll.refresh();
          this.$refs.messageWrap2.style.webkitTransform = 'translateY(100%)';
          this.$refs.messageWrap2.style.transform = 'translateY(100%)';
        }, 3000);
      });
      this.scroll.on('touchEnd', (pos) => {
        let MAX_LEN = this.scroll.scrollerHeight - this.scroll.wrapperHeight;
        if (pos.y < -MAX_LEN) {
          this.$refs.messageWrap2.style.webkitTransform = 'translateY(0)';
          this.$refs.messageWrap2.style.transform = 'translateY(0)';
        }
      });
      this.scroll.on('scroll', (pos) => {
        let rotateWrap = this.$refs.messageIcon;
        let rotateIcon = rotateWrap.querySelector('.icon-rotate');
        if (pos.y > 40) {
          rotateWrap.style.transform = 'translateY(0)';
          rotateWrap.style.webkitTransform = 'translateY(0)';
          rotateIcon.style.transform = `rotate(${pos.y * 10}deg)`;
          rotateIcon.style.webkitTransform = `rotate(${pos.y * 10}deg)`;
        } else {
          rotateWrap.style.transform = 'translateY(-100%)';
          rotateWrap.style.webkitTransform = 'translateY(-100%)';
        }
        let rotateWrap2 = this.$refs.messageIcon2;
        let rotateIcon2 = rotateWrap2.querySelector('.icon-rotate');
        let MAX_LEN = this.scroll.scrollerHeight - this.scroll.wrapperHeight;
        if (pos.y < -MAX_LEN - 40) {
          rotateWrap2.style.webkitTransform = `translateY(${Math.max(pos.y + MAX_LEN + 40, 0)}px)`;
          rotateWrap2.style.transform = `translateY(${Math.max(pos.y + MAX_LEN + 40, 0)}px)`;
          rotateIcon2.style.transform = `rotate(${pos.y * 10}deg)`;
          rotateIcon2.style.webkitTransform = `rotate(${pos.y * 10}deg)`;
        } else {
          rotateWrap2.style.transform = 'translateY(40px)';
          rotateWrap2.style.webkitTransform = 'translateY(40px)';
        }
      });
    },
    onSwipeLeft (item) {
      item.delete = true;
    },
    onSwipeRight (item) {
      item.delete = false;
    },
    deleteFn (index) {
      this.list.splice(index, 1);
    },
    showQrcode () {
      this.$refs.qrcodeWrap.show();
    }
  },
  components: {
    Bscroll,
    qrcode
  }
};
</script>
