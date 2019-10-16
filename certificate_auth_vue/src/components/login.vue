<template>
  <div class="login">
    <div class="login-content">
      <div class="login-icon"><i></i> <h1>瑞星证书认证管理系统<span class="version">1.0</span></h1></div>     
      <form class="form" @submit="'return false'" @keyup.enter="formSubmit">
        <div class="form-group">
          <div class="form-label">
            账&emsp;号
          </div>
          <div class="input-wrap">
            <input type="text" placeholder="6-16位字母数字/邮箱" @blur="usertes(formData.username)" :class="{'error-cls': userMsg}" v-model="formData.username" minlength="5" maxlength="15" autocomplete="off" v-focus>
          </div>
        </div>
        <div class="form-group" >
          <div class="form-label">
            密&emsp;码
          </div>
          <div class="input-wrap ">
            <input type="password" placeholder="6-16（字母数字标识符）" @blur="passtes(formData.password)" :class="{'error-cls': passMsg}"  minlength="8" maxlength="16" v-model="formData.password" autocomplete="off">
            </div>
            <div v-show="accountMsg" class="error-message">{{errorMsgTxt}}</div>
          </div>
          <div class="form-group">
            <div class="form-label">
              验证码
            </div>               
            <div class="input-wrap" :class="{'error-cls': vcodeMsg}">
              <input type="text" placeholder="请输入右侧信息" maxlength="6" @blur="validateVcode" class="vcode-input" v-model="formData.vcode"></div>
              <div class="vcode">
                <img :src="vcodeUrl" alt="">
              <div @click="updataVcode" class="refresh-btn"></div>
            </div><div v-show="vcodeMsg" class="error-message">{{vcodeErrorMsgTxt}}</div></div>
        <div class="form-action">
          <div @click="formSubmit" class="submit">登录</div>
        </div>
       
      </form>
    </div>
     <div class="message">Powered by Copyright by Rising V1.0.0.1 ©2014-2019</div>
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
      vcodeUrl: 'src/assets/images/code1.png',
      accountMsg: false,
      userMsg:false,
      passMsg:false,
      vcodeMsg: false,
      errorMsgTxt: '',
      vcodeErrorMsgTxt: '',
      vcodeOpts: {
        width: 70,
        height: 30,
        fontsize: 14
      }
    }
  },
  computed: {
    ...mapGetters([
      'userUrl',
      'avatar',
      'leftMenu'
    ])
  },
  created () {
    this.updataVcode()
  },
  methods: {
    updataVcode () {
      this.vcodeUrl = getVcode(this.vcodeOpts)
    },
    usertes () {
      if (this.formData.username.length < 5 || this.formData.username.length > 15 ) {
        this.userMsg = true
        this.errorMsgTxt = ERROR_TXT
        this.accountMsg = true
      } else {
        this.userMsg = false
      }
      if(this.passMsg == false &&  this.userMsg == false) {
        this.accountMsg = false

      }
    },
    passtes () {
     if( this.formData.password.length < 6  || this.formData.password.length > 16){
        this.passMsg = true
        this.errorMsgTxt = ERROR_TXT
        this.accountMsg = true
      } else {
        this.passMsg = false
      }
      if(this.passMsg == false &&  this.userMsg == false) {
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
      this.usertes()
      if (this.userMsg ) {
        return false
      }
      this.passtes()
      if (this.passMsg ) {
        return false
      }
      this.validateVcode()
      if ( this.vcodeMsg) {
        return false
      }
      submitForm(this.formData).then((res) => {
        if (res.ret === 200) {
          window.localStorage.setItem('AuthenticationUsername', res.data.username)
          window.localStorage.setItem('AuthenticationaAvatar', res.data.logo)
          this.setUsername(res.data.username)
          this.setAvatar(res.data.logo)
          this.$router.push({
            path: '/admin'
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
      inserted (e)  {
        e.focus()
      }
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .login
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    min-width: 400px
    min-height: 500px
    height: 100%
    background: url(../assets/images/bj.jpg) no-repeat 0 0
    background-size: 100% 100%
    .login-content
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 320px
      height: 340px
      margin-bottom: 60px
      text-align: center
      border-radius: 8px
      background-color: #fff
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
        // background: url(../assets/images/login-left.png) no-repeat 0 0
        background-size: 380PX 330PX
        @media screen and (min-width:1200px)
          width: 414px
          height: 358PX
          background-size: 414px 358PX
          left: -440px
          top: -30px
      .form
        padding: 0 10px  0 15px  
      .login-icon
        width: 100%
        height: 89px
        margin-bottom: 20px
        background: url(../assets/images/logo_title.png) no-repeat center center
        background-size: 100% 100%
        &>i
          width: 132px
          height: 18px
          margin: 15px auto 10px
          display: inline-block
          background: url(../assets/images/logo_back.png) no-repeat 0 0
        &>h1
          position: relative
          margin: 0 auto 23px
          width: 252px
          font-size: 16px
          line-height: 28px
          color: #8be7fe
          text-align: center
          .version
            display: inline-block
            vertical-align: top
            margin-left: 5px
            font-size: 12px
            line-height: 26px
            color: #8be7fe
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
            background-color: #8be7fe
          &::after
            content: ""
            diplay: block
            position: absolute
            top: 0
            right: 0
            margin-top: 14px
            height: 1px
            width: 25px
            background-color: #8be7fe
      .form
        .form-group
          position: relative
          margin-bottom: 0
          padding-bottom: 24px
          display: flex
          .form-label
            display:inline-block
            color: #555555
            font-size: 14px
            width: 50px
            vertical-align: middle
            height: 32px
            line-height: 32px
            padding-right: 10px
            text-align: right
          .input-wrap
            vertical-align: middle
            display: inline-block
            border-radius: 4px
            text-align: left
            &>input
              width: 210px
              height: 30px
              padding: 0 5px
              font-size: 14px
              line-height: 30px
              border: 1px solid #ccc
              border-radius: 4px
              &:focus
                border-radius: 4px
            .error-cls
              border: 1px solid #ff0000  !important
            .vcode-input
              width: 100px
          .vcode
            width: 120px  
            &>img
              display: inline-block
              width: 70px
              height: 30px
            .refresh-btn
              width: 30px
              display: inline-block
              height: 30px
              cursor: pointer
              border-radius: 4px
              text-align: center
              background: url(../assets/images/refresh.png) no-repeat 
          .error-cls
            input
              border: 1px solid #ff0000  !important
          .error-message
            position: absolute
            bottom: 0
            left: 0
            padding-left: 61px
            font-size: 14px
            line-height: 24px
            color: #ff0000
            &:before
              content: ""
              display: block
              position: absolute
              top: 5px
              left: 2px
              width: 14px
              height: 14px
              // background: url(../assets/images/danger-icon.png) no-repeat 0 0
        .form-action
          padding-top: 2px
          padding-bottom: 12px
          .submit
            display: block
            padding: 0
            margin: 0 auto
            width: 140px
            height: 34px
            background-color: #4382e5
            border-radius: 34px
            color: #fff
            font-size: 14px
            line-height: 32px
            cursor: pointer
            &:hover
              background-color: #4586ee
            &:active
              background-color: #3d76d4
    .message
      font-size: 12px
      line-height: 36px
      color: #fff
      position: absolute
      width: 100%
      bottom: 20px
      text-align: center
</style>
