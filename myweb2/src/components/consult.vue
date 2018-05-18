<template>
  <transition name="move">
  <div class="consult-wrapper">
    <v-scroll class="consult-box">
      <consult-item @selectItem="selectItem" v-for="item of consultList" :itemInfo="item" :key="item.id"></consult-item>
    </v-scroll>
    <router-view class="consult-detail"></router-view>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.consult-wrapper
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $color-theme
  transition: all 0.4s
  &.move-enter
    transform: translate3d(100%, 0, 0)
  &.move-leave-to
   transform: translate3d(-100%, 0, 0)
  .consult-detail
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 10
  .consult-box
    padding-left: 15px
    padding-right: 15px
    height: 100%
    overflow: hidden
</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
import consultItem from '@/components/consultitem'
export default {
  name: 'consultInfo',
  props: {
    consultList: {
      type: Array,
      default () {
        return [
          {
            id: '1',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '2',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '3',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '4',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '5',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '6',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '7',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '8',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '9',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          },
          {
            id: '10',
            url: './static/image/img1.jpg',
            title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
            see: '24310',
            time: '40分钟前',
            address: '北京 朝阳',
            date: '9月28日 12:00-14:00',
            idAddress: 'consult'
          }
        ]
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    selectItem (data) {
      this.$router.push({
        path: '/consult/consultDeatil'
      })
    }
  },
  components: {
    vScroll,
    consultItem
  }
}
</script>
