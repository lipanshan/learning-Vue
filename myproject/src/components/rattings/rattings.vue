<template>
    <div class="ratings-wrapper">
      <div class="ratings-wrap" ref="ratingsWrapper">
        <div class="rating-content">
          <div class="overallmerit">
            <div class="overallmerit-left">
              <h1 class="score">{{seller.score}}</h1>
              <p class="score-txt">综合评分</p>
              <p class="desc">高于周边商家{{seller.rankRate}}%</p>
            </div>
            <div class="overallmerit-right">
              <div class="star-score-wrap">
                <span class="star-name">服务态度</span>
                <div class="start-wrap"><star v-bind:size="36" v-bind:score="seller.serviceScore"></star></div>
                <span class="star-score">{{seller.serviceScore}}</span>
              </div>
              <div class="star-score-wrap">
                <span class="star-name">商品评分</span>
                <div class="start-wrap"><star v-bind:size="36" v-bind:score="seller.serviceScore"></star></div>
                <span class="star-score">{{seller.serviceScore}}</span>
              </div>
              <div class="send-time-wrap">
                <span class="send-title">送达时间</span>
                <span class="send-time">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
          <row></row>
          <rattingSelect v-bind:ratings="ratings" v-bind:selectType="selectType" v-bind:onlyContent="onlyContent" v-on:selectTagType="selectTagType" v-on:triggerOnlyContent="triggerOnlyContent"></rattingSelect>
          <ul v-show="ratings && ratings.length" class="ratings-wrapper">
            <li v-show="showRating(rating.rateType,rating.text)" v-for="(rating, index) in ratings" class="rating-item">
              <div class="avatar-wrap">
                <img v-bind:src="rating.avatar" alt="头像">
              </div>
              <div class="rating-cnt">
                <div class="user-time">
                  <span class="user">{{rating.username}}</span>
                  <span class="time">{{rating.rateTime | formatDate}}</span>
                </div>
                <div class="ratings-row">
                  <div class="star-wrap"><star v-bind:size="24" v-bind:score="rating.score"></star></div>
                  <div class="send-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
                </div>
                <p class="rating-desc">{{rating.text}}</p>
                <div class="up-down">
                  <i v-bind:class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1, }"></i><div v-show="rating.recommend && rating.recommend.length" v-for="item in rating.recommend" class="border1px recommend-item"><span>{{item}}</span></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/minix';
  .ratings-wrap {
    position: absolute;
    top: 174px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;

    .overallmerit {
      display: flex;
      padding: 18px 0;

      .overallmerit-left {
        position: relative;
        flex: 0 0 137px;
        width: 137px;
        @media only screen and (max-width:320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        &:after {
           content: "";
           position: absolute;
           right: -1px;
           top: 0;
           width: 0;
           height: 100%;
          @include line-right(#e6e7e8);
         }

        .score {
          font-size: 24px;
          line-height:28px;
          color: rgb(255, 153, 0);
          text-align: center;
        }
        .score-txt {
          margin-top: 6px;
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
          text-align: center;
        }
        .desc {
          margin-top: 8px;
          font-size: 10px;
          line-height:10px;
          color: rgb(7, 17, 27);
          text-align: center;
        }
      }
      .overallmerit-right {
        flex: 1;

        .star-score-wrap {
          font-size: 0;
          padding-bottom: 8px;
          padding-left: 24px;
          padding-right: 24px;
          @media only screen and (max-width:320px) {
            padding-left: 6px;
            padding-right: 6px;
          }

          .star-name {
            margin-right: 12px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .start-wrap {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            height: 18px;
          }
          .star-score {
            margin-left: 12px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
          }
        }
        .send-time-wrap {
          font-size: 0;
          padding-bottom: 8px;
          padding-left: 24px;
          padding-right: 24px;

          @media only screen and (max-width:320px) {
            padding-left: 6px;
            padding-right: 6px;
          }
          .send-title {
            margin-right: 12px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .send-time {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .ratings-wrapper {
      padding-left: 18px;
      padding-right: 18px;

      .rating-item {
        display: flex;
        padding-top: 18px;
        padding-bottom: 18px;

        .avatar-wrap {
          flex: 0 0 40px;

          &>img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
        .rating-cnt {
          flex: 1;

          .user-time {
            position: relative;
            width: 100%;

            .user {
              font-size: 10px;
              line-height: 12px;
              color: rgb(7, 17, 27);
            }
            .time {
              position: absolute;
              right: 0;
              top: 0;
              font-size: 10px;
              font-weight: 200;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
          }
          .ratings-row {
            margin-top: 4px;
            font-size: 0;

            .star-wrap {
              margin-right: 6px;
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              height: 12px;
            }
            .send-time {
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              line-height: 12px;
              font-weight: 200;
              color: rgb(147, 153, 159);
            }
          }
          .rating-desc {
            margin-top: 6px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .up-down {
            font-size: 0;

            &>i {
              margin-top: 8px;
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 16px;
              color: rgb(183, 187, 191);

              &.icon-thumb_up {
                 color: rgb(0, 160, 220);
               }
             }
            .recommend-item {
              margin-top: 8px;
              display: inline-block;
              vertical-align: top;
              margin-left: 8px;
              padding-left: 6px;
              padding-right: 6px;

              &>span {
                display: inline-block;
                vertical-align: top;
                width: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 9px;
                line-height: 16px;
                color: rgb(147, 153, 159);
               }
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll';
import star from '../star/star';
import row from '../row/row';
import rattingSelect from '../rattingselect/rattingselect';
import {formatDate} from '../../common/js/formatdate';

const onlyCont = true;
const typeNum = 2;
const Error_NB = 0;
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
      onlyContent: onlyCont,
      selectType: typeNum,
      scroll: null,
      ratings: []
    };
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      if (response.body.errno === Error_NB) {
        this.ratings = response.body.data;
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.ratingsWrapper, {
            click: true,
            probeType: 3
          });
        });
      }
    });
  },
  methods: {
    selectTagType (index) {
      this.selectType = index;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    triggerOnlyContent () {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    showRating (type, txt) {
      if (this.onlyContent && !txt) {
        return false;
      }
      if (type === this.selectType || this.selectType === typeNum) {
        return true;
      } else {
        return false;
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-mm-dd hh:ii');
    }
  },
  components: {
    star,
    row,
    rattingSelect
  }
};
</script>
