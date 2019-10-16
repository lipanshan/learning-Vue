<template>
  <div class="certificate">
     <top-header  
        :title="titleTxt"></top-header>
    <div class="contentlist">
      <el-table  ref="moviesTable"  
          :data="tableData "
           style="width:100%"  
           :header-cell-style="tableRowStyle" 
           :cell-style="tableRowStyle" 
           @sort-change="sortChange"
           >
          <el-table-column prop="manufacturer_name" align="left" min-width="100" label="厂商名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="trainee_number"  sortable="custom"  align="center" label="学员认证数量" min-width="130"></el-table-column>
          <el-table-column prop="technology" label="厂商技术认证" min-width="110"  align="center"></el-table-column>
          <el-table-column prop="service" label="厂商服务认证"   min-width="110" align="center"></el-table-column>
          <el-table-column prop="star_level" label="厂商认证星级" min-width="110"  align="center">
             <template slot-scope="scope">
                <div v-if="scope.row.star_level == 0" >未通过</div>
                <div v-else :class="'star'+scope.row.star_level" class="backgroundstar"  ></div>
              </template>
          </el-table-column>
          <el-table-column prop="status" label="证书状态" align="center" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="unitstatus"  v-if="scope.row.status=='2'">未签发</div>
              <div class="unitstatus"  v-if="scope.row.status=='1'">已签发
                <span v-if="scope.row.validity_status == 1">（<i  >正常</i>）</span>
                <span v-if="scope.row.validity_status == 2">（<i  class="color-wraning">过期</i>）</span>
                <span v-if="scope.row.validity_status == ''"></span>
              </div>
              <div class="unitstatus"  v-if="scope.row.status=='3'">已签发（正常）</div>
            </template>
          </el-table-column>
          <el-table-column prop="time_filed" sortable="custom" align="center" label="签发日期" min-width="120"></el-table-column>
          <el-table-column prop="contacts" align="center" min-width="90"  label="商务联系人" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mobile" align="center"   min-width="110" label="手机号码"></el-table-column>
          <el-table-column prop="button" label="操作"  align="center"   min-width="170" >
            <template slot-scope="scope">
              <div class="buttons"  v-for="item in scope.row.operation" :key="item.name">
                  <router-link v-if="item.path" :to="{path: `/${item.path}`, query: {id: scope.row.id} }">{{item.name}}</router-link>
                  <span v-else @click="clickFu(item.name, scope.row)">{{item.name}}</span>
              </div>
            </template>
          </el-table-column>

        </el-table>
         <my-pagination @pagenumchange="handleCurrentChange"
           :totalNumber="total"
           :pageSize="pagesize"
           :pageNumber="currentPage"></my-pagination>
    </div>
  </div>
</template>

