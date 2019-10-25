<template>
  <div class="setsystem">
    <div class="wrap reset" @click="switchCurrent('reset')" :class="{'step1': resetCls === 'step1', 'step2': resetCls === 'step2', 'active': currentActive === 'reset'}">
      <div class="icon"></div>
      <p class="title">系统初始化需要3分钟~</p>
      <div class="progress-cls"><div class="progress-bar-cls"></div></div>
      <p class="title success-title">恭喜您，系统初始化完成！({{resetNum}}s)</p>
      <p class="subtitle">上次初始化：{{initTime}}</p>
      <div class="trigger-btn" @click="reset">系统初始化</div>
      <div class="trigger-btn disabled-btn" >正在初始化</div>
    </div>
    <div class="wrap restart" @click="switchCurrent('restart')"  :class="{'step1': restartCls === 'step1', 'step2': restartCls === 'step2', 'active': currentActive === 'restart'}">
      <div class="icon"></div>
      <p class="title">系统重启大约需要2分钟</p>
      <div class="progress-cls"><div class="progress-bar-cls"></div></div>
      <p class="title success-title">恭喜您，系统初始化完成！({{restartNum}}s)</p>
      <p class="subtitle">上次重启：{{restartTime}}</p>
      <div class="trigger-btn" @click="restart">重启设备</div>
      <div class="trigger-btn disabled-btn" >正在重启</div>
    </div>
    <div class="wrap settime" @click="switchCurrent('settime')"  :class="{'active': currentActive === 'settime'}">
      <div class="icon"></div>
      <p class="subtitle">上次设置：{{setTime}}</p>
      <div class="trigger-btn" @click="switchSetTime">时间设置</div>
      <form v-show="setTimeFlag" @click="'return false'">
        <div class="form-group">
          <label>时区</label>
          <at-select class="control-cls" placeholder="请选择" v-model="timeZone">
              <at-option v-for="(item, index) in zoneList" :key="item.zoneValue" :value="`${item.zoneValue},${item.zoneTime}`">{{item.zoneName}}</at-option>
          </at-select>
        </div>
        <div class="form-group">
          <label>时间</label>
          <el-date-picker
            v-model="datePicker"
            type="datetime"
            placeholder="选择日期"
            class="control-cls"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </div>
        <div class="action-wrap">
          <p v-show="settimeMsgFlag" class="message" :class="{'error': setTimeErrorCls}">{{setTimeMsg}}({{setTimeNum}}s)</p>
          <div class="submit-btn" @click="resttime">保存</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import {setReset, setRestart, setResttime, getTimeList} from '@/api/system'
