<template>
  <div class="search-result-list">
    <scroll :data="list"
            @scrollEnd="scrollEnd"
            @pullingUp="pullingUp"
            :probeType="3"
            ref="searchList"
            class="search-list">
      <li class="search-item" @click="selectItem(item, index)" v-for="(item, index) in list">
        <div class="icon">
          <i :class="iconType(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.name"></p>
        </div>
      </li>
      <li class="loading-icon" v-show="addPage">
        <loading class="loading-content" :text="null"></loading>
      </li>
    </scroll>
    <div v-show="list && !list.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"

  .search-result-list
    height: 100%
    overflow: hidden
    background-color: $color-background
    .loading-wrap
      position: absolute
      top: 50%
      width: 100%
      transform: translate3d(0, -50%, 0)
    .search-list
      height: 100%
      overflow: hidden
      padding: 0 30px
      .search-item
        display: flex
        align-items: center
        padding-bottom: 20px
        .icon
          flex: 0 0 30px
          width: 30px
          [class^="icon-"]
            font-size: 14px
            color: $color-text-d
        .name
          flex: 1
          font-size: $font-size-medium
          color: $color-text-d
          overflow: hidden
          .text
            @include no-wrap()
      .loading-icon
        position: relative
        display: block
        .loading-content
          position: static
          transform: translate3d(0, 0, 0)
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      bottom: 0
      transform: translate3d(0, -50%, 0)
</style>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll'
  import noResult from 'base/no-result'
  import loading from 'base/loading'
  const TYPE_SONG = 0
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      totalnum: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        addPage: false
      }
    },
    methods: {
      iconType (item) {
        if (item.type === TYPE_SONG) {
          return 'icon-music'
        } else {
          return 'icon-mine'
        }
      },
      scrollEnd () {
        if (this.totalnum !== 0 && this.list.length >= this.totalnum) {
          return false
        } else {
          this.addPage = true
          this.$refs.searchList.refresh()
        }
      },
      pullingUp () {
        this.$emit('pullingUpFn')
      },
      selectItem (item, ind) {
        this.$emit('selectedItem', item, ind)
      },
      closeLoadingIcon () {
        this.addPage = false
      },
      finishPullUpFn () {
        this.$refs.searchList.finishPullUp()
        this.$refs.searchList.refresh()
      }
    },
    components: {
      scroll,
      noResult,
      loading
    }
  }
</script>
