<template>
  <scroll class="list-view" :dataList="dataList" :probeType="probeType" @scrollEvent="scrollEvent"
          ref="listView">
    <ul class="list-wrap" ref="listGroup">
      <li v-for="(group, key) in dataList" class="list-group list-group-hook">
        <h2 :data-index="key"  class="list-group-title list-group-title-hook">{{group.title}}</h2>
        <ul>
          <li @click="selectSinger(item)" v-for="item in group.item" class="list-group-item">
            <img v-lazy="item.avatar" alt="头像" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul ref="listShortCut" class="list-shortcut" slot="serialNum"
        @touchstart.stop.prevent="onshortcuttouchstart"
        @touchmove.stop.prevent="onshortcuttouchmove">
      <li v-for="(item, i) in serialList" :data-index="i" :class="{'current': current === i}" class="item item-hook">{{item}}</li>
    </ul>
    <div class="fixed-title-wrap" slot="fixedTitle">
      <h2 ref="fixedTitleTag" class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div v-if="dataList" v-show="!dataList.length" slot="loading" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"

  .list-view
    position: absolute
    width: 100%
    top: 0
    bottom: 0
    overflow: hidden
    background: $color-background
    .list-wrap
      .list-group
        padding-bottom: 30px
        .list-group-title
          height: 30px
          line-height: 30px
          padding-left: 20px
          font-size: $font-size-small
          color: $color-text-l
          background: $color-highlight-background
        .list-group-item
          display: flex
          align-items: center
          padding: 20px 0 0 30px
          .avatar
            width: 50px
            height: 50px
            border-radius: 50%
          .name
            margin-left: 20px
            color: $color-text-l
            font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .fixed-title-wrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import {mixinPlayer} from 'common/js/mixin'
  const FIXEDTITLE_H = 30
  const FIXEDTITLE_TOP = 88
  export default {
    mixins: [mixinPlayer],
    props: {
      dataList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        current: 0,
        probeType: 3,
        scrollY: 0
      }
    },
    created () {
      this.listHeight = []
    },
    computed: {
      serialList () {
        return this.dataList && this.dataList.map((group) => {
          return group.title.substring(0, 1)
        })
      },
      fixedTitle () {
        let list = []
        if (this.dataList) {
          list = this.dataList.map((group) => {
            return group.title
          })
        }
        return list[this.current]
      }
    },
    methods: {
      handlePlayingList (playList) {
        if (this.$refs.listView) {
          let bottom = playList.length ? '60px' : ''
          this.$refs.listView.$el.style.bottom = bottom
          this.$refs.listView.refresh()
        }
      },
      onshortcuttouchstart (ev) {
        let ind = ev.touches[0].target.getAttribute('data-index')
        let el = this.$refs.listGroup.getElementsByClassName('list-group-title-hook')[ind]
        this.activeElem(el)
      },
      onshortcuttouchmove (ev) {
        this.moveEndPlace(ev.touches[0].pageY)
      },
      moveEndPlace (num) {
        let list = this.$refs.listShortCut.getElementsByClassName('item-hook')
        let titleList = this.$refs.listGroup.getElementsByClassName('list-group-title-hook')
        for (let i = 0; i < list.length; i++) {
          let nowElemTop = list[i].getBoundingClientRect().top
          let nowElemBottom = nowElemTop + list[i].getBoundingClientRect().height
          if (nowElemTop < num && nowElemBottom > num) {
            this.activeElem(titleList[i])
          }
        }
      },
      activeElem (elem) {
        if (!elem || !elem.getAttribute('data-index')) {
          return
        }
        let serialNum1 = elem.getAttribute('data-index')
        this.$refs.listView.scrollToElement(elem)
        this.current = Number(serialNum1)
      },
      scrollEvent (pos) {
        this.scrollY = Math.abs(pos.y)
        this._initListHeight()
        this.$nextTick(() => {
          let y = Math.abs(pos.y)
          for (let i = 0; i < this.listHeight.length; i++) {
            let nowLi = this.listHeight[i]
            let nextLi = this.listHeight[i + 1]
            if (nowLi < y && y < nextLi) {
              this.current = i
              return
            }
          }
        })
      },
      _initListHeight () {
        let list = this.$refs.listGroup.getElementsByClassName('list-group-hook')
        this.listHeight.length = 0
        let h = 0
        this.listHeight.push(h)
        for (let i = 0; i < list.length; i++) {
          let liHeight = list[i].getBoundingClientRect().height
          h += liHeight
          this.listHeight.push(h)
        }
      },
      selectSinger (singer) {
        this.$emit('select', singer)
      }
    },
    watch: {
      'scrollY' (n, o) {
        let nextTitle = this.$refs.listGroup.getElementsByClassName('list-group-title-hook')[this.current + 1]
        if (!nextTitle) {
          return
        }
        let pos1 = nextTitle.getBoundingClientRect().top
        let fixedTag = this.$refs.fixedTitleTag
        let dis = pos1 - FIXEDTITLE_TOP
        if (dis < 0) {
          fixedTag.style.transform = 'translate3d(0, 0, 0)'
          return
        }
        if (dis <= FIXEDTITLE_H) {
          fixedTag.style.transform = `translate3d(0, -${FIXEDTITLE_H - dis}px, 0)`
        }
      }
    },
    components: {
      scroll,
      loading
    }
  }
</script>
