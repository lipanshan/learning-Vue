<template>
    <div class="unobtain">
        <top-header @triggerBtnClick="triggerBtnClick"
                    :buttonList="btnList"
                    :title="titleTxt"></top-header>
        <div class="table-wrap">
            <el-table
                    :data="tableData"
                    :default-sort="{prop: 'id', order: 'descending'}"
                    :row-class-name="'custom-table-cls'"
                    :header-row-class-name="'custom-table-cls'"
                    :row-style="rowStyle"
                    style="width: 100%">
                <el-table-column label="姓名" prop="stu_name" align="left" show-overflow-tooltip></el-table-column>
                <el-table-column label="性别" width="50px" prop="stu_sex"  align="center" ></el-table-column>
                <el-table-column label="单位名称" show-overflow-tooltip prop="company_name"  align="center" ></el-table-column>
                <el-table-column label="证书类型" show-overflow-tooltip prop="certype"  align="center" ></el-table-column>
                <el-table-column label="参加培训期数" width="106px" prop="period"  align="center" ></el-table-column>
                <el-table-column label="联系方式" prop="tel"  align="center" ></el-table-column>
                <el-table-column label="操作" width="180px"  align="center" >
                    <template slot-scope="scope">
                        <div class="operation">
                            <div v-for="item in scope.row.operation" :key="item.name">
                                <router-link v-if="item.path" :to="{path: `/${item.path}`, query: {id: scope.row.id}}">
                                    {{item.name}}
                                </router-link>
                                <span v-else @click="clickFun(item, scope.row)">{{item.name}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <my-pagination @pagenumchange="paginationChange"
                           :totalNumber="totalNum"
                           :pageSize="pageLength"
                           :pageNumber="currentPage"></my-pagination>
            <div v-show="loading" v-loading="loading" class="loading"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import topHeader from '@/components/content-header'
import myPagination from '@/components/custompagination'
import {getUnobtainList, deleteUnobtain, createCertificate} from '@/api/student'

const PAGE_SIZE = 10 //每页条数
const CREATE_CER = '生成证书'
export default {
  name: "StudentCertificateUnobtain",
  data() {
    return {
      currentPage: 1,
      totalNum: 0,
      pageLength: PAGE_SIZE,
      btnList: [
        {
          name: '新建',
          icon: 'add-icon',
          className: 'create-btn'
        }
      ],
      titleTxt: '学员证书列表',
      tableData: [
        // {
        //   id: 0,
        //   stu_name: '',
        //   stu_sex: '',
        //   company_name: '',
        //   certype: '',
        //   starttime: '',
        //   endtime: '',
        //   period: '',
        //   certificatesStatus: '',
        //   tel: '',
        //   ifused: 1,
        //   operation: [
        //     {
        //       name: '生成证书',
        //       icon: 'certificate-icon',
        //       className: 'certificate-btn',
        //     },
        //     {
        //       name: '编辑',
        //       icon: 'editor-icon',
        //       className: 'editor-btn',
        //       path: 'admin/stuunobtain/editor'
        //     },
        //     {
        //       name: '查看',
        //       icon: 'see-icon',
        //       className: 'see-btn',
        //       path: 'admin/stuunobtain/see'
        //     },
        //     {
        //       name: '删除',
        //       icon: 'delete-icon',
        //       className: 'delete-btn'
        //     }
        //   ]
        // }
      ],
      loading: true
    }
  },
  created() {
    this.getList({
      page: this.currentPage,
      perpage: this.pageLength
    })
  },
  methods: {
    triggerBtnClick() {
      this.$router.push({
        path: '/admin/stuunobtain/create'
      })
    },
    getList(data) {
      getUnobtainList(data).then((res) => {
        if (res.ret === 200) {
          res.data.items.forEach((item) => {
            item.operation = [
              {
                name: '生成证书',
                icon: 'certificate-icon',
                className: 'certificate-btn',
              },
              {
                name: '编辑',
                icon: 'editor-icon',
                className: 'editor-btn',
                path: 'admin/stuunobtain/editor'
              },
              {
                name: '查看',
                icon: 'see-icon',
                className: 'see-btn',
                path: 'admin/stuunobtain/see'
              }
            ]
            item.ifused ? item.operation.push({
              name: '删除',
              icon: 'delete-icon',
              className: 'delete-btn'
            }) : ''
          })
          this.totalNum = res.data.totalitems
          this.tableData = res.data.items
        }
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    rowStyle() {
      return 'height: 40px'
    },
    createCertificate(data) {
      this.$alert(`<div class="danger-icon2"></div><p class="title">确定对该学员进行证书生成？</p><p class="subtitle">有效期为（${data.starttime} 至 ${data.endtime}）</p>`, '证书生成', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'custom-confirm',
        confirmButtonText: '确定',
        callback: (action) => {
          if (action === 'confirm') {
            createCertificate(data.id).then((res) => {
              if (res.ret === 200) {
                this.$alert('<div class="success-icon"></div><p class="title">学员证书生成成功！</p><p class="subtitle"></p>', '证书生成', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonClass: 'custom-confirm'
                })
                this.getList({
                  page: this.currentPage,
                  perpage: this.pageLength
                })
              } else {
                this.$alert(`<div class="danger-icon"></div><p class="title">学员证书生成失败！！</p><p class="subtitle">（${res.msg}）</p>`, '证书生成', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonClass: 'custom-confirm'
                })
              }
            }).catch((err) => {
              console.log(err)
              this.$alert(`<div class="danger-icon"></div><p class="title">学员证书生成失败！！</p><p class="subtitle">（${err.msg}）</p>`, '证书生成', {
                dangerouslyUseHTMLString: true,
                confirmButtonClass: 'custom-confirm'
              })
            })
          }
        }
      });
    },
    deleteInfo(id) {
      this.$alert('<div class="danger-icon"></div><div class="title">确定删除此条学员信息？</div><div class="subtitle"></div>', '删除', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'custom-confirm',
        confirmButtonText: '确定',
        callback: (action) => {
          if (action === 'confirm') {
            deleteUnobtain(id).then((res) => {
              if (res.ret === 200) {
                this.getList({
                  page: this.currentPage,
                  perpage: this.pageLength
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      });
    },
    clickFun(item, data) {
      if (item.name === CREATE_CER) {
        this.createCertificate(data)
      } else {
        this.deleteInfo(data.id)
      }
    },
    paginationChange(index) {
      this.currentPage = index
      this.getList({
        page: this.currentPage,
        perpage: this.pageLength
      })
    }
  },
  components: {
    topHeader,
    myPagination
  }
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'
.unobtain
    background-color: $bg-color-white
    .el-table
        color: $font-color-info
        border: none
    .el-table th, .el-table tr, .el-table td
        background: $bg-color-white
        border-right: none
.table-wrap
    padding-left: 10px
    padding-right: 10px
    .el-table--border
        border: none
    .loading 
        position: absolute
        top: 40px 
        right: 0 
        bottom: 0
        left: 0 
        background-color: $bg-color-white
        z-index: 20
.custom-table-cls
    td, th
        padding: 0
        border-color: #ededed
        height: 40px
    .cell
        white-space: nowrap
        // text-overflow: clip
        .operation
            display: flex
            width: 180px
            margin: 0 auto
            & > div
                font-size: $font-size-smer
                line-height: 24px
                padding: 0 6px
                cursor: pointer
                & > a, & > span
                    display: block
                    color: $font-color-primary
                    text-decoration: none
                    &:hover
                        color: $font-color-primary-hover
                    &:active
                        color: $font-color-primary-active

.el-table__empty-block
    background: $bg-color-light

.el-message-box__header
    padding-left: 10px
    padding-top: 0

.el-message-box__title
    font-size: $font-size-base
    line-height: 30px
    color: $font-color-info

.el-message-box__content
    .danger-icon
        margin: 0 auto
        width: 50px
        height: 50px
        border-radius: 50px
        background: url(../assets/images/fail_success.png) no-repeat 0 0
    .danger-icon2
        margin: 0 auto
        width: 50px
        height: 50px
        border-radius: 50px
        background: url(../assets/images/danger_icon.png) no-repeat 0 0
    .success-icon
        margin: 0 auto
        width: 50px
        height: 50px
        border-radius: 50px
        background: url(../assets/images/success_icon.png) no-repeat 0 0
    .title
        margin-top: 18px
        font-size: $font-size-lg
        line-height: 36px
        color: $font-color-normal
        text-align: center
    .subtitle
        min-height: 32px
        font-size: $font-size-base
        line-height: 32px
        color: $font-color-info
        text-align: center

.el-message-box__btns
    padding-bottom: 16px
    text-align: center
    .custom-confirm
        width: 100px
        padding: 0
        font-size: $font-size-base
        line-height: 32px
        color: $font-color-normal
        border-radius: 34px
        background: none
        border-color: $border-color-page
        &:hover
            background-color: $font-color-primary-hover
            color: $font-color-white
            border-color: $font-color-primary-hover
        &:active
            background-color: $font-color-primary-active
            color: $font-color-white
            border-color: $font-color-primary-active
</style>