<template>
  <transition name="rightShow">
    <div v-show="showFlag" class="food" ref="foodWrapper">
      <div class="content">
        <div class="img-wrap">
          <img v-bind:src="food.image" alt="图片">
          <div class="back-btn" v-on:click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="description-wrap">
          <h1 class="food-name">{{food.name}}</h1>
          <p class="food-seller-num"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
          <div class="price-wrap">
            <span class="price"><span class="price-icon">￥</span>{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice"><span class="price-icon">￥</span>{{food.oldPrice}}</span>
          </div>
          <div class="carControl-wrap">
            <cartControl v-on:cartAdd="trigger"  v-bind:food="food"></cartControl>
          </div>
          <transition name="fade">
          <div v-show="fadeShow" v-on:click="fadeFn" class="add-shopping">加入购物车</div>
          </transition>
        </div>
        <row></row>
        <div class="food-instroduction">
          <h2 class="instroduction">商品介绍</h2>
          <div class="instroduction-info" v-show="food.info">{{food.info}}</div>
        </div>
        <row></row>
        <div class="food-evaluate">
          <h2 class="instroduction">商品评价</h2>
          <rattingSelect
            v-on:selectTagType="selectTagType"
            v-on:triggerOnlyContent="showOnlyContent"
            v-bind:tagData="tagData"
            v-bind:selectType="selectType"
            v-bind:ratings="food.ratings"
            v-bind:onlyContent="onlyContent"></rattingSelect>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 48px;
    z-index: 0;
    background-color: #ffffff;
    overflow: hidden;

    &.rightShow-enter-active,&.rightShow-leave-active {
      transition: all 0.2s linear;
      transform: translate3d(0, 0, 0);
    }
    &.rightShow-enter,&.rightShow-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .img-wrap {
      position: relative;
      height: 0;
      padding-bottom: 100%;
      z-index: 1;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .back-btn {
        position: absolute;
        left: 24px;
        top: 24px;
        width: 24px;
        height: 24px;
        z-index: 2;
        .icon-arrow_lift {
          display: block;
          font-size: 24px;
          line-height: 24px;
          color: #ffffff
        }
      }
    }
    .description-wrap {
      position:relative;
      padding: 18px;

      .food-name {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-weight: 700;
      }
      .food-seller-num {
        margin-top: 8px;
        font-size: 0;
        color: rgb(147, 153, 159);

        span {
          margin-right: 12px;
          display: inline-block;
          font-size: 10px;
          line-height: 10px;
        }
      }
      .price-wrap {
        margin-top: 18px;
        height: 24px;

        .price {
          float: left;
          font-size: 14px;
          line-height: 24px;
          color: rgb(240, 20, 20);
          font-weight: 700;

          .price-icon {
            margin-right: 1px;
            font-size: 10px;
          }
        }
        .old-price {
          float: left;
          margin-left: 12px;
          font-size: 10px;
          line-height: 24px;
          font-weight: 700;
          color: rgb(147, 153, 159);

          .price-icon {
            margin-right: 1px;
            color: rgb(147, 153, 159);
          }
        }
      }
      .carControl-wrap {
        position: absolute;
        right: 18px;
        bottom: 18px;
        width: 72px;
        height: 24px;
        text-align: right;
      }
      .add-shopping {
        position: absolute;
        right: 18px;
        bottom: 18px;
        padding-left: 12px;
        padding-right: 12px;
        font-size: 12px;
        line-height: 24px;
        background-color: rgb(0, 160, 220);
        border-radius: 12px;
        color: #ffffff;
        z-index: 1;

        &.fade-enter-active,&.fade-leave-actve {
          transition: all 0.2s linear;
          opacity: 1;
        }
        &.fade-enter,&.fade-leave-to {
          opacity: 0;
        }
      }
    }
    .food-instroduction {
      padding: 18px;

      .instroduction {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-weight: 400;
      }
      .instroduction-info {
        margin-top: 8px;
        padding-left: 8px;
        padding-right: 8px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
      }
    }
    .food-evaluate {
      margin-top: 18px;

      .instroduction {
        margin-left: 18px;
        margin-right: 18px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import Bscroll from 'better-scroll';
  import row from '../../components/row/row';
  import cartControl from '../../components/cartcontrol/cartcontrol';
  import rattingSelect from '../rattingselect/rattingselect';

  const selectTypeVal = 2;
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
      return {
        showFlag: false,
        selectType: selectTypeVal,
        onlyContent: false,
        tagData: {
          allTxt: '全部',
          recommendTxt: '推荐',
          noRecommend: '吐槽'
        }
      };
    },
    computed: {
      fadeShow () {
        if (this.food.count) {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.BetterScroll) {
            this.BetterScroll = new Bscroll(this.$refs.foodWrapper, {
              click: true,
              probeType: 3
            });
          } else {
            this.BetterScroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      trigger (target) {
        this.$emit('trigger', event.target);
      },
      fadeFn () {
        this.$emit('trigger', event.target);
        if (this.food.count) {
          this.food++;
        } else {
          Vue.set(this.food, 'count', 1);
        }
      },
      selectTagType (index) {
        this.selectType = index;
        this.$nextTick(() => {
          this.BetterScroll.refresh();
        });
      },
      showOnlyContent () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.BetterScroll.refresh();
        });
      }
    },
    components: {
      row,
      cartControl,
      Bscroll,
      rattingSelect
    }
  };
</script>
