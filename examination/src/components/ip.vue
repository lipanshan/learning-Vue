<template>
  <div class="input-group">
    <div v-if="require" class="input-groups" :class="{'focus': elFocus, 'error': error}">
      <input type="text" v-model="ipArr[0]" @focus="focusFn" @blur="blurFn" @input="blurFn" class="first" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[1]" @focus="focusFn" @blur="blurFn" @input="blurFn" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[2]" @focus="focusFn" @blur="blurFn" @input="blurFn" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[3]" @focus="focusFn" @blur="blurFn" @input="blurFn" class="last" maxlength="3">
    </div>
    <div v-else class="input-groups" :class="{'focus': elFocus}">
      <input type="text" v-model="ipArr[0]" @focus="focusFn" @blur="blurFn" @input="blurFn" class="first" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[1]" @focus="focusFn" @blur="blurFn" @input="blurFn" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[2]" @focus="focusFn" @blur="blurFn" @input="blurFn" maxlength="3">
      <span class="point"></span>
      <input type="text" v-model="ipArr[3]" @focus="focusFn" @blur="blurFn" @input="blurFn" class="last" maxlength="3">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ip',
  props: {
    require: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      elFocus: false,
      error: false,
      ipArr: []
    }
  },
  mounted () {
    this.ipArr = this.value.split('.')
  },
  methods: {
    focusFn () {
      this.elFocus = true
      this.$emit('onfocus', this.ipArr)
    },
    blurFn () {
      this.elFocus = false
      if (this.require) {
        this.validate()
      }
      this.$emit('onblur', {data: this.ipArr, error: this.error})
    },
    validate () {
      let result = false
      let arr = []
      for (let item of this.ipArr) {
        if (!/^([1-9]|[1-9]\d|1\d\d|2[1-5][1-5])$/.test(+item)) {
          result = true
        }
        if (item !== '' && !isNaN(item)) {
          arr.push(+item)
        } else {
          arr.push('')
        }
      }
      this.error = result
      this.ipArr = JSON.parse(JSON.stringify(arr))
    }
  },
  watch: {
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../assets/css/variable.sass';
  @import '../assets/css/mixin.sass';
  .input-groups
    position: relative
    width: 164px
    border: 1px solid $border-color-m
    border-radius: 4px
    font-size: 0
    white-space:nowrap
    &.focus
      box-shadow: 0 0 8px #ddd
    &.error
      border-color: #ff3334
    &>input
      display: inline-block
      vertical-align: top
      width: 24px
      border: none
      outline: none
      font-size: $font-n
      line-height: 14px
      padding: 6px 4px
      &.first
        padding-left: 15px
        width: 24px
        border-radius: 4px
      &.last
        padding-right: 15px
        width: 24px
        border-radius: 4px
    .point
      margin-top: 17px
      display: inline-block
      vertical-align: top
      width: 2px
      height: 2px
      border-radius: 50%
      background-color: $font-color-n
      &.focus
        box-shadow: 0 0 4px #dedcdd
      &.error
        border-color: $error
        box-shadow: 0 0 4px #dedcdd
      .error-message
        position: absolute
        left: 0
        top: 100%
        font-size: $font-n
        line-height: 24px
        color: $error
        &::before
        content: ""
        margin-right: 5px
        display: inline-block
        vertical-align: middle
        width: 14px
        height: 14px
        background: url(../assets/images/danger-icon.png) no-repeat 0 0
</style>
