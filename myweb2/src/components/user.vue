<template>
  <transition name="move">
  <div class="user-wrap">
    <v-scroll>
      <div class="avatar-wrap">
        <div class="avatar-box">
          <img :src="userInfo.url" alt="头像">
        </div>
        <h1>{{userInfo.name}}</h1>
        <div @click="goBack" class="back">
          <p class="back-txt">个人信息</p>
          <i class="icon icon-cheveron-right"></i>
        </div>
      </div>
      <ul class="user-list">
        <li v-for="item of consultList" :key="item.id" class="user-item">
          <consult-item :itemInfo="item"></consult-item>
          <div class="button-group">
            <router-link :to="{path: 'registerinfo'}" @click="selectButton('基本信息', item)" class="button active border-1px" append>基本信息</router-link>
            <router-link :to="{ path: 'commentinfo' }" class="button border-1px" append>评价/作业</router-link>
            <router-link :to="{path: 'certificateinfo'}" class="button border-1px" append>证书</router-link>
          </div>
          <div class="line"></div>
        </li>
      </ul>
    </v-scroll>
    <transition name="fade">
      <keep-alive>
        <router-view class="user-router"></router-view>
      </keep-alive>
    </transition>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.user-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 20
  background-color: $color-theme
  transition: all 0.4s
  &.move-enter
    transform: translate3d(100%, 0, 0)
  &.move-leave-to
    transform: translate3d(-100%, 0, 0)
  .user-router
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 100
    background-color: $color-theme-bg
    transition: all 0.4s
    overflow: hidden
    &.fade-enter
      transform: translate3d(100%, 0, 0)
    &.fade-leave-to
      transform: translate3d(-100%, 0, 0)
  &>.scroll-wrap
    height: 100%
    overflow: hidden
  .avatar-wrap
    position: relative
    background: url(../common/image/avatar-bg.jpg) no-repeat 0 0
    padding-bottom: 64%
    height: 0
    overflow: hidden
    .avatar-box
      margin: 69px auto 0
      width: 95px
      height: 95px
      border-radius: 50%
      border: 5px solid $color-theme
      &>img
        width: 95px
        height: 95px
        border-radius: 50%
    &>h1
      font-size: $font-size-medium-m
      line-height: $font-size-medium-m + 20px
      color: $color-theme
      text-align: center
    .back
      position: absolute
      left: 0
      top: 0
      right: 0
      z-index: 20
      color: $color-theme
      font-size: 0
      text-align: right
      .back-txt
        display: inline-block
        vertical-align: top
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 28px
        color: $color-theme
      .icon
        @extend .back-txt
        margin-right: 20px
  .user-list
    padding-left: 15px
    padding-right: 15px
    background-color: $color-theme
    .user-item
      padding: 8px 0
      .line
        margin-left: -15px
        margin-right: -15px
        height: 10px
        background-color: $color-theme-bg
      .button-group
        padding: 8px 0
        height: 23px
        font-size: 0
        white-space: nowrap
        text-align: right
        .button
          position: relative
          margin-right: 11px
          margin-left: 11px
          display: inline-block
          vertical-align: top
          width: 79px
          height: 23px
          font-size: $font-size-small
          line-height: $font-size-small + 11px
          color: $color-text-red
          text-align: center
          border-radius: 24px
          &:after
            border-radius: 24px
            border-color: $color-text-red
          &.active
            color: $color-theme
            background-color: $color-text-red
            &:after
              border: none
</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
import consultItem from '@/components/consultitem'
export default {
  name: 'userCenter',
  data () {
    return {
      userInfo: {
        url: './static/image/avatar.jpg',
        name: '牧歌'
      },
      consultList: [
        {
          id: '1',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: '2',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: '3',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: '4',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: '5',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        },
        {
          id: '6',
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
  methods: {
    selectButton (txt, data) {
      if (txt === '基本信息') {

      } else if (txt === '评论作业') {

      } else if (txt === '证书') {

      }
    },
    goBack () {
      console.log('个人信息')
    }
  },
  components: {
    consultItem,
    vScroll
  }
}
</script>
