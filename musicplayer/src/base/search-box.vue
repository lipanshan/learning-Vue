<template>
  <a class="search-box" :class="{'focus': focusStatus}">
    <i @click="seek" class="icon-search"></i>
    <input ref="searchTag" @input.lazy="query" @blur="_blur" @focus="_focus" v-model="search" class="box box-hook" :placeholder="placeholder"/>
    <i @click="clear" v-show="search" class="icon-dismiss"></i>
  </a>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../common/sass/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    &.focus
      border: 1px solid $color-theme
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &:focus
       outline: none
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        search: '',
        focusStatus: false
      }
    },
    methods: {
      clear () {
        this.search = ''
        this.$emit('clearFn')
      },
      blur () {
        this.$refs.searchTag.blur()
      },
      focus () {
        this.$refs.searchTag.focus()
      },
      query () {
        this.$emit('queryFn', this.search)
      },
      seek () {
        this.$emit('searchFn', this.search)
      },
      _blur () {
        this.focusStatus = false
      },
      _focus () {
        this.focusStatus = true
      }
    }
  }
</script>
