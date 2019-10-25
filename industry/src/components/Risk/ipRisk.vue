<template>
  <div class="hello">
      <div class="seach-warp text-right">
        <span>源IP</span>
        <div class="ass-seach-list">
         <at-input id="ip_search" v-model="search.keyword" placeholder="模糊搜索" >
        </at-input>
        </div>
        <span>时间</span>
        <div class="ass-seach-list"  >
          <at-select placeholder="请选择" v-model="search.datetime" @on-change="boot()">
            <at-option value="1">当天</at-option>
            <at-option value="2">近一周</at-option>
            <at-option value="3">近一月</at-option>
          </at-select>
        </div>
        <at-button type="primary"  @click='boot'>搜索</at-button>
      </div>
      <at-table :columns="columns1" :data="data3" ref="tableWrap"></at-table>
      <div class="at-footer">
        <at-pagination :total="search.pageMax" @page-change="pageChange"   :page-size="search.pageSize" :current="search.pageIndex"></at-pagination>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import {getSign} from '@/assets/js/sign'
// import { baseUrl_common } from "@/api/baseurl";
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import qs from 'qs'
 export default {
    data () {
      return {
        search:{
          keyword:"",
          datetime:"1",
          pageIndex:'1',
          pageSize:'10',
          pageMax:0,
          pageIndex:1,
          pageSize:10
        },
        data3:[],
        columns1: [
          {
            title: '序号',
            key: 'num' ,
            width: "10%"
          }, {
            title: '访问量',
            key: 'visit',
            width: "15%"
          },{
            title: "源IP",
            key: "sourceIp",
            width: "15%"
          },
          {
            title: '风险量',
            key: 'risk',
            width: "20%"
          },{
            title: "目标量",
            key: 'target',
            width: "20%"
          },{
            title: "最后访问",
            key : "date" ,
            width: "20%"
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
            num : item.number,
            visit : item.countNum,
            risk : item.riskNum,
            sourceIp : item.sourceIp,
            target : item.targetNum,
            date : item.dateTime
          }
          data.push(sr)
        })
        this.data3 = data
      },
      pageChange:function(val){
        this.boot(val)
      },nodata:function(){
        $('.at-table__tbody tr').show()
        $(".loadingDiv").remove()
        $(".not-data").remove()
        $(".at-table__body").append('<div class="not-data"><div class="not-data-img"></div><p class="not-data-txt">抱歉，暂无数据,请尝试其他检索条件~</p></div>')
      },
      boot(val){
        $(".loadingDiv").remove()
        $(".not-data").remove()
        $('.at-table__tbody tr').hide()
        $(".at-table__body").append('<div class="loadingDiv text-center"><div class="loading-data-img"></div><p class="loading-data-txt">加载中...</p></div>')
        const pageindex = val>0 ? val : 1;
        this.search.pageIndex =pageindex;
        const time = new Date().getTime()
        const data = {
          service: 'App.RiskStatistics.IpRisk',
          tips: time,
          keyword:this.search.keyword,
          datetime:this.search.datetime,
          pageIndex:pageindex,
          pageSize:this.search.pageSize
        }
        return axios.post("/",qs.stringify({
          sign: getSign(data),
          tips: time,
          service :'App.RiskStatistics.IpRisk',
          keyword:this.search.keyword,
          datetime:this.search.datetime,
          pageIndex:pageindex,
          pageSize:this.search.pageSize
        })).then((res) => {
          if(res.data.ret == 200){
            this.data3 = []
            const num = res.data.data.countNum
            this.search.pageMax = parseInt(num)
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
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
