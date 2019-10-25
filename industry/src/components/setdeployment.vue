<template>
    <div class="set-deployment">
        <div class="wrap" :class="{'active': mode === '0'}" @click="changeMode('0')">
            <div class="icon">
                <span class="img"></span>
                <h2 class="title">镜像模式</h2>
                <p class="subtitle">便于系统运行稳定,<span>建议您使用此镜像模式进行部署.</span></p>
            </div>
            <div class="port-list">
                <div class="port-group">
                    <div class="port-num" :class="net0E0" @click="selectPort0(net0[0])"><h3>{{net0[0].name}}</h3></div>
                    <div class="port-num" :class="net0E1" @click="selectPort0(net0[1])"><h3>{{net0[1].name}}</h3></div>
                </div>
                <div class="port-group">
                    <div class="port-num" :class="net0E2" @click="selectPort0(net0[2])"><h3>{{net0[2].name}}</h3></div>
                    <div class="port-num" :class="net0E3" @click="selectPort0(net0[3])"><h3>{{net0[3].name}}</h3></div>
                </div>
            </div>
        </div>
        <div class="wrap" :class="{'active': mode === '1'}" @click="changeMode('1')">
            <div class="icon">
                <span class="img img2"></span>
                <h2 class="title">转发模式</h2>
                <p class="subtitle">转发模式会产生小概率的文件丢失。</p>
            </div>
            <div class="port-list">
                <div class="port-group dashed">
                    <div class="port-title">BP0</div>
                    <div class="port-num" :class="net1E0" @click="selectPort1(net1[0], net1[1])"><h3>
                        {{net1[0].name}}</h3></div>
                    <div class="port-num" :class="net1E1" @click="selectPort1(net1[0], net1[1])"><h3>
                        {{net1[1].name}}</h3></div>
                </div>
                <div class="port-group dashed">
                    <div class="port-title">BP1</div>
                    <div class="port-num" :class="net1E2" @click="selectPort1(net1[2], net1[3])"><h3>
                        {{net1[2].name}}</h3></div>
                    <div class="port-num" :class="net1E3" @click="selectPort1(net1[2], net1[3])"><h3>
                        {{net1[3].name}}</h3></div>
                </div>
            </div>
        </div>
        <div class="action-wrap">
            <div class="submit-btn" :class="{'disabled-cls': submitBtnStatus}" @click="submit">保存<span
                    class="tip-message" :class="{'fail': fail, 'success': success, 'loading': loadingFlag}">{{tipMessage}}</span>
            </div>
        </div>
        <at-modal v-model="modal" class="my-model" title="部署设置" :mask-closable="false">
            <img src="../assets/images/mode-danger-icon.png" alt="">
            <p>确定更换系统部署模式？</p>
            <div slot="footer">
                <div class="confirm-btn" @click="handleConfirm">确定</div>
            </div>
        </at-modal>
        <div v-show="loadingFlag" class="loading-mask"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getInfo, submitForm} from '../api/deployment'
import {counter} from '../assets/js/sign'

