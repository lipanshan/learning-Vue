<template>
    <div class="input-wrap" :class="cls" ref="inputWrap">
      <input
             :type="type"
             :name="name"
             :maxlength="maxLen"
             :minlength="minLen"
             :placeholder="placeholder"
             :disabled="disabled"
             :readonly="readyOnly"
             v-model="vals"
             @input="inputFn"
             @blur="blurFn" >
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'base-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    maxLen: {
      type: [String, Number],
      default: ''
    },
    minLen: {
      type: [String, Number],
      default: ''
    },
    cls: {
      type: String,
      default: ''
    },
    val: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    focusMsg: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readyOnly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vals: this.val,
      clsVal: ''
    }
  },
  computed: {
  },
  mounted () {
    this.autoFocusFn()
  },
  methods: {
    autoFocusFn () {
      this.$nextTick(() => {
        const input = this.$refs.inputWrap.querySelector('input')
        if (this.focusMsg) {
          input.focus()
        }
      })
    },
    inputFn () {
      let val = this.$refs.inputWrap.querySelector('input').value
      this.$emit('inputFun', val)
    },
    blurFn () {
      let val = this.$refs.inputWrap.querySelector('input').value
      this.$emit('blurFun', val)
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/css/variable.sass'
@import '../assets/css/mixin.sass'
.input-wrap
  position: relative
  border: 1px solid $color-xl
  border-radius: 4px
  overflow: hidden
  &>input
    float: left
    display: block
    width: 100%
    font-size: 12px
    line-height: 14px
    padding: 8px 14px
    box-sizing: border-box
    &::-ms-clear
      display: none
  &.right::after
    content: ""
    display: block
    position: absolute
    right: 4px
    top: 50%
    margin-top: -6px
    width: 8px
    height: 4px
    border-bottom: 1px solid $color-xxxl
    border-left: 1px solid $color-xxxl
    transform: rotate(-45deg)
    z-index: 5
  &.require::after
    content: ""
    display: none
  &.require
    border-color: $color-error
    &>input
      outline: none
</style>
