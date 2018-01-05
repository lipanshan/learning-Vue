<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @clearFn="clearCnt" @queryFn="queryResult" @searchFn="searchResult"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" >
      <scroll :data="hotKey" ref="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="selectHotKey(key)" v-for="key in hotKey" class="item">
                <span v-html="key.k"></span>
              </li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <!--<search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>-->
          </div>
        </div>
      </scroll>
      <div v-show="!hotKey" class="loading-wrap">
        <loading></loading>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <search-list v-show="query" :list="query"></search-list>
    </div>
    <!--<confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>-->
    <router-view></router-view>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .loading-wrap
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: 100
        background-color: $color-background
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              @include extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
<script type="text/ecmascript-6">
  import searchBox from 'base/search-box'
  import {getQueryInfo, getHotSearchWords} from 'api/search'
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import searchList from 'components/search-result-list/search-result-list'
  const ERROR_NUM = 0
  export default {
    created () {
      this._getHotSearchWords()
    },
    data () {
      return {
        query: null,
        hotKey: null,
        val: ''
      }
    },
    methods: {
      queryResult (txt) {
        this.query = null
        this._getQueryInfo(txt)
      },
      searchResult (txt) {
        console.log(txt, 'searchResult')
      },
      selectHotKey (item) {
        this.$refs.searchBox._data.search = item.k
        this._getQueryInfo(item.k)
      },
      clearCnt () {
        this.query = null
      },
      _getQueryInfo (txt) {
        getQueryInfo(txt).then((res) => {
          this._normalSearchResultInfo(res.data)
        })
      },
      _getHotSearchWords () {
        getHotSearchWords().then((res) => {
          if (res.code === ERROR_NUM) {
            if (res.data.hotkey.length > 15) {
              this.hotKey = res.data.hotkey.slice(0, 15)
            } else {
              this.hotKey = res.data.hotkey
            }
          }
        })
      },
      _normalSearchResultInfo (list) {
        if (list.song && list.song.list) {
          this.query = list.song.list
        } else {
          this.query = null
        }
      }
    },
    components: {
      searchBox,
      scroll,
      loading,
      searchList
    }
  }
</script>
