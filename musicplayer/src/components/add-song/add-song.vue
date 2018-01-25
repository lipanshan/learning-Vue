<template>
  <transition name="move">
    <div class="add-song" v-show="showFlag">
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ></search-box>
      </div>
      <div class="shortcut" >
        <div class="list-wrapper">
          <switches :tagList="subTitle" @switch="tagSwitch"></switches>
          <scroll class="list-scroll" v-show="switchList" :data="searchSongList">
            <transition-group name="list" tag="div">
              <div v-for="(songItem, index) in searchSongList" class="list-item" :key="songItem.id">
                <span class="text">{{songItem.name}}</span>
                <span class="delete"><i class="icon-delete"></i></span>
              </div>
            </transition-group>
          </scroll>
          <scroll class="list-scroll" v-show="!switchList" :data="searchWordList">
            <transition-group name="list" tag="div">
              <div v-for="(wordItem, i) in searchWordList" class="list-item" :key="i">
                <span class="text">{{wordItem}}</span>
                <span class="delete"><i class="icon-delete"></i></span>
              </div>
            </transition-group>
          </scroll>
        </div>
      </div>
      <!--<div class="search-result">-->
      <!--</div>-->
    </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"
  .add-song
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 400
    background-color: $color-background
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme
    .search-box-wrapper
      margin: 20px
    .shortcut
      position: absolute
      left: 0
      right: 0
      top: 124px
      bottom: 60px
      .list-wrapper
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        background-color: $color-background
      .list-scroll
        height: 100%
        overflow: hidden
        .list-item
          padding: 20px 30px
          display: flex
          align-items: center
          height: 40px
          line-height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .text
            flex: 1
            @include no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .delete
            @include extend-click()
            font-size: $font-size-small
            color: $color-theme
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
      .tip-title
        text-align: center
        padding: 18px 0
        font-size: 0
        .icon-ok
          font-size: $font-size-medium
          color: $color-theme
          margin-right: 4px
        .text
          font-size: $font-size-medium
          color: $color-text
</style>
<script type="text/ecmascript-6">
  import searchBox from 'base/search-box'
  import switches from 'base/switches'
  import scroll from 'base/scroll'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        showFlag: false,
        subTitle: ['最近播放', '搜索历史'],
        switchList: true
      }
    },
    created () {
      this._initList()
    },
    computed: {
      ...mapGetters([
        'searchSongList',
        'searchWordList'
      ])
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      tagSwitch (index) {
        if (index === 0) {
          this.switchList = true
        } else {
          this.switchList = false
        }
      },
      _initList () {
        this.loadSearchHistorySong()
        this.loadSearchHistoryWord()
      },
      ...mapActions([
        'loadSearchHistorySong',
        'loadSearchHistoryWord'
      ])
    },
    components: {
      searchBox,
      switches,
      scroll
    }
  }
</script>
