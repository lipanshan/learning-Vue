<template>
    <div class="setsystem">
        <top-header :title="title"></top-header>
        <el-form :form="formData" class="form"
                 :label-position="'right'"
                 label-width="118px"
                 :rules="rules"
                 :inline-message="true"
                 @submit.native.prevent>
            <el-form-item label="证书到期提醒" class="warn-wrap" prop="ifopen">
                <el-switch
                        active-color="#fff"
                        inactive-color="#fff"
                        :width="50"
                        :active-text="switchTxt"
                        @change="switchFn"
                        v-model="formData.ifopen">
                </el-switch>
            </el-form-item>
            <el-form-item label="证书到期提前：" prop="set_expire_days">
                <el-radio-group :disabled="!formData.ifopen" v-model="formData.set_expire_days">
                    <el-radio v-for="item in dayList" :key="item.selectName" :label="item.selectVal">{{item.selectName}}</el-radio>
                </el-radio-group>
                <el-input-number :controls="false" class="input-number" :min="1" :max="365" :disabled="isDisabledInput" v-model="formData.customize"></el-input-number><span :class="{'disable-day': !formData.ifopen}" class="day">天</span>
            </el-form-item>
            <el-form-item class="form-action">
                <el-button :disabled="submitDate.set_expire_days === '' || submitDate.set_expire_days === undefined || !debounceFlag" type="primary" @click="submitForm">保存</el-button>
                <div v-show="successFlag" class="success"><span class="icon-success"></span><span>保存成功（{{count}}s）</span></div>
                <div v-show="failFlag" class="fail"><span class="icon-warning"></span><span>保存失败（{{errMessage}}），请重试！（{{count}}s）</span></div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import topHeader from '@/components/content-header'
  import {GetExpireDays, submitData} from '@/api/system'
  import {timeout} from "@/api/util";

  export default {
    name: "setsystem",
    data() {
      const validatorDay = (rule, value, callback) => {
        const val = this.submitDate.set_expire_days
        if (this.formData.ifopen) {
          if (val === '' || val === undefined) {
            callback(new Error('不能为空'))
          } else if (!(val > 0 && val <= 365)) {
            callback(new Error('格式错误'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        title: '系统设置',
        dayList: [
          {
            ifselected: false,
            selectName: "7天",
            selectVal: 7
          },
          {
            ifselected: false,
            selectName: "15天",
            selectVal: 15
          },
          {
            ifselected: false,
            selectName: "30天",
            selectVal: 30
          },
          {
            ifselected: false,
            selectName: "自定义",
            selectVal: "customize"
          }
        ],
        formData: {
          ifopen: true,
          set_expire_days: '',
          customize: ''
        },
        rules: {
          set_expire_days: [
            {validator: validatorDay, trigger: 'change'},
            {validator: validatorDay, trigger: 'blur'}]
        },
        errMessage: '网络超时',
        successFlag: false,
        failFlag: false,
        count: 4,
        debounceFlag: true
      }
    },
    created() {
      this.getInfo()
    },
    computed: {
      switchTxt () {
        return this.formData.ifopen ? '已开启' : '已关闭'
      },
      isDisabledInput() {
        if (!this.formData.ifopen || this.formData.set_expire_days !== 'customize') {
          return true
        }
        return false
      },
      submitDate() {
        const set_expire_days = this.formData.ifopen ? this.formData.set_expire_days !== 'customize' ? this.formData.set_expire_days : this.formData.customize : 0
        const if_customize = this.formData.ifopen ? this.formData.set_expire_days === 'customize' ? 2 : 1 : 2
        return {
          set_expire_days,
          if_customize 
        }
      }
    },
    methods: {
      getInfo() {
        GetExpireDays().then((res) => {
          if (res.ret === 200) {
            const arr = []
            let setDays = 7
            let customizeNum = 0
            setDays = 0
            if (res.data[0].ifselected) {
              setDays = res.data[0].selectVal
            }
            if (res.data[1].ifselected) {
              setDays = res.data[1].selectVal
            }
            if (res.data[2].ifselected) {
              setDays = res.data[2].selectVal
            }
            if (res.data[3].ifselected) {
              setDays = 'customize'
              customizeNum = res.data[3].selectVal
              res.data[3].selectVal = 'customize'
            }
            arr.push(res.data[0], res.data[1], res.data[2], res.data[3])
            this.dayList = arr
            if (!res.data.ifopen) {
              setDays = 7
            }
            this.formData = {
            ifopen: res.data.ifopen,
            set_expire_days: setDays,
            customize: customizeNum
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      switchFn (e)  {
        if (!e && this.formData.set_expire_days === 'customize' &&
          (this.formData.customize === '' || this.formData.customize=== undefined)) {
           this.$set(this.formData, 'customize', 0)
        }
      },
      submitForm() {
        if (!this.debounceFlag) {
          return false
        }
        this.debounceFlag = false
        submitData(this.submitDate).then((res) => {
          if (res.ret === 200) {
            this.successFlag = true
            this.failFlag = false
            timeout(3, () => {
              this.count--
            }, () => {
              this.getInfo()
              this.successFlag = false
              this.count = 4
              this.debounceFlag = true
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
        })
      },
    },
    components: {
      topHeader
    }
  }
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'
.setsystem 
  .form 
    .el-form-item
      margin-bottom: 0 
      padding-bottom: 30px
.form
    padding-top: 16px
    .warn-wrap
        & > label
            &::before
                content: "*"
                display: inline-block
                font-size: $font-size-smer
                line-height: 30px
                color: $font-color-require
    .el-form-item
        &.is-success
            .el-input
                & > input
                    border-color: $border-color-lightest
        &.is-error
            .el-input
                & > input
                    border-color: $font-color-require
        .el-form-item__error
            &::before
                content: ""
                display: inline-block
                vertical-align: middle
                width: 15px
                height: 15px
                background: url(../assets/images/fail_min_icon.png) no-repeat 0 0
        .day 
          display: inline-block 
          vertical-align: middle
          font-size: $font-size-base 
          line-height: 31px
          color: $font-color-normal
          &.disable-day
            color: #C0C4CC
    .el-form-item__content
        font-size: $font-size-smer
        line-height: 30px
        .el-input-number
            width: 50px
        .el-switch
            margin-left: 30px
            height: 24px
            .el-switch__core
                height: 24px
                border-radius: 24px
                border: 1px solid $border-color-split !important
                &::after
                    content: ""
                    margin-left: 5px
                    top: 3px
                    background-color: $bg-color-base
            &.is-checked
                .el-switch__core
                    border: 1px solid $border-color-lighter !important
                    &::after
                        content: ""
                        margin-left: -21px !important
                        background-color: $bg-color-lighter
            .el-switch__label.is-active
                color: $font-color-normal
        .input-number
            line-height: 30px
            input
                margin-left: 5px
                margin-right: 5px
                padding-left: 0
                padding-right: 0
                width: 40px
                height: 30px
                line-height: 30px
                vertical-align: middle
        .el-radio.is-checked
            .el-radio__input.is-checked
                .el-radio__inner
                    background-color: #666
                    border-color: #666
            .el-radio__label
                color: $font-color-normal
            &.is-disabled
                .el-radio__input.is-checked
                    .el-radio__inner
                        background-color: #f5f7fa
                        border-color: #E4E7ED
                .el-radio__label
                    color: #E4E7ED
    label
        font-size: $font-size-smer
        line-height: 30px
        color: $font-color-normal
    .form-action
        margin-top: -11px
        .el-form-item__content
            display: flex
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
</style>