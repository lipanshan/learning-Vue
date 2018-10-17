<template>
  <div class="star-list">
    <i v-for="(star, index) of starList" @click="selectStar(star, index)" :key="index" :class="star" class="star"></i>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable.sass'
.star-list
  display: flex
  justify-content: space-between
  &>.star
    font-size: $font-size-medium-s
    line-height: $font-size-medium-s + 34px
    &.icon-star-empty
      color: $color-text
    &.icon-star-half
      color: $color-star-active
    &.icon-star-full
      color: $color-star-active
</style>
<script type="text/ecmascript-6">
const STAR_LEN = 5
export default {
  props: {
    star: {
      type: Object,
      default () {
        return {
          title: null,
          star: 0
        }
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    starList () {
      return this.formatStar(this.star)
    }
  },
  methods: {
    formatStar (star) {
      let arr = []
      let full = Math.floor(star.star)
      let half = Math.round(star.star - full)
      let empty = STAR_LEN - full - half
      for (let i = 0; i < full; i++) {
        arr.push('icon-star-full')
      }
      if (half) {
        arr.push('icon-star-half')
      }
      for (let i = 0; i < empty; i++) {
        arr.push('icon-star-empty')
      }
      return arr
    },
    selectStar (str, index) {
      let num = 0
      num = index
      if (str === 'icon-star-empty') {
        num += 0.5
      } else if (str === 'icon-star-half') {
        num += 1
      }
      let starItem = Object.assign({}, {title: this.star.title, starNum: num})
      this.$emit('setStar', starItem)
    }
  }
}
</script>
