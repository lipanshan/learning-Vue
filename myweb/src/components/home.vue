<template>
  <div class="home">
      <div @click="nextPage()" class="bg">
        <transition tag="div" name="typer"
                    @before-enter="_beforeEnter"
                    @enter="_enter"
        >
          <div v-show="!envelope" class="txt-wrap" ref="txtWrapper">
            <div class="txt-top">
              <p class="p1">2015 万个</p>
              <p class="p1">生活在北京的你</p>
              <p class="p2">告诉我</p>
              <p class="p2">用那道菜去 <span class="red">爱</span>你</p>
            </div>
            <div class="line"></div>
            <div class="txt-bottom">
              <p class="p3">Dear 21.5 million</p>
              <p class="p3">beijingers,</p>
              <p class="p4">What can i cook</p>
              <p class="p4">for <span class="red">you</span>?</p>
            </div>
          </div>
        </transition>
      </div>
    <transition name="move">
      <div @click="openEnvelope()" v-show="envelope" class="envelope"></div>
    </transition>
    <div class="bottom-title"></div>
    <audio ref="audioTag" @canplay="_ready" @ended="_ended" @play="_play" src="./static/music/typer.mp3" @error="_error"></audio>
  </div>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  @import '../common/style.css';
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
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      height: 100%;
      -webkit-justify-content: center;
      -moz-justify-content: center;
      -ms-justify-content: center;
      -o-justify-content: center;
      justify-content: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      align-items: center;
      .txt-wrap {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 100%;
        text-align: center;
        .p1 {
          font-size: 38px;
          line-height: 43px;
          color: #777777;
          font-family: minijian;
        }
        .p2 {
          font-size: 20px;
          line-height: 40px;
          color: #787878;
          font-family: minijian;
          &:nth-child(1) {
            margin-top: 14px;
           }
          .red {
            font-size: 35px;
            line-height: 40px;
            color: #f36713;
          }
        }
        .line {
          margin: 25px 101px 31px;
          height: 1px;
          background: #9a9a9b;
          -webkit-transition: all 0.4s;
          transition: all 0.4s;
        }
        .p3 {
          font-size: 30px;
          line-height: 40px;
          font-family: inherit;
          color: #777777;
          font-weight: 600;
        }
        .p4 {
          font-size: 16px;
          line-height: 40px;
          color: #777777;
          font-weight: 200;
          &:nth-child(1) {
            margin-top: 6px;
           }
          .red {
            font-size: 26px;
            line-height: 40px;
            color: #f36713;
          }
        }
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
      envelope: true,
      txtTop: '',
      txtBottom: '',
      canPlay: false,
      timer1: null,
      timer2: null,
      nextPageFlag: false

    };
  },
  methods: {
    openEnvelope () {
      this.envelope = false;
    },
    nextPage () {
      if (!this.nextPageFlag) return false;
      this.$router.push({
        path: '/home2'
      });
      clearInterval(this.timer1);
      clearInterval(this.timer2);
    },
    _beforeEnter (el) {
      let line = el.querySelector('.line');
      this.txtTop = el.querySelector('.txt-top').innerHTML;
      this.txtBottom = el.querySelector('.txt-bottom').innerHTML;
      el.querySelector('.txt-top').innerHTML = '';
      el.querySelector('.txt-bottom').innerHTML = '';
      line.style.transform = 'scaleX(0.01)';
      line.style.webkitTransform = 'scaleX(0.01)';
    },
    _enter (el, done) {
      /* eslint-disable no-unused-vars */
      let refresh = el.offsetHeight;
      let txtTel = el.querySelector('.txt-top');
      let txtBel = el.querySelector('.txt-bottom');
      this.$nextTick(() => {
        let line = el.querySelector('.line');
        line.style.transform = 'scaleX(1)';
        line.style.webkitTransform = 'scaleX(1)';
        this._typerFn(txtTel, this.txtTop, this.timer1);
        this._typerFn(txtBel, this.txtBottom, this.timer2);
      });
      done();
    },
    _typerFn (el, str, timer) {
      let len = 0;
      let line = '';
      this.nextPageFlag = false;
      timer = setInterval(() => {
        if (len >= str.length) {
          this._pause();
          clearInterval(timer);
          this.nextPageFlag = true;
          return false;
        }

        if (str.charAt(len) === '<') {
          len = str.indexOf('>', len);
          this._pause();
        } else {
          this._play();
          len++;
        }
        line = len >= str.length ? '' : (len % 2 ? '' : '_');
        el.innerHTML = str.substring(0, len) + line;
      }, 200);
    },
    _ready () {
      this.canPlay = true;
    },
    _ended () {
      this.$refs.audioTag.currentTime = 0;
    },
    _pause () {
      if (!this.canPlay) return false;
      this.$refs.audioTag.pause();
    },
    _play () {
      if (!this.canPlay) return false;
      this.$refs.audioTag.play();
    },
    _error (msg) {
      console.log(msg);
    }
  }
};
</script>
