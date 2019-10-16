<template>
    <div class="content-header">
        <div class="title-wrap">
            <h1>{{title}}</h1>
            <div class="btn"
                    v-if="backBtn"
                    :class="backBtn.className"
                    @click="backClick(backBtn)"><span
                    class="btn-icon" :class="backBtn.icon"></span>{{backBtn.name}}
            </div>
        </div>
        <div v-show="hasButton" class="button-list">
            <div class="btn"
                    v-for="(btn, index) in buttonList"
                    :class="btn.className"
                    @click="btnClick(btn)"
                    :key="index"><span
                    class="btn-icon" :class="btn.icon"></span>{{btn.name}}
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "content-header",
  props: {
    title: {
      type: String,
      default: ''
    },
    backBtn: {
      type: Object,
      default() {
        return null
      }
    },
    buttonList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    hasButton() {
      return this.buttonList.length
    }
  },
  methods: {
    btnClick(data) {
      this.$emit('triggerBtnClick', data)
    },
    backClick(data) {
      this.$emit('triggerBackClick', data)
    }
  },
  components: {}
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'

.content-header
    display: flex
    justify-content: space-between
    padding-left: 17px
    border-bottom: 1px solid $border-color-base
    .title-wrap
        display: flex
        & > h1
            margin-top: 11px
            padding-bottom: 10px
            font-size: $font-size-normal
            line-height: 24px
            color: $font-color-normal
        & > .btn
            margin-top: 11px
            margin-left: 20px
            width: 68px
            height: 22px
            border: 1px solid $btn-border-color
            border-radius: 24px
            text-align: center
            font-size: $font-size-smer
            line-height: 22px
            background: none
            color: $font-color-primary
            cursor: pointer
            &:hover
                background-color: $font-color-primary-hover
                color: $font-color-white
            &:active
                background-color: $font-color-primary-active
                color: $font-color-white
            &:focus
                outline: none
    .button-list
        display: flex
        padding-right: 12px
        .btn
            display: flex
            align-items: center
            justify-content: center
            margin-top: 11px
            flex: 0 0 58px
            width: 58px
            padding: 0
            font-size: $font-size-smer
            line-height: 22px
            border: 1px solid $btn-border-color
            color: $font-color-primary
            cursor: pointer
            background: none
            border-radius: 24px
            height: 22px
            background-color: $bg-color-white
            & > .btn-icon
                margin-right: 5px
                display: inline-block
                width: 12px
                height: 12px
                background: url(../assets/images/add_btn_icon.png) no-repeat 0 0
            &:hover
                background-color: $font-color-primary-hover
                color: $font-color-white
                & > .btn-icon
                    background: url(../assets/images/add_btn_hover_icon.png) no-repeat 0 0
            &:active, &.active
                background-color: $font-color-primary-active
                color: $font-color-white
                & > .btn-icon
                    background: url(../assets/images/add_btn_hover_icon.png) no-repeat 0 0
            &:focus
                outline: none
</style>
