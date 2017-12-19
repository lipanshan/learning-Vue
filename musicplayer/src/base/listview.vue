<template>
  <scroll class="list-view" :data="data" :probeType="probeType" @scrollEvent="scrollEvent" ref="listView">
    <ul class="list-wrap" ref="listGroup">
      <li v-for="(group, key) in data" class="list-group list-group-hook">
        <h2 :data-index="key"  class="list-group-title list-group-title-hook">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.item" class="list-group-item">
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
  </scroll>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"

  .list-view
    position: relative
    width: 100%
    height: 100%
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
    .list-fixed
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
  export default {
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        current: 0,
        probeType: 3
      }
    },
    created () {
      this.listHeight = []
    },
    mounted () {
      this.$nextTick(() => {
        this._initListHeight()
      })
    },
    computed: {
      serialList () {
        return this.data && this.data.map((group) => {
          return group.title
        })
      }
    },
    methods: {
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
        let serialNum1 = elem.getAttribute('data-index')
        this.$refs.listView.scrollToElement(elem)
        this.current = Number(serialNum1)
      },
      scrollEvent (pos) {
        let y = Math.abs(pos.y)
        for (let i = 0; i < this.listHeight.length; i++) {
          let nowLi = this.listHeight[i]
          let nextLi = this.listHeight[i + 1]
          if (nowLi < y && y < nextLi) {
            this.current = i
            return
          }
          if (!nextLi && nowLi < y) {
            this.current = i
            return
          }
        }
      },
      _initListHeight () {
        let list = this.$refs.listGroup.getElementsByClassName('list-group-hook')
        let h = 0
        this.listHeight.push(h)
        for (let i = 0; i < list.length; i++) {
          let liHeight = list[i].getBoundingClientRect().height
          h += liHeight
          this.listHeight.push(h)
        }
      }
    },
    components: {
      scroll
    }
  }
</script>
