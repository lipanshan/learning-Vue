<template>
  <ul class="switch-list">
    <li class="switch-item" @click.stop="switchItem(item, index)" :class="switchActive(index)" v-for="(item, index) in tagList">
      {{item}}
    </li>
  </ul>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../common/sass/variable'
  .switch-list
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      tagList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        selectIndex: 0
      }
    },
    methods: {
      switchItem (item, index) {
        this.$emit('switch', index)
        this.selectIndex = index
      },
      switchActive (index) {
        return this.selectIndex === index ? 'active' : ''
      }
    }
  }
</script>
