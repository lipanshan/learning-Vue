<template>
  <div class="home">
    <div class="container">
      <div class="title">瑞星安全教育考试评测系统</div>
      <div class="box">
        <div class="logo"><img src="../assets/images/login-icon.png" alt=""></div>
        <form class="form">
          <div class="form-group">
            <div class="input-wrapper">
              <base-input
                :type="'text'"
                :val="formData[0].accountVal"
                @inputFun="funInput"
                @blurFun="funBlur"
                :placeholder="'账号（用户名/手机号/邮箱）'"
                :name="'acount'"
                :maxLen="26"
                :minLen="5"
                :cls="formData[0].customCls"
                :focusMsg="true"></base-input>
            </div>
            <div class="input-wrapper">
              <base-input
                :type="'password'"
                :placeholder="'用户密码6-20'"
                :name="'password'"
                :maxLen="20"
                :minLen="6"
                :cls="formData[1].customCls"
                @inputFun="funInput2"
                @blurFun="funBlur2"
                ></base-input>
            </div>
            <div v-show="validateCode" class="v-code-wrap">
              <div class="validate-wrap">
                <base-input
                  :placeholder="'验证码'"
                  :name="'validate'"
                  :cls="formData[2].customCls"
                  @inputFun="funInput3"
                  @blurFun="funBlur3"
                ></base-input>
              </div>
              <div class="v-img"><img src="../assets/images/v-code-icon.png" alt=""></div>
              <a href="javascript:;" class="refresh-img"><img src="../assets/images/refresh-icon.png" alt=""></a>
            </div>
            <div class="error-msg">{{isErrorMsg}}</div>
            <div class="submit-group">
              <a href="javascript:;" @click="submitFn" class="submit-btn">登录</a>
            </div>
            <div class="bottom-btn">
              <div class="checkbox"><label class="txt"><input type="checkbox">记住密码</label></div>
              <router-link to="/forgetPassword" class="forget-password">忘记密码</router-link>
            </div>
          </div>
        </form>
      </div>
      <p class="version">Powered by Copyright by Rising V1.0.0.31 &copy;2014-2018</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const baseInput = () => import(/* webpackChunkName: "home" */ '@/components/base-input')
