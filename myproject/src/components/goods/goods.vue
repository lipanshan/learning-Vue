<template>
  <div class="goods">
    <div class="sidebar" ref="menuWrapper">
      <ul>
        <li v-for="(good, index) in goods" v-on:click="selectMenu(index)" class="sidebar-item border-1px" v-bind:class="{'currentIndex':currentIndex === index}" ><span class="txt"><i v-if="goods[index].type>0" v-bind:class="classMap[goods[index].type]" class="icon"></i>{{good.name}}</span></li>
    </ul>
    </div>
    <div class="right-detail"  ref="foodsWrapper">
      <ul>
        <li class="detail-list detail-list-hook" v-for="(good, index) in goods">
          <h2 class="title">{{good.name}}</h2>
          <ul>
            <li v-on:click="selectFood(food)" v-for="(food, ind) in good.foods" class="detail-item border-1px">
              <a href="javascript:;" class="img-wrap">
                <img v-bind:src="food.image" alt="图片">
              </a>
              <div class="introduce">
                <h2 class="h2">{{food.name}}</h2>
                <h3 class="h3">{{food.description}}</h3>
                <h3 class="h3"><span class="num">月售{{food.sellCount}}份</span><span class="persent">好评率{{food.rating}}%</span></h3>
                <p class="price"><span class="now-price">￥{{food.price}}</span><span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span></p>
                <div class="btn-group">
                  <cartControl v-on:cartAdd="drop" v-bind:food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" v-bind:selectFoods="selectFoods" v-bind:deliveryMimPrice="seller.minPrice" v-bind:deliveryPrice="seller.deliveryPrice"></shopcart>
    <food ref="food" v-on:trigger="drop" v-bind:food="selectedFood"></food>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../common/minix.scss";

  .goods {
    display: flex;
    position: fixed;
    left: 0;
    top: 175px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;

    .sidebar {
      flex: 0 0 80px;
      justify-content: center;
      background-color: #f3f5f7;

      .sidebar-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 12px;
        padding-right: 12px;
        font-size: 0;
        color: rgb(77,85,93);
        height: 80px;
        text-align: left;

        &.currentIndex {
            position: relative;
            margin-top: -1px;
            font-weight: 700;
            background-color: #ffffff;
            color: #07111b;
         }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url('./special_3@3x.png') no-repeat 0 0;
          background-size: 12px 12px;

          &.decrease {
             background-repeat: no-repeat;
             background-size: 12px 12px;
           @include bg-image('./decrease_3@2x.png');
           }
          &.discount {
             background-repeat: no-repeat;
             background-size: 12px 12px;
           @include bg-image('./discount_3@2x.png');
           }
          &.special {
             background-repeat: no-repeat;
             background-size: 12px 12px;
           @include bg-image('./special_3@2x.png');
           }
          &.invoice {
             background-repeat: no-repeat;
             background-size: 12px 12px;
           @include bg-image('./invoice_3@2x.png');
           }
          &.guarantee {
             background-repeat: no-repeat;
             background-size: 12px 12px;
           @include bg-image('./guarantee_3@2x.png');
           }
        }
        .txt {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
    .right-detail {
      flex: 1;

      .detail-list {
        background-color: #fff;

        .title {
          font-size: 12px;
          line-height: 26px;
          color: rgb(147,153,159);
          border-left: 1px solid #d9dde1;
          padding-left: 14px;
          text-align: left;
          background-color: #f3f5f7;
        }
        .detail-item {
          display: flex;
          margin-left: 18px;
          padding-top: 18px;
          padding-bottom: 18px;
          text-align: left;

          .img-wrap {
            flex: 0 0 57px;
            vertical-align: top;
            width: 57px;
            height: 57px;

            img {
              vertical-align: top;
              width: 57px;
              height: 57px;
            }
          }
          .introduce {
            position: relative;
            flex: 1;
            margin-left:  10px;
            text-align: left;
            .h2 {
              margin-top: 2px;
              font-size: 14px;
              line-height: 14px;
              color: rgb(7,17,27);
            }
            .h3 {
              margin-top: 8px;
              font-size: 10px;
              line-height: 10px;
              color: rgb(147,153,159);

              .num {
                margin-right: 12px;
              }
            }
            .price {
              font-size: 10px;
              line-height: 24px;
              color: rgb(147,153,159);
              font-weight: 700;

              .now-price {
                margin-right: 8px;
                font-size: 14px;
                color: red;
              }
            }
            .btn-group {
              position: absolute;
              right: 18px;
              bottom: 0;
              text-align: right;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  const Error_NB = 0;
  import Bscroll from 'better-scroll';
  import shopcart from '../../components/shoppingcart/shopcart';
  import cartControl from '../../components/cartcontrol/cartcontrol';
  import food from '../../components/food/food';

  export default {
    props: {
      seller: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        menuScroll: null,
        foodsScroll: null,
        totalPrice: [],
        selectedFood: {}
      };
    },
    created () {
      this.classMap = [
        'decrease', 'discount', 'special', 'invoice', 'guarantee'
      ];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === Error_NB) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._countHeight();
          });
        }
      });
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          if (!this.listHeight[i + 1] || this.listHeight[i] <= this.scrollY && this.listHeight[i + 1] > this.scrollY) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((g) => {
            if (g.count) {
              foods.push(g);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _countHeight () {
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('detail-list-hook');
        let height = 0;
        this.listHeight.push(0);
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i].clientHeight;
          height += item;
          this.listHeight.push(height);
        }
      },
      selectMenu (index) {
        if (!event._constructed) {
          return;
        }
        this.foodsScroll.stop();
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('detail-list-hook');
        this.foodsScroll.scrollToElement(foodsList[index], 200);
      },
      drop (target) {
        this.$refs.shopcart.dropDown(target);
      },
      selectFood (food) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    }
  };
</script>
