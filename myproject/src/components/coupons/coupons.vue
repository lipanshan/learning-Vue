<template>
    <div class="coupons-wrapper">
        <ul>
          <li v-show="coupons && coupons.length" v-for="(item, index) in coupons" v-bind:class="{'border-1px': index < coupons.length-1}" class="coupons">
            <span v-show="item.type" class="coupons-icon">
              <i v-bind:class="classMap[item.type]"></i>
            </span>
            <span v-show="item.description" class="coupons-txt">{{item.description}}</span>
            <span v-show="item && !item.description" class="coupons-txt">{{item}}</span>
          </li>
        </ul>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .coupons-wrapper {
    .coupons {
      padding: 16px 12px;
      font-size: 0;

      .coupons-icon {
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
        font-size: 16px;
        line-height: 16px;

        & > i {
          display: block;
          width: 16px;
          height: 16px;

          &.decrease_32 {
            background: url(decrease_4@2x.png) no-repeat 0 0;
            background-size: 16px 16px;
           }
          &.decrease_48 {
             background: url(decrease_4@3x.png) no-repeat 0 0;
             background-size: 18px 18px;
           }
          &.discount_32 {
             background: url(discount_4@2x.png) no-repeat 0 0;
             background-size: 16px 16px;
           }
          &.discount_48 {
             background: url(discount_4@3x.png) no-repeat 0 0;
             background-size: 18px 18px;
           }
          &.guarantee_32 {
             background: url(guarantee_4@2x.png) no-repeat 0 0;
             background-size: 16px 16px;
           }
          &.guarantee_48 {
             background: url(guarantee_4@3x.png) no-repeat 0 0;
             background-size: 18px 18px;
           }
          &.invoice_32 {
             background: url(invoice_4@2x.png) no-repeat 0 0;
             background-size: 16px 16px;
           }
          &.invoice_48 {
             background: url(invoice_4@3x.png) no-repeat 0 0;
             background-size: 18px 18px;
           }
          &.special_32 {
             background: url(special_4@2x.png) no-repeat 0 0;
             background-size: 16px 16px;
           }
          &.special_48 {
             background: url(special_4@3x.png) no-repeat 0 0;
             background-size: 18px 18px;
           }
        }
      }
      .coupons-txt {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
        font-weight: 200;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      coupons: {
        type: Array,
        default () {
          return [];
        }
      },
      size: {
        type: Number,
        default: 32
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.classMap = this.classMap.map((value) => {
        return `${value}_${this.size}`;
      });
    },
    data () {
      return {
      };
    },
    components: {}
  };
</script>