<script>
import myPagination from '@/components/custompagination'
import topHeader from '@/components/content-header'
import {  getFirmCertificateList , RenewCertificate , IssueCertificate  } from '@/api/certificateaxios'
import {timeout} from "@/api/util";
export default {
  data () {
    return {
      pagesize:10,
      currentPage:1,
      titleTxt:"厂商证书列表",
      total:0, 
      orderBy:"",
      tableData:[
      ]
    }
  },
  created () {
    this.getList({
      pageIndex: this.currentPage,
      pageSize: this.pagesize
    })
  },
  components: {
      topHeader,
      myPagination
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList({
        pageIndex: val,
        pageSize: this.pagesize,
        orderBy: this.orderBy
      })
    },
    getList(data) {
      getFirmCertificateList(data).then((res) => {
        if (res.ret === 200) {
          res.data.list.forEach((item) => {
            const arr = ['未通过','初级','中级','高级'];
            arr.map(function(value,index){
              if(index == item.technology){item.technology = arr[index]}
              if(index == item.service){item.service = arr[index]}
            })
            item.operation = [
              {
                name: '编辑',
                icon: 'editor-icon',
                className: 'editor-btn',
                path: 'admin/firmCertificate/edit'
              },
              {
                name: '查看',
                icon: 'see-icon',
                className: 'see-btn',
                path: 'admin/firmCertificate/see'
              }
            ]
            if(item.status==2 || item.validity_status == 2){
              item.operation.unshift(
                 {
                  name: '签发证书',
                  icon: 'delete-icon',
                  className: 'delete-btn'
                }
              )
            }
          })
          this.tableData = res.data.list
          this.total = parseInt(res.data.count)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    lssueCre(udata){
      let udate = "";
      let nowdate = "";
      udate = new Date()
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1);
      const date=now.getDate()<10?'0'+now.getDate():now.getDate();
      nowdate = year+'年'+month+'月'+date+'日';
      udate = year+1+'年'+month+'月'+date+'日';
      this.$alert(`<div class='primary-icon'></div><p class='lssuetitle'>确定对该厂商进行证书签发？</p><p class='lssuespan'>有效期为（${nowdate}至${udate}）</p>`,'证书签发',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        dangerouslyUseHTMLString:true,
        customClass:'confirm-box',
         callback: (action) => {
          if (action === 'confirm') {
            if(udata.status == 1){
              RenewCertificate(udata.id).then((res) => {
                if (res.ret === 200) { 
                  if(this.orderBy == ""){
                     this.getList({
                      pageIndex: this.currentPage,
                      pageSize: this.pagesize 
                    })
                  }else{
                    this.getList({
                      pageIndex: this.currentPage,
                      pageSize: this.pagesize ,
                    orderBy: this.orderBy
                    })
                  }
                 
                }else{
                  this.$alert(`<div class="waring-icon"></div><p class="lssuetitle">厂商证书续签失败！</p><p class="lssuespan">（${res.msg}）</p>`, '证书签发', {
                    dangerouslyUseHTMLString: true,
                    customClass:'confirm-box',
                  })
                }
              }).catch((err) => {
              console.log(err)
            }) 
            }else {
              IssueCertificate(udata.id).then((res) => {
                 if (res.ret === 200) { 
                  this.$alert('<div class="success-icon"></div><p class="lssuetitle">厂商证书签发成功！</p><p class="lssuespan"></p>', '证书签发', {
                    dangerouslyUseHTMLString: true,
                    customClass:'confirm-box',
                  })
                  if(this.orderBy == ""){
                     this.getList({
                      pageIndex: this.currentPage,
                      pageSize: this.pagesize 
                    })
                  }else{
                    this.getList({
                      pageIndex: this.currentPage,
                      pageSize: this.pagesize ,
                    orderBy: this.orderBy
                    })
                  }
                }
              }) 
            }
          }
        }
      })
    },
    tableRowStyle({row,rowIndex}){
      return 'padding:  0;height: 40px'
    },
    sortChange(column,prop,order){
      this.orderBy= '';
      let col ,od;
      if(column.prop != null ){
        col = column.prop == 'trainee_number'?'traineeNum':'timeFiled';
        if(column.order != null){
          od = column.order== 'descending'?2:1;
          let obi = {};
          obi[col]=od;
          let obj =JSON.stringify(obi)
          this.orderBy= obj;
          this.getList({
            pageIndex: this.currentPage,
            pageSize: this.pagesize ,
            orderBy:obj
          })
        }else{
          this.getList({
            pageIndex: this.currentPage,
            pageSize: this.pagesize 
          })
          return false
        }
      }else{
        this.getList({
          pageIndex: this.currentPage,
          pageSize: this.pagesize 
        })
        return false
      }
    },
    clickFu(type, data){
      if(type=="签发证书"){
        this.lssueCre(data) 
      }
    },
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
.firmname
  width: 100%
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.backgroundstar
  position: relative
  display: inline-block
  width: 72px
.backgroundstar::before
  content: ""
  display: inline-block
  height: 30px
  line-height: 40px
  vertical-align: middle
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
