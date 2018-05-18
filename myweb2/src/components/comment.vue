<template>
  <div class="comment-wrap">
    <v-scroll class="form">
      <div class="box">
        <consult-item :itemInfo="list[0]"></consult-item>
      </div>
      <div class="title-header border-bottom-1px">
        <div class="title-wrap active">
          <h2>课程评价</h2>
        </div>
        <div class="title-wrap">
          <h2>课程作业</h2>
        </div>
      </div>
      <div class="comment-box">
        <ul class="star-wrap">
          <li class="star-item">
            <p class="txt">内容评价</p>
            <ul class="star-list">
              <li class="star"><i class="icon-star-empty"></i></li>
              <li class="star"><i class="icon-star-empty"></i></li>
              <li class="star"><i class="icon-star-empty"></i></li>
              <li class="star"><i class="icon-star-empty"></i></li>
              <li class="star"><i class="icon-star-empty"></i></li>
            </ul>
          </li>
        </ul>
      </div>
    </v-scroll>
    <div class="submit">保存</div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.comment-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 48px
  left: 0
  z-index: 10
  .form
    height: 100%
    overflow: hidden
    .box
      padding: 0 15px
      background-color: $color-theme
    .title-header
      position: relative
      margin-top: 10px
      background-color: $color-theme
      display: flex
      .title-wrap
        flex: 1
        font-size: 0
        line-height: 44px
        text-align: center
        &.active
          &>h2
            color: $color-text-l
            border-color: $color-text-red
        &>h2
          display: inline-block
          vertical-align: center
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 30px
          border-bottom: 2px solid transparent
          color: $color-text
  .submit
    position: fixed
    right: 0
    bottom: 0
    left: 0
    z-index: 20
    font-size: $font-size-small-l
    line-height: $font-size-small-l + 34px
    color: $color-theme
    background-color: $color-text-red
    text-align: center
</style>
<script type="text/ecmascript-6">
import consultItem from '@/components/consultitem'
import vScroll from '@/components/scroll'
export default {
  data () {
    return {
      list: [
        {
          id: '1',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        }
      ]
    }
  },
  components: {
    vScroll,
    consultItem
  }
}
</script>
