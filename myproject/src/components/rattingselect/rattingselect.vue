<template>
    <div class="ratting-select">
      <ul class="tag-wrap border-1px">
        <li v-on:click="selectTab(2)" v-bind:class="{active: selectType === 2 }" class="tag">
          <span class="tag-txt">{{tagData.allTxt}}</span>
          <span class="tag-num">{{ratings.length}}</span>
        </li>
        <li v-on:click="selectTab(0)" v-bind:class="{active: selectType === 0 }" class="tag">
          <span class="tag-txt">{{tagData.recommendTxt}}</span>
          <span class="tag-num">{{this.recommendNum()}}</span>
        </li>
        <li v-on:click="selectTab(1)" v-bind:class="{active: selectType === 1 }" class="tag tag-color">
          <span class="tag-txt">{{tagData.noRecommend}}</span>
          <span class="tag-num">{{ratings.length - this.recommendNum()}}</span>
        </li>
      </ul>
      <div class="ratting-content-wrap border-1px">
        <span v-on:click="selectOnlyContent" class="ratting-content-ico" v-bind:class="{active: onlyContent=== true}">
          <i class="icon-check_circle"></i>
        </span>
        <p class="ratting-txt">只看有内容的评价</p>
      </div>
      <ul v-show="ratings && ratings.length" class="ratting-list">
        <li v-show="select(rating)" v-for="rating in ratings" class="item border-1px">
          <div>
            <span class="ratting-time">{{rating.rateTime}}</span>
            <div class="num-avatar">
              <span class="num">{{rating.username}}</span>
              <img alt="" v-bind:src="rating.avatar" class="avatar">
            </div>
          </div>
          <div class="txt">
            <i v-bind:class="{'icon-thumb_down': rating.rateType === 1, 'icon-thumb_up': rating.rateType === 0}" ></i>{{rating.text}}
          </div>
        </li>
      </ul>
      <p v-show="!ratings.length" class="no-ratting">暂无评论</p>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/minix.scss";
  .ratting-select {
    margin-top: 6px;

    .tag-wrap {
      margin: 0 18px;
      padding-top: 12px;
      padding-bottom: 18px;
      font-size: 0;

      .tag {
        display: inline-block;
        vertical-align: top;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        background-color: rgba(0, 160, 220, 0.2);
        color: rgb(77, 85, 93);

        &.active {
          background-color: rgba(0, 160, 220, 1);
          color: rgb(255, 255, 255);
        }
        &.tag-color {
          background-color: rgba(77, 85, 93, 0.2);
         }
        &.tag-color.active {
          background-color: rgba(77, 85, 93, 1);
          color: rgb(255, 255, 255);
         }

        .tag-txt {
          font-size: 12px;
          line-height: 32px;
        }
        .tag-num {
          font-size: 8px;
          line-height: 32px;
        }
      }
    }
    .ratting-content-wrap {
      padding: 12px 18px;
      font-size: 0;

      .ratting-content-ico {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        line-height: 24px;
        color: rgb(147, 153, 159);

        &.active {
           color: #00b43c;
         }
      }
      .ratting-txt {
        display: inline-block;
        margin-left: 4px;
        vertical-align: top;
        font-size: 14px;
        line-height: 24px;
        color: rgb(147, 153, 159);
      }
    }
    .ratting-list {
      margin-left:18px;
      margin-right: 18px;

      .item {
        padding-top: 16px;
        padding-bottom:16px;

        &>div {
          height: 12px;

          .ratting-time {
            float: left;
            font-size:10px;
            line-height: 12px;
            color: rgb(147, 153, 159);
          }
          .num-avatar {
            float: right;

            .num {
              float: left;
              margin-right: 6px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              float: left;
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
          }
         }
        .txt {
          margin-top: 6px;
          font-size: 12px;
          line-height: 16px;
          color: rgb(7, 17, 27);

          .icon-thumb_down {
            margin-right: 4px;
            color: rgb(147, 153, 159);

            &.active {
                color: #00b43c;
             }
           }

          .icon-thumb_up {
            margin-right: 4px;
            color: rgb(147, 153, 159);

            &.active {
                color: #00b43c;
             }
           }
        }
      }
    }
    .no-ratting {
      margin: 0 18px;
      padding: 16px 0;
      font-size: 12px;
      line-height: 16px;
      color: rgb(147, 153, 159);
    }
  }
</style>
<script type="text/ecmascript-6">
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    tagData: {
      type: Object,
      default () {
        return {
          allTxt: '全部',
          recommendTxt: '满意',
          noRecommend: '不满意'
        };
      }
    },
    selectType: {
      type: Number,
      default () {
        return 2;
      }
    },
    onlyContent: {
      type: Boolean,
      default () {
        return true;
      }
    }
  },
  data () {
    return {
      ratingList: []
    };
  },
  methods: {
    selectTab (index) {
      this.$emit('selectTagType', index);
    },
    selectOnlyContent () {
      this.$emit('triggerOnlyContent');
    },
    recommendNum () {
      let num = 0;
      this.ratings.forEach((value) => {
        if (value.rateType === 0) {
          num++;
        }
      });
      return num;
    },
    select (item) {
      if (this.onlyContent && !item.text) {
        return false;
      }
      if (this.selectType === item.rateType || this.selectType === 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {}
};
</script>
