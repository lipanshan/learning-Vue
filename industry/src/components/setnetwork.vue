<template>
  <div class="setnetwork">
    <form v-show="isShow" @submit="'return false'">
      <div class="form-group paddingt22">
        <div class="label-txt"><span class="require-icon">*</span>网卡</div>
        <div class="network-wrap">
          <div v-for="(item, index) in formData" :key="item.name" class="network" :class="{'active': formData[current].name === item.name, 'unconnect': item.status === '0'}" @click="selectTag(index)">
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="form-group paddingt22 paddingb30">
        <div class="label-txt"><span class="require-icon">*</span>上网方式</div>
        <div class="radio-group">
          <label><at-radio :checked="formData[current].type === 'static'"
                           v-model="formData[current].type" name="type"
                           label="static" ></at-radio><span>静态IP上网</span></label>
          <label><at-radio :checked="formData[current].type === 'dhcp'"
                           v-model="formData[current].type" name="type"
                           label="dhcp" ></at-radio><span>动态IP上网</span></label>
        </div>
      </div>
      <div class="form-group paddingb30">
        <div class="label-txt"><span class="require-icon">*</span>IP地址</div>
        <IpInput v-model="formData[current].ip" :disabled="formData[current].type === 'dhcp'"
                 @change="ipChangeHandle"
                 class="input-groups"
                 :class="{'error': formData[current].ipError && formData[current].type === 'static'}"></IpInput>
        <p v-show="formData[current].ipError && formData[current].type === 'static'" class="error-message">请填写IP地址</p>
      </div>
      <div class="form-group paddingb30">
        <div class="label-txt"><span class="require-icon">*</span>子网掩码</div>
        <IpInput v-model="formData[current].mask"
                 :disabled="formData[current].type === 'dhcp'"
                 @change="maskChangeHandle" class="input-groups"
                 :class="{'error': formData[current].maskError && formData[current].type === 'static'}"></IpInput>
        <p v-show="formData[current].maskError && formData[current].type === 'static'" class="error-message">请填写子网掩码</p>
      </div>
      <div class="form-group paddingb30">
        <div class="label-txt"><span class="require-icon"></span>网关</div>
        <IpInput v-model="formData[current].gateway" :disabled="formData[current].type === 'dhcp'" class="input-groups"></IpInput>
      </div>
      <div class="form-group paddingb30">
        <div class="label-txt"><span class="require-icon">*</span>DNS</div>
        <IpInput v-model="formData[current].dns"
                 @change="dnsChangeHandle"
                 class="input-groups"
                 :class="{'error': formData[current].dnsError}"></IpInput>
        <p v-show="formData[current].dnsError" class="error-message">请填写DNS</p>
      </div>
      <div class="form-group paddingb30">
        <div class="label-txt"><span class="require-icon"></span>备用DNS</div>
        <IpInput v-model="formData[current].dns_back" class="input-groups"></IpInput>
      </div>
      <div class="form-action">
        <div class="submit-btn" @click="saveForm">保存 <span v-show="saveMsg.show" class="save-message" :class="{'fail': !saveMsg.status}">{{saveMsg.title}}<span>({{time}}S)</span></span></div>
      </div>
    </form>
    <div class="loadingDiv text-center" v-show="!isShow">
      <div v-show="!nothingFlag" class="loading-data-img"></div>
      <p v-show="!nothingFlag" class="loading-data-txt">加载中...</p>
      <div v-show="nothingFlag" class="loading-data-txt"><div class="not-data"><div class="not-data-img"></div><p class="not-data-txt">请求超时，请稍后再试~</p></div></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getNetworkInfo, submitForm} from '@/api/network'
