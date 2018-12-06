<template>
    <label class="radio" :class="{'checked': isDisabled ? '' : (model == value)}">
      <input type="radio" :name="name" :checked="model == value" :value="value" @change="updateStatus"  :disabled="isDisabled" ref="radio">
    </label>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'base-radio',
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    updateStatus () {
      this.$emit('updateRadioStatus', this.$refs.radio.value)
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.radio
  display: block
  width: 20px
  height: 20px
  background: url(../assets/images/radio-unchecked.png) no-repeat 0 0
  &.checked
    background: url(../assets/images/radio-checked.png) no-repeat 0 0
  &.disChecked
    background: url(../assets/images/radio-unchecked.png) no-repeat 0 0
  &>input
    display: none
</style>
