<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="goback" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="cfirmform" @validate="validateForm"  :rules="rules" ref="cfirmform" label-width="160px" class="contentlist labelicon">
      <el-form-item class="form-wrap" label="厂商名称" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="manufacturer_name" placeholder="" :title="manufacturer_name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="学员认证数量" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="trainee_number" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商技术认证" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="technology" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商服务认证" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="service" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商认证星级" >
        <el-col :span="10">
          <el-input :disabled='true' class="backgroundstar" :class="'star'+star_level"   placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="商务联系人" prop="contacts">
        <el-col :span="10">
          <el-input    v-model="cfirmform.contacts" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="联系方式 (手机号)" prop="mobile">
        <el-col :span="10">
          <el-input    v-model="cfirmform.mobile" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <div class="form-wrap subblock" >
        <el-button type="primary" :disabled="subflag" @click="submitform()">保存</el-button>
        <span v-show="susflag" class="susmessage mess"><i class="icon-success"></i>保存成功（{{count}}s）</span>
        <span v-show="errflag" class="errmessage mess"><i class="icon-error"></i>保存失败({{errMessage}}），请重试！（{{count}}s）</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import topHeader from '@/components/content-header'
import { GetManufInfo , EditFirmCertificate } from '@/api/certificateaxios'
import {timeout} from "@/api/util";
export default {
  data () {
    return {
      titleTxt:"编辑厂商信息",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      rules:{
        tname:[
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          { pattern:/^[\u0391-\uFFE5A-Za-z]+$/, message:"禁止输入数字或符号",trigger:"blur" },
        ],
        tel:[
          { required: true, message: '不能为空', trigger: 'blur' },
          {pattern:/^1[34578]\d{9}$/, message:"手机号格式错误",trigger:"blur"}
        ]
      },
      manufacturer_name:'',
      trainee_number:"",
      technology:'',
      service:'',
      star_level:'',
      cfirmform:{
        contacts:"",
        mobile:"",
        manufId:""
      },
      susflag:false,
      errflag:false,
      subflag:false,
      count:4,
      errMessage:"", 
      status:{
        tname:false,
        tel:false,
      }
      
    }
  },
  created () {
    this.getInfo(this.$route.query.id)
  },
  components: {
    topHeader
  },
  filters:{
  },
  methods: {
    goback(){
      this.$router.push({path: '/admin/firmCertificate'})
    },
    validateForm(e,result){
      let flag = false
        this.status[e] = result
        for (let key of Object.keys(this.status)) {
          if (this.status[key] === false) {
            flag = true
            break
          }
        }
        this.subflag = flag
    },
    getInfo(uid){
      let _this = this
      GetManufInfo(uid).then((res) => {
        if (res.ret === 200) {
          const arr = ['未通过','初级','中级','高级'];
          arr.map(function(value,index){
            if(index == res.data.technology){_this.technology = arr[index]}
          })
          arr.map(function(value,index){
            if(index == res.data.service){_this.service = arr[index]}
          })
          _this.manufacturer_name = res.data.manufacturer_name
          _this.trainee_number = res.data.trainee_number
          _this.star_level = res.data.star_level
          _this.cfirmform.contacts = res.data.contacts
          _this.cfirmform.mobile = res.data.mobile
          _this.cfirmform.manufId = res.data.id

        } else {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitform(){
      this.$refs['cfirmform'].validate((valid) => {
        if(valid){
          this.subflag = true
          EditFirmCertificate(this.cfirmform).then((res) => {
            if (res.ret === 200) {
            this.susflag = true
              timeout(3, () => {
                  this.count--
                }, () => {
                  this.susflag = false
                  this.count= 4
                  this.subflag = false
                  this.goback()
                })
            } else {
              this.errflag = true
              this.errMessage = res.msg
              timeout(3, () => {
                  this.count--
                }, () => {
                  this.errflag = false
                  this.count= 4
                  this.subflag = false
                })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
.backgroundstar
  position: relative
.backgroundstar::before
  content: ""
  position: absolute
  height: 20px
  top: 4px
  left: 15px
  background: url('../../assets/images/star.png') no-repeat left center
.backgroundstar.star1::before
  width: 14px
.backgroundstar.star2::before
  width: 28px
.backgroundstar.star3::before
  width: 42px
.backgroundstar.star4::before
  width: 60px
.backgroundstar.star5::before
  width: 73px
</style>
