<template>
    <div class="obtained">
        <top-header :title="titleTxt"></top-header>
        <div class="table-wrap">
            <el-table
                    :data="tableData"
                    :default-sort="{prop: 'id', order: 'descending'}"
                    :row-class-name="'custom-table-cls'"
                    :header-row-class-name="'custom-table-cls'"
                    :row-style="rowStyle"
                    style="width: 100%">
                <el-table-column label="姓名" prop="stu_name" align="left" show-overflow-tooltip></el-table-column>
                <el-table-column label="性别" prop="stu_sex"  align="center"></el-table-column>
                <el-table-column label="单位名称" show-overflow-tooltip prop="company_name" align="center"></el-table-column>
                <el-table-column label="证书类型" show-overflow-tooltip prop="certificate_name" min-width="160px" align="center"></el-table-column>
                <el-table-column label="证书编号" show-overflow-tooltip prop="certificate_num" min-width="190px" align="center"></el-table-column>
                <el-table-column label="证书有效期" show-overflow-tooltip prop="endtime" min-width="246px" align="center"></el-table-column>
                <el-table-column label="参加培训期数" prop="train_num" min-width="110px" align="center"></el-table-column>
                <el-table-column label="证书状态" prop="cerstatus"  align="center">
                    <template slot-scope="scope">
                        <div class="status normal" v-if="scope.row.cerstatus === '正常'">{{scope.row.cerstatus}}</div>
                        <div class="status overdue" v-else-if="scope.row.cerstatus === '过期'">{{scope.row.cerstatus}}
                        </div>
                        <div class="status will-overdue" v-if="scope.row.cerstatus === '即将过期'">{{scope.row.cerstatus}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="联系方式" prop="tel" min-width="120px" align="center"></el-table-column>
                <el-table-column label="操作" min-width="220px"  align="center">
                    <template slot-scope="scope">
                        <div class="operation">
                            <div v-for="item in scope.row.operation" :key="item.name">
                                <router-link v-if="item.path" :to="{path: `/${item.path}`, query: {id: scope.row.id} }">
                                    {{item.name}}
                                </router-link>
                                <a v-else-if="item.download" :href="scope.row.pdf_file"
                                   target="_blank">{{item.name}}</a>
                                <span v-else @click="clickFu(item.name, scope.row)">{{item.name}}</span>
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
import {getobtainedList, deleteObtained, certificateRenew} from '@/api/student'
import {formatTime} from '@/api/util'

const PAGE_SIZE = 10 //每页条数
export default {
  name: "student_certificate_obtained",
  data() {
    return {
      currentPage: 1,
      totalNum: 0,
      pageLength: PAGE_SIZE,
      titleTxt: '学员证书列表',
      tableData: [
        // {
        //   cerstatus: "",
        //   certificate_name: "",
        //   certificate_num: "",
        //   company_name: "",
        //   endtime: "",
        //   id: '',
        //   renewaltime: "",
        //   starttime: "",
        //   stu_name: "",
        //   stu_sex: "",
        //   tel: "",
        //   train_num: "",
        //   validTime: '',
        //   ifrenew: '', //{1:显示续签按钮;0:隐藏续签按钮}
        //   ifused: '', //{1:显示删除按钮;0隐藏删除按钮}
        //   operation: [
        //     {
        //       download: true,
        //       name: '下载',
        //       icon: 'download-icon',
        //       className: 'download-btn'
        //     },
        //     {
        //       name: '续签',
        //       icon: 'renew-icon',
        //       className: 'renew-btn',
        //     },
        //     {
        //       name: '编辑',
        //       icon: 'editor-icon',
        //       className: 'editor-btn',
        //       path: 'admin/stuobtained/editor'
        //     },
        //     {
        //       name: '查看',
        //       icon: 'see-icon',
        //       className: 'see-btn',
        //       path: 'admin/stuobtained/see'
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
    rowStyle() {
      return 'height: 40px'
    },
    getList(data) {
      getobtainedList(data).then((res) => {
        if (res.ret === 200) {
          res.data.items.forEach((item) => {
            item.endtime = `${formatTime(item.starttime)}至${formatTime(item.endtime)}`
            item.operation = [
              {
                download: true,
                name: '下载',
                icon: 'download-icon',
                className: 'download-btn'
              },
              {
                name: '编辑',
                icon: 'editor-icon',
                className: 'editor-btn',
                path: 'admin/stuobtained/editor'
              },
              {
                name: '查看',
                icon: 'see-icon',
                className: 'see-btn',
                path: 'admin/stuobtained/see'
              }
            ]
            if (item.ifrenew) {
              item.operation.splice(0, 0, {
                name: '续签',
                icon: 'renew-icon',
                className: 'renew-btn',
              })
            }
            if (item.ifused) {
              item.operation.push({
                name: '删除',
                icon: 'delete-icon',
                className: 'delete-btn'
              })
            }
          })
          this.tableData = res.data.items
          this.totalNum = res.data.totalitems
        }
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    deleteInfo(id) {
      this.$alert('<div class="danger-icon"></div><div class="title">确定删除此条学员信息？</div><div class="subtitle"></div>', '删除', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'custom-confirm',
        confirmButtonText: '确定',
        callback: (action) => {
          if (action === 'confirm') {
            deleteObtained(id).then((res) => {
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
    renewCertificate(data) {
      this.$alert(`<div class="danger-icon2"></div><p class="title">确定对该学员进行证书续签？</p><p class="subtitle">有效期将延至（${data.renewaltime}）</p>`, '证书续签', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'custom-confirm',
        confirmButtonText: '确定',
        callback: (action) => {
          if (action === 'confirm') {
            certificateRenew(data.id).then((res) => {
              if (res.ret === 200) {
                this.$alert('<div class="success-icon"></div><p class="title">学员证书续签成功！</p><p class="subtitle"></p>', '证书续签', {
                  dangerouslyUseHTMLString: true
                })
                this.getList({
                  page: this.currentPage,
                  perpage: this.pageLength
                })
              } else {
                this.$alert(`<div class="danger-icon"></div><p class="title">学员证书续签失败！</p><p class="subtitle">（${res.msg}）</p>`, '证书续签', {
                  dangerouslyUseHTMLString: true
                })
              }
            }).catch((err) => {
              console.log(err)
              this.$alert(`<div class="danger-icon"></div><p class="title">学员证书续签失败！</p><p class="subtitle">（${err.msg}）</p>`, '证书续签', {
                dangerouslyUseHTMLString: true
              })
            })
          }
        }
      });
    },
    clickFu(type, data) {
      if (type === '删除') {
        this.deleteInfo(data.id)
      } else if (type === '续签') {
        this.renewCertificate(data)
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
.obtained
    background-color: $bg-color-white
    .el-table
        color: $font-color-info
        border: none
    .el-table th, .el-table tr, .el-table td
        background: $bg-color-white
        border-right: none
.table-wrap
    position: relative
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
    td, th.is-leaf
        padding: 0
        border-color: #ededed
        height: 40px
    .cell
        white-space: nowrap
        // text-overflow: clip
        .operation
            display: flex
            width: 220px
            margin: 0 auto
            justify-content: center
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
    .overdue
        color: $font-color-require
    .will-overdue
        color: $font-color-overdue

.el-table__empty-block
    background: $bg-color-light

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