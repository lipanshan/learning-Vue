<template>
  <transition name="fade">
    <v-scroll class="home-wrap" ref="vscrollWrapper">
      <div class="header">
        <slider v-if="sliderList.length" :pages="sliderList" :sliderinit="sliderinit">></slider>
      </div>
      <div class="header-title-wrap">
        <header-titlt :title="title[0]" :subtitle="subtitle[0]" @moreInfo="moreInfo"></header-titlt>
      </div>
      <ul class="consult-wrap">
        <li v-for="item in consultList" :key="item.id">
          <consult-item :itemInfo="item"></consult-item>
        </li>
      </ul>
      <div class="course-header">
        <header-titlt :title="title[1]" :subtitle="subtitle[0]" @moreInfo="moreCourseInfo"></header-titlt>
      </div>
      <div class="course-list-wrap course-wrap-hook">
        <ul class="list">
          <li v-for="item in consultList" :key="item.id">
            <course-item :courseItem="item"></course-item>
          </li>
        </ul>
      </div>
    </v-scroll>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/mixin.sass'
.home-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  transition: all 0.4s
  overflow: hidden
  &.fade-enter
    transform: translate3d(100%, 0, 0)
  &.fade-leave-to
   transform: translate3d(-100%, 0, 0)
  .header
    position: relative
    height: 200px
    .slider-pagination.slider-pagination-bullets
      height: 8px
      .slider-pagination-bullet
        width: 4px
        height: 4px
        border-radius: 0
      .slider-pagination-bullet.slider-pagination-bullet-active
        background: $color-text-red
  .header-title-wrap
    padding-top: 14px
    background-color: $color-theme
  .consult-wrap
    padding-left: 15px
    padding-right: 15px
    background-color: $color-theme
  .course-header
    margin-top: 10px
    padding-top: 16px
    background-color: $color-theme
  .course-list-wrap
    margin-bottom: 16px
    width: 100%
    overflow: hidden
    font-size: 0
    background-color: $color-theme
    .list
      padding-top: 12px
      display: inline-block
      vertical-align: top
      font-size: 0
      background-color: $color-theme
      white-space: nowrap
      &>li
        margin-right: 5px
        margin-left: 5px
        width: 186px
        display: inline-block
        vertical-align: top
        box-shadow: 2px 2px  5px $color-text
        white-space: normal
</style>
<script type="text/ecmascript-6">
import slider from 'vue-concise-slider'
import vScroll from '@/components/scroll'
import headerTitlt from '@/components/titleheader'
import consultItem from '@/components/consultitem'
import courseItem from '@/components/courseitem'
import Bscroll from 'better-scroll'
export default {
  name: 'homePage',
  data () {
    return {
      sliderList: [
        {
          style: {
            background: 'url(./static/image/slider1.jpg) no-repeat 0 0',
            backgroundSize: '100% 200px'
          }
        },
        {
          style: {
            background: 'url(./static/image/slider1.jpg) no-repeat 0 0',
            backgroundSize: '100% 200px'
          }
        },
        {
          style: {
            background: 'url(./static/image/slider1.jpg) no-repeat 0 0',
            backgroundSize: '100% 200px'
          }
        },
        {
          style: {
            background: 'url(./static/image/slider1.jpg) no-repeat 0 0',
            backgroundSize: '100% 100%'
          }
        }
      ],
      sliderinit: {
        currentPage: 0,
        thresholdDistance: 50,
        thresholdTime: 100,
        autoplay: 2000,
        loop: true,
        direction: 'horizontal',
        infinite: 1,
        slidesToScroll: 1,
        timingFunction: 'ease',
        duration: 300
      },
      title: [
        '咨询',
        '课程'
      ],
      subtitle: [
        '查看全部'
      ],
      consultList: [
        {
          id: 1,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空1',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: false
        },
        {
          id: 2,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空2',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: false
        },
        {
          id: 3,
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空3',
          count: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: false
        }
      ],
      scroll: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this._initCourseList()
      })
    }, 20)
  },
  methods: {
    moreInfo () {
      console.log('查看更多1')
    },
    moreCourseInfo () {
      console.log('moreCourseInfo')
    },
    _initCourseList () {
      let el = this.$refs.vscrollWrapper.$el.querySelector('.course-wrap-hook')
      if (!el) return false
      this.scroll = new Bscroll(el, {
        click: true,
        scrollX: true,
        probeType: 3
      })
    }
  },
  components: {
    vScroll,
    slider,
    headerTitlt,
    consultItem,
    courseItem,
    Bscroll
  },
  watch: {
    'consultList' () {
      if (this.scroll) {
        this.scroll.refresh()
      }
    }
  }
}
</script>
