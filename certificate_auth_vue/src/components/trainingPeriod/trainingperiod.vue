<template>
  <div class="hello">
    <top-header  
        :buttonList="btnList"
        :title="titleTxt" @triggerBtnClick="add"></top-header>
    <div class="contentlist">
      <el-table  ref="moviesTable"  
          :data="tableData "
           style="width:100%"  
           :header-cell-style="tableRowStyle" 
           :cell-style="tableRowStyle" 
           >
          <el-table-column prop="cer_name" show-overflow-tooltip min-width="200px" align="left" label="证书名称">
          </el-table-column>
          <el-table-column prop="period" min-width="100px" label="培训期数" align="center"></el-table-column>
          <el-table-column prop="addtime" min-width="200px" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="username" min-width="100px" show-overflow-tooltip label="创建人"></el-table-column>
          <el-table-column prop="button" label="操作"   min-width="140px" align="center"  >
            <template slot-scope="scope">
                <div class="buttons" v-for="item in scope.row.operation" :key="item.name">
                    <router-link v-if="item.path" :to="{path: `/${item.path}`, query: {id: scope.row.id} }">{{item.name}}</router-link>
                    <span v-else @click="clickFu(item.name, scope.row)">{{item.name}}</span>
                </div>
        </template></el-table-column>

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
import {getCerTrainingPeriodList , deleteCerTrainingPeriod  } from '@/api/certificateaxios'
export default {
  data () {
    return {
      pagesize:10,
      currentPage:1,
      total:0,
      titleTxt:"培训期数",
      btnList: [
          {
            name: '新建',
            icon: 'add-icon',
            className: 'create-btn'
          }
        ],
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
  filters:{
    deadline(value){
      const now = new Date()
    }
  },
  components: {
      topHeader,
      myPagination
    },
  methods: {
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
      this.$alert("<div class='waring-icon'></div><p class='lssuetitle'>期数删除后不可恢复，确定删除？</p><p class='lssuespan'></p> ",'删除',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        dangerouslyUseHTMLString:true,
        customClass:'confirm-box',
      }).then(() => {
        deleteCerTrainingPeriod(uid).then((res) => {
          if (res.ret === 200) {
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
      console.log(data.id)
      if (type === '删除') {
        this.deleteInfo(data.id)
      }  
    },
    add(){
        this.$router.push({path: '/admin/trainingperiod/create' })
    },
   getList(data) {
      getCerTrainingPeriodList(data).then((res) => {

        if (res.ret === 200) {

          res.data.list.forEach((item) => {
            item.operation = [
              {
                name: '编辑',
                icon: 'editor-icon',
                className: 'editor-btn',
                path: 'admin/trainingperiod/editor'
              },
              {
                name: '查看',
                icon: 'see-icon',
                className: 'see-btn',
                path: 'admin/trainingperiod/see'
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
        this.tableData = undefined
        console.log(err)
      })
    },

  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
</style>