import IpInput from '@/components/ipinput'
const TIMEOUT_TIME = 3
const SUCCESS_MSG = '恭喜您，保存完成'
const FAIL_MSG = '抱歉，保存失败'
export default {
  name: 'setnetwork',
  data () {
    return {
      current: 0,
      formData: [
        {
          name: '',
          type: 'static',
          ip: '',
          gateway: '',
          mask: '',
          dns: '',
          dns_back: '',
          ipError: false,
          maskError: false,
          dnsError: false
        }
      ],
      saveMsg: {
        show: false,
        status: true,
        title: SUCCESS_MSG
      },
      timer: null,
      time: 3,
      saveFlag: true,
      isShow: false,
      nothingFlag: false
    }
  },
  created () {
    this.getNetworkInfos()
    this.isShow = false
    this.nothingFlag = false
  },
  methods: {
    getNetworkInfos () {
      getNetworkInfo().then((res) => {
        if (res.ret === 200) {
          this.isShow = true
          const arr = []
          for (let key of res.data) {
            arr.push(Object.assign({}, key, {
              ipError: false,
              maskError: false,
              dnsError: false
            }))
          }
          this.formData = arr
        } else if (res.ret === 499) {
          this.$router.push('/login')
        }
      }).catch((msg) => {
        this.nothingFlag = true
        console.log(msg)
      })
    },
    timeout (num) {
      clearTimeout(this.timer)
      this.time = num
      if (num <=0) {
        this.saveFlag = true
        this.$set(this.saveMsg, 'show', false)
        return false
      }
      num--
      this.timer = setTimeout(() => {
        this.timeout(num)
      }, 1000)
    },
    checkedIP (ip) {
      const arr = ip.split('.')
      let result = false
      for (let key of arr) {
        if (key === '') {
          result = true
        }
      }
      return result
    },
    selectTag (index) {
      this.current = index
    },
    ipChangeHandle (e) {
      this.$set(this.formData, this.current, Object.assign({}, this.formData[this.current], {
        ipError: this.checkedIP(e)
      }))
    },
    maskChangeHandle (e) {
      this.$set(this.formData, this.current, Object.assign({}, this.formData[this.current], {
        maskError: this.checkedIP(e)
      }))
    },
    dnsChangeHandle (e) {
      this.$set(this.formData, this.current, Object.assign({}, this.formData[this.current], {
        dnsError: this.checkedIP(e)
      }))
    },
    saveForm () {
      if (this.formData[this.current].ipError ||
        this.formData[this.current].maskError ||
        this.formData[this.current].dnsError ||
        !this.saveFlag
      ) {
        return false
      }
      this.saveFlag = false
      submitForm(this.formData[this.current]).then((res) => {
        this.saveMsg = Object.assign({}, this.saveMsg, {
          show: true
        })
        if (res.ret === 200) {
          this.saveMsg = Object.assign({}, this.saveMsg, {
            status: true,
            title: SUCCESS_MSG
          })
          //保存后没有返回数据，手动更新页面数据
          this.getNetworkInfos(this.current)
        } else {
          if (res.ret === 499) {
            this.$router.push({path: '/login'})
          } else if (res.ret === 401) {
            this.saveMsg = Object.assign({}, this.saveMsg, {
              title: res.msg
            })
          } else {
            this.saveMsg = Object.assign({}, this.saveMsg, {
              title: FAIL_MSG
            })
          }
          this.saveMsg = Object.assign({}, this.saveMsg, {
            status: false
          })
        }
        this.timeout(TIMEOUT_TIME)
      })
    }
  },
  components: {
    IpInput
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/sass/variable.sass';
@import '../assets/sass/mixin.sass';
.setnetwork
  padding: 0 22px
  border-radius: 4px
  .form-group
    position: relative
    margin-bottom: 0
    display: flex
    align-items: center
    &.paddingt22
      padding-top: 22px
    &.paddingt30
      padding-top: 30px
    &.paddingb30
      margin-bottom: 30px
    .label-txt
      flex: 0 0 78px
      font-size: $font-n
      line-height: 30px
      color: $color-n
      width: 78px
      .require-icon
        display: inline-block
        vertical-align: middle
        margin-right: 4px
        color: $error
    .network-wrap
      display: flex
      flex: 1
      .network
        position: relative
        padding-left: 50px
        display: flex
        flex: 0 0 160px
        margin-right: 18px
        height: 56px
        border: 1px solid $border-color-l
        border-radius: 8px
        box-shadow: 0 0 4px #c9c9c9
        cursor: pointer
        .name
          padding: 0
          margin-top: auto
          margin-bottom: auto
          font-size: $font-n
          line-height: 54px
          color: $color-n
          &::before
            content: ""
            position: absolute
            left: 0
            top: 0
            margin: 15px 10px 0 10px
            display: block
            width: 31px
            height: 27px
            background: url(../assets/images/network-icon1.png) no-repeat 0 0
        &:hover, &:focus
          box-shadow: 0 0 4px #4381e6
        &.active
          border-color: $border-color-l-active
          box-shadow: 0 0 4px #4381e6
          .name
            &::before
              content: ""
              position: absolute
              left: 0
              top: 0
              margin: 15px 10px 0 10px
              display: block
              width: 31px
              height: 27px
              background: url(../assets/images/network-icon1-active.png) no-repeat 0 0
        &.unconnect
          .name
            &::before
              content: ""
              position: absolute
              left: 0
              top: 0
              margin: 15px 10px 0 10px
              display: block
              width: 31px
              height: 27px
              background: url(../assets/images/network-icon2.png) no-repeat 0 0
          &:hover, &:focus
            box-shadow: 0 0 4px #4381e6
          &.active
            border-color: $border-color-l-active
            box-shadow: 0 0 4px #4381e6
            .name
              &::before
                content: ""
                position: absolute
                left: 0
                top: 0
                margin: 15px 10px 0 10px
                display: block
                width: 31px
                height: 27px
                background: url(../assets/images/network-icon2-active.png) no-repeat 0 0
    .radio-group
      display: flex
      &>label
        display: block
        margin: 0 24px 0 0
        font-size: 0
        cursor: pointer
        .at-radio__inner
          border-color: #949494
          &:after
           background-color: #616161
        &>input
          margin: 0 5px 0 0
          display: inline-block
          vertical-align: middle
          width: 16px
          height: 16px
        &>span
          display: inline-block
          vertical-align: middle
          font-size: $font-n
          color: $color-n
    .input-groups
      position: relative
      width: 164px
      height: 30px
      border: 1px solid $border-color-m
      border-radius: 4px
      font-size: 0
      white-space:nowrap
      &.error
        border-color: $error
        box-shadow: 0 0 4px #dedcdd
    .error-message
      position: absolute
      left: 0
      top: 100%
      margin-left: 78px
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
      &>.input
        @extend input
  .form-action
    padding: 10px 0 150px 107px
    .submit-btn
      position: relative
      width: 100px
      font-size: $font-n
      line-height: 32px
      text-align: center
      color: $color-xs
      border-radius: 32px
      cursor: pointer
      background-color: $btn-bg-n
      &:hover
        background-color: $btn-bg-n-hover
      &.active
        background-color: $btn-bg-n-active
      .save-message
        position: absolute
        top: 0
        left: 100%
        margin-left: 15px
        font-size: $font-n
        line-height: 32px
        color: $color-m
        white-space: nowrap
        &::before
          content: ""
          margin-right: 5px
          display: inline-block
          vertical-align: middle
          width: 14px
          height: 14px
          background: url(../assets/images/save-success.png) no-repeat 0 0
        &.fail
          color: $error
          &::before
            content: ""
            margin-right: 5px
            display: inline-block
            vertical-align: middle
            width: 14px
            height: 14px
            background: url(../assets/images/danger-icon.png) no-repeat 0 0
  .loading-data-txt 
    .not-data-txt 
      border: none
</style>