export default {
  name: "setdeployment",
  data() {
    return {
      oldMode: '',
      mode: '0',
      net0: [
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        }
      ],
      net1: [
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        },
        {
          name: "",
          status: "",
          select: '0'
        }
      ],
      count: 3,
      tipMessage: '',
      fail: false,
      success: false,
      modal: false,
      submitFlag: true,
      loadingFlag: false
    }
  },
  created() {
    this.getInfos()
  },
  computed: {
    snetmodify() {
      const selectedArr = []
      const connectArr = []
      this[`net${this.mode}`].forEach((item, index) => {
        if (item.select === '1') {
          selectedArr.push('' + index)
        }
        if (item.status === '1') {
          connectArr.push('' + index)
        }
      })
      if (this.mode === '0') {
        return selectedArr.length ? selectedArr[0] : connectArr.length ? connectArr[0] : ''
      } else if (this.mode === '1') {
        return selectedArr.length ? selectedArr.join('') : connectArr.length ? connectArr.join('') : ''
      }
    },
    submitBtnStatus() {
      let result = true
      this[`net${this.mode}`].forEach((item) => {
        if (item.select !== '0') {
          result = false
        }
      })
      if (!result && !this.submitFlag) {
        result = true
      }
      return result
    },
    net0E0() {
      const arr = [
        this.net0[0].status === '1' ? 'connent' : '',
        this.net0[0].select !== '0' && this.mode === '0' ? 'selected' : '',
        this.net0[0].status === '0' ? 'default' : '',
        this.net0[0].select === '2' && this.mode !== '0' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net0E1() {
      const arr = [
        this.net0[1].status === '1' ? 'connent' : '',
        this.net0[1].select !== '0' && this.mode === '0' ? 'selected' : '',
        this.net0[1].status === '0' ? 'default' : '',
        this.net0[1].select === '2' && this.mode !== '0' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net0E2() {
      const arr = [
        this.net0[2].status === '1' ? 'connent' : '',
        this.net0[2].select !== '0' && this.mode === '0' ? 'selected' : '',
        this.net0[2].status === '0' ? 'default' : '',
        this.net0[2].select === '2' && this.mode !== '0' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net0E3() {
      const arr = [
        this.net0[3].status === '1' ? 'connent' : '',
        this.net0[3].select !== '0' && this.mode === '0' ? 'selected' : '',
        this.net0[3].status === '0' ? 'default' : '',
        this.net0[3].select === '2' && this.mode !== '0' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net1E0() {
      const arr = [
        this.net1[0].status === '1' ? 'connent' : '',
        this.net1[0].select !== '0' && this.mode === '1' ? 'selected' : '',
        this.net1[0].select === '2' && this.mode !== '1' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net1E1() {
      const arr = [
        this.net1[1].status === '1' ? 'connent' : '',
        this.net1[1].select !== '0' && this.mode === '1' ? 'selected' : '',
        this.net1[1].select === '2' && this.mode !== '1' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net1E2() {
      const arr = [
        this.net1[2].status === '1' ? 'connent' : '',
        this.net1[2].select !== '0' && this.mode === '1' ? 'selected' : '',
        this.net1[2].select === '2' && this.mode !== '1' ? 'actived' : ''
      ]
      return arr.join(' ')
    },
    net1E3() {
      const arr = [
        this.net1[3].status === '1' ? 'connent' : '',
        this.net1[3].select !== '0' && this.mode === '1' ? 'selected' : '',
        this.net1[3].select === '2' && this.mode !== '1' ? 'actived' : ''
      ]
      return arr.join(' ')
    }
  },
  methods: {
    getInfos() {
      getInfo().then((res) => {
        if (res.ret === 200) {
          const arr0 = res.data.Mirror
          const arr1 = res.data.Bridging
          if (res.data.mode === '0') {
            this.net0 = arr0.map((item) => {
              return Object.assign({}, item, {
                select: item.select === '1' ? '2' : item.select
              })
            })
            this.net1 = arr1
          } else {
            this.net0 = arr0
            this.net1 = arr1.map((item) => {
              return Object.assign({}, item, {
                select: item.select === '1' ? '2' : item.select
              })
            })
          }
          this.mode = res.data.mode
          this.oldMode = res.data.mode
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    changeMode(type) {
      this.mode = type
    },
    selectPort0(item) {
      if (item.status === '0') {
        return
      }
      let flag = false
      const arr = this.net0.map((items) => {
        if (items.name === item.name && items.select === '0') {
          flag = true
        }
        return Object.assign({}, items, {
          select: items.name === item.name ? items.select === '0' ? '1' : items.select : '0'
        })
      })
      const arr1 = this.net1.map((items) => {
        return Object.assign({}, items, {
          select: items.select === '2' ? '0' : items.select
        })
      })
      if (flag) {
        this.net1 = arr1
      }
      this.net0 = arr
    },
    selectPort1(item0, item1) {
      let flag = false
      const arr = this.net1.map((items) => {
        if ((items.name === item0.name || items.name === item1.name) && items.select === '0') {
          flag = true
        }
        return Object.assign({}, items, {
          select: items.name === item0.name || items.name === item1.name ? items.select === '0' ? '1' : items.select : '0'
        })
      })
      const arr0 = this.net0.map((items) => {
        return Object.assign({}, items, {
          select: items.select === '2' ? '0' : items.select
        })
      })
      if (flag) {
        this.net0 = arr0
      }
      this.net1 = arr;
    },
    handleConfirm() {
      this.submitFlag = false
      this.submitData()
    },
    submit() {
      if (!this.submitFlag || this.submitBtnStatus) {
        return
      }
      if (this.oldMode !== this.mode) {
        this.modal = true
        return
      }
      this.submitFlag = false
      this.submitData()
    },
    submitData() {
      this.loadingFlag = true
      this.tipMessage = '正在保存数据，请稍后！'
      this.modal = false
      const formDate = Object.assign({}, {
        snetmodify: this.snetmodify,
        snetmode: this.mode
      })
      this.count = 3
      submitForm(formDate).then((res) => {
        if (res.ret === 200) {
          counter(() => {
            this.loadingFlag = false
            this.fail = false
            this.success = true
            if (this.count <= 0) {
              this.tipMessage = ''
              this.submitFlag = true
              this.success = false
              this.getInfos()
            } else {
              this.tipMessage = `恭喜您，保存完成! (${this.count--})`
            }
          }, 3)
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        } else {
          counter(() => {
            this.loadingFlag = false
            this.fail = true
            this.success = false
            if (this.count <= 0) {
              this.tipMessage = ''
              this.submitFlag = true
              this.fail = false
            } else {
              this.tipMessage = `抱歉，保存失败(${res.msg})!(${this.count--})`
            }
          }, 3)
        }
      }).catch((msg) => {
        console.log(msg)
      })
    }
  }
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'
@import '../assets/sass/mixin.sass'
.set-deployment
    padding-top: 13px
    background-color: $btn-bg-n-disabled
    & > .wrap
        margin-bottom: 30px
        margin-left: 27px
        display: flex
        width: 776px
        height: 200px
        border: 2px solid transparent
        background-color: $bg-color-n
        border-radius: 10px
        cursor: pointer
        &:hover
            border-color: $border-color-hover
        &:active
            border-color: $border-color-active
            & > .icon > .img
                background: url(../assets/images/image_icon.png) no-repeat 0 0
            & > .icon > .img.img2
                background: url(../assets/images/image_icon7.png) no-repeat 0 0
        .icon
            position: relative
            flex: 0 0 230px
            width: 230px
            &::after
                content: ""
                position: absolute
                top: 22px
                right: -1px
                width: 0
                height: 156px
                border-right: 1px dashed $border-color-n
            & > .img
                display: block
                margin: 24px auto 0
                width: 60px
                height: 60px
                background: url(../assets/images/image_icon6.png) no-repeat 0 0
                &.img2
                    background: url(../assets/images/image_icon8.png) no-repeat 0 0
            & > .title
                margin: 16px auto 0
                width: 144px
                font-size: $font-n
                line-height: 24px
                color: $color-n
                text-align: center
            & > .subtitle
                margin: 0 auto
                width: 144px
                font-size: $font-n
                line-height: 24px
                color: $color-s
                & > span
                    color: $error
        .port-list
            padding: 68px 20px 71px
            flex: 1
            display: flex
            .port-group
                flex: 1
                display: flex
                position: relative
                .port-title
                    top: -40px
                    width: 100%
                    text-align: center
                    position: absolute
                    font-weight: 700
                &.dashed::after
                    content: ""
                    position: absolute
                    top: -20px
                    left: 25%
                    width: 50%
                    height: 20px
                    border: 1px dashed $color-m
                    border-bottom: none
                .port-num
                    margin: 0 20px
                    width: 86px
                    display: flex
                    border: 1px solid $border-color-m
                    border-radius: 8px
                    cursor: pointer
                    & > h3
                        position: relative
                        padding-left: 50px
                        width: 100%
                        font-size: $font-n
                        line-height: 54px
                        letter-spacing: 6px
                        &::before
                            content: ""
                            position: absolute
                            top: 14px
                            left: 10px
                            width: 29px
                            height: 26px
                            background: url(../assets/images/image_icon4.png) no-repeat 0 0
                    &.connent
                        h3
                            &::before
                                content: ""
                                position: absolute
                                top: 14px
                                left: 10px
                                width: 29px
                                height: 26px
                                background: url(../assets/images/image_icon3.png) no-repeat 0 0
                    &.selected
                        border-color: $border-color-l-active
                        h3
                            color: $border-color-l-active
                            &::before
                                content: ""
                                position: absolute
                                top: 14px
                                left: 10px
                                width: 29px
                                height: 26px
                                background: url(../assets/images/image_icon5.png) no-repeat 0 0
                    &.selected.connent
                        border-color: $border-color-l-active
                        h3
                            color: $border-color-l-active
                            &::before
                                content: ""
                                position: absolute
                                top: 14px
                                left: 10px
                                width: 29px
                                height: 26px
                                background: url(../assets/images/image_icon2.png) no-repeat 0 0
                    &.default
                        cursor: default
                    &.actived.connent
                        h3
                            color: $border-color-l-active
                            &::before
                                content: ""
                                position: absolute
                                top: 14px
                                left: 10px
                                width: 29px
                                height: 26px
                                background: url(../assets/images/image_icon9.png) no-repeat 0 0
                    &.actived.default
                        h3
                            color: $border-color-l-active
                            &::before
                                content: ""
                                position: absolute
                                top: 14px
                                left: 10px
                                width: 29px
                                height: 26px
                                background: url(../assets/images/image_icon5.png) no-repeat 0 0

        &.active
            border-color: $border-color-l-active
            border-color: $border-color-active
            & > .icon > .img
                background: url(../assets/images/image_icon.png) no-repeat 0 0
            & > .icon > .img.img2
                background: url(../assets/images/image_icon7.png) no-repeat 0 0
    .action-wrap
        margin-top: 60px
        padding-bottom: 60px
        width: 776px
        .submit-btn
            position: relative
            display: block
            margin: 0 auto
            width: 144px
            border-radius: 36px
            font-size: $font-n
            line-height: 36px
            background-color: $btn-bg-n
            color: $color-xs
            text-align: center
            cursor: pointer
            &:hover
                background-color: $btn-bg-n-hover
            &:active, &.active
                background-color: $btn-bg-n-active
            &.disabled-cls
                background-color: $bg-color-disabled
                color: $color-s
                cursor: default
            .tip-message
                display: none
                position: absolute
                top: 0
                left: 100%
                font-size: $font-n
                line-height: 36px
                margin-left: 35px
                color: $color-m
                width: 100%
                text-align: left
                white-space: nowrap
                &.success
                    display: block
                    &::before
                        content: ""
                        position: absolute
                        top: 0
                        left: -20px
                        margin-top: 11px
                        width: 14px
                        height: 14px
                        background: url(../assets/images/save-success.png) no-repeat 0 0
                &.fail
                    display: block
                    color: $error
                    &::before
                        content: ""
                        position: absolute
                        top: 0
                        left: -20px
                        margin-top: 11px
                        width: 14px
                        height: 14px
                        background: url(../assets/images/danger-icon.png) no-repeat 0 0
                &.loading
                    display: block
                    &::before
                        content: ""
                        position: absolute
                        top: 0
                        left: -20px
                        margin-top: 11px
                        width: 14px
                        height: 14px
                        background: url(../assets/images/loading_icon.gif) no-repeat 0 0
                        background-size: 14px 14px
    .loading-mask
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 1000

.my-model
    .at-modal
        width: 436px !important
    .at-modal__header
        border-bottom: none
        padding: 0 10px
        .at-modal__title
            & > p
                font-size: $font-n
                line-height: 36px
    .at-modal__body
        padding-top: 0
        & > img
            display: block
            margin: 0 auto
        & > p
            padding-top: 18px
            font-size: $font-n
            line-height: 16px
            text-align: center
    .confirm-btn
        display: inline-block
        vertical-align: top
        min-width: 70px
        font-size: $font-n
        line-height: 30px
        text-align: center
        color: $color-xs
        border-radius: 30px
        background-color: $btn-bg-n
        cursor: pointer
        &:hover
            background-color: $btn-bg-n-hover
        &:active
            background-color: $btn-bg-n-active
</style>
