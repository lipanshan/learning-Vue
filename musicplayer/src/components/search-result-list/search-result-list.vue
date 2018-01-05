<template>
  <div class="search-result-list">
    <scroll :data="list"
            @
            class="search-list">
      <li class="search-item" v-for="item in list">
        <div class="icon">
          <i :class="iconType(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.name"></p>
        </div>
      </li>
    </scroll>
    <div v-show="!list" class="loading-wrap">
      <loading></loading>
    </div>
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
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      bottom: 0
      transform: translate3d(0, -50%, 0)
</style>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import noResult from 'base/no-result'
  const TYPE_SONG = 0
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      iconType (item) {
        if (item.type === TYPE_SONG) {
          return 'icon-music'
        } else {
          return 'icon-mine'
        }
      }
    },
    components: {
      scroll,
      loading,
      noResult
    }
  }
</script>
