<template>
  <div @click="selectCurrent" class="consult-list-item border-bottom-1px">
    <a href="javascript:;" class="img-wrap">
      <img :src="itemInfo.url" alt="图片">
    </a>
    <div class="text-wrap">
      <h2>{{itemInfo.title}}</h2>
      <div v-show="!itemInfo.idAddress" class="info-wrap">
        <p class="see"><i class="icon icon-view-show"></i>{{itemInfo.count}}次浏览</p>
        <p class="time"><i class="icon icon-time"></i>{{itemInfo.time}}</p>
      </div>
      <div v-show="itemInfo.idAddress" class="info-wrap2">
        <div class="data"><i class="icon icon-time"></i>{{itemInfo.date}}</div>
        <div class="address"><i class="icon icon-location2"></i>{{itemInfo.address}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/mixin.sass'
.consult-list-item
  position: relative
  display: -webkit-box
  display: -moz-box
  display: -ms-flexbox
  display: -webkit-flex
  display: flex
  .img-wrap
    margin-top: 15px
    margin-bottom: 15px
    position: relative
    display: block
    -webkit-flex: 0 0 150px
    -moz-box-flex: 0 0 150px
    -ms-flex: 0 0 150px
    flex: 0 0 150px
    padding-bottom: 84px
    background-color: $color-text
    height: 0
    &>img
      width: 150px
      height: 84px
  .text-wrap
    margin-left: 17px
    position: relative
    -webkit-box-flex: 1
    -moz-box-flex: 1
    -webkit-flex: 1
    -ms-flex: 1
    flex: 1
    &>h2
      margin-top: 11px
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 52px
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 9px
      color: $color-text-l
      overflow: hidden
    .info-wrap
      position: absolute
      right: 0
      bottom: 11px
      left: 0
      font-size: 0
      white-space: nowrap
      &>p
        display: inline-block
        vertical-align: top
        font-size: $font-size-small
        line-height: $font-size-small + 13px
        color: $color-text
        .icon
          margin-right: 3px
      &>.see
        margin-right: 16px
    .info-wrap2
      position: absolute
      right: 0
      bottom: 14px
      left: 0
      &>.data, &>.address
        font-size: $font-size-small
        line-height: $font-size-small + 6px
        color: $color-text
        &>.icon
          margin-right: 7px
</style>
<script type="text/ecmascript-6">
export default {
  props: {
    itemInfo: {
      type: Object,
      default () {
        return {
          id: '',
          url: '',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    selectCurrent () {
      this.$emit('selectItem', this.itemInfo)
    }
  }
}
</script>
