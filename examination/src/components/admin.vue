<template>
  <div class="setnetwork">
    <form @submit="'return false'">
      <div class="form-group paddingt22">
        <div class="label-txt"><span class="require-icon">*</span>网卡</div>
        <div class="network-wrap">
          <div v-for="(item, index) in networks" :key="item.name" class="network" :class="{'active': networks[currentNetwork].name === item.name, 'unconnect': item.status === '0'}" @click="selectTag(index)">
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="form-group paddingt22 paddingb30">
        <div class="label-txt"><span class="require-icon">*</span>上网方式</div>
        <div class="radio-group">
          <label><input type="radio" :checked="networks[currentNetwork].type === 'static'" v-model="networks[currentNetwork].type" name="type" value="static" ><span>静态IP上网</span></label>
          <label><input type="radio" :checked="networks[currentNetwork].type === 'dhcp'" v-model="networks[currentNetwork].type" name="type" value="dhcp" ><span>动态IP上网</span></label>
        </div>
      </div>
      <div v-for="(ip, index) in ips" :key="index" class="form-group paddingb30">
        <div class="label-txt"><span v-show="ip.require" class="require-icon">*</span>{{ip.labelTxt}}</div>
        <input-groups :value="ip.ip" :require="ip.require" class="input-groups" @onfocus="onFocus" @onblur="onBlur"></input-groups>
      </div>
      <div class="form-action">
        <div class="submit-btn" @click="saveForm">保存 <span v-show="saveMsg.show" class="save-message" :class="{'fail': !saveMsg.status}">{{saveMsg.title}}<span>({{time}}S)</span></span></div>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import inputGroups from '@/components/ip'
const SUCCESS_MSG = '恭喜您，保存完成'
export default {
  name: 'setnetwork',
  data () {
    return {
      currentNetwork: 0,
      networks: [
        {
          name: '',
          type: '',
          ip: '',
          gateway: '',
          mask: '',
          dns: '',
          dns_back: ''
        }
      ],
      ips: [
        {
          ip: '192.168.14.32',
          focus: false,
          error: false,
          errorMsg: '请填写IP地址',
          require: true,
          labelTxt: 'IP地址'
        },
        {
          ip: '192.168.14.3',
          focus: false,
          error: false,
          errorMsg: '请填写IP地址',
          require: false,
          labelTxt: 'IP地址'
        }
      ],
      saveMsg: {
        show: false,
        status: true,
        title: SUCCESS_MSG
      },
      timer: null,
      time: 3,
      saveFlag: true
    }
  },
  created () {
  },
  methods: {
    saveForm () {
      if (!this.saveFlag) {
        return false
      }
      this.saveFlag = false
    },
    timeout (num) {
      clearTimeout(this.timer)
      this.time = num
      if (num <= 0) {
        this.saveFlag = true
        this.$set(this.saveMsg, 'show', false)
        return false
      }
      num--
      this.timer = setTimeout(() => {
        this.timeout(num)
      }, 1000)
    },
    selectTag (index) {
      this.currentNetwork = index
    },
    onFocus (data) {
      console.log(data)
    },
    onBlur (data) {
      console.log(data)
    }
  },
  watch: {
  },
  components: {
    inputGroups
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.setnetwork
  padding: 0 22px
  border-radius: 4px
  .form-group
    margin-bottom: 0
    display: flex
    align-items: center
    &.paddingt22
      padding-top: 22px
    &.paddingt30
      padding-top: 30px
    &.paddingb30
      padding-bottom: 30px
    .label-txt
      flex: 0 0 78px
      font-size: $font-n
      line-height: 30px
      color: $font-color-n
      width: 78px
      .require-icon
        display: inline-block
        vertical-align: middle
        margin-right: 4px
        color: $error
    .network-wrap
      display: flex
      flex: 1
      .network
        display: flex
        flex: 1
        margin-right: 18px
        height: 56px
        border: 1px solid $border-color-l
        border-radius: 8px
        box-shadow: 0 0 4px #c9c9c9
        cursor: pointer
        .name
          padding: 0 10px
          margin-top: auto
          margin-bottom: auto
          font-size: $font-n
          line-height: 24px
          color: $font-color-n
          &::before
            content: ""
            margin-right: 10px
            display: inline-block
            vertical-align: middle
            width: 31px
            height: 27px
            background: url(../assets/images/network-icon1.png) no-repeat 0 0
        &:hover, &:focus
          box-shadow: 0 0 4px #4381e6
        &.active
          border-color: $border-color-l-active
          box-shadow: 0 0 4px #4381e6
          .name
            &::before
              content: ""
              margin-right: 10px
              display: inline-block
              vertical-align: middle
              width: 31px
              height: 27px
              background: url(../assets/images/network-icon1-active.png) no-repeat 0 0
        &.unconnect
          .name
            &::before
              content: ""
              margin-right: 10px
              display: inline-block
              vertical-align: middle
              width: 31px
              height: 27px
              background: url(../assets/images/network-icon2.png) no-repeat 0 0
          &:hover, &:focus
            box-shadow: 0 0 4px #4381e6
          &.active
            border-color: $border-color-l-active
            box-shadow: 0 0 4px #4381e6
            .name
              &::before
                content: ""
                margin-right: 10px
                display: inline-block
                vertical-align: middle
                width: 31px
                height: 27px
                background: url(../assets/images/network-icon2-active.png) no-repeat 0 0
    .radio-group
      display: flex
      &>label
        display: block
        margin: 0 24px 0 0
        font-size: 0
        cursor: pointer
        &>input
          margin: 0 5px 0 0
          display: inline-block
          vertical-align: middle
          width: 16px
          height: 16px
        &>span
          display: inline-block
          vertical-align: middle
          font-size: $font-n
          color: $font-color-n

  .form-action
    padding: 10px 0 150px 107px
    .submit-btn
      position: relative
      width: 100px
      font-size: $font-n
      line-height: 32px
      text-align: center
      color: $color-xs
      border-radius: 32px
      cursor: pointer
      background-color: $btn-bg-n
      &:hover
        background-color: $btn-bg-n-hover
      &.active
        background-color: $btn-bg-n-active
      .save-message
        position: absolute
        top: 0
        left: 100%
        margin-left: 15px
        font-size: $font-n
        line-height: 32px
        color: $color-m
        white-space: nowrap
        &::before
          content: ""
          margin-right: 5px
          display: inline-block
          vertical-align: middle
          width: 14px
          height: 14px
          background: url(../assets/images/save-success.png) no-repeat 0 0
        &.fail
          color: $error
          &::before
            content: ""
            margin-right: 5px
            display: inline-block
            vertical-align: middle
            width: 14px
            height: 14px
            background: url(../assets/images/danger-icon.png) no-repeat 0 0
</style>
