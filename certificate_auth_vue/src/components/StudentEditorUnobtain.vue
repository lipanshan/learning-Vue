<template>
    <div class="editor-unobtain">
        <top-header @triggerBackClick="goBack" :title="title" :backBtn="backBtn"></top-header>
        <el-form class="form"
                 :model="form"
                 :rules="rules"
                 :label-position="'right'"
                 label-width="96px"
                 @validate="validateForm"
                 :inline-message="true"
                 ref="formWrap"
        >
            <el-form-item label="姓名" prop="stu_name">
                <el-input :maxlength="stuNameLen" v-model="form.stu_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="stu_sex">
                <el-radio-group v-model="form.stu_sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="id_num">
                <el-input v-model="form.id_num" clearable></el-input>
            </el-form-item>
            <el-form-item label="照片" class="file-wrap" prop="file">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div class="uploader-btn-wrap">
                    <div class="avatar-uploader">
                        <div>上传</div>
                        <el-input type="file" class="file-box" v-model="form.file" @change="uploadImg" ref="fileWrap"></el-input>
                    </div>
                    <div class="upload-tip-message">
                        <p>尺寸要求：295px x 413px</p>
                        <p>格式要求：PNG,JPG 文件大小不超过1M</p>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="单位名称" prop="company_name">
                <el-autocomplete
                        v-model="form.company_name"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入单位名称"
                        :trigger-on-focus="true"
                        :maxlength="companyNameLength"
                        @select="handleSelect"
                        clearable
                >
                 <template slot-scope="props">
                      <div v-show="props.item.value" class="default-value">{{ props.item.value }}</div>
                      <span v-show="props.item.default" class="nothing-value">{{ props.item.default }}</span>
                </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="证书类型" prop="certificate_id">
                <el-select @change="certificateTypeChange" v-model="form.certificate_id" clearable>
                    <el-option v-for="item in certificateTypesList" :key="item.certificate_id" :label="item.certype"
                               :value="item.certificate_id">{{item.certype}}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="培训期数" prop="train_id">
                <el-select v-model="form.train_id" clearable>
                    <el-option v-for="item in trainList" :value="item.train_id" :label="item.period"
                               :key="item.train_id">{{item.period}}
                    </el-option>
                </el-select>
                <span class="tips">请先选择证书类型，再选培训期数</span>
            </el-form-item>
            <el-form-item label="联系方式" class="tel-type" prop="tel_type">
                <el-radio-group v-model="form.tel_type">
                    <el-radio :label="1">手机号</el-radio>
                    <el-radio :label="2">固定电话</el-radio>
                    <el-input class="single-input" v-model="form.tel" clearable></el-input>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" class="commit-wrap">
                <el-input
                        v-model="form.commit"
                        type="textarea"
                        maxlength="200"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="非必填项(200个字符以内)" clearable>
                </el-input>
            </el-form-item>
            <el-form-item class="form-action">
                <el-button @click="submitFn" :disabled="submitBtnStatus || !debounceFlag" type="primary">保存</el-button>
                <div v-show="successFlag" class="success"><span
                        class="icon-success"></span><span>保存成功（{{count}}s）</span></div>
                <div v-show="failFlag" class="fail"><span class="icon-warning"></span><span>保存失败（{{errMessage}}），请重试！（{{count}}s）</span>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import topHeader from '@/components/content-header'
