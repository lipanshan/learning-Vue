<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="goback" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="dateform" @validate="validateForm"  status-icon :rules="rules" ref="dateform" label-width="120px" class="contentlist">
      <el-form-item class="form-wrap" label="证书选择" prop="cer_id">
        <el-col :span="9">
          <el-select 
              placeholder="请选择"
              allow-create
              :disabled='true'
              size="mini"
              v-model="cer_id"
            >
              <el-option v-for="item in datedata"  :key="item.value"  :value="item.value"  :label="item.label"></el-option>
          </el-select> 
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap " v-if="cer_id ==''" >
        <div   class="imgblock" ><img src='../../assets/images/temp.jpg'  /></div>
      </el-form-item>
      <el-form-item class="form-wrap" v-if="cer_id !=''" >
        <div v-for="item in datedata" v-show="item.value == cer_id" class="imgblock" ><img :src="item.thumbnail_path" /></div>
      </el-form-item>
      <el-form-item class="form-wrap trainnum" label="培训期数" prop="period">
        <el-col :span="1">第</el-col>
        <el-col :span="5">
          <el-input  type="tel" :disabled='true'   size="mini" v-model="period" placeholder=""></el-input>
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
              <el-radio v-model="dateform.rule_random"     label="1"> 3位随机数</el-radio>
              <el-radio v-model="dateform.rule_random"   label="2"> 4位随机数</el-radio>
              <el-radio v-model="dateform.rule_random"  label="3"> 5位随机数</el-radio>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form-wrap" label="备注" prop="note">
        <el-input type="textarea"   v-model="dateform.note" maxlength="200"  placeholder="非必填项（200个字符以内）"></el-input> 
      </el-form-item>
      <el-form-item class="form-wrap subblock" >
        <el-button type="primary" :disabled="subflag" @click="submitform()">保存</el-button>
        <span v-show="susflag" class="susmessage mess"><i class="icon-success"></i>保存成功（{{count}}s）</span>
        <span v-show="errflag" class="errmessage mess"><i class="icon-error"></i>保存失败 ({{errMessage}})，请重试！（{{count}}s）</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import topHeader from '@/components/content-header'
import {  GetCerTrainingPeriodInfo ,getCerTrainingList  , EditTrainingPeriod } from '@/api/certificateaxios'
import {timeout} from "@/api/util";
export default {
  data () {
    return {
      titleTxt:"查看期数",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      nowdate:"",
      period:"123",
      cer_id:"",
      temp_id:"",
      dateform:{
        note:"",
        rule_prefix:"",
        train_id:'',
        rule_date:"",
        rule_random:1
      },
      selectvalue:"2",
      datedata:[
      ],
      rules:{
        rule_prefix:[
            { required: true, message: '请输入证书编号', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },
          { pattern:/^[A-Za-z]+$/, message:"只能输入英文字符",trigger:"blur" }
        ]
      },
      count:4,
      errMessage:"",
      susflag:false,
      errflag:false,
      subflag:false,
      status:{
        rule_prefix:false
      }
    }
  },
  components: {
    topHeader
  },
  created(){
    this.getlist()
    this.getInfo(this.$route.query.id,this.dateform.note)
  },
  methods: {
    goback(){
      this.$router.push({path: '/admin/trainingperiod'})
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
          
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    datec(e){
      this.dateform.rule_date = e 
    },
    getInfo(uid){
      GetCerTrainingPeriodInfo(uid).then((res) => {
        if (res.ret === 200) {
          this.dateform.note = res.data.note;
          this.period = res.data.period;
          this.cer_id = res.data.cer_id;
          this.dateform.rule_date = res.data.rule_date;
          this.dateform.rule_prefix = res.data.rule_prefix;
          this.dateform.rule_random = res.data.rule_random+'';
          this.dateform.train_id =  this.$route.query.id
        } else {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitform(list){
      this.$refs['dateform'].validate((valid) => {
        if(valid){
          this.subflag=true
          const arr = [];
          arr.note = this.dateform.note;
          arr.id = this.$route.query.id
          EditTrainingPeriod(this.dateform).then((res) => {
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
