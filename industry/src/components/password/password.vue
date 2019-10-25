<template>

  <div class="password">
      <div class="form-group">
        <div class="form-label"><i class="icon-must">*</i>原密码：</div>
        <div class="form-content">
          <at-input placeholder="请输入原密码" @blur="passwordValidate('used')" v-model="passworddata.password" type="password"></at-input>
          <span class="error-msg"  v-html="passworddata.passworderr"></span>
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><i class="icon-must">*</i>新密码：</div>
        <div class="form-content">
          <at-input placeholder="请输入新密码"  @blur="passwordValidate('new')" type="password"  v-model="passworddata.newpassword"></at-input>
          <span class="error-msg"v-html="passworddata.newpassworderr"></span>
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><i class="icon-must">*</i>确认新密码：</div>
        <div class="form-content">
          <at-input placeholder="请再次确认新密码" type="password" @blur="passwordValidate('check')"  v-model="passworddata.checkpassword"></at-input>
          <span class="error-msg"  v-html="passworddata.checkpassworderr"></span>
        </div>
      </div>
      <div class="formt-button-group">
        <at-button class="save-password" type="primary" @click="submitSave()">保存</at-button>
        <div class="sub-message" v-html='passworddata.submessage'></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios' 
import Vue from 'vue'
import {MessageBox} from 'element-ui'
Vue.component(MessageBox.name,MessageBox)
const MsgBox = MessageBox;
Vue.prototype.$confirm = MsgBox.confirm;
import {getSign} from '@/assets/js/sign'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import qs from 'qs'
  export default {
    name: 'password', 
    data () {
      return {
        contetnHasSave :true,//记录是否已经保存
        passworddata:{
          password:"",
          newpassword:"",
          checkpassword:"",
          passwordFlag : "",
          newpasswordFlag : "",
          checkpasswordFlag : "",
          passworderr:"",
          newpassworderr:"",
          checkpassworderr:"",
          submessage:""
        },
        datenum : 3
      }
    },mounted () {
    },
    methods: {
      submitSave:function (){
        if(this.passworddata.passwordFlag !==true){
          this.passwordValidate('used')
          return false
        }else if(this.passworddata.newpasswordFlag!==true){
          this.passwordValidate('new')
          return false
        }else if(this.passworddata.checkpasswordFlag!==true){
          this.passwordValidate('check')
          return false
        }else{
          const time = new Date().getTime();
          const data ={
            service  :'App.User.CheckPassword',
            tips: time,
            password:this.passworddata.password,
            newPassword:this.passworddata.newpassword,
            confirmPassword:this.passworddata.checkpassword
          }
          return axios.post("/",qs.stringify({
            sign: getSign(data),
            tips: time,
            service :'App.User.CheckPassword',
            password:this.passworddata.password,
            newPassword:this.passworddata.newpassword,
            confirmPassword:this.passworddata.checkpassword
          })).then((res) => {
            if(res.data.ret == 200){
              $('.sub-message').html('<i class="success_icon"></i><span class="success-color">保存成功(<span class="messageNum" v-model="datenum">3</span>S)</span>')
              const wurl = window.location.href;
              this.setIntervalClose($('.messageNum'),true,wurl)
            }else if(res.data.ret == 499) {
                this.$router.push({path: '/login'})
            }else {
              $('.sub-message').html('<i class="error_icon"></i><span>'+res.data.msg+"(<span class='messageNum'>3</span>S)</span>")
              this.setIntervalClose($('.messageNum'),false)
            }
          })
        }
      },
      setIntervalClose:function (elet,ist,url){
        clearInterval(int);
        var num = 2;
        var int = setInterval(function(){
            elet.html(num)
            if(num>0){
                num--
            }else {
                clearInterval(int);
                elet.parent().parent().html('')
                if(ist == true) {window.location.href = url;}
            }
        },1000);
      },
      passwordValidate:function (index) {
        if(index == 'used'){
          this.passworddata.passwordFlag = false
          if(this.passworddata.password.length<1){
            this.passworddata.passworderr = "<i class='error-icon'></i>请输入原密码";
          }
          else if(this.passworddata.password.length<8){
            this.passworddata.passworderr = "<i class='error-icon'></i>密码不得少于8位";
          }else if(this.passworddata.password.length>16){
            this.passworddata.passworderr = "<i class='error-icon'></i>密码不得大于16位";
          }else if(/[^0-9A-Za-z]$/.test(this.passworddata.password)){
            this.passworddata.passworderr = "<i class='error-icon'></i>格式错误，请输入8-16位数字或英文";
          }else{
            this.passworddata.passworderr = ""
            this.passworddata.passwordFlag = true
          }
        }else if(index == 'new'){
          this.passworddata.newpasswordFlag = false
          if(this.passworddata.newpassword.length<1){
            this.passworddata.newpassworderr = "<i class='error-icon'></i>请输入新密码";
          }
          else if(/[^0-9A-Za-z]$/.test(this.passworddata.newpassword)){
            this.passworddata.newpassworderr = "<i class='error-icon'></i>格式错误，请输入8-16位数字或英文";
          }else if(this.passworddata.newpassword.length<8){
            this.passworddata.newpassworderr = "<i class='error-icon'></i>密码不得少于8位";
          }else if(this.passworddata.newpassword.length>16){
            this.passworddata.newpassworderr = "<i class='error-icon'></i>密码不得大于16位";
          }else{
            this.passworddata.newpassworderr = ""
            this.passworddata.newpasswordFlag = true
            if(this.passworddata.checkpassword.length<1){
            }else{
              if(this.passworddata.checkpassword  === this.passworddata.newpassword){
                this.passworddata.checkpasswordFlag = true
                this.passworddata.checkpassworderr = ""
              } else{
                this.passworddata.checkpassworderr = "<i class='error-icon'></i>两次密码输入不一致";
                this.passworddata.checkpasswordFlag = false
              }
            }
          }
        }else if(index == 'check'){
          this.passworddata.checkpasswordFlag = false
          if(this.passworddata.checkpassword.length<1){
            this.passworddata.checkpassworderr = "<i class='error-icon'></i>请确认新密码";
          }
          else{
            if(this.passworddata.newpassword.length<1){
              this.passworddata.checkpassworderr = ""
              this.passworddata.checkpasswordFlag = true
            }else{
              if(this.passworddata.checkpassword  !== this.passworddata.newpassword){
                this.passworddata.checkpassworderr = "<i class='error-icon'></i>两次密码输入不一致";
              }else{
                this.passworddata.checkpassworderr = ""
                this.passworddata.checkpasswordFlag = true
              }
            }
          }
        }
      } 
    }  
    ,beforeRouteLeave(to,from,next){
      if(this.passworddata.password!= "" ||this.passworddata.newpassword!= "" ||this.passworddata.checkpassword!=""){
        // const answer = window.confirm('数据未保存，确定切换页面吗？');
        MsgBox.confirm("数据未保存，确定切换页面吗？",'提示',{
          cancelButtonText:"取消",
          confirmButtonText:"确定",
          type:"waring"
        }).then(() => {
          next(true)
        }).catch(() => {
           next(false)
        })
        /*if(answer){
          next(true)
        }else{
          next(false)
        }*/
      }else{
        next(true)
      }
    }
  }
</script>

<style  >
.password {
  padding:20px
}
.formt-button-group{
  width:500px;
}
.save-password:hover{
  background:#4f8ff3;
  border-color:#4f8ff3;
}
.save-password{
  border-radius: 14px;
  padding: 6px 30px;
  background:#4284e5;
  border-color:#4284e5;
  margin-left: 120px
}
.sub-message .success-color{
  color:#999;
}
.sub-message{
  display:inline-block;
  font-size:12px;
  color:#ff0000;
}
</style>
