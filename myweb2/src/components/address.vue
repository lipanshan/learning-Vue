<template>
  <transition name="move">
  <div class="address-wrap">
    <scroll class="address-wrap-scroll" :list="cityData">
      <div class="content">
        <div class="title-wrap">
          <h1 class="address-title border-bottom-1px">{{cityData[0].title}}</h1>
        </div>
        <ul class="city-list-wrap">
          <li v-for="item in cityData[0].city" :class="{'active': currentCity.id === item.id}" @click="selectItem(item)"  class="item" :key="item.id">{{item.name}}</li>
        </ul>
        <div class="title-wrap">
          <h1 class="address-title border-bottom-1px">{{cityData[1].title}}</h1>
        </div>
        <ul class="city-list-wrap">
          <li v-for="item in cityData[1].city" :class="{'active': currentCity.id === item.id}"  @click="selectItem(item)" class="item" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </scroll>
    <div class="mask"></div>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import "../common/sass/mixin.sass"
.address-wrap
  position: relative
  overflow: hidden
  z-index: 1
  transition: all 0.4s
  &.move-enter, &.move-leave-to
    transform: translate3d(0, -100%, 0)
  .mask
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: -1
    background: $color-text-l
    opacity: 0.8
    filter: alpha(opacity=80)
  .address-wrap-scroll
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow: hidden
    z-index: 1
    .content
      background-color: $color-theme
      .title-wrap
        padding-bottom: 5px
        .address-title
          margin-left: 33px
          margin-right: 33px
          padding-left: 2px
          padding-top: 9px
          position: relative
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 30px
          color: $color-text-l
          background-color: $color-theme
      .city-list-wrap
        padding-left: 18px
        padding-right: 18px
        background-color: $color-theme
        overflow: hidden
        .item
          margin: 8px 6px
          float: left
          padding: 0 9px
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 12px
          color: $color-text-l
          border-radius: 25px
          &.active,&:hover
            color: $color-text-red
            background-color: $color-item-bg

</style>
<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
export default {
  props: {
    select: {
      type: [String, Number, Object],
      default () {
        return {
          id: 0,
          name: '北京'
        }
      }
    }
  },
  data () {
    return {
      currentCity: {
        id: 0,
        name: '北京'
      },
      cityData: [
        {
          title: '国内城市',
          city: [
            {
              id: 0,
              name: '北京'
            },
            {
              id: 2,
              name: '上海'
            },
            {
              id: 3,
              name: '天津'
            },
            {
              id: 4,
              name: '扬州'
            },
            {
              id: 5,
              name: '广州'
            },
            {
              id: 6,
              name: '深圳'
            },
            {
              id: 7,
              name: '郑州'
            },
            {
              id: 8,
              name: '太原'
            },
            {
              id: 9,
              name: '杭州'
            },
            {
              id: 10,
              name: '武汉'
            },
            {
              id: 11,
              name: '柳州'
            },
            {
              id: 12,
              name: '贵阳'
            },
            {
              id: 13,
              name: '无锡'
            },
            {
              id: 14,
              name: '兰州'
            },
            {
              id: 15,
              name: '石家庄'
            }
          ]
        },
        {
          title: '国外城市',
          city: [
            {
              id: 101,
              name: '纽约'
            },
            {
              id: 102,
              name: '柏林'
            },
            {
              id: 103,
              name: '阿姆斯特丹'
            },
            {
              id: 104,
              name: '曼谷'
            }
          ]
        }
      ]
    }
  },
  methods: {
    selectItem (item) {
      this.currentCity = Object.assign({}, item)
      this.$emit('select', item)
    }
  },
  components: {
    scroll
  }
}
</script>
