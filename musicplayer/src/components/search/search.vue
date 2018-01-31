<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @clearFn="clearCnt" :searchWord="searchWord"  @queryFn="queryResult"></search-box>
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
            <div v-show="!hotKey" class="loading-wrap">
              <loading></loading>
            </div>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span  class="text">搜索历史</span>
              <span @click.stop="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <history-list @delete="deleteSearchHistory" @select="addQuery" :historys="searchWordList"></history-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResultList">
      <search-list :list="query" @selectedItem="selectedItem" ref="searchListWrapper" @pullingUpFn="_addPageFn"  :addPage="addPageIcon"></search-list>
    </div>
    <confirm ref="confirm" @clearHistory="clearSearchHistory" text="是否清空所有搜索历史" confirmSure="清空"></confirm>
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
          .loading-wrap
            display: block
            background-color: $color-background
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
      .loading-wrapper
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        z-index: 100
        background-color: $color-background
</style>
<script type="text/ecmascript-6">
  import searchBox from 'base/search-box'
  import {getQueryInfo, getHotSearchWords} from 'api/search'
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import searchList from 'components/search-result-list/search-result-list'
  import historyList from 'components/history-list/history-list'
  import {mapGetters, mapActions} from 'vuex'
  import {searchCreateSong} from 'common/js/song'
  import {mixinPlayer} from 'common/js/mixin'
  import confirm from 'base/confirm'
  const ERROR_NUM = 0
  export default {
    mixins: [mixinPlayer],
    created () {
      this._getHotSearchWords()
      this.loadSearchHistoryWord()
    },
    data () {
      return {
        query: null,
        hotKey: null,
        searchParams: {
          curPage: 1,
          searchTxt: '',
          curNum: 20
        },
        searchWord: null,
        pullUpTimer: null,
        addPageIcon: false,
        addPageFlag: true
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'searchWordList',
        'searchSongList'
      ])
    },
    methods: {
      handlePlayingList (playlist) {
        let bottom = playlist.length ? '60px' : ''
        if (this.$refs.shortcutWrapper) {
          this.$refs.shortcutWrapper.style.bottom = bottom
        }
        if (this.$refs.searchResultList) {
          this.$refs.searchResultList.style.bottom = bottom
        }
      },
      queryResult (txt) {
        this.searchParams.searchTxt = txt
        if (!txt) {
          this.clearCnt()
          return false
        }
        this._getQueryInfo(txt)
      },
      selectHotKey (item) {
        this.searchWord = item.k
        this.queryResult(item.k)
      },
      clearCnt () {
        this.searchWord = ''
        this.query = null
      },
      selectedItem (item, index) {
        let addSong = []
        addSong = addSong.concat(item, this.playList)
        this.saveSearchHistoryWord(this.searchWord)
        this.selectPlayer({
          'list': addSong,
          'index': 0
        })
      },
      deleteSearchHistory (item, index) {
        this.deleteSearchHistoryWord(item)
      },
      addQuery (itemTxt, index) {
        this.searchWord = itemTxt
        this.queryResult(itemTxt)
      },
      clearSearchHistory () {
        this.deleteSearchHistoryList()
      },
      showConfirm () {
        if (!this.searchWordList.length) {
          return false
        }
        this.$refs.confirm.show()
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
      _getQueryInfo (txt) {
        this.addPageFlag = true
        this.addPageIcon = false
        this.searchParams.curPage = 1
        getQueryInfo(this.searchParams).then((res) => {
          if (res.code === ERROR_NUM) {
            this._normalSearchResultInfo(res.data)
          }
        })
      },
      _addPageFn () {
        if (!this.addPageFlag) return false
        this.addPageIcon = true
        this.$nextTick(() => {
          this.$refs.searchListWrapper.refresh()
        })
        getQueryInfo(this.searchParams).then((res) => {
          if (res.code === ERROR_NUM) {
            if (res.subcode === ERROR_NUM) {
              this._normalSearchResultInfo(res.data)
            } else {
              this.addPageFlag = false
              this.addPageIcon = false
              this.$refs.searchListWrapper.finishPullUpFn()
            }
          }
        })
      },
      _normalSearchResultInfo (data) {
        let list = []
        data.song.list.forEach((song, index) => {
          list.push(searchCreateSong(song))
        })
        this.query = this.query ? this.query.concat(list) : list
        this.searchParams.curPage += 1
        clearTimeout(this.pullUpTimer)
        this.pullUpTimer = setTimeout(() => {
          this.$nextTick(() => {
            this.addPageIcon = false
            this.$refs.searchListWrapper.finishPullUpFn()
          })
        }, 1000)
      },
      ...mapActions([
        'selectPlayer',
        'loadSearchHistoryWord',
        'deleteSearchHistoryWord',
        'saveSearchHistoryWord',
        'saveSearchHistorySong',
        'deleteSearchHistoryList'
      ])
    },
    components: {
      searchBox,
      scroll,
      loading,
      searchList,
      historyList,
      confirm
    }
  }
</script>
