<template>
    <div class="tab">
      <ul class="tab-list">
        <router-link tag="li" class="tab-item" to="/recommend">
          <div class="tab-item-txt">推荐</div></router-link>
        <router-link tag="li" class="tab-item" to="/singer"><div class="tab-item-txt">歌手</div></router-link>
        <router-link tag="li" class="tab-item" to="/rank"><div class="tab-item-txt">排行</div></router-link>
        <router-link tag="li" class="tab-item" to="/search"><div class="tab-item-txt">搜索</div></router-link>
      </ul>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../../common/sass/variable"
  .tab
    .tab-list
      display: flex
      height: 44px
      font-size: $font-size-medium
      .tab-item
        flex: 1
        text-align: center
        font-size: 0
        &.router-link-active
          .tab-item-txt
            color: $color-theme
            border-color: $color-theme
        .tab-item-txt
          display: inline-block
          padding-bottom: 5px
          font-size: $font-size-medium
          line-height: $font-size-medium
          color: $color-text-l
          border-bottom: 2px solid transparent

</style>
<script type="text/ecmascript-6">
  import recommend from 'components/recommend/recommend'
  import rank from 'components/rank/rank'
  import singer from 'components/singer/singer'
  import search from 'components/search/search'
  export default {
    data () {
      return {}
    },
    components: {
      recommend,
      rank,
      singer,
      search
    }
  }
</script>