import {signOut} from '../api/login'
const SUCCESS_MSG = '恭喜您，设置完成！'
const FAIL_MSG = '抱歉，设置失败！'
export default {
  name: 'setsystem',
  data () {
    return {
      currentActive: 'reset',
      initTime: '',
      restartTime: '',
      setTime: '',
      timer: null,
      resetCls: '',
      restartCls: '',
      resetNum: 3,
      restartNum: 3,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      setTimeMsg: SUCCESS_MSG,
      setTimeNum: 3,
      setTimeFlag: false,
      settimeMsgFlag: false,
      setTimeErrorCls: false,
      formData: {
        zone: '',
        time: '',
        date: ''
      },
      zoneList: [],
      datePicker: '',
      timeZone: '',
      resttimeFlag: true
    }
  },
  created () {
    this.getTimeInfoList()
  },
  computed: {
    ...mapGetters([
      'mask'
    ])
  },
  methods: {
    getTimeInfoList () {
      getTimeList().then((res) => {
        if (res.ret === 200) {
          this.zoneList = Object.assign({}, res.data.zoneList)
          this.datePicker = `${res.data.date} ${res.data.time}`
          this.initTime = res.initTime.data.LastInitialization
          this.restartTime = res.initTime.data.LastReboot
          this.setTime = res.initTime.data.LastRestTime
          this.$nextTick(() => {
            this.timeZone = `${res.data.zone},${res.data.date} ${res.data.time}`
          })
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    switchCurrent (item) {
      this.currentActive = item
    },
    reset () {
      const that = this
      setReset().then((res) => {
        if (res.ret === 200) {
          this.setMask(true)
          this.resetCls = 'step1'
          this.timer = setTimeout(() => {
            this.resetCls = 'step2'
            this.timeout(3)
          }, 3 * 60 * Math.pow(10, 3))
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    restart () {
      setRestart().then((res) => {
        // console.log(res)
        if (res.ret === 200) {
          this.setMask(true)
          this.restartCls = 'step1'
          this.timer = setTimeout(() => {
            this.restartCls = 'step2'
            this.timeout(3)
          }, 2 * 60 * Math.pow(10, 3))
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    resttime () {
      if (!this.resttimeFlag) {
        return false
      }
      this.resttimeFlag = false
      setResttime(this.formData).then((res) => {
        this.settimeMsgFlag = true
        if (res.ret === 200) {
          this.setTimeErrorCls = false
          this.setTimeMsg = SUCCESS_MSG
          this.timeout(3, 'success')
        } else {
          if (res.ret === 499) {
            this.$router.push({path: '/login'})
          }
          this.setTimeErrorCls = true
          this.setTimeMsg = FAIL_MSG
          this.timeout(3, 'fail')
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    timeout (count, redirect) {
      clearTimeout(this.timer)
      if (count <= 0) {
        this.setMask(false)
        this.resttimeFlag = true
        if (!redirect) {
          this.$router.push({
            path: '/login'
          })
        } else if (redirect === 'success') {
          this.setTimeFlag = false
          this.settimeMsgFlag = false
        } else if (redirect === 'fail') {
          this.settimeMsgFlag = false
        }
        this.setTimeNum = 3
        return false
      }
      this.setTimeNum = count
      count--
      this.timer = setTimeout(() => {
        this.timeout(count, redirect)
      }, 1000)
    },
    switchSetTime () {
      this.setTimeFlag = true
    },
    formatDate (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
    },
    formatNumber (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    ...mapMutations({
      setMask: 'SET_MASK'
    })
  },
  watch: {
    datePicker (n, o) {
      const arr = this.formatDate(n).split(' ')
      this.formData = Object.assign({}, this.formData, {
        time: arr[1],
        date: arr[0]
      })
    },
    timeZone (n, o) {
      const arr = n.split('\,')
        this.formData = Object.assign({}, this.formData, {
          zone: arr[0]
        })
        this.datePicker = arr[1]
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../assets/sass/variable.sass';
  @import '../assets/sass/mixin.sass';
  @keyframes progressMove
    0%
      transform: translateX(0)
    70%
      transform: translateX(154px)
    100%
      transform: translateX(154px)
  .setsystem
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    background-color: $bg-color-l
    &>.wrap
      display: flex
      flex-direction: column
      justify-content: space-between
      margin-right: 18px
      flex: 0 0 260px
      width: 260px
      height: 200px
      border-radius: 8px
      background: $bg-color-n
      border: 1px solid $border-color-s
      &:hover, &.active
        box-shadow: 0 0 4px $border-color-l-active
        border-color: $border-color-l-active
      &.step1, &.step2
        box-shadow: 0 0 4px $border-color-l-active
        border-color: $border-color-l-active
      &>.icon
        flex: 0 0 60px
        margin: 17px auto
        width: 60px
        height: 60px
        background: url(../assets/images/init-icon.png) no-repeat center center
      .progress-cls
        display: none
        flex: 0 0 6px
        position: relative
        margin: 0 auto
        width: 154px
        height: 6px
        overflow: hidden
        background-color: $bg-color-l
        border-radius: 6px
        .progress-bar-cls
          position: absolute
          top: 0
          left: 0
          width: 100px
          height: 6px
          border-radius: 6px
          background: url(../assets/images/progress-bar.png) no-repeat 0 0
          animation: progressMove 2s linear infinite
      .title
        margin-bottom: 0
        font-size: $font-n
        line-height: 24px
        color: $color-n
        text-align: center
        &.success-title
          display: none
      .subtitle
        margin-bottom: 0
        font-size: $font-n
        line-height: 24px
        color: $color-s
        text-align: center
      .trigger-btn
        margin: 11px auto
        width: 120px
        border-radius: 30px
        font-size: $font-n
        line-height: 30px
        text-align: center
        color: $color-xs
        background-color: $btn-bg-n
        cursor: pointer
        &:hover
          background-color: $btn-bg-n-hover
        &:active
          background-color: $btn-bg-n-active
        &.disabled-btn
          display: none
          background-color: $bg-color-l
          color: $color-s
          &:hover
            background-color: $bg-color-l
            color: $color-s
            cursor: default
      &.reset
        &:hover
          &>.icon
            background: url(../assets/images/init-icon-active.png) no-repeat center center
        &.step1
          &>.icon
            background: url(../assets/images/init-icon-active.png) no-repeat center center
        &.step2
          &>.icon
            background: url(../assets/images/success.png) no-repeat center center
      &.restart
        &>.icon
          background: url(../assets/images/restare-icon.png) no-repeat center center
        &:hover
          &>.icon
            background: url(../assets/images/restare-icon-active.png) no-repeat center center
        &.step1
          &>.icon
            background: url(../assets/images/restare-icon-active.png) no-repeat center center
        &.step2
          &>.icon
            background: url(../assets/images/success.png) no-repeat center center
      &.settime
        position: relative
        &>.icon
          background: url(../assets/images/time-icon.png) no-repeat center center
        form
          position: absolute
          top: 0
          right: 0
          bottom: 0
          left: 0
          padding-top: 6px
          background: $bg-color-n
          border-radius: 8px
          .form-group
            margin: 18px 0 0
            display: flex
            &>label
              margin-bottom: 0
              flex: 0 0 53px
              display: block
              padding-right: 5px
              width: 53px
              font-size: $font-n
              line-height: 30px
              text-align: right
            .control-cls
              width: 180px
              height: 30px
              border-color: $border-color-l
              input
                height: 30px
                border-color: $border-color-l
              &.at-select--visible
                box-shadow: 0 0 8px #9dbcf2
              .at-select__selection
                height: 30px
                border-color: $border-color-l
              .at-select__placeholder,.at-select__selected
                display: block
                line-height: 30px
              .at-select__option
                &:hover
                  background-color: $bg-color-n
                  color: $btn-bg-n-hover
                &.at-select__option--selected
                  background-color: $bg-color-n
                  color: $btn-bg-n-active
                  &:hover
                    color: $btn-bg-n-active
              .el-input__inner
                padding-left: 5px
                font-size: $font-n
                line-height: 30px
              .el-input__prefix
                right: 5px
                left: auto
                .el-input__icon.el-icon-time
                  line-height: 30px
                  &::before
                    content: "\E608"
                  line-height: 30px
              .el-input__suffix
                right: 25px
                .el-input__icon
                  line-height: 30px
          .message
            position: absolute
            top: 0
            left: 0
            right: 0
            margin-top: 12px
            font-size: $font-n
            line-height: 32px
            text-align: center
            &.error
              color: $error
          .action-wrap
            position: relative
            padding-top: 52px
            padding-bottom: 15px
            text-align: center
            .submit-btn
              display: inline-block
              vertical-align: top
              width: 120px
              font-size: 12px
              line-height: 30px
              color: $color-xs
              background-color: $btn-bg-n
              border-radius: 30px
              cursor: pointer
              &:hover
                background-color: $btn-bg-n-hover
              &:active
                background-color: $btn-bg-n-active
              &.disabled-cls
                 background-color: $btn-bg-n-disabled
                 color: $color-s
        &:hover ,&.active
          &>.icon
            background: url(../assets/images/time-icon-active.png) no-repeat center center
      &.step1
        .title
          display: none
        .progress-cls
          display: block
        .trigger-btn
          display: none
          &.disabled-btn
            display: block
      &.step2
        .title
          display: none
          &.success-title
            display: block
        .progress-cls
          display: none
        .trigger-btn
          display: none
          &.disabled-btn
            display: block

  .el-time-spinner__item
    display: block
</style>
