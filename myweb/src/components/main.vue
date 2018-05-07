<template>
  <transition name="fade">
    <div class="loading-wrap">
      <div class="loading-content">
        <div class="loading-icon">
          <my-circle :size="circle.size" :color1="circle.color1" :color2="circle.color2"
                     :progress="progress"></my-circle>
        </div>
        <div class="loading-txt">
          <p>{{progress}}%</p>
          <p>加载中</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import myCircle from '@/components/circle';
export default {
  data () {
    return {
      circle: {
        size: 60,
        color1: '#0e0e0e',
        color2: '#bfbaba'
      },
      timer: null,
      progress: 0
    };
  },
  mounted () {
    this.progressFn();
  },
  methods: {
    progressFn () {
      this.progress = Math.ceil(Math.random() * 30);
      this.timer = setInterval(() => {
        if (Math.ceil(Math.random() * 10 + this.progress) >= 100) {
          this.progress = 100;
          clearInterval(this.timer);
          setTimeout(() => {
            this.$router.push({
              path: 'home'
            });
          }, 400);
        } else {
          this.progress = Math.ceil(Math.random() * 10 + this.progress);
        }
      }, 200);
    }
  },
  components: {
    myCircle
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .loading-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: #000000;
    transition: all 0.4s;
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    .loading-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);

      .loading-icon {
        width: 60px;
        height: 60px;
        background: url(../common/image/loading-icon.png) no-repeat center center;
        background-size: 30px 25px;
      }
      .loading-txt {
        margin-top: 16px;

        &>p {
          font-size: 12px;
          line-height: 23px;
          text-align: center;
          color: #ffffff;
          font-weight: 500
         }
      }
    }
  }
</style>
