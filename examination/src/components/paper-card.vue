<template>
  <div class="question-card">
    <scroll :listData="list" >
      <h1>{{title}}</h1>
      <div class="timeout-wrap">
        <span class="time-icon"><span></span></span>
        <span class="time-txt">{{timeout}}</span>
      </div>
      <p class="subtitle">答题进度</p>
      <div class="progress-wrap">
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        <div class="progress-num"><span class="current">2</span>/<span class="all">2</span></div>
      </div>
      <div class="line"></div>
      <div class="card-title">
        <span class="card-left-icon"></span>
        <span class="txt">提卡</span>
        <span class="card-right-icon"></span>
      </div>
      <ul class="tag-list">
        <li v-for="(item, index) in list" :key="item.id" @click="selectTag(item)" class="tag-item" :class="{'active': item.active && item.active.length, 'hover': item.current === item.id}">{{index + 1}}</li>
      </ul>
      <div class="status-wrap">
        <div class="status-active"><span class="status-active-icon"></span>已答</div>
        <div class="status"><span class="status-icon"></span>未答</div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
export default {
  name: 'quesCard',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    testTime: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      currentTime: this.testTime,
      timer: null
    }
  },
  computed: {
    currentIndex () {
      return this.index
    },
    timeout () {
      let h = this.padZero(parseInt(this.currentTime / (Math.pow(60, 2) * Math.pow(10, 3))))
      let s = this.padZero(parseInt((this.currentTime % (Math.pow(60, 2) * Math.pow(10, 3))) / (Math.pow(60, 1) * Math.pow(10, 3))))
      let m = this.padZero(parseInt((this.currentTime % (Math.pow(60, 1) * Math.pow(10, 3))) / Math.pow(10, 3)))
      return h + ':' + s + ':' + m
    }
  },
  created () {
    this.getParams()
  },
  mounted () {
    this.timeOutFn()
  },
  methods: {
    getParams () {
      // console.log(this.$route.params)
    },
    padZero (num) {
      return '00'.substring((num + '').length) + num
    },
    timeOutFn () {
      this.timer = setTimeout(() => {
        if (this.currentTime < 0) {
          this.currentTime = 0
          clearTimeout(this.timer)
          return false
        }
        this.currentTime = this.currentTime - Math.pow(10, 3)
        this.timeOutFn()
      }, 1000)
    },
    selectTag (data) {
      this.$emit('clickTag', data)
    }
  },
  components: {
    scroll
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
@import '../assets/css/clock-font.css';

@keyframes clock
  0%
    transform: rotateZ(0deg)

  25%
    transform: rotateZ(-20deg)

  50%
    transform: rotateZ(0deg)

  75%
    transform: rotateZ(20deg)

  100%
    transform: rotateZ(0deg)

.question-card
  height: 100%
  h1
    margin-left: 10px
    margin-right: 10px
    font-size: 12px
    line-height: 24px
    text-align: center
    color: $font-color-n
    border-bottom: 1px dashed $border-color-n
  .timeout-wrap
    margin: 8px 10px 0
    border-radius: 8px
    background: linear-gradient(-90deg, #07c1c0 0, #84e8ce 100%)
    font-size: 0
    white-space: nowrap
    .time-icon
      position: relative
      padding: 12px 14px 12px 12px
      display: inline-block
      vertical-align: top
      &>span
        display: block
        width: 29px
        height: 32px
        background: url(../assets/images/timeout-icon.png) no-repeat 0 0
        transform-origin: center top
        animation: 2s clock linear infinite
    .time-txt
      margin-top: 7px
      margin-right: 18px
      display: inline-block
      vertical-align: top
      font-size: 36px
      line-height: 42px
      text-align: center
      color: $color-l
      font-family: '290-CAI978'
    &.status-danger
      background: linear-gradient(-90deg, #ff9c32 0, #ffc927 100%)
    &.status-error
      background: linear-gradient(-90deg, #ff0602 0, #ff6522 100%)
  .subtitle
    padding-top: 12px
    padding-left: 12px
    font-size: 12px
    line-height: 14px
    color: $color-m
  .progress-wrap
    margin: 0 12px 0
    padding-top: 2px
    display: flex
    font-size: 12px
    line-height: 36px
    color: $color-m
    align-items: center
    .progress
      margin-right: 4px
      position: relative
      flex: 1
      height: 6px
      background-color: $bg-progress
      border-radius: 2px
      overflow: hidden
      .progress-bar
        position: absolute
        top: -100%
        left: 0
        width: 100%
        height: 6px
        background-color: $bg-progress-bar
    .progress-num
      font-size: 12px
      line-height: 32px
      color: $color-m
      &>.all
        margin-left: 4px
      &>.current
        margin-right: 4px
        color: $bg-progress-bar
  .line
    padding-top: 4px
    border-bottom: 1px solid $color-xl
  .card-title
    display: flex
    margin-left: 8px
    margin-right: 8px
    border-bottom: 1px dashed $color-xl
    justify-content: center
    .card-left-icon,.card-right-icon
      margin-top: 12px
      display: block
      width: 54px
      height: 12px
    .card-left-icon
      background: url(../assets/images/card-icon.png) no-repeat 0 0
    &>.txt
      min-width: 56px
      max-width: 104px
      display: block
      font-size: 12px
      line-height: 36px
      text-align: center
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    .card-right-icon
      background: url(../assets/images/card-icon.png) no-repeat right 0
  .tag-list
    padding: 8px 10px
    font-size: 0
    &>.tag-item
      margin: 6px
      display: inline-block
      width: 26px
      border-radius: 4px
      background-color: $color-n
      border: 1px solid $color-xl
      font-size: 12px
      line-height: 26px
      text-align: center
      cursor: pointer
      &:hover, &.hover
        border-color: $font-color-tel
        color: $font-color-tel
      &.active
        border-color: $font-color-tel
        background-color: $font-color-tel
        color: $color-n
  .status-wrap
    padding: 18px 10px 13px
    font-size: 0
    white-space: nowrap
    padding-bottom: 13px
    border-bottom: 1px solid $color-xl
    .status-active
      margin-left: 4px
      display: inline-block
      vertical-align: top
      min-width: 66px
      font-size: 12px
      line-height: 24px
      color: $color-lg
      .status-active-icon
        margin-right: 5px
        display: inline-block
        vertical-align: middle
        width: 10px
        height: 10px
        background-color: $font-color-tel
        border: 1px solid $font-color-tel
    .status
      margin-left: 4px
      display: inline-block
      vertical-align: top
      min-width: 66px
      font-size: 12px
      line-height: 24px
      color: $color-lg
      .status-icon
        margin-right: 5px
        display: inline-block
        vertical-align: middle
        width: 10px
        height: 10px
        background-color: $color-n
        border: 1px solid $color-xl

</style>
