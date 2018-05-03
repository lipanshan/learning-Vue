<template>
  <div class="ranking-wrap">
     <header>
       <h1></h1>
       <div class="button-wrap">
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
        <transition-group name="flip-list" class="list" tag="ul">
          <li v-show="item.show" v-for="(item, index) in list" class="item" :class="{'red': item.title.substring(2) <= 3}" :key="index">
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
      </div>
    </div>
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
          padding-left: 15px;
          padding-right: 15px;
          .item {
            position: relative;
            display: block;
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
              top: 0;
              right: 1px;
              bottom: 0;
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
  }
.flip-list-leave-active {
  transition: all 0.4s;
  transform: translate3d(-100%, 0, 0);
}
</style>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll';
export default {
  name: 'rankingList',
  data () {
    return {
      scroll: null,
      list: []
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
          delete: false,
          show: true
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
        }
      });
      this.scroll.on('pullingDown', () => {
        this.$refs.messageWrap.style.transform = 'translateY(0)';
        this.$refs.messageWrap.style.webkitTransform = 'translateY(0)';
        setTimeout(() => {
          this.$refs.messageWrap.style.transform = 'translateY(-100%)';
          this.$refs.messageWrap.style.webkitTransform = 'translateY(-100%)';
          this.scroll.finishPullDown();
        }, 3000);
      });
      this.scroll.on('pullingUp', () => {
        console.log('pullingUp');
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
      });
    },
    onSwipeLeft (item) {
      item.delete = true;
    },
    onSwipeRight (item) {
      item.delete = false;
    },
    deleteFn (index) {
      this.list[index].show = false;
    }
  },
  components: {
    Bscroll
  }
};
</script>
