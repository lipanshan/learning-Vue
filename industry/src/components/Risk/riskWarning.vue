<template>
  <div class="table-wrap warning-wrap">
    <div class="seach-warp text-right">

      <span>筛选条件</span>
      <div class="ass-seach-list">
        <at-select  placeholder="请选择" v-model="search.condition" @on-change="boot()" >
          <at-option value="0">全部</at-option>
          <at-option value="1">名称</at-option>
          <at-option value="2">源IP</at-option>
          <at-option value="3">目标IP</at-option>
        </at-select>
      </div>
      <div class="ass-seach-list">
        <at-input placeholder="模糊搜索"  v-model="search.condtext"  append-button>
        </at-input>
      </div>
      <span>风险类型</span>
      <div class="ass-seach-list">
        <at-select placeholder="请选择"  v-model="search.ntype"  @on-change="boot()">
          <at-option value="0">全部</at-option>
          <at-option value="1">tcp</at-option>
          <at-option value="2">udp</at-option>
          <at-option value="3">icmp</at-option>
        </at-select>
      </div>
      <span>时间范围</span>
      <div class="ass-seach-list seach-date" >
        <el-date-picker
          :editable="false"
          v-model="search.startdate"
          :picker-options="pickerOptions0"
          value-format="yyyy-MM-dd"
          type="date"
          size="small"
          name="startdate2"
          placeholder="选择日期">
        </el-date-picker>
        -
          <el-date-picker
            :editable="false"
            v-model="search.enddate"
            :picker-options="pickerOptions1"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            name="enddate"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <at-button type="primary" @click='boot'>搜索</at-button>
    </div>
    <at-table :columns="columns1" :data="data3"  ref="tableWrap">
    </at-table>
    <div class="at-footer">
      <at-pagination :total="search.pageMax"  @page-change="pageChange"   :page-size="search.pageSize" :current="search.pageIndex" ></at-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import Vue from 'vue'
import {getSign} from '@/assets/js/sign'
// import elementui from 'element-ui'
// Vue.use(elementui)
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import qs from 'qs'
 export default {
    data () {
      return {
        search:{
          text:"",
          condition:"0",
          condtext:"",
          ntype:"0",
          startdate:"",
          enddate:"",
          pageMax:0,
          pageIndex:1,
          pageSize:10
        },
        data3:[],
        columns1: [
          {
            title: '序号',
            key: 'num' ,
            width: "8%"
          },
          {
            title: '名称',
            key: 'riskName',
            width: "26%",
            render:(h,params) =>{
              return h('div'),[
                h('div',{
                  attrs:{
                    title:params.item.riskName,
                    class:'textOverflow'
                  },
                  on:{
                    hover:() =>{
                      this.$Message(params.item.riskName)
                    }
                  }
                },params.item.riskName)
              ]
            }
          },
          {
            title: '类型',
            key: 'riskType',
            width: "20%",
            render:(h,params) =>{
              return h('div'),[
                h('div',{
                  attrs:{
                    title:params.item.riskType,
                    class:'textOverflow'
                  },
                  on:{
                    hover:() =>{
                      this.$Message(params.item.riskType)
                    }
                  }
                },params.item.riskType)
              ]
            }
          },{
            title: "源IP",
            key: "sourceIp",
            width: "15%"
          },{
            title: "目标IP",
            key: 'targetIp',
            width: "15%"
          },{
            title: "时间",
            key : "dateTime" ,
            width: "19%"
          }
        ],pickerOptions0: {
                disabledDate: (time) => {
                    if (this.search.enddate) {//time.getTime() > Date.now() ||
                        return new Date(time.getTime()).format('yyyy-MM-dd') > this.search.enddate;
                    }
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                  if (this.search.startdate) {
                    return new Date(time.getTime()).format('yyyy-MM-dd') < this.search.startdate
                  }
                }
            }
      }
    },mounted () {
      this.boot()
    },
    created(){
      const end = new Date().format('yyyy-MM-dd');
      this.search.startdate = end
      this.search.enddate = end
      this.search.type = '' + this.$route.query.riskType
    },
   beforeDestroy () {
     window.removeEventListener('resize', this.$refs.tableWrap.handleResize)
   },
    methods: {
      alert:function (){
        return axios.post("/?service=App.RiskStatistics.RiskWarn1",qs.stringify({
          tips: 'd'
        })).then((res) => {
        })
      },
      makePageData :function(adata) {
        let data = [];
        adata.list.forEach((item,index)=> {
          const sr = {
            num : item.number,
            riskName : item.riskName,
            riskType : item.riskType,
            sourceIp : item.sourceIp,
            targetIp : item.targetIp,
            dateTime : item.dateTime
          }
          data.push(sr)
        })
        this.data3 = data
      },
      pageChange:function(val){
        this.boot(val)
      },
      nodata:function(){
        $(".loadingDiv").remove()
        $(".not-data").remove()
        $('.at-table__tbody tr').show()
        $(".at-table__body").append('<div class="not-data"><div class="not-data-img"></div><p class="not-data-txt">抱歉，暂无数据,请尝试其他检索条件~</p></div>')
      },
      boot:function(val){
        $(".loadingDiv").remove()
        $(".not-data").remove()
        $('.at-table__tbody tr').hide()
        $(".at-table__body").append('<div class="loadingDiv text-center"><div class="loading-data-img"></div><p class="loading-data-txt">加载中...</p></div>')
        const time = new Date().getTime();
        const pageindex = val>0 ? val : 1;
        this.search.pageIndex =pageindex;
        const data = {
          service: 'App.RiskStatistics.RiskWarn',
          tips: time,
          condition:this.search.condition,
          keyword:this.search.condtext,
          riskType:this.search.type,
          startTime:this.search.startdate,
          endTime:this.search.enddate,
          pageIndex:pageindex,
          pageSize:this.search.pageSize
        }
        return axios.post("/",qs.stringify({
          sign: getSign(data),
          tips: time,
          service: 'App.RiskStatistics.RiskWarn',
          condition:this.search.condition,
          keyword:this.search.condtext,
          riskType:this.search.type,
          startTime:this.search.startdate,
          endTime:this.search.enddate,
          pageIndex:pageindex,
          pageSize:this.search.pageSize
        })).then((res) => {
          if(res.data.ret == 200){
            const num = res.data.data.countNum
            this.search.pageMax = parseInt(num)
            this.data3 = []
            if(res.data.data.list.length <1){
              this.nodata()
            } else{
              $(".loadingDiv").remove()
              $('.at-table__tbody tr').show()
              this.makePageData(res.data.data)
            }
          }else if (res.data.ret ==499){
            this.$router.push({path: '/login'})
          }
        },error=>{
            this.nodata()
        }).catch((msg) => {
            this.nodata()
        })
      }
    }
  }

</script>

<style  >
.warning-wrap .at-table .at-table__tbody tr td:nth-child(2){
  text-align:left;
  color:#333;
}
</style>
