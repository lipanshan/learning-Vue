<template>
    <div class="admin" id="admin">
      <div class="menu">
        <div class=""><img  :src='imgurl' /></div>
        <div class="scroll-warp">
          <vue-scroll :ops="ops">
            <ul class="menu-list">
              <tree  class="menu-item" v-for="item in leftMenu" :key="item.id" :data="item" @triggerclick="changeShow" ></tree>
            </ul>
          </vue-scroll>
        </div>
      </div>
      <div class="wrapper">
        <div class="login-status">
          <div class="wrap-title">瑞星工控智能分析系统V1.0</div>
          <div class="login-user">
            <span class="txt"><i class="user-img"></i>{{userName}}</span>
            <span class="sing-out" @click="loginOut">退出</span>
          </div>
        </div>
        <div class="content">
          <div class="bg-color">
              <router-view ></router-view>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import {signOut} from '../api/login'
import axios from 'axios'
import {getSign} from '@/assets/js/sign'
import Vue from 'vue'
import vuescroll from 'vuescroll'
import  'vuescroll/dist/vuescroll.css'
import tree from '@/components/tree'
Vue.use(vuescroll)
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import qs from 'qs'
  export default {
    data () {
      return {
        ops:{
          vuescroll:{

          },
          scrollPanel:{

          },
          bar: {
            onlyShowBarOnScroll: false
          }
        },
        imgurl:''
      }
    },
    components:{
      vuescroll
    },
    mounted () {
      this.boot()
    },
    computed: {
      ...mapGetters([
        'username',
        'avatar',
        'leftMenu'
      ]),
      userName () {
        let usernick = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        return this.username ? this.username : usernick
      }
    },
    methods: {
      isCollapseMenu (arr, item) {
        let result = []
        let flag = true
        function closeMenu(arr, item) {
          for (let i = 0; i < arr.length; ++i) {
            arr[i].isshow = false
            flag ? result.push(arr[i]) : ''
            if (arr[i].pathUrl === item) {
              result.push(arr[i])
              flag = false
            }
            if (arr[i].subset.length) {
              closeMenu(arr[i].subset, item)
            }
          }
        }
        function findOrder(arr) {
          const numArr = []
          let target = arr[arr.length - 1].level
          for (let i = arr.length - 1; i >= 0; i--) {
            if (String(target) === arr[i].level) {
              numArr.push(arr[i])
              arr[i].isshow = true
              target--
            }
            if (arr[i].level === '1') {
              return numArr
            }
          }
          return numArr
        }
        closeMenu(arr, item)
        findOrder(result)
      },
      toggleMenu (arr, item) {
        for (let i = 0; i < arr.length; i++) {
          if (item.id === arr[i].id) {
            arr[i].isshow = !arr[i].isshow
            return arr
          }
          if (arr[i].subset.length) {
            this.toggleMenu(arr[i].subset, item)
          }
        }
        return arr
      },
      changeShow(flag){
        //Deep copy menu, Vue can not be observed too deep
        const arr = JSON.parse(JSON.stringify(this.leftMenu))
        this.setLeftMenu(this.toggleMenu(arr, flag))
      },
      boot(val){
        const time = new Date().getTime()
        const data = {
          service: 'App.LeftMenu.Index',
          tips: time,
        }
        return axios.post("/",qs.stringify({
          sign: getSign(data),
          tips: time,
          service :'App.LeftMenu.Index',
        })).then((res) => {
          function loop(nodeArr) {
            for (let i = 0; i < nodeArr.length; i++) {
              nodeArr[i].disCls = nodeArr[i].subset.length ? true : false
              nodeArr[i].isshow = false
              if (nodeArr[i].subset.length) {
                loop(nodeArr[i].subset)
              }
            }
          }
          if(res.data.ret == 200){
            loop(res.data.data.leftMenu)
            this.isCollapseMenu(res.data.data.leftMenu, this.$route.path.substring(1))
            this.setLeftMenu(res.data.data.leftMenu)
            this.setAuthorizeInfo({
              authorizeType: res.data.data.authorizeInfo.authorizeType,
              equipmentNumber: res.data.data.authorizeInfo.equipmentNumber,
              termOfValidity: res.data.data.authorizeInfo.termOfValidity
            })
            this.imgurl = res.data.data.systemInfo.logoUrl
           }else if (res.data.ret ==499){
               this.$router.push({path: '/login'})
            }
        }).catch((msg) => {
        })
      } ,
      loginOut () {
        signOut().then((res) => {
          if (res.ret === 200) {
            this.setUsername('')
            this.$router.push({
              path: '/login'
            })
          }
        })
      },
      ...mapActions([
        'setUsername',
        'setLeftMenu',
        'setAuthorizeInfo'
      ])
    },
    components: {
      tree
    },
    watch: {
      '$route.path' (n, o) {
        if (n !== o) {
          //Deep copy menu, Vue can not be observed too deep
          const arr = JSON.parse(JSON.stringify(this.leftMenu))
          this.isCollapseMenu(arr, n.substring(1))
          this.setLeftMenu(arr)
        }
      }
    }
  }
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
.admin
  display: flex
  position: relative
  min-width: 1170px
  overflow: hidden
  min-height: 100%
  font-size: 14px
  .active
    background: #666
  .menu
    position: fixed
    top: 0
    left: 0
    bottom: 0
    flex: 0 0 180px
    background: #011e40
    height: 100%
    overflow-y: auto
    overflow: hidden
    z-index: 333
    width: 180px
  .wrapper
    display: flex
    flex-direction: column
    flex: 1;
    margin-left: 180px
  .logo
    background: url('/static/images/icon.png') no-repeat center center
    background-position: -410px -258px
    width: 100%
    margin: 20px 0 20px 10px
    height: 20px
  .scroll-warp
    position: absolute
    top: 60px
    bottom: 0
    width: 100%
  .menu-list
    overflow-y: auto
    -moz-user-select: none
    -webkit-user-select: none
    -ms-user-select: none
    -khtml-user-select: none
    user-select: none
    .menu-item
      margin: 5px 0
      width: 100%
      position: relative
      p
        color:  #879cad
        height: 32px
        line-height: 32px
        padding-left: 65px
        width: 100%
        color: #879cad
        display: block
        margin: 0
        .crt
          position: absolute
          right: 10px
          display: block
          width: 20px
          height: 20px
          top: 8px
          cursor: pointer
          background: url('/static/images/icon.png') no-repeat center center
          background-position: -424px -118px
          &.crt-up
            background-position: -424px -138px
        span
          cursor: pointer
        a
          padding-left: 0
          color: #8a9cb0
        &.router-link-active
          color: #4580e8
          .icon-homee
            background-position: -102px -26px
          .icon-count
            background-position: -102px -46px
          .icon-pass
            background-position: -102px -66px
          .icon-work
            /*background-position: -102px -86px*/
          .icon-system
            background-position: -102px -106px
          .icon-upsystem
            background-position: -102px -126px
        &.router-link-active.dis-cls
          color: #879cad
          .icon-count
            background-position: -42px -46px
          &+
            display: block
      .menu-item
        padding-left: 0
      a
        height: 35px
        line-height: 35px
        padding-left: 65px
        width: 100%
        color: #879cad
        display: block
      .admin-icon
        display: inline-block
        width: 17px
        left: 30px
        top: 7px
        height: 17px
        position: absolute
        background: url('/static/images/icon.png') no-repeat center center
      .icon-homee
        background-position: -42px -26px
      .icon-count
        background-position: -42px -46px
      .icon-pass
        background-position: -42px -66px
      .icon-work
        background-position: -42px -86px
      .icon-system
        background-position: -42px -106px
      .icon-upsystem
        background-position: -42px -126px
      a:hover,a:link,a:focus
        text-decoration: none
.login-status
  height: 53px
  overflow: hidden
  .wrap-title
    font-size: 16px
    padding-left: 20px
    line-height: 53px
    display: inline-block
  .login-user
    float: right
    line-height: 53px
    padding-right: 15px
    color: #333
    &>span
      position: relative
      color: #666
      margin: 0 12px 0 0
      .user-img
        display: inline-block
        width: 30px
        height: 30px
        background: url('/static/images/userImg.png') no-repeat center center
        vertical-align: middle
        margin-right: 8px
      &.txt
        &::after
          content: ''
          display: block
          position: absolute
          top: 0
          right: -12px
          width: 1px
          height: 16px
          background: #999
      &.sing-out
        margin-left: 12px
        cursor: pointer
.wrapper
  .content
    display: flex
    flex-direction: column
    flex: 1
    background-color: #eeeff4
    padding-top: 14px
    .bg-color
      flex: 1
      position: relative
      margin-left: 12px
      margin-right: 12px
      background-color: #fff
</style>
