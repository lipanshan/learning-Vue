<template>
    <div class="menu-wrap">
      <ul class="list">
        <li class="list-item" :class="{'active': currentIndex === 'home'}" @click="selectItem('home')">
          <i class="icon icon-home"></i>
          <h2>首页</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 'course'}" @click="selectItem('course')">
          <i class="icon icon-books"></i>
          <h2>课程</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 'consult'}" @click="selectItem('consult')">
          <i class="icon icon-book"></i>
          <h2>咨询</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 'user'}" @click="selectItem('user')">
          <i class="icon icon-user"></i>
          <h2>我的</h2>
        </li>
      </ul>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../common/sass/mixin.sass'
  .menu-wrap
    .list
      display: -webkit-box
      display: -moz-box
      display: -ms-flexbox
      display: -webkit-flex
      display: flex
      -webkit-justify-content: center
      justify-content: center
      .list-item
        padding-bottom: 7px
        -webkit-box-flex: 1
        box-flex: 1
        -moz-box-flex: 1
        -ms-flex: 1
        -webkit-flex: 1
        flex: 1
        color: $color-text
        &:hover,&.active
          color: $color-text-red
        &>.icon
          margin: 12px auto 0
          display: block
          font-size: $font-size-medium-s
          line-height: $font-size-medium-s
          text-align: center
        &>h2
          font-size: $font-size-small-l
          line-height: 18px
          text-align: center
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      currentIndex: 'home'
    }
  },
  mounted () {
    this._initMenu()
  },
  methods: {
    _initMenu () {
      let hash = window.location.hash.substring(2)
      this.currentIndex = hash
    },
    selectItem (index) {
      this.currentIndex = index
      this.$emit('select', index)
    }
  }
}
</script>
