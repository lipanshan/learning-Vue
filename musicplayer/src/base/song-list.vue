<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(item, index)" v-for="(item, index) in list" class="item">
        <div v-show="rankIconShow" class="rank">
          <i class="icon" :class="rankIconCss(index)" v-html="rankIconTxt(index)"></i>
        </div>
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"
  @import "../common/sass/mixin"

  .song-list
    &>ul
      padding-left: 20px
      padding-right: 20px
      .item
        display: flex
        align-items: center
        box-sizing: border-box
        height: 64px
        font-size: $font-size-medium
        .rank
          flex: 0 0 25px
          width: 25px
          margin-right: 30px
          text-align: center
          .icon
            display: inline-block
            width: 25px
            height: 24px
            background-size: 25px 24px
            &.icon0
              @include bg-image('first')
            &.icon1
              @include bg-image('second')
            &.icon2
              @include bg-image('third')
          .text
            color: $color-theme
            font-size: $font-size-large
        .content
          flex: 1
          line-height: 20px
          overflow: hidden
          .name
            @include no-wrap()
            color: $color-text
          .desc
            @include no-wrap()
            margin-top: 4px
            color: $color-text-d
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      rankIconShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      getDesc (song) {
        return `${song.singer}·${song.album}`
      },
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      rankIconCss (index) {
        let str = index <= 2 ? `icon${index}` : 'text'
        return str
      },
      rankIconTxt (index) {
        return index > 2 ? (index + 1) : ''
      }
    }
  }
</script>
