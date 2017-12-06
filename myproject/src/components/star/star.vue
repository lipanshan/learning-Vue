<template>
  <div class="star" v-bind:class="starType">
    <i class="star-item" v-for="starItem in starItems" v-bind:class="starItem"></i>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @mixin bg-image($url) {
    background-image: url($url);
    background-repeat: no-repeat;
  }
  .star {
    font-size: 0;
    text-align: center;

    &-48 {
      .star-item {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 11px;
        background-size: 24px 24px;
        &.on {
          @include bg-image('./star48_on@2x.png');
        }
        &.off {
           @include bg-image('./star48_off@2x.png');
        }
        &.half {
          @include bg-image('./star48_half@2x.png');
        }

        &:last-child {
            margin-right: 0;
          }
      }
    }
    &-36 {
      .star-item {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-size:15px 15px;
        &.on {
          @include bg-image('./star36_on@2x.png');
         }
        &.off {
          @include bg-image('./star36_off@2x.png');
         }
        &.half {
          @include bg-image('./star36_half@2x.png');
         }

        &:last-child {
           margin-right: 0;
         }
      }
    }

    &-24 {
      .star-item {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 5px;
        background-size: 12px 12px;
        &.on {
          @include bg-image('./star24_on@2x.png');
         }
        &.off {
          @include bg-image('./star24_off@2x.png');
         }
        &.half {
          @include bg-image('./star24_half@2x.png');
         }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  const length = 5;
  const cls_on = 'on';
  const cls_off = 'off';
  const cls_half = 'half';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      starItems () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(cls_on);
        }
        if (hasDecimal) {
          result.push(cls_half);
        }
        while (result.length < length) {
          result.push(cls_off);
        }
        return result;
      }
    }
  };
</script>
