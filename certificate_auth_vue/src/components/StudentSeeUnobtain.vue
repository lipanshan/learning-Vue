<template>
    <div class="see-unobtain">
        <top-header @triggerBackClick="goBack" :title="title" :backBtn="backBtn"></top-header>
        <el-form class="form"
                 :model="form"
                 :label-position="'right'"
                 label-width="96px"
        >
            <el-form-item label="姓名" prop="stu_name">
                <div class="el-input is-disabled el-input--suffix">
                    <div class="el-input__inner">{{form.stu_name}}</div>
                </div>
            </el-form-item>
            <el-form-item label="性别" prop="stu_sex">
                <el-radio-group v-model="form.stu_sex" disabled>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="id_num">
                <div class="el-input is-disabled el-input--suffix">
                    <div class="el-input__inner">{{form.id_num}}</div>
                </div>
            </el-form-item>
            <el-form-item label="照片" disabled class="file-wrap">
                <img :src="form.photo_file" class="avatar">
            </el-form-item>
            <el-form-item label="单位名称" prop="company_name">
                <div class="el-input is-disabled el-input--suffix">
                    <div class="el-input__inner">{{form.company_name}}</div>
                </div>
            </el-form-item>
            <el-form-item label="证书类型" prop="certificate_id">
                <div class="el-input is-disabled el-input--suffix">
                    <div class="el-input__inner">{{form.certype}}</div>
                </div>
            </el-form-item>
            <el-form-item label="培训期数" prop="train_id">
                <div class="el-input is-disabled el-input--suffix">
                    <div class="el-input__inner">{{form.period}}</div>
                </div>
            </el-form-item>
            <el-form-item label="联系方式" class="tel-type" prop="tel_type">
                <el-radio-group v-model="form.tel_type" disabled>
                    <el-radio v-if="form.tel_type === 1" :label="1">手机号</el-radio>
                    <el-radio v-if="form.tel_type === 2" :label="2">固定电话</el-radio>
                    <el-input class="single-input" v-model="form.tel" disabled clearable></el-input>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" class="commit-wrap">
                <el-input
                        disabled
                        v-model="form.commit"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="非必填项(200个字符以内)" clearable>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import topHeader from '@/components/content-header'
import {studentSeeInfo, getCertificateType} from '@/api/student'

export default {
  name: "StudentSeeUnobtain",
  data() {
    return {
      title: '查看学员信息',
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      certificateTypesList: [],
      trainList: [],
      form: {
        certificate_id: "",
        certype: "",
        commit: "",
        company_name: "",
        id: "",
        id_num: "",
        period: "",
        stu_name: "",
        stu_sex: "",
        tel: "",
        tel_type: "",
        train_id: "",
        photo_file: ''
      }
    }
  },
  created() {
    this.getInfo(this.$route.query.id)
  },
  methods: {
    goBack() {
      this.$router.push('/admin/stuunobtain')
    },
    getInfo(id) {
      Promise.all([getCertificateType(), studentSeeInfo(id)]).then((res) => {
        let arr
        if (res[0].ret === 200) {
          arr = Object.keys(res[0].data).map((item) => {
            return res[0].data[item]
          })
          this.certificateTypesList = arr
        }
        if (res[1].ret === 200) {
          if (res[1].data.stu_sex === '男') {
            res[1].data.stu_sex = 1
          } else if (res[1].data.stu_sex === '女') {
            res[1].data.stu_sex = 2
          }
          res[1].data.tel_type = parseInt(res[1].data.tel_type, 10)
          this.form = res[1].data
        }
      })
    }
  },
  components: {
    topHeader
  }
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'
.see-unobtain
    .el-form-item
        margin-bottom: 0!important
        padding-top: 15px
        padding-bottom: 15px
        .el-input
            width: 175px
            font-size: 0
            vertical-align: top
            &.is-disabled
                .el-input__inner
                    font-size: $font-size-smer
                    line-height: 28px
                    min-height: 30px
                    height: auto
                    padding-right: 15px
                    background: $bg-color-input
                    color: $font-color-info
                    border-color: $border-color-split
                    word-break: break-all
        .el-form-item__label
            line-height: 30px
            color: $font-color-normal
            &::before
                color: $font-color-require !important
        .el-radio-group
            vertical-align: top
            .el-radio.is-disabled
                font-size: $font-size-smer
                line-height: 30px
                color: $font-color-normal
                &.is-checked
                    .el-radio__input.is-checked .el-radio__inner
                        background-color: $font-color-info
                        border-color: $font-color-info
                    .el-radio__label
                        color: $font-color-info
                .el-radio__input.is-disabled
                    .el-radio__inner
                        background: $bg-color-input
                        color: $font-color-info
                        border-color: $border-color-split
                .el-radio__label
                    color: $font-color-info
        .el-textarea
            width: 405px
    .tel-type
        height: 60px
        .single-input
            display: block
        .el-form-item__error
            margin-top: 35px
            margin-left: -22px
    .commit-wrap
        .el-form-item__content
            min-height: 130px
            .el-textarea.is-disabled
                textarea
                    height: 130px !important
                    resize: none
                    background: $bg-color-input
                    color: $font-color-info
                    border-color: $border-color-split
    .file-wrap
        .el-form-item__content
            display: flex
            min-height: 150px
        .avatar
            margin-right: 20px
            width: 110px
            flex: 0 0 110px
            height: 150px
</style>