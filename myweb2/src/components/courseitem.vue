<template>
  <div  @click="selectCurrent" class="course-list-item">
    <a href="javascript:;" class="img-wrap">
      <img :src="courseItem.url" alt="图片">
    </a>
    <div class="text-wrap">
      <h2>{{courseItem.title.substring(0, 24)}}</h2>
      <div class="info-wrap">
        <p class="see"><i class="icon icon-view-show"></i>{{courseItem.count}}次浏览</p>
        <p class="time"><i class="icon icon-time"></i>{{courseItem.time}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable.sass'
.course-list-item
  padding: 12px 12px 0
  &>.img-wrap
    display: block
    padding-bottom: 84px
    position: relative
    width: 100%
    height: 0
    overflow: hidden
    &>img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 84px
  .text-wrap
    margin-top: 6px
    &>h2
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 8px
      color: $color-text-l
    .info-wrap
      margin-top: 11px
      padding-bottom: 6px
      .see,.time
        font-size: $font-size-small
        line-height: $font-size-small + 5px
        color: $color-text
        .icon
          margin-right: 8px

</style>
<script type="text/ecmascript-6">
export default {
  props: {
    courseItem: {
      type: Object,
      default () {
        return {
          id: '',
          url: '',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          count: '24310',
          time: '40分钟前'
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
