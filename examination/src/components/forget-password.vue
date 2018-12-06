<template>
  <div class="forget-password-wrap">
    <header class="clearfix">
      <router-link to="/paperHome/paperList" class="left">
        <img src="../assets/images/logo.png" alt="头像">
        <h1 class="system-name">瑞星安全教育考试评测系统</h1>
      </router-link>
      <div class="right">
        <router-link to="/login" class="sigin-btn">登录</router-link>
      </div>
    </header>
    <div class="content-wrap">
      <div class="content">
        <h2>您可以通过以下方式验证身份并找回登录密码</h2>
        <div class="title">
          <base-radio :name="'type'" :value="'phone'" v-model="radioVal" @updateRadioStatus="updateRadios"></base-radio>
          <span class="txt">通过手机短信验证</span>
        </div>
        <div class="step-wrap" v-show="radioVal == 'phone'">
          <div class="step-icon-wrap phone">
            <div class="left" :class="{'active': phoneStep.substring(4) >= 1}">
              <div class="icon"></div>
              <p class="txt">发送手机验证码</p>
            </div>
            <div class="line"  :class="{'active': phoneStep.substring(4) >= 2}"></div>
            <div class="center" :class="{'active': phoneStep.substring(4) >= 2}">
              <div class="icon"></div>
              <p class="txt">重置密码</p>
            </div>
            <div class="line" :class="{'active': phoneStep.substring(4) >= 3}"></div>
            <div class="right" :class="{'active': phoneStep.substring(4) >= 3}">
              <div class="icon"></div>
              <p class="txt">完成</p>
            </div>
          </div>
          <form>
            <div v-show="phoneStep === 'step1'" class="step1">
              <p class="tip-message">请输入您注册时绑定的手机号码</p>
              <div class="form-group">
                <base-input :maxLen="11" :name="'phone'" :val="phoneFormData[0].phone.value" :cls="phoneFormData[0].phone.cls" :placeholder="'11位手机号码'" @blurFun="regPhone"></base-input>
                <div v-show="phoneFormData[0].phone.errorMsg" class="error-msg">手机号码格式错误/手机号码不存在</div>
              </div>
              <div class="form-group vcode-cls">
                <base-input :name="'vcode'" :cls="phoneFormData[0].vcode.cls" :placeholder="'填入收的验证码'" @blurFun="regVcode"></base-input>
                <a href="javascript:;" @click="sendVcode" class="send-vcode">{{sendVcodeMsg}}</a>
                <div v-show="phoneFormData[0].vcode.errorMsg" class="error-msg">短信验证码错误/短信验证码不能为空</div>
              </div>
              <div class="next-wrap">
                <a href="javascript:;" @click="nextFn" class="next-btn">下一步</a>
              </div>
            </div>
            <div v-show="phoneStep === 'step2'" class="step2">
              <p class="tip-message">请输入您的新密码</p>
              <div class="form-group">
                <base-input :maxLen="20" :minLen="6" :name="'password'" :cls="phoneFormData[1].password.cls" :placeholder="'密码（6-20个字符）'" @blurFun="regPassword"></base-input>
                <div v-show="phoneFormData[1].password.errorMsg" class="error-msg">密码（6-20个字符）</div>
              </div>
              <div class="form-group">
                <base-input :maxLen="20" :name="'vpassword'" :cls="phoneFormData[1].vpassword.cls" :placeholder="'请重复输入一遍'" @blurFun="regVPassword"></base-input>
                <div v-show="phoneFormData[1].vpassword.errorMsg" class="error-msg">二次输入不一致/重复密码不能为空</div>
              </div>
              <div class="next-wrap">
                <a href="javascript:;" @click="submitPhone" class="next-btn">下一步</a>
              </div>
            </div>
            <div v-show="phoneStep === 'step3'" class="step3">
              <div class="success-icon">
                <img src="../assets/images/password-success.png" alt="">
                <div class="message"><span>恭喜您，密码重置成功！请牢记！</span><router-link to="/login" class="login-link">登录</router-link></div>
              </div>
            </div>
          </form>
        </div>
        <div class="title">
          <base-radio :name="'type'" :value="'email'"  v-model="radioVal"  @updateRadioStatus="updateRadios" ></base-radio>
          <span class="txt">通过邮件地址验证</span>
        </div>
        <div class="step-wrap" v-show="radioVal == 'email'">
          <div class="step-icon-wrap email">
            <div class="left" :class="{'active': emailStep.substring(4) >= 1}">
              <div class="icon"></div>
              <p class="txt">发送充值密码邮件</p>
            </div>
            <div class="line"  :class="{'active': emailStep.substring(4) >= 2}"></div>
            <div class="center step2"  :class="{'active': emailStep.substring(4) >= 2}">
              <div class="icon"></div>
              <p class="txt">打开重置密码连接</p>
            </div>
            <div class="line"  :class="{'active': emailStep.substring(4) >= 3}"></div>
            <div class="center"  :class="{'active': emailStep.substring(4) >= 3}">
              <div class="icon"></div>
              <p class="txt">重置密码</p>
            </div>
            <div class="line"  :class="{'active': emailStep.substring(4) >= 4}"></div>
            <div class="right"  :class="{'active': emailStep.substring(4) >= 4}">
              <div class="icon"></div>
              <p class="txt">完成</p>
            </div>
          </div>
          <form>
            <div v-show="emailStep === 'step1'" class="step1">
              <p class="tip-message">请输入您注册时绑定的邮箱地址</p>
              <div class="form-group">
                <base-input :maxLen="48" :name="'email'" :cls="emailFormData[0].email.cls" :placeholder="'请输入邮箱地址'" @blurFun="regEmail"></base-input>
                <div v-show="emailFormData[0].email.errorMsg" class="error-msg">邮箱格式错误/邮箱不存在/邮箱地址不能为空</div>
              </div>
              <div class="form-group email-vcode-cls">
                <base-input :name="'vcode'" :cls="emailFormData[0].vcode.cls" :placeholder="'验证码'" @blurFun="regVcodeEmail"></base-input>
                <div class="v-img"><img src="../assets/images/v-code-icon.png" alt=""></div>
                <a href="javascript:;" class="refresh-img"><img src="../assets/images/refresh-icon.png" alt=""></a>
                <div v-show="emailFormData[0].vcode.errorMsg" class="error-msg">验证码错误</div>
              </div>
              <div class="next-wrap">
                <a href="javascript:;" @click="nextFn2" class="next-btn">下一步</a>
              </div>
            </div>
            <div v-show="emailStep === 'step2'" class="step2">
              <div class="success-icon">
                <img src="../assets/images/email-password-success.png" alt="">
                <div class="message"><p>您好，重置密码的链接已发送至“<span @click="nextFn2" class="next-link">{{emailFormData[0].email.value}}</span>”邮箱！<router-link to="/login" class="login-link">登录邮箱</router-link></p><p>链接的有效时间为120分钟，请尽快查看您的</p></div>
              </div>
            </div>
            <div v-show="emailStep === 'step3'" class="step3">
              <p class="tip-message">请输入您的新密码</p>
              <div class="form-group">
                <base-input :maxLen="20" :minLen="6" :name="'password'" :cls="emailFormData[2].password.cls" :placeholder="'密码（6-20个字符）'" @blurFun="regPasswordEmail"></base-input>
                <div v-show="emailFormData[2].password.errorMsg" class="error-msg">密码（6-20个字符）</div>
              </div>
              <div class="form-group">
                <base-input :maxLen="20" :name="'vpassword'" :cls="emailFormData[2].vpassword.cls" :placeholder="'请重复输入一遍'" @blurFun="regVPasswordEmail"></base-input>
                <div v-show="emailFormData[2].vpassword.errorMsg" class="error-msg">二次输入不一致/重复密码不能为空</div>
              </div>
              <div class="next-wrap">
                <a href="javascript:;" @click="submitEmail" class="next-btn">下一步</a>
              </div>
            </div>
            <div v-show="emailStep === 'step4'" class="step4">
              <div class="success-icon">
                <img src="../assets/images/email-password-success2.png" alt="">
                <div class="message"><span>恭喜您，密码重置成功！请牢记！</span><router-link to="/login" class="login-link">登录</router-link></div>
              </div>
            </div>
          </form>
        </div>
        <div class="hot-tip">
          <span class="hot-icon"></span>
          <span class="hot-txt">温馨提示</span>
          <span class="txt">如手机号码已丢失且绑定邮箱无法正常使用，请联系瑞星安全教育专员，或拨打全国统一服务热线 <span class="tel">400-660-8866</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import baseRadio from '@/components/base-radio'