export default {
  name: 'Home',
  data () {
    return {
      formData: [
        {
          accountVal: '',
          customCls: 'require-hook'
        },
        {
          passwordVal: '',
          customCls: 'require-hook'
        },
        {
          validateVal: '',
          customCls: 'validate'
        }
      ],
      isValidate: false,
      isErrorMsg: '',
      count: 0
    }
  },
  computed: {
    validateCode () {
      if (this.count > 3) {
        this.validateCodeFn(this.count)
      }
      return this.count > 3 ? 1 : 0
    }
  },
  methods: {
    funInput (value) {
      const EMAIL_REG = /^\w+@\w+(\.\w+)+$/
      const PHONE_REG = /^1[345789]\d{9}$/
      if (EMAIL_REG.test(value) || PHONE_REG.test(value)) {
        this.formData[0].customCls = 'right'
      } else {
        this.formData[0].customCls = 'require-hook'
      }
    },
    funBlur (value) {
      const EMAIL_REG = /^\w+@\w+(\.\w+)+$/
      const PHONE_REG = /^1[345789]\d{9}$/
      if (EMAIL_REG.test(value) || PHONE_REG.test(value)) {
        this.formData[0].customCls = 'right'
      } else {
        this.formData[0].customCls = 'require-hook require'
      }
    },
    funInput2 (value) {
      if (value.length < 6 || value.length > 20) {
        this.formData[1].customCls = 'require-hook'
      } else {
        this.formData[1].customCls = 'right'
      }
    },
    funBlur2 (value) {
      if (value.length < 6 || value.length > 20) {
        this.formData[1].customCls = 'require-hook require'
      } else {
        this.formData[1].customCls = 'right'
      }
    },
    funInput3 (value) {
      this.formData[2].customCls = value ? 'validate' : 'validate require-hook'
      this.formData[2].validateVal = value
    },
    funBlur3 (value) {
      this.formData[2].customCls = value ? 'validate' : 'validate require-hook require'
      this.formData[2].validateVal = value
    },
    validateCodeFn (count) {
      if (count > 3) {
        this.formData[2].customCls = 'validate require-hook'
      }
    },
    checkFn (list, key) {
      let result = false
      for (let i = 0; i < list.length; i++) {
        if (/require-hook/.test(list[i][key])) {
          result = true
        }
      }
      return result
    },
    submitFn () {
      if (this.checkFn(this.formData, 'customCls')) {
        this.isErrorMsg = '账号或者密码错误'
        this.count = this.count + 1
        return false
      }
      this.isErrorMsg = ''
      window.localStorage.setItem('access_token', true)
      this.$router.replace({
        path: '/paperHome/paperList'
      })
    }
  },
  components: {
    baseInput
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.home
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  min-width: 1000px
  min-height: 420px
  background: -webkit-linear-gradient(45deg, $color-gradient-1, $color-gradient-2)
  background: -o-linear-gradient(45deg, $color-gradient-1, $color-gradient-2)
  background: -moz-linear-gradient(45deg, $color-gradient-1, $color-gradient-2)
  background: linear-gradient(45deg, $color-gradient-1, $color-gradient-2)
.container
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  .title
    position: relative
    font-size: 32px
    line-height: 64px
    padding-bottom: 4px
    color: $color-n
    font-weight: 800
    border-top: 1px solid $color-n
    border-bottom: 1px solid $color-n
    letter-spacing: 3px
    &::after
      content: ""
      position: absolute
      left: 50%
      bottom: -6px
      width: 8px
      height: 8px
      border: 1px dashed $color-n
      transform: translateX(-50%) rotate(-45deg)
    &::before
      content: ""
      position: absolute
      left: 50%
      bottom: -3px
      width: 4px
      height: 4px
      background: $color-n
      transform: translateX(-50%) rotate(-45deg)
  .box
    margin-top: 36px
    display: flex
    height: 248px
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    -ms-border-radius: 6px
    border-radius: 6px
    overflow: hidden
.logo > img
  width: 258px
  height: 248px
.form
  width: 202px
  padding: 0 28px 0 30px
  background-color: $color-n
  .form-group
    display: -webkit-flex
    display: -moz-box-flex
    display: -ms-flexbox
    display: flex
    -webkit-flex-direction: column
    flex-direction: column
    .input-wrapper
      margin-top: 20px
    .submit-group
      width: 200px
      position: relative
      margin-top: 20px
      border: 1px solid $color-xl
      border-radius: 4px
      overflow: hidden
    .submit-group
      margin-top: 0
      border: none
      background-color: $color-xxl
      .submit-btn
        display: block
        padding: 1px
        font-size: 12px
        line-height: 30px
        color: $color-n
        text-align: center
        &.disabled
          background-color: $color-xxxxl
          color: $color-lg
          border-color: $color-xxxxl
          cursor: default
          pointer-events: none
.bottom-btn
  margin-top: 12px
  display: -webkit-flex
  display: -moz-box-flex
  display: -ms-flexbox
  display: flex
  -webkit-justify-content: space-between
  justify-content: space-between
  .checkbox
    &>.txt
      font-size: 12px
      line-height: 20px
      color: $color-m
      cursor: pointer
      &>input
        width: 16px
        height: 16px
        margin-right: 6px
        vertical-align: middle
  .forget-password
    font-size: 12px
    line-height: 20px
    color: $color-xxl
.error-msg
  font-size: 12px
  line-height: 20px
  min-height: 20px
  color: $color-error
  text-indent: 1em
.version
  margin-top: 70px
  font-size: 14px
  line-height: 34px
  text-align: center
  color: $color-n
.v-code-wrap
  margin-top : 20px
  width: 200px
  overflow: hidden
  .validate-wrap
    float: left
    width: 78px
    overflow: hidden
    border-radius: 4px
    .validate
      display: block
      font-size: 12px
      line-height: 14px
      &>input
        display: block
        padding: 8px

  .v-img
    float: left
    margin-left: 24px
    width: 66px
    &>img
      display: block
      width: 66px
      height: 30px
  .refresh-img
    float: left
    width: 28px
    height: 30px
    background-color: $color-btn-refresh
    &>img
      margin-top: 6px
      margin-left: 5px
      display: block
      width: 18px
      height: 18px
</style>
