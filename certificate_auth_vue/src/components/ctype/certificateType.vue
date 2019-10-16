<template>
  <div class="certificate">
    <top-header  
        :buttonList="btnList"
        :title="titleTxt" @triggerBtnClick="addtype"></top-header>
    <div class="contentlist">
      <el-table  ref="moviesTable"  
          :data="tableData "
           style="width:100%"  
           :header-cell-style="tableRowStyle" 
           :cell-style="tableRowStyle" 
           >
          <el-table-column prop="name"  align="left"  min-width="200px"  label="证书名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="addtime"  min-width="200px" align="center" label="添加时间"></el-table-column>
          <el-table-column prop="username" show-overflow-tooltip  min-width="100px" label="创建人" align="center"></el-table-column>
          <el-table-column prop="button"    min-width="140px" label="操作" align="center"  >
             <template slot-scope="scope">
              <div class="buttons"  v-for="item in scope.row.operation" :key="item.name">
                  <router-link v-if="item.path" :target="item.target" :to="{path: `/${item.path}`, query: {id: scope.row.id} }">{{item.name}}</router-link>
                  <span v-else @click="clickFu(item.name, scope.row.id)">{{item.name}}</span>
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
import {getCerTypeList , deleteCerType } from '@/api/certificateaxios'
export default {
  data () {
    return {
      pagesize:10,
      currentPage:1,
      titleTxt:"证书类型列表",
      btnList: [
          {
            name: '新建',
            icon: 'add-icon',
            className: 'create-btn'
          }
        ],
      total:0,
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
  filters:{
    deadline(value){
      const now = new Date()
    }
  },
  methods: {
    pageChange(){

    },
    getList(data){
       getCerTypeList(data).then((res) => {
        if (res.ret === 200) {
          res.data.list.forEach((item) => {
            item.operation = [
              {
                name: '编辑',
                icon: 'editor-icon',
                className: 'editor-btn',
                path: 'admin/certificateType/editor'
              },
              {
                name: '预览',
                icon: 'see-icon',
                target:"_blank",
                className: 'see-btn',
                path: 'admin/certificateType/see'
              }
            ]
            item.operation.push({
              name: '删除',
              icon: 'delete-icon',
              className: 'delete-btn'
            })
          })
          this.tableData = res.data.list
          this.total = parseInt(res.data.count)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    tableRowStyle({ row, rowIndex }) {
      return 'padding:  0;height: 40px'
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList({
        pageIndex: val,
        pageSize: this.pagesize
      })
    },
    deleteInfo(uid){
      this.$alert("<div class='waring-icon'></div><p class='lssuetitle'>类型删除后不可恢复，确定删除？</p><p class='lssuespan'></p> ",'删除',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        dangerouslyUseHTMLString:true,
        customClass:'confirm-box',
      }).then(() => {
        deleteCerType(uid).then((res) => {
          console.log(res.ret)
          if(res.ret == 200) { 
            this.getList({
              pageIndex: this.currentPage,
              pageSize: this.pagesize
            })
          }else{
            this.$alert(`<div class="waring-icon"></div><p class="lssuetitle">删除失败！</p><p class="lssuespan">（${res.msg}）</p>`, '删除', {
              dangerouslyUseHTMLString: true,
              customClass:'confirm-box',
            })
          }
        }) 
      })
    },
    clickFu (type, data) {
      if (type === '删除') {
        this.deleteInfo(data)
      }  
    },
    addtype(){
      this.$router.push({path: '/admin/certificateType/create' })
    }

  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
</style>
