<template>
  <div class="shopping-cart-wrap" >
    <div class="content-wrap" v-on:click="toggleShow">
      <div class="content-left">
        <div class="cart">
          <span class="cart-logo" v-bind:class="{highlight:selectTotalCount>0}">
            <i class="icon-shopping_cart"></i>
          </span>
          <span class="goods-num" v-bind:class="{highlight:selectTotalCount>0}" v-show="selectTotalCount>0">{{selectTotalCount}}</span>
        </div>
      </div>
      <div class="content-right border-right-1px" v-bind:class="{highligh:selectTotalPrice>0}">￥{{selectTotalPrice}}元</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
    </div>
    <div class="delivery" v-bind:class="{enough: selectTotalPrice >= deliveryMimPrice}">
      <span class="delivery-price" v-on:click.stop.prevent="pay">{{delivery}}</span>
    </div>
    <ul class="ball-container">
        <li v-for="(ball, index) in balls">
          <transition name="drop-ball"
                            v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:after-enter="afterEnter"
          >
          <div class="ball ball-hook" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
          </transition>
        </li>
    </ul>
    <transition name="move">
      <div class="cart-list-wrap" v-show="listShow">
        <div class="cart-header">
          <h2 class="title">购物车</h2>
          <div class="empty-btn" v-on:click="empty">清空</div>
        </div>
        <div class="cart-list" ref="cartListWrapper">
          <ul >
            <li class="cart-item border-1px" v-for="food in selectFoods">
              <span class="food-name">{{food.name}}</span>
              <span class="food-price">￥{{food.price * food.count}}</span>
              <div class="cartcontrol-box">
                <cartControl v-on:cartAdd="drop" v-bind:food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" v-on:click="hideListMask"></div>
    </transition>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/minix.scss";
  .shopping-cart-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    height: 48px;
    background-color: #141d27;
    z-index: 100;

    .content-wrap {
      flex: 1;
      font-size: 0;
      background-color: #141d27;

      .content-left {
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin-left: 12px;
        margin-right: 12px;
        width: 56px;
        height: 56px;

        .cart {
          position: absolute;
          left: 0;
          top: -10px;
          display: block;
          width: 44px;
          height: 44px;
          padding: 6px;
          border-radius: 50%;
          background-color: #141d27;
          font-size: 0;

          .cart-logo {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            color: rgba(255,255,255,0.4);
            background-color: rgba(255,255,255,0.2);
            border-radius: 50%;

            &.highlight {
              background-color: #00a0dc;

              .icon-shopping_cart {
                 color: #ffffff;
              }
             }
            .icon-shopping_cart {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              line-height: 24px;
              font-size: 24px;
            }
          }
          .goods-num {
            position: absolute;
            right: -6px;
            right: 0;
            top: 0;
            z-index: 10;
            width: 24px;
            line-height: 16px;
            font-size: 9px;
            text-align: center;
            font-weight: 700;
            color: rgb(255,255,255);
            background-color: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
            border-radius: 12px;

            &.highlight {
              color: rgba(255,255,255,1);
             }
          }
        }
      }
      .content-right {
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
        line-height: 24px;
        font-size: 16px;
        padding-right: 12px;
        color: rgba(255,255,255,0.4);

        &.highligh {
          color: rgba(255,255,255,1);
         }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-left: 12px;
        line-height: 24px;
        font-size: 12px;
        color: rgba(255,255,255,0.4);
      }
    }
    .delivery {
      flex: 0 0 105px;
      background-color: #2b333b;
      text-align: center;
      font-size: 0;

      .delivery-price {
        display: inline-block;
        margin-top: 12px;
        padding-left: 8px;
        padding-right: 8px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255,255,255,0.4);
      }
      &.enough {
         background-color: #00b43c;
         color: #ffffff;
       }
    }
    .ball-container {

      .ball {
        position: fixed;
        left: 30px;
        bottom: 21px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(.42,-0.59,.35,.52);

        .inner {
          width: 24px;
          height: 24px;
          background-color: #00a0dc;
          transition: all 0.4s;
          border-radius: 50%;
        }
      }
    }
    .cart-list-wrap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: -1;
      max-height: 257px;
      overflow: hidden;
      transition: all 0.4s linear;
      transform: translate3d(0, -100%, 0);

      &.move-enter-active,&.move-leave-active {
        transform: translate3d(0,-100%, 0);
      }
      &.move-enter,&.move-leave-to {
        transform: translate3d(0, 0, 0);
      }
      .cart-header {
        height: 40px;
        padding-left: 18px;
        padding-right: 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid #dbdee1;

        .title {
          float: left;
          font-size: 14px;
          line-height: 40px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
        .empty-btn {
          float: right;
          font-size: 10px;
          line-height: 40px;
          color: rgb(0, 160, 220);
        }
      }
      .cart-list {
        max-height: 218px;
        overflow: hidden;
        padding-left: 18px;
        padding-right: 18px;
        background-color: #ffffff;

        .cart-item {
          position: relative;
          padding-top: 12px;
          padding-bottom: 12px;

          .food-name {
            display: inline-block;
            font-size: 14px;
            line-height: 24px;
            color: rgb(7, 17, 27);
          }
          .food-price {
            position: absolute;
            right: 72px;
            top: 12px;
            padding-right: 12px;
            padding-left: 18px;
            font-size: 10px;
            line-height: 24px;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-box {
            position: absolute;
            right: 0;
            top: 12px;
            width: 72px;
            height: 24px;
          }
        }
      }
    }
    .list-mask {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(7, 17, 27, 0.6);
      backdrop-filter: blur(10px);
      z-index: -4;
      transition: all 0.4s;
      opacity: 1;
        &.fade-enter-active,&.fade-leave-active {
          opacity: 1;
        }
        &.fade-enter,&.fade-leave-to {
          opacity: 0
        }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import cartControl from '../../components/cartcontrol/cartcontrol';
  export default {
    name: 'shopping',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
          ];
        }
      },
      deliveryMimPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [
        ],
        fold: true,
        scroll: ''
      };
    },
    computed: {
      selectTotalPrice () {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      selectTotalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      delivery () {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        if (price > 0 && price < this.deliveryMimPrice) {
          return `还差￥${this.deliveryMimPrice - price}元起送`;
        } else if (price <= 0) {
          return `￥${this.deliveryMimPrice}元起送`;
        } else if (price >= this.deliveryMimPrice) {
          return '去结算';
        }
      },
      listShow () {
        if (!this.selectFoods.length) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.cartListWrapper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      dropDown (el) {
        let i = this.balls.length;
        while (i--) {
          let item = this.balls[i];
          if (!item.show) {
            item.show = true;
            this.balls[i].el = el;
            this.dropBalls.push(this.balls[i]);
            return;
          }
        }
      },
      beforeEnter (el) {
        let i = this.balls.length;
        while (i--) {
          let ball = this.balls[i];
          if (ball.show) {
            let inner = el.getElementsByClassName('inner-hook')[0];
            let rect = this.balls[i].el.getBoundingClientRect();
            let x = rect.left - rect.width;
            let y = -(window.innerHeight - rect.top - 2 * rect.height);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter (el, done) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          let inner = el.getElementsByClassName('inner-hook')[0];
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        el.addEventListener('transitionend', done);
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleShow () {
        if (!this.selectFoods.length) {
          return;
        }
        this.fold = !this.fold;
      },
      hideListMask () {
        this.fold = true;
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay () {
        if (this.selectTotalPrice < this.deliveryMimPrice) {
          return;
        }
        alert(`请支付${this.selectTotalPrice}元`);
      },
      drop (target) {
        this.dropDown(target);
      }
    },
    components: {
      cartControl
    }
  };
</script>
