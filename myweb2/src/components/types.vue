<template>
  <transition name="fade">
  <div class="types-wrapper">
    <div class="left">
      <scroll class="scroll-content-wrap" ref="scrollTitleWrap">
        <div v-for="(item, index) of typeList"
             @click.stop="selectTitle(item, index)"
             :class="{'active': selectCurrentIndex === index}"
             class="title-item border-1px title-item-hook" :key="item.title">
          <h2>{{item.title}}</h2>
        </div>
      </scroll>
    </div>
    <div class="right">
      <scroll class="scroll-content-wrap"
              :list="typeList"
              :probeType="3"
              @onscroll="scroll"
              ref="scrolllistWrap">
        <div v-for="item of typeList"
             class="list-item list-item-hook" :key="item.title">
          <div class="head-title">
            <span class="point"></span>
            <h2>{{item.title}}</h2>
            <span class="line border-bottom-1px"></span>
          </div>
          <ul class="ul-list">
            <li v-for="title of item.list" @click="selectTypes(item, title)" class="ul-list-item border-1px" :key="title">
              {{title}}
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.types-wrapper
  padding-top: 2.5px
  display: -webkit-box
  display: -webkit-flex
  display: -moz-box
  display: -ms-flexbox
  display: flex
  z-index: 1
  background-color: $color-types-bg
  transition: all 0.4s
  &.fade-enter,&.fade-leave-to
    transform: translate3d(0, -100%, 0)
  .left
    position: relative
    -webkit-flex: 0 0 95px
    -moz-flex: 0 0 95px
    -ms-flex: 0 0 95px
    flex: 0 0 95px
    width: 95px
    .scroll-content-wrap
      height: 100%
      overflow: hidden
      .title-item
        position: relative
        font-size: 0
        text-align: center
        height: 60px
        line-height: 60px
        background-color: $color-type-bg2
        &:after
          margin-top: -1px
          left: -1px
        &>h2
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 6px
          color: $color-text-l
          text-align: left
        &.active
          background: none
          &:after
            border-right-color: transparent
            border-bottom-color: $color-text-red
          &>h2
            color: $color-text-red
  .right
    -webkit-box-flex: 1
    -webkit-flex: 1
    -webkit-box-flex: 1
    -moz-box-flex: 1
    -ms-flex: 1
    flex: 1
    .scroll-content-wrap
      padding-left: 15px
      padding-right: 21px
      height: 100%
      overflow: hidden
      .list-item
        padding-top: 19px
        .head-title
          display: -webkit-box
          display: -webkit-flex
          display: -moz-box
          display: -ms-flexbox
          display: flex
          .point
            margin-top: 20px
            display: block
            -webkit-flex: 0 0 7px
            -moz-flex: 0 0 7px
            -ms-flex: 0 0 7px
            flex: 0 0 7px
            width: 7px
            height: 7px
            background: $color-text-red
            border-radius: 50%
          &>h2
            padding-left: 7px
            padding-right: 7px
            font-size: $font-size-small-l
            line-height: $font-size-small-l + 32px
            color: $color-text
          .line
            margin-top: 22px
            position: relative
            display: block
            -webkit-box-flex: 1
            -webkit-flex: 1
            -webkit-box-flex: 1
            -moz-box-flex: 1
            -ms-flex: 1
            flex: 1
            height: 0
        .ul-list
          font-size: 0
          .ul-list-item
            position: relative
            display: inline-block
            vertical-align: top
            width: 80px
            font-size: $font-size-small-l
            line-height: 38px
            text-align: center
            color: $color-text
            background-color: $color-theme
</style>
<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
export default {
  props: {
    typeList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectCurrentIndex: 0
    }
  },
  methods: {
    selectTitle (item, index) {
      let list = this.$refs.scrolllistWrap.$el.querySelectorAll('.list-item-hook')
      this.$refs.scrolllistWrap.scrollToElem(list[index], 200)
      this.selectCurrentIndex = index
      this.$emit('select', {item: item, index: index})
    },
    selectTypes (item, index) {
      this.$emit('selectCnt', {item: item, index: index})
    },
    scroll (pos) {
      let list = this.$refs.scrolllistWrap.$el.querySelectorAll('.list-item-hook')
      let maxLen = this.$refs.scrolllistWrap.scroll.scrollerHeight - this.$refs.scrolllistWrap.scroll.wrapperHeight
      if (Math.abs(pos.y) >= maxLen) {
        return false
      }
      this.selectCurrentIndex = this._countFn(list)
    },
    _countFn (list) {
      let len = list.length - 1
      for (let i = 0; i < len; i++) {
        let rect = list[i].getBoundingClientRect()
        if (rect.y > 0) {
          return i
        }
      }
    }
  },
  components: {
    scroll
  }
}
</script>
