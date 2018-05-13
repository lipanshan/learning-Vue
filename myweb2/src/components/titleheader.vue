<template>
  <div class="title-header">
    <h2>{{title}}</h2>
    <div class="right-txt">
      <p @click.stop="more">{{subtitle}}</p>
      <i @click.stop="more" class="icon icon-cheveron-right"></i>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../common/sass/variable.sass'
  .title-header
    display: -webkit-box
    display: -moz-box
    display: -ms-flexbox
    display: -webkit-flex
    display: flex
    &>h2,&>.right-txt
      -webkit-box-flex: 1
      -webkit-flex: 1
      -moz-box-flex: 1
      -ms-flex: 1
      flex: 1
    &>h2
      padding-left: 16px
      font-size: $font-size-medium-m
      line-height: $font-size-medium-m + 6px
      color: $color-text-red
    &>.right-txt
      padding-right: 16px
      text-align: right
      font-size: 0
      color: $color-text
      &>p, &>.icon
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 9px

</style>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: [Number, String],
      default: ''
    },
    subtitle: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    more () {
      this.$emit('moreInfo')
    }
  }
}
</script>
