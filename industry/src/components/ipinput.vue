<template>
  <div class="ip-input" :class="{'focus': focusFlag}">
    <div v-show="!disabled" class="my-input" :class="[className]">
      <div class="input"><input maxlength="3" @focus="focusHandle(0, $event)"
                                @blur="blurHandle(0, $event)"
                                @input="inputHandle(0, $event)"
                                @change="changeHandle(0, $event)"
                                :value="value0"
                                type="text" ref="inputWrap0"></div>
      <span class="point"></span>
      <div class="input"><input maxlength="3"
                                @focus="focusHandle(1, $event)"
                                @blur="blurHandle(1, $event)"
                                @input="inputHandle(1, $event)"
                                @change="changeHandle(1, $event)"
                                :value="value1"
                                type="text" ref="inputWrap1"></div>
      <span class="point"></span>
      <div class="input"><input maxlength="3"
                                @focus="focusHandle(2, $event)"
                                @blur="blurHandle(2, $event)"
                                @input="inputHandle(2, $event)"
                                @change="changeHandle(2, $event)"
                                :value="value2"
                                type="text" ref="inputWrap2"></div>
      <span class="point"></span>
      <div class="input"><input maxlength="3"
                                @focus="focusHandle(3, $event)"
                                @blur="blurHandle(3, $event)"
                                @input="inputHandle(3, $event)"
                                @change="changeHandle(3, $event)"
                                :value="value3"
                                type="text" ref="inputWrap3"></div>
    </div>
    <div v-show="disabled" class="my-input">
      <div class="input">{{value0}}</div>
      <span class="point"></span>
      <div class="input">{{value1}}</div>
      <span class="point"></span>
      <div class="input">{{value2}}</div>
      <span class="point"></span>
      <div class="input">{{value3}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ipinput',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: ''
      },
      className: {
        type: String,
        default: ''
      }
    },
    model: {
      prop: 'value'
    },
    data () {
      return {
        focusFlag: false
      }
    },
    computed: {
      value0 () {
        const arr = this.value.split('.')
        return arr[0] ? arr[0] : ''
      },
      value1 () {
        const arr = this.value.split('.')
        return arr[1] ? arr[1] : ''
      },
      value2 () {
        const arr = this.value.split('.')
        return arr[2] ? arr[2] : ''
      },
      value3 () {
        const arr = this.value.split('.')
        return arr[3] ? arr[3] : ''
      }
    },
    methods: {
      ipValidate (ip) {
        if (ip === '') {
          return ''
        }
        return /^([0-9]|[1-9]\d|1[0-9][0-9]|2[0-5][0-5])$/.test(ip) ? ip : '255'
      },
      formatIp (val, index) {
        const arr = []
        for (let i = 0; i < 4; i++) {
          if (i === index ) {
            arr.push(this.ipValidate(val))
          } else {
            arr.push(this.ipValidate(this[`value${i}`]))
          }
        }
        return arr.join('.')
      },
      focusHandle (index, e) {
        this.focusFlag = true
        this.$emit('focus', this.formatIp(e.target.value, index))
      },
      blurHandle (index, e) {
        this.focusFlag = false
        this.$emit('blur', this.formatIp(e.target.value, index))
      },
      inputHandle (index, e) {
        const txt = this.formatIp(e.target.value, index)
        this.$emit('input', txt)
        if (index < 3 && this.ipValidate(e.target.value).length >= 3) {
          this.$refs[`inputWrap${index + 1}`].focus()
        }
      },
      changeHandle (index, e) {
        this.$emit('change', this.formatIp(e.target.value, index))
      }
    }
  }
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/sass/variable.sass';
@import '../assets/sass/mixin.sass';
.ip-input
  .my-input
    display: flex
    .input
      flex: 1
      padding: 2px 4px
      font-size: $font-n
      line-height: 24px
      color: $color-n
      text-align: center
      &>input
        display: block
        width: 100%
        font-size: $font-n
        line-height: 24px
        color: $color-n
        text-align: center
        border: none
        outline: none
    .point
      flex: 0 0 2px
      display: block
      margin-top: 13px
      width: 2px
      height: 2px
      background-color: $color-n
      border-radius: 50%
  &.focus
    box-shadow: 0 0 4px #dedcdd
</style>
