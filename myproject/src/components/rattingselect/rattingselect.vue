<template>
    <div class="ratting-select">
      <ul class="tag-wrap border-1px">
        <li v-on:click="selectTab(2)" v-bind:class="{active: selectType === 2 }" class="tag">
          <span class="tag-txt">{{tagData.allTxt}}</span>
          <span class="tag-num">{{ratings.length}}</span>
        </li>
        <li v-on:click="selectTab(0)" v-bind:class="{active: selectType === 0 }" class="tag">
          <span class="tag-txt">{{tagData.recommendTxt}}</span>
          <span class="tag-num">{{recommendNum.length}}</span>
        </li>
        <li v-on:click="selectTab(1)" v-bind:class="{active: selectType === 1 }" class="tag tag-color">
          <span class="tag-txt">{{tagData.noRecommend}}</span>
          <span class="tag-num">{{noRecommendNum.length}}</span>
        </li>
      </ul>
      <div class="ratting-content-wrap border-1px">
        <span v-on:click="selectOnlyContent" class="ratting-content-ico" v-bind:class="{active: onlyContent=== true}">
          <i class="icon-check_circle"></i>
        </span>
        <p class="ratting-txt">只看有内容的评价</p>
      </div>
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
  }
</style>
<script type="text/ecmascript-6">
const allNum = 2;
const recommend = 0;
const noRecommend = 1;
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
        return allNum;
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
  computed: {
    recommendNum () {
      return this.ratings.filter((value) => {
        return value.rateType === recommend;
      });
    },
    noRecommendNum () {
      return this.ratings.filter((value) => {
        return value.rateType === noRecommend;
      });
    }
  },
  methods: {
    selectTab (index) {
      this.$emit('selectTagType', index);
    },
    selectOnlyContent () {
      this.$emit('triggerOnlyContent');
    }
  },
  components: {}
};
</script>
