<template>
  <div class="history-list" :data="historys">
    <div v-for="(item, index) in historys" class="history-item">
      <div class="name">
        <p class="text" @click="selectCurItem(item, index)" v-html="item"></p>
      </div>
      <div class="icon">
        <i @click="deleteItem(item, index)" class="icon-delete"></i>
      </div>
    </div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../../common/sass/variable"
  @import "../../common/sass/mixin"

  .history-list
    height: 100%
    overflow: hidden
    background-color: $color-background
    .history-item
      display: flex
      align-items: center
      padding-bottom: 20px
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          @include no-wrap()
      .icon
        position: relative
        flex: 0 0 14px
        .icon-delete
          position: absolute
          left: -10px
          top: -10px
          padding: 8px
          font-size: 14px
          color: $color-text-d
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      historys: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    methods: {
      selectCurItem (item, index) {
        this.$emit('select', item, index)
      },
      deleteItem (item, index) {
        this.$emit('delete', item, index)
      }
    }
  }
</script>
