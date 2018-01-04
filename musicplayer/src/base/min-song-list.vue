<template>
  <div class="min-song-list">
    <div v-for="(item, index) in minList" class="min-item">
      <span>{{index + 1}}</span>
      <span v-html="songAndSinger(item)"></span>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"
  @import "../common/sass/mixin"
  .min-song-list
    flex: 1
    display: flex
    flex-direction: column
    justify-content: center
    padding: 0 20px
    height: 100px
    overflow: hidden
    background: $color-highlight-background
    color: $color-text-d
    font-size: $font-size-small
    .min-item
      @include no-wrap()
      line-height: 26px
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      minList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      songAndSinger (item) {
        return `${item.songname}-${item.singername}`
      }
    }
  }
</script>
