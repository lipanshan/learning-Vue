<template>
  <li>
    <router-link tag="p" :to="`/${data.pathUrl}`" :class="{'dis-cls': data.disCls}">
      <span><i :class="data.icon"></i>{{data.name}}</span>
      <span v-show="data.subset.length" class="crt" :class="{'crt-up': data.isshow}" @click.stop="changeShowFn(data)" ></span>
    </router-link>
    <transition name="move">
      <ul :class="heightNum" v-show="data.isshow">
        <tree v-for="subItem in data.subset" @triggerclick="changeShowFn" :key="subItem.id" :data="subItem" class="menu-item"></tree>
      </ul>
    </transition>
  </li>
</template>

<script type="text/ecmascript-6">
const LI_HEIGHT = 42
  export default {
    name: "tree",
    props: {
      tag: {
        type: String,
        default: 'div'
      },
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {
      heightNum () {
        return `height${LI_HEIGHT * this.data.subset.length}`
      }
    },
    methods: {
      changeShowFn(item) {
        this.$emit('triggerclick', item)
      }
    }
  }
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
  .menu-list
    overflow-y: auto
    -moz-user-select: none
    -webkit-user-select: none
    -ms-user-select: none
    -khtml-user-select: none
    user-select: none
  .menu-item
    margin: 5px 0
    width: 100%
    position: relative
    p
      color:  #879cad
      min-height: 32px
      line-height: 32px
      padding-left: 65px
      padding-right: 10px
      width: 100%
      color: #879cad
      display: flex
      margin: 0
      .crt
        margin-top: 8px
        flex: 0 0 20px
        display: block
        width: 20px
        height: 20px
        top: 8px
        cursor: pointer
        background: url('/static/images/icon.png') no-repeat center center
        background-position: -424px -118px
        &.crt-up
          background-position: -424px -138px
      span
        display: block
        flex: 1
        cursor: pointer
        white-space: nowrap
      a
        padding-left: 0
        color: #8a9cb0
      &.router-link-active
        color: #4580e8
        .icon-homee
          background-position: -102px -26px
        .icon-count
          background-position: -102px -46px
        .icon-pass
          background-position: -102px -66px
        .icon-work
          /*background-position: -102px -86px*/
        .icon-system
          background-position: -102px -106px
        .icon-upsystem
          background-position: -102px -126px
      &.router-link-active.dis-cls
        color: #879cad
        .icon-count
          background-position: -42px -46px
        &+
          display: block
      .admin-icon
        display: inline-block
        width: 17px
        left: 30px
        top: 7px
        height: 17px
        position: absolute
        background: url('/static/images/icon.png') no-repeat center center
      .icon-homee
        background-position: -42px -26px
      .icon-count
        background-position: -42px -46px
      .icon-pass
        background-position: -42px -66px
      .icon-work
        background-position: -42px -86px
      .icon-system
        background-position: -42px -106px
      .icon-upsystem
        background-position: -42px -126px
      a:hover,a:link,a:focus
        text-decoration: none
    ul
      overflow: hidden
      @for $i from 0 through 30
        &.height#{$i * 42}
          max-height: 40px * $i
          overflow: hidden
          &.move-enter-active, &.move-leave-active
            transition: max-height #{$i * 0.12}s linear
          &.move-enter,&.move-leave-to
            max-height: 0
</style>
