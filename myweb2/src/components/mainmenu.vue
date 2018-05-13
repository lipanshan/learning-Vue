<template>
    <div class="menu-wrap">
      <ul class="list">
        <li class="list-item" :class="{'active': currentIndex === 0}" @click="selectItem(0)">
          <i class="icon icon-home"></i>
          <h2>首页</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 1}" @click="selectItem(1)">
          <i class="icon icon-books"></i>
          <h2>课程</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 2}" @click="selectItem(2)">
          <i class="icon icon-book"></i>
          <h2>咨询</h2>
        </li>
        <li class="list-item" :class="{'active': currentIndex === 3}" @click="selectItem(3)">
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
      currentIndex: 0
    }
  },
  methods: {
    selectItem (index) {
      this.currentIndex = index
      this.$emit('select', index)
    }
  }
}
</script>
