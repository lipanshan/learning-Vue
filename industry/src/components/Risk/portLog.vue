<template>
  <div class="table-wrap">
    <div class="seach-warp text-right">

      <span>筛选条件</span>
      <div class="ass-seach-list">
        <at-select placeholder="请选择" v-model="search.condition" @on-change="boot()">
          <at-option value="0">全部</at-option>
          <at-option value="1">端口</at-option>
          <at-option value="2">协议</at-option>
        </at-select>
      </div>
      <div class="ass-seach-list">
        <at-input placeholder="模糊搜索" append-button v-model="search.keyword">
        </at-input>
      </div>
      <span>筛选条件</span>
      <div class="ass-seach-list">
        <at-select placeholder="请选择" v-model="search.riskType" @on-change="boot()">
          <at-option value="0">全部</at-option>
          <at-option value="1">访问量</at-option>
          <at-option value="2">风险量</at-option>
          <at-option value="3">源IP</at-option>
          <at-option value="4">目标IP</at-option>
        </at-select>
      </div>
      <div class="ass-seach-list ass-search-small">
        <at-select placeholder="请选择" v-model="search.where" @on-change="boot()">
          <at-option value="0">全部</at-option>
          <at-option value="1">大于</at-option>
          <at-option value="2">小于</at-option>
          <at-option value="3">等于</at-option>
        </at-select>
         <at-input placeholder="数量" append-button @keyup.native="telnumber()"  v-model="search.num">
        </at-input>
      </div>
      <span>时间</span>
      <div class="ass-seach-list">
        <at-select placeholder="请选择"  v-model="search.dateTime" @on-change="boot()">
          <at-option value="1">当天</at-option>
          <at-option value="2">近一周</at-option>
          <at-option value="3">近一月</at-option>
        </at-select>
      </div>
      <at-button type="primary" @click='boot'>搜索</at-button>
    </div>
    <at-table :columns="columns1" :data="data3"  ref="tableWrap"></at-table>
    <div class="at-footer">
      <at-pagination :total="search.pageMax" @page-change="pageChange"   :page-size="search.pageSize" :current="search.pageIndex"></at-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {getSign} from '@/assets/js/sign'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import qs from 'qs'
 export default {
    data () {
      return {
        search:{
          keyword:"",
          condition:"0",
          where:"0",
          riskType:"0",
          num:"",
          dateTime:"1",
          pageMax:0,
          pageIndex:1,
          pageSize:10
        },
        data3:[],
        columns1: [
          {
            title: '序号',
            key: 'number' ,
            width: "7%"
          },
          {
            title: '源端口/协议',
            key: 'sourcePort',
            width: "13%"
          },
          {
            title: '访问量',
            key: 'countMum',
            width: "11%"
          },{
            title: '风险量',
            key: 'riskNum',
            width: "11%"
          },{
            title: "源IP",
            key: "sourceIp",
            width: "13%"
          },{
            title: "目标IP",
            key: 'targetIp',
            width: "13%"
          },{
            title: "首次时间",
            key : "firstTime" ,
            width: "16%"
          },{
            title: "最后时间",
            key : "endTime" ,
            width: "16%"
          }
        ]
      }
    },mounted () {
      this.boot()
    },
    beforeDestroy () {
     window.removeEventListener('resize', this.$refs.tableWrap.handleResize)
   },
    methods: {
     makePageData (adata) {
        let data = [];
        adata.list.forEach((item,index)=> {
          const sr = {
            number : item.number,
            sourcePort : item.sourcePort+'/'+item.agreement,
            countMum : item.countNum,
            riskNum : item.riskNum,
            sourceIp : item.sourceIpNum,
            targetIp : item.targetIpNum,
            firstTime : item.firstTime,
            endTime : item.endTime
          }
          data.push(sr)
        })
        this.data3 = data
      },telnumber:function(e){
        this.search.num=this.search.num.replace(/[^0-9]/g,"")
      },
      pageChange:function(val){
        this.boot(val)
      },nodata:function(){
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
          service: 'App.RiskStatistics.PortLog',
          tips: time,
          condition:this.search.condition,
          keyword:this.search.keyword,
          riskType:this.search.riskType,
          where:this.search.where,
          datetime:this.search.dateTime,
          num:this.search.num,
          pageIndex:pageindex,
          pageSize:this.search.pageSize
        }
        return axios.post("/",qs.stringify({
          sign: getSign(data),
          tips: time ,
          service : 'App.RiskStatistics.PortLog',
          condition:this.search.condition,
          keyword:this.search.keyword,
          riskType:this.search.riskType,
          where:this.search.where,
          num:this.search.num,
          datetime:this.search.dateTime,
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
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