import baseInput from '@/components/base-input'
export default {
  name: 'forget-password',
  data () {
    return {
      radioVal: 'phone',
      phoneStep: 'step1',
      emailStep: 'step1',
      nextFlag: false,
      phoneFormData: [
        {
          phone: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          },
          vcode: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          }
        },
        {
          password: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          },
          vpassword: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          }
        }
      ],
      emailFormData: [
        {
          email: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          },
          vcode: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          }
        },
        {
        },
        {
          password: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          },
          vpassword: {
            value: '',
            cls: 'form-control',
            errorMsg: false
          }
        }
      ],
      sendVcodeMsg: '获取验证码',
      timer: null
    }
  },
  methods: {
    updateRadios (value) {
      this.radioVal = value
    },
    nextFn () {
      let index = +this.phoneStep.substring(4)
      let stepData = this.phoneFormData[index - 1]
      for (var key in stepData) {
        if (!stepData[key].value) {
          return false
        }
      }
      this.phoneStep = 'step' + (index + 1)
    },
    nextFn2 () {
      let index = +this.emailStep.substring(4)
      let stepData = this.emailFormData[index - 1]
      for (var key in stepData) {
        if (!stepData[key].value) {
          return false
        }
      }
      this.emailStep = 'step' + (index + 1)
    },
    submitPhone () {
      this.phoneStep = 'step3'
    },
    sendVcode () {
      let count = 120
      let step = () => {
        this.timer = setTimeout(() => {
          count--
          if (count < 0) {
            clearTimeout(this.timer)
            this.timer = null
            this.sendVcodeMsg = '获取验证码'
            return false
          }
          this.sendVcodeMsg = count + 's'
          step()
        }, 1000)
      }
      if (this.timer !== null) {
        return false
      }
      step()
      this.sendVcodeMsg = count + 's'
    },
    regPhone (val) {
      let reg = /^1[345789]\d{9}$/
      if (reg.test(val)) {
        this.phoneFormData[0].phone.value = val
        this.phoneFormData[0].phone.cls = 'form-control right'
        this.phoneFormData[0].phone.errorMsg = false
      } else {
        this.phoneFormData[0].phone.value = ''
        this.phoneFormData[0].phone.cls = 'form-control error'
        this.phoneFormData[0].phone.errorMsg = true
      }
    },
    regVcode (val) {
      if (val) {
        this.phoneFormData[0].vcode.value = val
        this.phoneFormData[0].vcode.cls = 'form-control'
        this.phoneFormData[0].vcode.errorMsg = false
      } else {
        this.phoneFormData[0].vcode.value = ''
        this.phoneFormData[0].vcode.cls = 'form-control error'
        this.phoneFormData[0].vcode.errorMsg = true
      }
    },
    regPassword (val) {
      if (val.length >= 6 && val.length <= 20) {
        this.phoneFormData[1].password.value = val
        this.phoneFormData[1].password.cls = 'form-control right'
        this.phoneFormData[1].password.errorMsg = false
      } else {
        this.phoneFormData[1].password.value = ''
        this.phoneFormData[1].password.cls = 'form-control error'
        this.phoneFormData[1].password.errorMsg = true
      }
    },
    regVPassword (val) {
      if (val && val === this.phoneFormData[1].password.value) {
        this.phoneFormData[1].vpassword.value = val
        this.phoneFormData[1].vpassword.cls = 'form-control right'
        this.phoneFormData[1].vpassword.errorMsg = false
      } else {
        this.phoneFormData[1].vpassword.value = ''
        this.phoneFormData[1].vpassword.cls = 'form-control error'
        this.phoneFormData[1].vpassword.errorMsg = true
      }
    },
    regEmail (val) {
      let reg = /^\w+@\w+(\.\w+){1,}$/
      if (reg.test(val)) {
        this.emailFormData[0].email.value = val
        this.emailFormData[0].email.cls = 'form-control right'
        this.emailFormData[0].email.errorMsg = false
      } else {
        this.emailFormData[0].email.value = ''
        this.emailFormData[0].email.cls = 'form-control error'
        this.emailFormData[0].email.errorMsg = true
      }
    },
    regVcodeEmail (val) {
      if (val) {
        this.emailFormData[0].vcode.value = val
        this.emailFormData[0].vcode.cls = 'form-control'
        this.emailFormData[0].vcode.errorMsg = false
      } else {
        this.emailFormData[0].vcode.value = ''
        this.emailFormData[0].vcode.cls = 'form-control error'
        this.emailFormData[0].vcode.errorMsg = true
      }
    },
    regPasswordEmail (val) {
      if (val.length >= 6 && val.length <= 20) {
        this.emailFormData[2].password.value = val
        this.emailFormData[2].password.cls = 'form-control right'
        this.emailFormData[2].password.errorMsg = false
      } else {
        this.emailFormData[2].password.value = ''
        this.emailFormData[2].password.cls = 'form-control error'
        this.emailFormData[2].password.errorMsg = true
      }
    },
    regVPasswordEmail (val) {
      if (val && val === this.emailFormData[2].password.value) {
        this.emailFormData[2].vpassword.value = val
        this.emailFormData[2].vpassword.cls = 'form-control right'
        this.emailFormData[2].vpassword.errorMsg = false
      } else {
        this.emailFormData[2].vpassword.value = ''
        this.emailFormData[2].vpassword.cls = 'form-control error'
        this.emailFormData[2].vpassword.errorMsg = true
      }
    },
    submitEmail () {
      this.emailStep = 'step4'
    }
  },
  components: {
    baseRadio,
    baseInput
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.clearfix::after
  content: ""
  display: block
  clear: both
.forget-password-wrap
  display: flex
  flex-direction: column
  background-color: $bg-color-l
header
  padding-left: 24px
  background-color: $bg-color-n
  &>.left
    padding-top: 14px
    padding-bottom: 14px
    float: left
    &>img
      margin-right: 21px
      float: left
      width: 110px
      height: 16px
    &>h1
      padding-left: 20px
      float: left
      font-size: 16px
      line-height: 18px
      color: $font-color-n
      border-left: 1px solid $border-color-n
  &>.right
    margin-top: 8px
    padding-right: 20px
    float: right
    .sigin-btn
      padding-left: 13px
      padding-right: 13px
      display: block
      font-size: 12px
      line-height: 28px
      border: 1px solid $border-color-l
      @include border-radius(unquote('3px'))
      color: $color-xxxl
.content-wrap
  flex: 1
  .content
    margin: 16px auto
    padding-top: 16px
    padding-left: 20px
    padding-bottom: 20px
    width: 760px
    background-color: $bg-color-n
    @include border-radius(unquote('5px'))
    &>h2
      font-size: 12px
      line-height: 20px
      color: $color-m
    .title
      margin-top: 9px
      display: block
      font-size: 0
      white-wrap: nowrap
      &>.radio
        margin-left: 2px
        display: inline-block
        vertical-align: middle
        width: 20px
        height: 20px
      &>.txt
        margin-left: 8px
        display: inline-block
        vertical-align: middle
        font-size: 12px
        line-height: 20px
        color: $color-m
    .step-wrap
      margin: 16px 26px 17px 52px
      background-color: $bg-color-m
      @include border-radius(unquote('8px'))
      .step-icon-wrap
        display: flex
        padding: 15px 24px 0
        align-items: center
        &>.line
          margin-left: 7px
          margin-right: 7px
          flex: 1
          height: 1px
          background-color: $border-color-n
          &.active
            background-color: $bg-line
        &>.left, &>.center,&>.right
          display: flex
          align-items: center
          &>.icon
            margin-right: 7px
            width: 44px
            height: 44px
            border-radius: 50%
          &>.txt
            width: 48px
            font-size: 12px
            line-height: 16px
            color: $color-m
        &.phone
          &>.left
            &>.icon
              background: url(../assets/images/phone-step1.png) no-repeat 0 0
          &>.center
            &>.icon
                background: url(../assets/images/phone-step2.png) no-repeat 0 0
            &.active
              &>.icon
                background: url(../assets/images/phone-step2-active.png) no-repeat 0 0
              &>.txt
                color: $color-xxxl
          &>.right
            &>.icon
              background: url(../assets/images/phone-step3.png) no-repeat 0 0
            &.active
              &>.icon
                background: url(../assets/images/phone-step3-active.png) no-repeat 0 0
              &>.txt
                color: $color-xxxl
        &.email
          &>.left
            &>.icon
              background: url(../assets/images/email-step1.png) no-repeat 0 0
          &>.center.step2
            &>.icon
              background: url(../assets/images/email-step2.png) no-repeat 0 0
            &.active
              &>.icon
                background: url(../assets/images/email-step2-active.png) no-repeat 0 0
              &>.txt
                color: $color-xxxl
          &>.center
            &>.icon
              background: url(../assets/images/phone-step2.png) no-repeat 0 0
            &.active
              &>.icon
                background: url(../assets/images/phone-step2-active.png) no-repeat 0 0
              &>.txt
                color: $color-xxxl
          &>.right
            &>.icon
              background: url(../assets/images/phone-step3.png) no-repeat 0 0
            &.active
              &>.icon
                background: url(../assets/images/phone-step3-active.png) no-repeat 0 0
              &>.txt
                color: $color-xxxl
      .tip-message
        padding-top: 12px
        font-size: 12px
        line-height: 32px
        text-align: center
        color: $color-m
      form
        padding-bottom: 22px
        .form-group
          position: relative
          margin: 0 auto
          width: 200px
          font-size: 0
          &:nth-child(2)
            margin-top: 10px
          &:nth-child(3)
            margin-top: 30px
          &.vcode-cls
            .form-control
              display: inline-block
              vertical-align: middle
              margin-right: 6px
              width: 102px
              &>input
                padding-left: 9px
                padding-right: 9px
          &.email-vcode-cls
            .form-control
              display: inline-block
              vertical-align: middle
              margin-right: 6px
              width: 88px
          .form-control.error
            border-color: $color-error
          .v-img
            display: inline-block
            vertical-align: middle
            width: 66px
            height: 30px
            &>img
              display: block
              width: 66px
              height: 30px
          .refresh-img
            display: inline-block
            vertical-align: middle
            width: 28px
            height: 30px
            background-color: #c0cde0
            &>img
              margin-left: 4px
              margin-top: 6px
              display: block
              width: 19px
              height: 18px
          .send-vcode
            display: inline-block
            vertical-align: middle
            width: 88px
            font-size: 12px
            line-height: 28px
            text-align: center
            color: $color-xxl
            border: 1px solid $color-xxl
            border-radius: 3px
          .error-msg
            position: absolute
            top: 100%
            left: 0
            width: 100%
            font-size: 12px
            line-height: 30px
            color: $color-error
        .next-wrap
          margin: 28px auto 0
          width: 200px
          background: $color-xxl
          font-size: 12px
          line-height: 28px
          border: 1px solid $color-xxl
          text-align: center
          border-radius: 3px
          &>a
            display: block
            color: $color-n
        .success-icon
          margin-top: 47px
          &>img
            margin: auto
            display: block
            width: 68px
            height: 68px
        .message
          margin: 37px auto 0
          font-size: 0
          text-align: center
          &>span
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 24px
            color: $color-m
          .login-link
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 24px
            color: $color-xxl
          &>p
            margin: auto
            width: 398px
            font-size: 12px
            line-height: 24px
            white-space: nowrap
            color: $color-m
            text-align: left
          .next-link
            color: $color-xxl
            cursor: pointer
    .hot-tip
      margin: 82px 22px 0
      padding: 9px 10px
      border: 1px dashed $border-color-m
      font-size: 0
      border-radius: 8px
      .hot-icon
        display: inline-block
        vertical-align: top
        width: 18px
        height: 18px
        background: url(../assets/images/hot-icon.png) no-repeat 0 0
        background-size: 18px 18px
      .hot-txt,.txt
        display: inline-block
        vertical-align: top
        font-size: 12px
        line-height: 18px
      .hot-txt
        margin-left: 5px
        margin-right: 10px
        color: $color-xxxl
      .txt
        color: $color-m
      .tel
        color: $font-color-tel
</style>