import {isIdCard} from '@/api/util'
import {getCompanyNameList, getCertificateType, studentSeeInfo, editorStudent, uploadImage} from '@/api/student'
import {timeout} from "@/api/util";
let tel_type_old = undefined
export default {
  name: "StudentEditorUnobtain",
  data() {
    const validateCardid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('不能为空'))
      } else if (value && !isIdCard(value)) {
        callback(new Error('身份证号不正确'))
      } else {
        callback()
      }
    }
    const validatePeriod = (rule, value, callback) => {
      if (!value) {
        callback(new Error('不能为空'));
      } else {
        callback()
      }
    }
    const validateFile = (rule, value, callback) => {
      this.uploadCount++
      if (this.$refs.fileWrap.$el.querySelector('input').files[0]) {
        const file = this.$refs.fileWrap.$el.querySelector('input').files[0]
        //use FileReader preview pictures
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', (e) => {
          this.previewUrl = e.target.result
        })
        uploadImage({file}).then((res) => {
          if (res.ret === 200) {
            this.$set(this.form, 'photo_file', res.data.fileName)
            callback()
          } else {
            callback(new Error(res.msg))
          }
        })
      } else {
        callback()
      }
    }
    const validateContact = (rule, value, callback) => {
      if (tel_type_old !== this.form.tel_type) {
        validateContactBlur(rule, value, callback)
        tel_type_old = this.form.tel_type
      }
      callback()
    }
    const validateContactBlur = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$/;
      const telReg = /^0\d{2}-\d{7,8}$/;
      if (this.form.tel_type === 1) {
        if (this.form.tel && !phoneReg.test(this.form.tel)) {
          callback(new Error("手机号不正确"));
        } else if (this.form.tel && phoneReg.test(this.form.tel)) {
          callback();
        } else {
          callback(new Error("不能为空"));
        }
      } else if (this.form.tel_type === 2) {
        if (this.form.tel && !telReg.test(this.form.tel)) {
          callback(new Error("座机号不正确"));
        } else if (this.form.tel && telReg.test(this.form.tel)) {
          callback();
        } else {
          callback(new Error("不能为空"));
        }
      }
    }
    return {
      title: '编辑学员信息',
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      companyNameLength: 20,
      stuNameLen: 8,
      certificateTypesList: [],
      trainList: [],
      form: {
        stu_name: '',
        stu_sex: 0,
        id_num: '',
        company_name: '',
        certificate_id: '',
        train_id: '',
        tel_type: 1,
        tel: '',
        commit: '',
        photo_file: ''
      },
      rules: {
        stu_name: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {min: 1, max: 8, message: '格式错误', trigger: 'blur'}
        ],
        stu_sex: [
          {required: true, message: '不能为空', trigger: 'change'}
        ],
        id_num: [{validator: validateCardid, required: true, trigger: 'blur'}],
        company_name: [
          {required: true, message: '不能为空', trigger: 'change'},
          {required: true, max: 20, message: '格式错误', trigger: 'blur'}
        ],
        certificate_id: [{required: true, message: '不能为空', trigger: 'change'},],
        file: [{validator: validateFile, required: true, trigger: 'change'}],
        train_id: [{validator: validatePeriod, required: true, trigger: 'change'}],
        tel_type: [
          {validator: validateContact, required: true, trigger: 'change'},
          {validator: validateContactBlur, required: true, trigger: 'blur'}]
      },
      validateStatus: {
        stu_name: true,
        stu_sex: true,
        id_num: true,
        company_name: true,
        certificate_id: true,
        train_id: true,
        tel_type: true,
        file: true
      },
      submitBtnStatus: false,
      errMessage: '网络超时',
      successFlag: false,
      failFlag: false,
      count: 4,
      debounceFlag: true,
      previewUrl: '',
      timer: null,
      uploadCount: 0
    }
  },
  created() {
    this.getInfo(this.$route.query.id)
  },
  computed: {
    imageUrl() {
      if (!this.previewUrl) {
        return this.form.stu_sex === 2 ? require('../assets/images/default_woman.png') : require('../assets/images/default_man.png')
      }
      return this.previewUrl
    }
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
          const url = res[1].data.photo_file.split('/')
          this.previewUrl = res[1].data.photo_file
          res[1].data.photo_file = url[url.length - 1]
          this.form = res[1].data
          this.certificateTypeChange(this.form.certificate_id, 'init')
          tel_type_old = this.form.tel_type
        }
      })
    },
    querySearch(queryString, cb) {
      getCompanyNameList(queryString).then((res) => {
        let result = []
        if (res.data.length) {
          res.data = [...new Set(res.data)]
          result = res.data.map((item) => {
            return {
              value: item
            }
          })
        }
        clearTimeout(this.timer);
        if (!result.length) {
          this.timer = setTimeout(() => {
            cb([{default: '暂无匹配到结果', val: this.form.company_name}]);
          }, 1500);
        } else {
          cb(result);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSelect(value) {
       //暂无匹配到结果
       if (value.val) {
        this.$set(this.form, 'company_name', value.val)
      }
    },
    getCertificateTypeList() {
      getCertificateType().then((res) => {
        let arr
        if (res.ret === 200) {
          arr = Object.keys(res.data).map((item) => {
            return res.data[item]
          })
          this.certificateTypesList = arr
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    certificateTypeChange(val, status) {
      for (let i = 0; i < this.certificateTypesList.length; i++) {
        if (this.certificateTypesList[i].certificate_id === val) {
          this.trainList = JSON.parse(JSON.stringify(this.certificateTypesList[i].second_sel.sort((a, b) => {
            const aStr = a.period.substring(1, a.period.length - 1)
            const bStr = b.period.substring(1, b.period.length - 1)
            return aStr - bStr
          })))
          if (status !== 'init') {
              this.$set(this.form, 'train_id', '')
          }
          return
        }
      }
      this.trainList = []
      this.$set(this.form, 'train_id', '')
    },
    validateForm(e, result) {
      let flag = false
      this.validateStatus[e] = result
      for (let key of Object.keys(this.validateStatus)) {
        if (this.validateStatus[key] === false) {
          flag = true
          break
        }
      }
      this.submitBtnStatus = flag
    },
    uploadImg () {
       if (this.uploadCount % 2 === 0) {
        //Validation method is not invoked in uc/ie browser, manual call
        this.$refs['formWrap'].validateField('file', () => {
          this.uploadCount++
        })
      } else {
          this.uploadCount++
      }
    },
    submitFn() {
      if (!this.debounceFlag) {
        return false
      }
      this.debounceFlag = false
      this.$refs['formWrap'].validate((valid) => {
        if (valid) {
          this.$delete(this.form, 'file')
          editorStudent(this.form).then((res) => {
            if (res.ret === 200) {
              this.successFlag = true
              this.failFlag = false
              timeout(3, () => {
                this.count--
              }, () => {
                this.successFlag = false
                this.count = 4
                this.debounceFlag = true
                this.goBack()
              })
            } else {
              this.errMessage = res.msg
              this.successFlag = false
              this.failFlag = true
              timeout(3, () => {
                this.count--
              }, () => {
                this.failFlag = false
                this.count = 4
                this.debounceFlag = true
              })
            }
          }).catch((err) => {
            console.log(err)
            this.debounceFlag = true
          })
        } else {
          this.debounceFlag = true
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
.editor-unobtain
    .el-form-item
        margin-bottom: 0!important
        padding-top: 15px
        padding-bottom: 15px
        .el-form-item__content
            height: 30px
            .tips
              margin-left: 10px
              display: inline-block 
              vertical-align: top 
              font-size: $font-size-base
              line-height: 30px
              color: $font-color-normal  
        .el-select
            vertical-align: top
            .el-input__icon
                line-height: 30px
        .el-input
            width: 175px
            font-size: 0
            vertical-align: top
            &.el-input--suffix
                .el-input__inner:focus
                    border-color: $border-color-split
            &.el-input--suffix.is-focus
                .el-input__inner
                    border-color: $border-color-split
            & > input
                display: block
                line-height: 30px
                height: 30px
                font-size: $font-size-smer
                line-height: 30px
        &.is-success
            .el-input
                & > input
                    border-color: $border-color-lightest
        &.is-error
            .el-input
                & > input
                    border-color: $font-color-require
        .el-form-item__error
            position: relative
            display: inline-block
            margin-left: 10px
            margin-top: 5px
            vertical-align: top
            &::before
                content: ""
                display: inline-block
                vertical-align: middle
                width: 15px
                height: 15px
                background: url(../assets/images/fail_min_icon.png) no-repeat 0 0
        .el-form-item__label
            line-height: 30px
            color: $font-color-normal
            &::before
                color: $font-color-require !important
        .el-radio-group
            vertical-align: top
            .el-radio
                font-size: $font-size-smer
                line-height: 30px
                color: $font-color-normal
                &.is-checked
                    .el-radio__input.is-checked .el-radio__inner
                        background-color: $font-color-info
                        border-color: $font-color-info
                    .el-radio__label
                        color: $font-color-info
        .el-textarea
            width: 405px
            height: 130px
            & > textarea
                width: 100%
                height: 130px !important
                &:focus
                    border-color: $border-color-split
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
            textarea
                resize: none
    .file-wrap
        .el-form-item__content
            display: flex
            min-height: 150px
            .avatar
                margin-right: 20px
                width: 110px
                flex: 0 0 110px
                height: 150px
            .uploader-btn-wrap
                .avatar-uploader
                    position: relative
                    display: inline-block
                    width: 60px
                    height: 24px
                    font-size: $font-size-smer
                    line-height: 22px
                    border-radius: 24px
                    background-color: $bg-color-upload
                    border: 1px solid $btn-border-color
                    color: $font-color-primary
                    text-algin: center
                    & > div
                        display: block
                        text-align: center
                        cursor: pointer
                    .file-box
                        position: absolute
                        left: 0
                        top: 0
                        width: 60px
                        height: 24px
                        border-radius: 24px
                        overflow: hidden
                        z-index: 10
                        cursor: pointer
                        opacity: 0
                .upload-tip-message
                    margin-top: 20px
                    font-size: $font-size-smer
                    line-height: 20px
                    color: $font-color-default
        .el-form-item__error
            margin-top: 9px !important
            margin-left: -145px
    .form-action
        button
            width: 100px
            height: 32px
            border-radius: 32px
            text-align: center
            background-color: $font-color-primary
            color: $font-color-white
            font-size: $font-size-smer
            line-height: 32px
            padding: 0
            vertical-align: top
            &:hover
                background-color: $font-color-primary-hover
            &:active
                background-color: $font-color-primary-active
            &.is-disabled
                background-color: $bg-color-disabled
                border-color: $border-color-disabled
                &:hover
                    background-color: $bg-color-disabled
                &:active
                    background-color: $bg-color-disabled
        .success, .fail
            display: inline-block
            margin-left: 24px
            .icon-success, .icon-warning
                margin-top: 10px
                margin-right: 5px
                float: left
                width: 15px
                height: 15px
                background: url(../assets/images/success_min_icon.png) no-repeat 0 0
            & > span
                float: left
                font-size: $font-size-smer
                line-height: 32px
        .success > span
            color: $font-color-info
        .fail
            & > span
                color: $font-color-require
            .icon-warning
                background: url(../assets/images/fail_min_icon.png) no-repeat 0 0
.el-autocomplete-suggestion
    width: auto !important
    min-width: 175px
.el-autocomplete-suggestion li
    position: relative
    min-height: 34px
    .nothing-value 
        display: block
        position: absolute
        top: 0
        right: 0 
        bottom: 0 
        left: 0 
        z-index: 10
        padding: 0 20px
        cursor: default
        background-color: $bg-color-white 
</style>