<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="goback" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="typeform" @validate="validateForm"  :rules="rules" ref="typeform" label-width="120px" class="contentlist">
      <el-form-item class="form-wrap" label="证书名称" prop="cer_name">
        <el-col :span="8">
          <el-input   v-model="typeform.cer_name" placeholder="请输入证书名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="证书模板" prop="temp_id">
        <el-col :span="8">
          <el-select 
              placeholder="请选择"
              allow-create
              size="mini"
              @change="template"
              v-model="typeform.temp_id"
            >
              <el-option v-for="item in typedata"  :key="item.value"  :value="item.value"  :label="item.label"></el-option>
          </el-select>
        </el-col> 
      </el-form-item>
     <el-form-item class="form-wrap " v-if="typeform.temp_id ==''" >
        <div   class="imgblock" ><img src='../../assets/images/temp.jpg'  /></div>
      </el-form-item>
      <el-form-item class="form-wrap" v-if="typeform.temp_id !=''" >
        <div v-for="item in typedata" v-show="item.value == typeform.temp_id" class="imgblock" ><img :src="item.thumbnail_path" /></div>
      </el-form-item>
      <el-form-item class="form-wrap" label="备注" prop="note">
        <el-input type="textarea"  v-model="typeform.note" maxlength="200" placeholder="非必填项（200个字符以内）"></el-input> 
      </el-form-item>
      <el-form-item class="form-wrap subblock" >
        <el-button type="primary" :disabled="subflag" @click="submitform()">保存</el-button>
        <span v-show="susflag" class="susmessage mess"><i class="icon-success"></i>保存成功（{{count}}s）</span>
        <span v-show="errflag" class="errmessage mess"><i class="icon-error"></i>保存失败({{errMessage}}），请重试！（{{count}}s）</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import topHeader from '@/components/content-header'
import { getTempList , EditCerTypeUpInfo , GetCerTypeGetInfo } from '@/api/certificateaxios'
import {timeout} from "@/api/util";
export default {
  data () {
    return {
      titleTxt:"编辑证书",
      backBtn: {
          name: '返回列表',
          icon: 'back-icon',
          className: 'back-btn'
        },
      typeform:{
        cer_name:"",
        rule_prefix:"",
        temp_id:"",
        note:"",
        cer_id:""
      },
      rules:{
        cer_name:[
            { required: true, message: '请输入证书名称', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' },
          { pattern:/^[\u0391-\uFFE5A-Za-z]+$/, message:"禁止输入数字或符号",trigger:"blur" }
        ],
        
        temp_id:[
            { required: true, message: '请选择证书模板', trigger: 'change' }
        ]
      },
      typedata:[ ],
      count:4,
      errMessage:"",
      susflag:false,
      errflag:false,
      subflag:false,
      status:{
        cer_name:true,
        temp_id:true
      }
    }
  },
  created () {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1);
    const date=now.getDate()<10?'0'+now.getDate():now.getDate();
    this.typeform.rule_date = year+''+month+''+date;
    this.getlist()
    this.gitInfo(this.$route.query.id)
  },
  filters:{
  },
  components: {
    topHeader
  },
  methods: {
    goback(){
      this.$router.push({path: '/admin/certificateType'})
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
    gitInfo(uid){
        GetCerTypeGetInfo(uid).then((res) => {
          if (res.ret === 200) {
            this.typeform.cer_name = res.data.cer_name;
            this.typeform.cer_id = uid;
            this.typeform.rule_date = res.data.rule_date;
            this.typeform.note = res.data.note
            this.typeform.rule_date = res.data.rule_date
            this.typeform.rule_prefix = res.data.rule_prefix
            this.typeform.rule_random = res.data.rule_random
            this.typeform.temp_id = res.data.template_id

          } else {
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getlist(){
      getTempList().then((res) => {
        const datalist = [];
        if (res.ret === 200) {
          for(let i=0;i<res.data.length;i++){
            datalist.push({
              value : res.data[i].id,
              label : res.data[i].template_name,
              show  : false,
              thumbnail_path : res.data[i].thumbnail_path
            })
          }
          this.typedata=datalist
        } else {
          console.log(res.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    template(el){
      for(let i=0;i<this.typedata.length;i++){
        if(el == this.typedata[i].value){
          this.typedata[i].show = true
        }else{
          this.typedata[i].show = false
        }
      }
    },
    submitform(list){
      this.$refs['typeform'].validate((valid) => {
        if(valid){
          this.subflag = true
          EditCerTypeUpInfo(this.typeform).then((res) => {
            if (res.ret === 200) {
             this.susflag = true
             this.errflag = false
              timeout(3, () => {
                  this.count--
                }, () => {
                  this.susflag = false
                  this.count= 4
                  this.goback()
                  this.subflag = false
                })
            } else {
              this.errflag = true
              this.susflag = false
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
</style>
