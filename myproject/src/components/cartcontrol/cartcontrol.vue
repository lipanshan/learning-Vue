<template>
  <div class="cartcontrol-wrap">
    <transition name="cartmove">
      <div class="reduce-cart" v-show="food.count > 0" v-on:click.stop="reduceCart()">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="num-cart" v-show="food.count > 0">{{food.count}}</div>
    <div class="add-cart" v-on:click.stop="addCart()">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cartcontrol-wrap {
    font-size: 0;
    white-space: nowrap;

    .reduce-cart {
      display: inline-block;
      vertical-align: middle;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
      transition: all 0.4s linear;

      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        transition: all 0.4s linear;
      }
    }
    .cartmove-enter-active,
    .cartmove-leave-active {
      transform: translate3D(0, 0, 0);
      opacity: 1;

      i {
        transform: rotate(0deg);
      }
    }
    .cartmove-enter,
    .cartmove-leave-to {
      transform: translate3D(48px, 0, 0);
      opacity: 0;

      i {
        transform: rotate(180deg);
      }
    }
    .num-cart {
      display: inline-block;
      width: 24px;
      vertical-align: middle;
      text-align: center;
      font-size: 10px;
      line-height: 10px;
      color: rgb(147,153,159);
    }
    .add-cart {
      display: inline-block;
      vertical-align: middle;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    }
  }

</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data () {
      return {};
    },
    methods: {
      addCart () {
        this.$emit('cartAdd', event.target);
        if (this.food.count) {
          this.food.count++;
        } else {
          Vue.set(this.food, 'count', 1);
        }
      },
      reduceCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
