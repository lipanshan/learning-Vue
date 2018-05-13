<template>
  <div class="address-wrap">
    <div class="mask"></div>
    <h1 class="address-title border-bottom-1px">{{cityData[0].title}}</h1>
    <ul class="city-list">
      <li v-for="item in cityData[0].city" class="item" :key="item.id">{{item.name}}</li>
    </ul>
    <h1 class="address-title">{{cityData[1].title}}</h1>
    <ul class="city-list">
      <li v-for="item in cityData[1].city" class="item" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../commom/sass/mixin'
.address-wrap
  position: relative
  z-index: 1
  background-color: $color-theme
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
  .address-title
    position: relative
    padding: 9px 32px 0
    font-size: $font-size-small-l
    line-heiht: $font-size-small-l + 15px
    color: $color-text-l
    text-indent: 2px
  .city-list
    padding-top: 5px
</style>
<script type="text/ecmascript-6">
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
  }
}
</script>
