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
            <history-list @delete="deleteSearchHistory" @select="addQuery" :historys="searchHistoryList"></history-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResultList">
      <search-list :list="query" @selectedItem="selectedItem" :totalnum="searchParams.totalnum" ref="searchListWrapper" @pullingUpFn="_addPageFn"></search-list>
      <div class="loading-wrapper" v-show="loadingIcon">
        <loading></loading>
      </div>
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
  import storage from 'good-storage'
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
      this.synchronousStorage()
    },
    data () {
      return {
        query: null,
        hotKey: null,
        val: '',
        timer: null,
        timer2: null,
        loadingIcon: false,
        searchParams: {
          curPage: 1,
          searchTxt: '',
          curNum: 20,
          totalnum: 0
        },
        flag: true,
        searchHistoryList: [],
        searchWord: null
      }
    },
    computed: {
      ...mapGetters([
        'playList'
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
        this.updateStorage(item)
        let addSong = []
        let newSong = searchCreateSong(item)
        addSong = addSong.concat(newSong, this.playList)
        this.selectPlayer({
          'list': addSong,
          'index': 0
        })
      },
      deleteSearchHistory (item, index) {
        let deleteSearch = JSON.parse(storage.get('_search_', null))
        let deleteSong = JSON.parse(storage.get('_song_', null))
        deleteSearch.splice(index, 1)
        deleteSong.splice(index, 1)
        this.searchHistoryList = deleteSearch
        storage.set('_search_', JSON.stringify(deleteSearch))
        storage.set('_song_', JSON.stringify(deleteSong))
      },
      addQuery (itemTxt, index) {
        this.searchWord = itemTxt
        this.queryResult(itemTxt)
      },
      synchronousStorage () {
        if (storage.has('_search_')) {
          let searchArr = JSON.parse(storage.get('_search_', null))
          this.searchHistoryList = searchArr
        }
      },
      updateStorage (item) {
        if (storage.has('_search_')) {
          let searchArr = JSON.parse(storage.get('_search_', null))
          let ind = null
          let deleteNum = 0
          searchArr.forEach((elem, index) => {
            if (elem === this.searchParams.searchTxt) {
              ind = index
            }
          })
          deleteNum = ind !== null ? 1 : 0
          searchArr.splice(ind, deleteNum)
          searchArr.unshift(this.searchParams.searchTxt)
          storage.set('_search_', JSON.stringify(searchArr))
          let songArr = JSON.parse(storage.get('_song_', null))
          songArr.splice(ind, deleteNum)
          songArr.unshift(item)
          storage.set('_song_', JSON.stringify(songArr))
          this.searchHistoryList = searchArr
        } else {
          let searchArr = [this.searchParams.searchTxt]
          storage.set('_search_', JSON.stringify(searchArr))
          let songArr = [item]
          storage.set('_song_', JSON.stringify(songArr))
          this.searchHistoryList = searchArr
        }
      },
      clearSearchHistory () {
        storage.remove('_search_')
        storage.remove('_song_')
        this.searchHistoryList = []
      },
      showConfirm () {
        if (!this.searchHistoryList.length) {
          return false
        }
        this.$refs.confirm.show()
      },
      _addPageFn () {
        if (!this.flag) {
          return false
        }
        this.flag = false
        clearTimeout(this.timer2)
        this.timer2 = setTimeout(() => {
          this.searchParams.curPage += 1
          getQueryInfo(this.searchParams).then((res) => {
            if (res.code === ERROR_NUM) {
              this.searchParams.curPage = res.data.song.curpage
              this.searchParams.searchTxt = res.data.keyword
              this._normalAddSearchResult(res.data)
            }
          })
          this.flag = true
        }, 1000)
      },
      _getQueryInfo (txt) {
        clearTimeout(this.timer)
        if (!txt) {
          this.query = null
          return false
        }
        this.flag = true
        this.timer = setTimeout(() => {
          this.loadingIcon = true
          getQueryInfo(this.searchParams).then((res) => {
            if (res.code === ERROR_NUM) {
              this._normalSearchResultInfo(res.data)
              this.searchParams.totalnum = res.data.song.totalnum
            }
          })
        }, 600)
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
      _normalSearchResultInfo (data) {
        this.query = data.song.list ? data.song.list : null
        this.loadingIcon = false
      },
      _normalAddSearchResult (data) {
        this.query = data.song.list ? this.query.concat(data.song.list) : this.query
        this.$refs.searchListWrapper.closeLoadingIcon()
        this.$refs.searchListWrapper.finishPullUpFn()
      },
      ...mapActions([
        'selectPlayer'
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
