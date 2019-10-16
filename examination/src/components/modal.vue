<template>
    <div v-show="show" class="modal-wrap">
      <div class="modal-container">
        <div class="modal-head">
          <slot name="head">
            <h1>{{title}}</h1>
            <span v-if="!disabledClosex" @click="closeModal" class="close"></span>
            <span v-else-if="disabledClosex" class="close"></span>
          </slot>
        </div>
        <div class="modal-body">
          <scroll :listData="list">
            <slot name="body">
              <div class="message-wrap">
                <span class="icon" :class="iconCls"></span>
                <p class="txt"><span class="danger">{{message.danger}}</span>{{message.title}}<span class="danger">{{message.danger2}}</span><span class="subtxt">{{submessage}}</span></p>
              </div>
            </slot>
          </scroll>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <span v-if="!disabledCloseBtn" @click="closeModal" class="cancel-btn">取消</span>
            <span v-else-if="disabledCloseBtn" class="cancel-btn">取消</span>
            <span v-if="!disabledCloseSure" @click="sure" class="confirm-btn">确定</span>
            <span v-else-if="disabledCloseSure" class="confirm-btn">确定</span>
          </slot>
        </div>
      </div>
      <div v-show="show && !disabledCloseBg" @click="closeModal" class="mask"></div>
      <div v-show="show && disabledCloseBg" class="mask"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
export default {
  name: 'modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    iconCls: {
      type: String,
      default: 'icon1'
    },
    message: {
      type: Object,
      default () {
        return {
          title: '确定退出该系统？请慎重操作！',
          danger: '',
          danger2: ''
        }
      }
    },
    submessage: {
      type: String,
      default: ''
    },
    disabledClosex: {
      type: Boolean,
      default: false
    },
    disabledCloseBg: {
      type: Boolean,
      default: false
    },
    disabledCloseBtn: {
      type: Boolean,
      default: false
    },
    disabledCloseSure: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
  },
  methods: {
    closeModal () {
      this.$emit('closeFn')
    },
    sure () {
      this.$emit('sureFn')
    }
  },
  components: {
    scroll
  },
  watch: {
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.modal-wrap
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  overflow: hidden
  z-index: 1000
.modal-container
  position: absolute
  top: 50%
  left: 50%
  /*transform: translate3d(-50%, -50%, 0)*/
  margin-left: -216px
  margin-top: -116px
  z-index: 1050
  display: flex
  flex-direction: column
  border: 1px solid $border-modal
  border-radius: 6px
  overflow: hidden
  box-shadow: 0 0 4px #dfdfdf
  background-color: $color-n
  min-width: 432px
  height: 232px
  .modal-head
    padding: 6px 10px
    display: flex
    &>h1
      flex: 1
      font-size: 12px
      line-height: 24px
      color: $font-color-n
    .close
      margin-top: 4px
      display: block
      width: 14px
      height: 12px
      background: url(../assets/images/close.png) no-repeat 0 0
      background-size: 14px 12px
      cursor: pointer
  .modal-body
    padding: 6px 10px
    flex: 1
    overflow: hidden
    min-width: 410px
    .message-wrap
      padding-top: 26px
      padding-bottom: 40px
      font-size: 0
      white-space: nowrap
      .icon
        margin-left: 25px
        display: inline-block
        vertical-align: middle
        width: 38px
        height: 38px
        background: url(../assets/images/tip-icon-default.png) no-repeat 0 0
        background-size: 38px 38px
      .txt
        margin-left: 10px
        display: inline-block
        vertical-align: middle
        font-size: 12px
        line-height: 24px
        color: $color-m
        .subtxt
          display: block
          font-size: 12px
          line-height: 24px
          color: $color-m
        .danger,.danger2
          color: $color-error
  .modal-footer
    padding: 15px 10px
    border-bottom: 1px solid transparent
    border-top: 1px solid $border-modal
    font-size: 0
    white-space: nowrap
    text-align: right
    .cancel-btn
      display: inline-block
      vertical-align: top
      padding-left: 20px
      padding-right: 20px
      font-size: 12px
      line-height: 30px
      text-align: center
      color: $font-color-n
      border-radius: 4px
      cursor: pointer
      &:hover
        color: $bg-mask
    .confirm-btn
      @extend .cancel-btn
      background-color: $font-color-tel
      color: $color-n
      &:hover
        color: $color-n
        background-color: $color-xxl
.mask
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 1048
  background-color: $bg-mask
  opacity: 0.6
  filter: alpha(opacity=60)
</style>
