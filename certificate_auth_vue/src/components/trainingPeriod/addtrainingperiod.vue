<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="goback" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="dateform" 
      @validate="validateForm"  :rules="rules" ref="dateform" label-width="120px" class="contentlist">
      <el-form-item class="form-wrap" label="证书选择" prop="cer_id">
        <el-col :span="9">
          <el-select 
              placeholder="请选择"
              allow-create
              size="mini"
              @change="datechange"
              v-model="dateform.cer_id"
            >
              <el-option v-for="item in datedata"  :key="item.value"  :value="item.value"  :label="item.label"></el-option>
          </el-select> 
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap " v-if="dateform.cer_id ==''" >
        <div   class="imgblock" ><img src='../../assets/images/temp.jpg'  /></div>
      </el-form-item>
      <el-form-item class="form-wrap" v-if="dateform.cer_id !=''" >
        <div class="imgblock" v-for="item in datedata" v-show="item.show"><img :src="item.thumbnail_path" /></div>
      </el-form-item>
      <el-form-item class="form-wrap trainnum" label="培训期数" prop="period">
        <el-col :span="1">第</el-col>
        <el-col :span="5">
          <el-input  type="tel"   size="mini" v-model="dateform.period" placeholder=""></el-input>
        </el-col>
         <el-col :span="1">期</el-col>
      </el-form-item>
      <el-form-item class="form-wrap numberrule" label="证书编号规则" >
        <el-row class="elbox">
          <el-col :span="8" >
              <el-form-item class="ruleblock"  prop="rule_prefix">
                <span class="demonstration">规则：</span>
                <el-input  v-model="dateform.rule_prefix"   placeholder="scsaa"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6" class="dashedtop">
            <el-form-item class=""  prop="rule_date">
                <el-input   :disabled='true' v-model="dateform.rule_date"    ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class=""  >
                <el-input v-if="dateform.rule_random == '1'"  :disabled='true' :value="123" placeholder="20190402"></el-input>
                <el-input v-if="dateform.rule_random == '2'"  :disabled='true' :value="1234" placeholder="20190402"></el-input>
                <el-input v-if="dateform.rule_random == '3'"  :disabled='true' :value="12345" placeholder="20190402"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="dashedleft">
            <el-date-picker
              v-model="nowdate"
              format="yyyyMMdd"
              @change='datec'
              placeholder="选择日期"
              :clearable="false"
              value-format="yyyyMMdd"
            ></el-date-picker>
          </el-col>
          <el-col :span="16" class="dashedright">
            <div class="numrandom">
              后缀：
              <el-radio v-model="dateform.rule_random"   label="1"> 3位随机数</el-radio>
              <el-radio v-model="dateform.rule_random"   label="2"> 4位随机数</el-radio>
              <el-radio v-model="dateform.rule_random"  label="3"> 5位随机数</el-radio>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form-wrap" label="备注" prop="note">
          <el-input type="textarea"  v-model="dateform.note" maxlength="200" placeholder="非必填项（200个字符以内）"></el-input> 
      </el-form-item>
      <el-form-item class="form-wrap subblock" >
        <el-button type="primary" :disabled="subflag" @click="submitform()">立即新建</el-button>
        <span v-show="susflag" class="susmessage mess"><i class="icon-success"></i>保存成功（{{count}}s）</span>
        <span v-show="errflag" class="errmessage mess"><i class="icon-error"></i>保存失败({{errMessage}}），请重试！（{{count}}s）</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import topHeader from '@/components/content-header'
import {SetTrainingPeriod , getCerTrainingList  } from '@/api/certificateaxios'
import {timeout} from "@/api/util";
export default {
  data () {
    return {
      titleTxt:"新建期数",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      dateform:{
        cer_id:"",
        period:"",
        note:"",
        rule_prefix:"",
        temp_id:"",
        rule_date:"",
        rule_random:'1'
      },  
      nowdate:"",
      datedata:[ ],
      rules:{
        period:[
            { required: true, message: '不能为空', trigger: 'blur' },
            {pattern:/^[0-9]+$/,message:"只能输入数字"},
            {max:4,message: '长度不得大于4字符', trigger: 'blur' }
        ],
        cer_id:[
            { required: true, message: '请选择证书', trigger: 'change' }
        ],
        rule_prefix:[
            { required: true, message: '请输入证书编号', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },
          { pattern:/^[A-Za-z]+$/, message:"只能输入英文字符",trigger:"blur" }
        ],
      },
      count:4,
      errMessage:"",
      susflag:false,
      errflag:false,
      subflag:true,
      status:{
        cer_id:false,
        period:false,
        rule_prefix:false
      }
    }
  },
  filters:{
  },
  created(){
    this.getlist()
     const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1);
    const date=now.getDate()<10?'0'+now.getDate():now.getDate();
    this.dateform.rule_date = year+''+month+''+date;
  },
  components: {
    topHeader
  },
  methods: {
    goback(){
      this.$router.push({path: '/admin/trainingperiod'})
    },
    datec(e){
      this.dateform.rule_date = e 
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
    datechange(el){
      for(let i=0;i<this.datedata.length;i++){
        if(el == this.datedata[i].value){
          this.datedata[i].show = true
        }else{
          this.datedata[i].show = false
        }
      }
    },
    getlist(){
      getCerTrainingList().then((res) => {
        const datalist = [];
        if (res.ret === 200) {
          for(let i=0;i<res.data.length;i++){
            datalist.push({
              value : res.data[i].id,
              label : res.data[i].cer_name,
              show  : false,
              thumbnail_path : res.data[i].thumbnail_path
            })
          }
          this.datedata=datalist
        } else {
          alert(2)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitform(list){
      this.$refs['dateform'].validate((valid) => {
        if(valid){
          this.subflag = true
          SetTrainingPeriod(this.dateform).then((res) => {
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
</style>
