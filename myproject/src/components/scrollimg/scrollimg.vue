<template>
  <div class="img-wrapper" ref="imgWrapper">
      <ul class="img-list">
        <li v-show="pics && pics.length" v-for="pic in pics" class="img-wrap">
          <img v-bind:src="pic" alt="">
        </li>
      </ul>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .img-wrapper {
    width: 100%;
    overflow: hidden;

    .img-list {
      font-size: 0;
      white-space: nowrap;

      .img-wrap {
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
        width: 120px;
        height: 90px;

        &>img {
          display: block;
          width: 120px;
          height: 90px;
         }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  const imgMargin = 6;
  export default {
    props: {
      pics: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    created () {
      this._initListWidth();
    },
    data () {
      return {
        scrol: null
      };
    },
    methods: {
      _initListWidth () {
        this.$nextTick(() => {
          let margin = imgMargin;
          let imgList = this.$refs.imgWrapper.getElementsByClassName('img-list')[0];
          let imgWidth = this.$refs.imgWrapper.getElementsByClassName('img-wrap')[0].getBoundingClientRect().width;
          imgList.style.width = ((imgWidth + margin) * this.pics.length) + 'px';
          this.scrol = new Bscroll(this.$refs.imgWrapper, {
            scrollX: true,
            probeType: 3,
            click: true,
            eventPassThrough: 'vertical'
          });
        });
      }
    },
    components: {
      Bscroll
    }
  };
</script>
