<template>
  <div class="register-info-wrap">
    <v-scroll class="register-info">
      <h1 class="title">注册信息</h1>
      <form>
        <h2 class="subtitle">个人</h2>
        <ul class="list">
          <li class="item">
            <div class="input">
              <cube-input v-model="info.name"><label class="label" slot="prepend">姓名</label></cube-input>
            </div>
          </li>
          <li class="item border-bottom-1px">
            <div class="input">
              <label class="label">性别</label>
              <cube-select v-model="info.sex" :options="sexOptions"></cube-select>
            </div>
          </li>
          <li class="item border-bottom-1px">
            <div class="input">
              <cube-input @focus="showDatePicker" v-model="info.date"><label class="label" slot="prepend">出生日期</label>
              </cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.cardId"><label class="label" slot="prepend">身份证</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.tel" :type="tel"><label class="label" slot="prepend">联系电话</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.education"><label class="label" slot="prepend">学历</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.school"><label class="label" slot="prepend">毕业院校</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.major"><label class="label" slot="prepend">专业</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.email" :type="email"><label class="label" slot="prepend">邮箱</label></cube-input>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.workTime"><label class="label" slot="prepend">从业年限</label></cube-input>
            </div>
          </li>
        </ul>
        <h2 class="subtitle">单位</h2>
        <ul class="list">
          <li class="item">
            <div class="input">
              <cube-input v-model="info.workUnit"><label class="label" slot="prepend">工作单位</label></cube-input>
            </div>
          </li>
          <li class="item border-bottom-1px">
            <div class="input">
              <label class="label">单位所在地</label>
              <cube-select :options="workAddress" v-model="info.workAddress"></cube-select>
            </div>
          </li>
          <li class="item border-bottom-1px">
            <div class="input">
              <label class="label">单位类型</label>
              <cube-select :options="unitType" v-model="info.unitType"></cube-select>
            </div>
          </li>
          <li class="item border-bottom-1px">
            <div class="input">
              <label class="label">单位规模</label>
              <cube-select :options="unitSize" v-model="info.unitSize"></cube-select>
            </div>
          </li>
          <li class="item">
            <div class="input">
              <cube-input v-model="info.job"><label class="label" slot="prepend">职务</label></cube-input>
            </div>
          </li>
        </ul>
      </form>
    </v-scroll>
    <div @click="submitFrom" class="submit">保存</div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable.sass'
.register-info-wrap
  position: relative
  .submit
    position: fixed
    right: 0
    bottom: 0
    left: 0
    z-index: 25
    font-size: $font-size-small-l
    line-height: $font-size-small-l + 34px
    text-align: center
    background-color: $color-text-red
    color: $color-theme
  .register-info
    position: absolute
    top: 0
    right: 0
    bottom: 53px
    left: 0
    z-index: 10
    overflow: hidden
    .title
      padding-left: 20px
      padding-right: 20px
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 30px
      background-color: $color-theme
      color: $color-text-l
    .subtitle
      @extend .title
      background-color: $color-theme-bg
    .list
      padding-left: 15px
      padding-right: 15px
      background-color: $color-theme
      &>.item
        position: relative
        z-index: 1
        .input
          display: flex
          .cube-select:after
            border: none
          .cube-input:after
            border-left: 0
            border-top: 0
            border-right: 0
            border-color: $border-color
          .label
            box-flex: 0 0 80px
            flex: 0 0 80px
            display: block
            width: 80px
            white-space: nowrap
            font-size: $font-size-small-l
            line-height: $font-size-small-l + 30px
            color: $color-text
            text-align: left
          .cube-select, .cube-input
            flex: 1
            z-index: 0
            height: 100%
.word-break
  word-break: break-all
</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
export default {
  data () {
    return {
      info: {
        name: '',
        sex: '',
        date: '',
        cardId: '',
        tel: '',
        education: '',
        school: '',
        major: '',
        email: '',
        workTime: '',
        workUnit: '',
        workAddress: '',
        unitType: '',
        unitSize: '',
        job: ''
      },
      sexOptions: [
        '男',
        '女',
        '保密'
      ],
      workAddress: [
        '北京',
        '天津',
        '上海'
      ],
      unitType: [
        '事业单位',
        '私有单位'
      ],
      unitSize: [
        '少于20人',
        '少于50人',
        '50-200人',
        '200-500人',
        '大于500人'
      ],
      email: 'email',
      tel: 'tel'
    }
  },
  methods: {
    showDatePicker () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '出生日期',
          min: new Date(1949, 10, 1),
          max: new Date(),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle (date, selectedVal, selectedText) {
      this.info.date = selectedVal.join('-')
    },
    cancelHandle () {
    },
    submitFrom () {
      this.$createDialog({
        type: 'warn',
        content: `<span class="word-break">${JSON.stringify(this.info)}</span>`,
        icon: 'cubeic-alert'
      }).show()
    }
  },
  components: {
    vScroll
  }
}
</script>
