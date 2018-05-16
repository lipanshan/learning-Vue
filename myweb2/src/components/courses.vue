<template>
<keep-alive>
  <transition name="fade">
    <div class="course-wrap">
      <div class="type-wrap border-bottom-1px">
        <div class="search-wrap border-1px">
          <i class="icon icon-search"></i>
          <input placeholder="热门搜索：吴弘志 公益组织管理" type="text" class="search">
        </div>
      </div>
      <div class="type-menu">
        <div class="type-item">
          <p @click="toggleTypes" class="border-right-1px">全部分类<i class="icon icon-cheveron-down"></i></p>
        </div>
        <div class="type-item">
          <p @click="toggloAddress" >全部地区<i class="icon icon-cheveron-down"></i></p>
        </div>
      </div>
      <v-scroll class="list-wrap">
        <li v-for="item in courseList" :list="courseList" :key="item.id">
          <consult-item :itemInfo="item"></consult-item>
        </li>
      </v-scroll>
      <v-address v-if="vAddressFlag" class="select-wrap" @select="selectItem" ref="vAddressWrap"></v-address>
      <v-types v-if="vTypeFlag"
               :typeList="typesData.cntList"
               @select="selectTypes"
               @selectCnt="selectTypesCnt"
               class="select-wrap" ref="vTypesWrap"></v-types>
    </div>

  </transition>
  </keep-alive>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/mixin'
.course-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 0
  z-index: 10
  width: 100%
  overflow: hidden
  transition: all 0.4s
  &.fade-enter
    transform: translate3d(100%, 0, 0)
  &.fade-leave-to
    transform: translate3d(-100%, 0, 0)
  .type-wrap
    position: relative
    padding: 15px 20px
    background-color: $color-theme
    z-index: 40
    .search-wrap
      position: relative
      display: -webkit-box
      display: -moz-box
      display: -ms-flexbox
      display: -webkit-flex
      display: flex
      z-index: 1
      &::after
        border-radius: 8px
      &>.icon
        margin-left: 16px
        margin-right: 14px
        font-size: $font-size-medium-m
        line-height: $font-size-medium-m + 14px
        color: $color-text
        font-weight: 600
      .search
        padding-bottom: 1px
        -webkit-box-flex: 1
        -moz-box-flex: 1
        -ms-flex: 1
        -webkit-flex: 1
        flex: 1
        border: none
        outline: none
        background: $color-theme
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 14px
        color: $color-text-l
  .type-menu
    position: relative
    z-index: 40
    display: -webkit-flex
    display: flex
    display: -webkit-box
    display: -moz-box
    display: -ms-flexbox
    background-color: $color-theme
    .type-item
      padding-top: 11px
      padding-bottom: 11px
      position: relative
      -webkit-flex: 1
      -webkit-box-flex: 1
      -moz-box-flex: 1
      -ms-flex: 1
      flex: 1
      &>p
        position: relative
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 4px
        text-align: center
        color: $color-text-l
        &>.icon
          margin-left: 5px
          color: $color-text
  .list-wrap
    position: absolute
    top: 100px
    right: 0
    bottom: 0
    left: 0
    z-index: 10
    margin-top: 10px
    padding-left: 15px
    padding-right: 15px
    background-color: $color-theme
    overflow: hidden
    &>li
      position: relative
  .select-wrap
    position: absolute
    top: 100px
    right: 0
    bottom: 0
    left: 0
    z-index: 30

</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
import consultItem from '@/components/consultitem'
import vAddress from '@/components/address'
import vTypes from '@/components/types'
export default {
  name: 'courseInfo',
  data () {
    return {
      vTypeFlag: false,
      vAddressFlag: false,
      courseList: [
        {
          id: 1,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空1',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 2,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空2',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 3,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空3',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 4,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空4',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 5,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空5',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 6,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空6',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 7,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空7',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 8,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空8',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 9,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空9',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: 10,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空10',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        }
      ],
      typesData: {
        cntList: [
          {
            title: '公益沙龙',
            list: [
              '公益管理',
              '公益内容',
              '公益分类'
            ]
          },
          {
            title: '行业分析',
            list: [
              '公益管理',
              '企业管理',
              '综合应用',
              '行业分析',
              '实施方法',
              '竞争对手'
            ]
          },
          {
            title: '商业培训',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '公益沙龙11',
            list: [
              '公益管理',
              '公益内容',
              '公益分类'
            ]
          },
          {
            title: '行业分析22',
            list: [
              '公益管理',
              '企业管理',
              '综合应用',
              '行业分析',
              '实施方法',
              '竞争对手'
            ]
          },
          {
            title: '商业培训33',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训44',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训55',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训66',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训77',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训88',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          },
          {
            title: '商业培训99',
            list: [
              '公益管理',
              '公共资源',
              '综合应用',
              '企业形象',
              '实施方法'
            ]
          }
        ]
      }
    }
  },
  methods: {
    toggloAddress () {
      this.vTypeFlag = false
      this.vAddressFlag = !this.vAddressFlag
    },
    selectItem (data) {
      console.log(data)
    },
    toggleTypes () {
      this.vAddressFlag = false
      this.vTypeFlag = !this.vTypeFlag
    },
    selectTypes (data) {
      console.log(data)
    },
    selectTypesCnt (data) {
      console.log(data)
    }
  },
  components: {
    vScroll,
    consultItem,
    vAddress,
    vTypes
  }
}
</script>
