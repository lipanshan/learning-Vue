<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="triggerBackClick" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="dateform" status-icon :rules="rules" ref="dateform" label-width="120px" class="contentlist">
      <el-form-item class="form-wrap" label="证书选择" prop="cer_id">
        <el-col :span="9">
          <el-select 
              placeholder="请选择"
              allow-create
              size="mini"
              :disabled='true'
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
        <div v-for="item in datedata" v-show="item.value == dateform.cer_id"  class="imgblock"><img :src="item.thumbnail_path" /></div>
      </el-form-item>
      <el-form-item class="form-wrap trainnum" label="培训期数" prop="period">
        <el-col :span="1">第</el-col>
        <el-col :span="5">
          <el-input  type="tel" :disabled='true'   size="mini" v-model="dateform.period" placeholder=""></el-input>
        </el-col>
         <el-col :span="1">期</el-col>
      </el-form-item>
      <el-form-item class="form-wrap numberrule" label="证书编号规则" >
        <el-row class="elbox">
          <el-col :span="8" >
              <el-form-item class="ruleblock"  prop="rule_prefix">
                <span class="demonstration">规则：</span>
                <el-input   :disabled='true'  v-model="dateform.rule_prefix"   placeholder="scsaa"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6" class="dashedtop">
            <el-form-item class=""  prop="rule_date">
                <el-input   :disabled='true' v-model="dateform.rule_date"    ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class=""  >
                <el-input   v-if="dateform.rule_random == 1"  :disabled='true' :value="123" placeholder="20190402"></el-input>
                <el-input   v-if="dateform.rule_random == 2"  :disabled='true' :value="1234" placeholder="20190402"></el-input>
                <el-input  v-if="dateform.rule_random == 3"  :disabled='true' :value="12345" placeholder="20190402"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="dashedleft">
            <el-date-picker
              :disabled='true'
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
              <el-radio :disabled='true' v-model="dateform.rule_random"   label="1"> 3位随机数</el-radio>
              <el-radio :disabled='true' v-model="dateform.rule_random"   label="2"> 4位随机数</el-radio>
              <el-radio :disabled='true' v-model="dateform.rule_random"  label="3"> 5位随机数</el-radio>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form-wrap" label="备注" prop="certificateInfo">
        <el-input type="textarea" resize="none"   :disabled='true'  v-model="dateform.dateInfo" placeholder="非必填项（200个字符以内）"></el-input> 
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import topHeader from '@/components/content-header'
import {  GetCerTrainingPeriodInfo ,getCerTrainingList } from '@/api/certificateaxios'
export default {
  data () {
    return {
      titleTxt:"查看期数",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      dateform:{
        period:"",
        cer_id:"",
        dateInfo:"",
        rule_prefix:"",
        rule_date:"",
        rule_random:1
      },
      selectvalue:"2",
      datedata:[
      ],
      nowdate:"",
      rules:{}
    }
  },
  components: {
    topHeader
  },
  created(){
    this.getlist()
    this.getInfo(this.$route.query.id)
  },
  methods: {
    triggerBackClick(){
      this.$router.push({path: '/admin/trainingperiod'})
    },
    datec(){},
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
     getInfo(uid){
      GetCerTrainingPeriodInfo(uid).then((res) => {
        if (res.ret === 200) {
          this.dateform.dateInfo = res.data.note;
          this.dateform.period = res.data.period;
          this.dateform.cer_id = res.data.cer_id;
          this.dateform.rule_date = res.data.rule_date;
          this.dateform.rule_prefix = res.data.rule_prefix;
          this.dateform.rule_random = res.data.rule_random+'';

        } else {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
</style>
