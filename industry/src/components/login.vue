<template>
  <div class="login">
    <div class="login-content">
      <div class="login-icon"><img :src="loginUrl" alt=""></div>
      <h1>工控智能分析系统<span class="version">v1.0</span></h1>
      <form class="form" @submit="'return false'" @keyup.enter="formSubmit">
        <div class="form-group"><div class="input-wrap"><input type="text" placeholder="账号" @blur="account(formData.username)" v-model="formData.username" minlength="5" maxlength="15" autocomplete="off" v-focus></div></div>
        <div class="form-group" ><div class="input-wrap"><input type="password" placeholder="密码" @blur="account(formData.password)" minlength="8" maxlength="16" v-model="formData.password" autocomplete="off"></div><div v-show="accountMsg" class="error-message">{{errorMsgTxt}}</div></div>
          <div class="form-group"><div class="input-wrap" :class="{'error-cls': vcodeMsg}"><input type="text" placeholder="验证码" maxlength="6" @blur="validateVcode" class="vcode-input" v-model="formData.vcode"></div><div class="vcode">
            <img :src="vcodeUrl" alt="">
            <div @click="updataVcode" class="refresh-btn"></div></div><div v-show="vcodeMsg" class="error-message">{{vcodeErrorMsgTxt}}</div></div>
        <div class="form-action">
          <div @click="formSubmit" class="submit">登录</div>
        </div>
        <div class="message">如无法登陆系统请联系客服:400-660-8866</div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import {getVcode, submitForm} from "@/api/login"
const VCODE_TXT = '验证码错误'
const ERROR_TXT = '请检查账号和密码是否正确'
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: '',
        vcode: ''
      },
      vcodeUrl: 'static/images/logo.png',
      loginUrl: 'static/images/logo.png',
      accountMsg: false,
      vcodeMsg: false,
      errorMsgTxt: '',
      vcodeErrorMsgTxt: ''
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'avatar',
      'leftMenu'
    ])
  },
  created () {
    this.updataVcode()
  },
  methods: {
    updataVcode () {
      this.vcodeUrl = getVcode()
    },
    account (data) {
      if (data !== undefined) {
        return false
      }
      if (this.formData.username.length < 5 || this.formData.username.length > 15 || this.formData.password.length < 8 || this.formData.password.length > 16) {
        this.accountMsg = true
        this.errorMsgTxt = ERROR_TXT
      } else {
        this.accountMsg = false
      }
    },
    validateVcode () {
      if (this.formData.vcode.length >= 4 && this.formData.vcode.length <= 6) {
        this.vcodeMsg = false
      } else {
        this.vcodeMsg = true
      }
      this.vcodeErrorMsgTxt = VCODE_TXT
    },
    formSubmit () {
      const that = this
      this.account()
      this.validateVcode()
      if (this.accountMsg || this.vcodeMsg) {
        return false
      }
      submitForm(this.formData).then((res) => {
        if (res.ret === 200) {
          this.setUsername(res.data.username)
          window.localStorage.setItem('username', res.data.username)
          this.$router.push({
            path: '/admin/home'
          })
        } else if (res.ret === 422 || res.ret === 400) {
          that.vcodeMsg = true
        } else if (res.ret === 423) {
          that.accountMsg = true
          that.errorMsgTxt = '用户和密码不匹配'
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    ...mapActions([
      'setUsername',
      'setAvatar',
      'setLeftMenu'
    ])
  },
  directives: {
    focus: {
      inserted (e, d, n)  {
        e.focus()
      }
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import '../assets/sass/variable.sass';
  @import '../assets/sass/mixin.sass';
  .login
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    min-width: 400px
    min-height: 400px
    height: 100%
    background: radial-gradient(circle, #533dc6 0, #0b306d 175px, #011e40 356px, #011e40 1920px) #011e40
    &::after
      content: ""
      display: block
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0, rgba(246, 246, 246, 0.1) 100%)
      z-index: 10
    .login-content
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      margin-left: 190px
      width: 300px
      height: 356px
      text-align: center
      border-radius: 8px
      background-color: $bg-color-n
      z-index: 20
      &::before
        content: ""
        display: block
        position: absolute
        top: 0
        left: -406px
        margin-top: 0
        width: 380PX
        height: 330PX
        background: url(../assets/images/login-left.png) no-repeat 0 0
        background-size: 380PX 330PX
        @media screen and (min-width:1200px)
          width: 414px
          height: 358PX
          background-size: 414px 358PX
          left: -440px
          top: -30px
      .login-icon
        margin: 21px auto 0
        width: 134px
        &>img
          display: block
          width: 134px
          height: 18px
      &>h1
        position: relative
        margin: 10px auto 23px
        width: 252px
        font-size: $font-l
        line-height: 28px
        color: $color-m
        text-align: center
        .version
          display: inline-block
          vertical-align: top
          margin-left: 5px
          font-size: $font-n
          line-height: 26px
          color: $color-s
          font-family: Arial
        &::before
          content: ""
          display: block
          position: absolute
          top: 0
          left: 0
          margin-top: 14px
          width: 25px
          height: 1px
          background-color: $border-color-n
        &::after
          content: ""
          diplay: block
          position: absolute
          top: 0
          right: 0
          margin-top: 14px
          height: 1px
          width: 25px
          background-color: $border-color-n
      .form
        padding: 0 25px
        .form-group
          position: relative
          margin-bottom: 0
          padding-bottom: 24px
          display: flex
          .input-wrap
            flex: 1
            border-radius: 4px
            &>input
              width: 100%
              height: 30px
              padding: 0 5px
              font-size: $font-n
              line-height: 30px
              border: 1px solid $border-color-n
              border-radius: 4px
              &:focus
                border-radius: 4px
          .vcode-input
            width: 120px
          .vcode
            margin-left: 5px
            display: flex
            &>img
              display: block
              width: 70px
              height: 30px
            .refresh-btn
              width: 30px
              height: 30px
              cursor: pointer
              border-radius: 4px
              text-align: center
              background: url(../assets/images/refresh.png) no-repeat 6px 6px $refresh-bg
          .error-cls
            input
              border: 1px solid $error !important
          .error-message
            position: absolute
            bottom: 0
            left: 0
            padding-left: 21px
            font-size: $font-n
            line-height: 24px
            color: $color-error
            &:before
              content: ""
              display: block
              position: absolute
              top: 5px
              left: 2px
              width: 14px
              height: 14px
              background: url(../assets/images/danger-icon.png) no-repeat 0 0
        .form-action
          padding-top: 2px
          padding-bottom: 12px
          .submit
            display: block
            padding: 0
            width: 100%
            height: 34px
            background-color: $btn-bg-n
            border-radius: 34px
            color: $color-xs
            font-size: $font-l
            line-height: 32px
            cursor: pointer
            &:hover
              background-color: $btn-bg-n-hover
            &:active
              background-color: $btn-bg-n-active
        .message
          font-size: $font-n
          line-height: 36px
          color: $color-note
          text-align: center
</style>
