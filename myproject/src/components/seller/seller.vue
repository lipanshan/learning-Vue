<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div v-if="seller" class="seller-content">
      <div class="seller-info border-1px">
        <h1 class="seller-name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <div class="star-wrap"><star v-bind:size="36" v-bind:score="seller.score"></star></div>
          <span class="num">({{seller.ratingCount}})</span>
          <span class="num-txt">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collection-wrap">
          <div class="collection"><i class="icon-favorite"></i></div>
          <div class="collection-txt">已收藏</div>
        </div>
      </div>
      <div class="server-wrap">
        <ul>
          <li class="item border-r1px">
            <h1 class="title">起送价</h1>
            <p class="num-wrap">
              <span class="num">{{seller.minPrice}}</span>
              <span class="unit">元</span>
            </p>
          </li>
          <li class="item border-r1px">
            <h1 class="title">商家配送</h1>
            <p class="num-wrap">
              <span class="num">{{seller.deliveryPrice}}</span>
              <span class="unit">元</span>
            </p>
          </li>
          <li class="item">
            <h1 class="title">平均配送时间</h1>
            <p class="num-wrap">
              <span class="num">{{seller.deliveryTime}}</span>
              <span class="unit">分钟</span>
            </p>
          </li>
        </ul>
      </div>
      <row></row>
      <div class="bulletion-board-wrap border-1px">
        <h2 class="bulletion-board-title">公告与活动</h2>
        <p class="bulletion-board">{{seller.bulletin}}</p>
      </div>
      <div class="coupons-wrap"><coupons v-bind:size="32" v-bind:coupons="seller.supports"></coupons></div>
      <row></row>
      <div class="seller-info-wrap">
        <h2 class="seller-name">商家实景</h2>
        <div class="img-list-wrap"><scrollimg v-bind:pics="seller.pics"></scrollimg></div>
      </div>
      <row></row>
      <div class="coupons-wrap"><coupons v-bind:size="0" v-bind:coupons="seller.infos"></coupons></div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/minix';
  .seller-wrapper {
    position: absolute;
    top: 174px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;

    .seller-info {
      padding: 18px 0;
      margin: 0 18px;

      .seller-name {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .star-wrapper {
        margin-top: 8px;
        font-size: 0;

        .star-wrap {
          display: inline-block;
          vertical-align: top;
        }
        .num {
          margin-left: 8px;
          font-size: 10px;
          line-height: 18px;
          color: rgb(77, 85, 93);
        }
        .num-txt {
          margin-left: 12px;
          font-size: 10px;
          line-height: 18px;
          color: rgb(77, 85, 93);
        }
      }
      .collection-wrap {
        position: absolute;
        top: 18px;
        right: 0;
        text-align: center;

        .collection {
          font-size: 24px;
          line-height: 24px;
          color: rgb(240, 20, 20);
        }
        .collection-txt {
          margin-top: 4px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .server-wrap {
      margin: 0 18px;
      padding: 18px 0;

      &>ul {
        display: flex;
        .item {
          flex: 1;
          text-align: center;

          .title {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .num-wrap {
            margin-top: 8px;
            font-size: 0;

            .num {
              display: inline-block;
              vertical-align: bottom;
              font-size: 24px;
              line-height: 24px;
              color: rgb(7, 17, 27);
            }
            .unit {
              display: inline-block;
              vertical-align: bottom;
              font-size: 10px;
              line-height: 16px;
              color: rgb(7, 17, 27);
              font-weight: 200;
            }
          }
        }
       }
    }
    .bulletion-board-wrap {
      margin: 0 18px;
      padding: 18px 0;

      .bulletion-board-title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .bulletion-board {
        margin-top: 8px;
        padding: 0 12px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(240, 20, 20);
        font-weight: 200;
      }
    }
    .coupons-wrap {
      padding: 0 18px;
    }
    .seller-info-wrap {
      padding: 18px;

      .seller-name {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .img-list-wrap {
        margin-top: 12px;
        width: 100%;
        overflow: hidden;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import star from '../star/star';
  import row from '../row/row';
  import coupons from '../coupons/coupons';
  import scrollimg from '../scrollimg/scrollimg';

  const ErrorNum = 0;
  export default {
    data () {
      return {
        seller: null,
        scroll: null
      };
    },
    mounted () {
      this.$http.get('/api/seller').then((response) => {
        if (response.body.errno === ErrorNum) {
          this.seller = response.body.data;
          this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.sellerWrapper, {
              click: true,
              probeType: 3
            });
          });
        }
      });
    },
    montheds: {
    },
    components: {
      Bscroll,
      star,
      row,
      coupons,
      scrollimg
    }
  };
</script>
