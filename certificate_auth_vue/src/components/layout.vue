<template>
  <div id="admin" class="admin">
    <div class="header">
      <div class="login-status">
        <img src="../assets/images/logo_back.png">
        <div class="wrap-title">瑞星证书认证管理系统1.0</div>
        <div class="login-user">
          <span class="txt">
            <!-- <img :src="userurl"  class="userlogo" alt="" >
            <b class>{{ username }}</b> -->
            <img :src="logoUrl" class="user-img">
            <b class>{{ userName }}</b>
          </span>
          <span class="sing-out" @click="outuser">退出</span>
        </div>
      </div>
      <div class="titlebg">
        <img src="../assets/images/titlebg.png">
      </div>
    </div>
    <div class="wrapper">
      <div class="menu">
        <div class="scroll-warp">
          <vue-scroll :ops="ops">
            <div class="menu-list">
              <div class="menu-item" v-for="(item,index) in menu">
                <router-link
                  class="iplist"
                  :class="{'menuactive':item.show}"
                  :to="item.path"
                  tag="p"
                >
                  <i class="menuicon" :class="item.icon"></i>
                  <span>{{ item.label }}</span>
                  <i
                    v-if="item.child.length"
                    @click.stop="changeblock(index)"
                    class="ctr"
                    :class="{'ctrup' : item.childshow }"
                  ></i>
                </router-link>
                <div v-show="item.childshow" class="menu-item" v-for="items in item.child">
                  <router-link class="iplist" :to="items.path" tag="p">{{ items.label }}</router-link>
                </div>
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
      <div class="content">
        <vue-scroll :ops="scrollOpts">
          <router-view></router-view>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import vueScroll from "vuescroll";
import { mapGetters, mapActions } from "vuex";
import { signOut } from "@/api/login";
import "vuescroll/dist/vuescroll.css";
export default {
  name: "layout",
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        bar: {
          onlyShowBarOnScroll: false,
          background: "rgba(120, 120, 120, 0.4)"
        }
      },
      scrollOpts: {
        bar: {
          keepShow: true,
          background: "rgba(120, 120, 120, 0.4)"
        }
      },
      imgurl: "",
      userUrl:'',
      menu: [
        {
          path: "/admin/stuobtained",
          label: "学员证书",
          icon: "student",
          childshow: true,
          show: false,
          id: 1,
          child: [
            { path: "/admin/stuobtained", label: "已获取", id: 2 },
            { path: "/admin/stuunobtain", label: "未获取", id: 3 }
          ]
        },
        {
          path: "/admin/firmCertificate",
          show: false,
          label: "厂商证书",
          icon: "firm",
          id: 4,
          child: []
        },
        {
          path: "/admin/certificateType",
          show: false,
          label: "证书类型",
          childshow: true,
          show: false,
          icon: "type",
          id: 5,
          child: []
        },
        {
          path: "/admin/trainingperiod",
          show: false,
          label: "培训期数",
          icon: "period",
          id: 6,
          child: []
        },
        {
          path: "/admin/system",
          show: false,
          label: "系统设置",
          icon: "system",
          id: 7,
          child: []
        }
      ],
      isshow: true,
    };
  },
  components: {
    vueScroll
  },
  mounted() {},
  created() {
    for (var i = 0; i < this.menu.length; i++) {
      for (var k = 0; k < this.menu[i].child.length; k++) {
        if (this.menu[i].child[k].path == this.$route.path) {
          this.menu[i].show = true;
        } else {
          this.menu[i].show = false;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["username", "avatar"]),
    userName() {
      return this.username ? this.username : localStorage.getItem("AuthenticationUsername") ? localStorage.getItem("AuthenticationUsername") : "";
    },
    logoUrl () {
      return this.avatar ? this.avatar : localStorage.getItem('AuthenticationaAvatar') ? localStorage.getItem('AuthenticationaAvatar') : require('../assets/images/userImg.png')
    }
    
  },
  methods: {
    changeblock(idx) {
      const datalist = this.menu;
      this.menu[idx].childshow =
        this.menu[idx].childshow == true ? false : true;
      this.menu = datalist;
    },

    outuser() {
      signOut().then(res => {
        if (res.ret === 200) {           
          window.localStorage.removeItem('AuthenticationUsername')
          window.localStorage.removeItem('AuthenticationaAvatar')
          this.$router.push({
            path: "/login"
          });
          this.setUsername("");
          this.setAvatar('')
        }
      });
    },
    ...mapActions(["setUsername", 'setAvatar'])
  },
  watch: {
    "$route.path"(n) {
      for (var i = 0; i < this.menu.length; i++) {
        for (var k = 0; k < this.menu[i].child.length; k++) {
          if (this.menu[i].child[k].path == n) {
            this.menu[i].show = true;
          } else {
            this.menu[i].show = false;
          }
        }
      }
    }
  }
};
</script>
<style lang="sass" type="text/sass" rel="stylesheet/sass" >
body,html
    overflow: hidden
.admin
    display: flex
    flex-direction: column
    position: relative
    height: 100%
    font-size: 14px
    .titlebg
        position: absolute
        z-index: 1
        top: 0
        text-align: center
        width: 100%
    .header
        background: linear-gradient(to right, #243892 0%, #273b95 46%, #3659b0 60%, #508def 100%)
    .active
        background: #666
    .menu
        position: absolute
        top: 15px
        left: 15px
        bottom: 15px
        background: #fbfbfb
        overflow-y: auto
        overflow: hidden
        z-index: 333
        width: 140px
        border-radius: 5px
    .wrapper
        position: relative
        flex: 1
    .scroll-warp
        position: absolute
        top: 0
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
            .iplist
                position: relative
                .ctr
                    position: absolute
                    color: #666
                    right: 15px
                    top: 12px
                    width: 12px
                    height: 7px
                    background: url('../assets/images/ctrd.png') no-repeat center center
                    &.ctrup
                        background: url('../assets/images/ctrup.png') no-repeat center center
            .menuicon
                display: inline-block
                height: 16px
                width: 16px
                vertical-align: middle
                margin-right: 5px
                margin-top: -5px
                background: url('../assets/images/icon.png') no-repeat center center
                &.student
                    background-position: 0 -32px
                &.firm
                    background-position: 0 -71px
                &.type
                    background-position: 0 -103px
                &.period
                    background-position: 0 -133px
                &.system
                    background-position: 0 -165px
            .iplist
                height: 32px
                line-height: 32px
                padding-left: 20px
                box-sizing: border-box
                width: 100%
                cursor: pointer
                color: #717d94
                display: block
                margin: 0
                &.router-link-active, &.menuactive
                    color: #478af3
                    .student
                        background-position: -36px -32px
                    .firm
                        background-position: -36px -71px
                    .type
                        background-position: -36px -103px
                    .period
                        background-position: -36px -133px
                    .system
                        background-position: -36px -165px
            .menu-item
                .iplist
                    padding-left: 41px
            .menu-item
                padding-left: 0
            a
                height: 35px
                line-height: 35px
                padding-left: 65px
                width: 100%
                color: #717d94
                display: block
            a:hover, a:link, a:focus
                text-decoration: none

.login-status
    height: 50px
    position: relative
    z-index: 2
    overflow: hidden
    &>img 
      margin-top: 16px 
      margin-left: 10px
      vertical-align: top
      width: 132px 
      height: 18px
    .wrap-title
        position: relative
        font-size: 16px
        padding-left: 20px
        line-height: 50px
        vertical-align: top
        color: #fff
        display: inline-block
        &::before 
          content: ""
          position: absolute 
          top: 15px
          left: 10px 
          border-left: 1px solid #7699c8
          height: 20px
    .login-user
        float: right
        line-height: 53px
        padding-right: 15px
        color: #fff
        .userlogo
          width: 30px
          height: 30px
          border-radius: 100%
          vertical-align: middle
          margin-right: 8px
        & > span
            position: relative
            color: #fff
            margin: 0 12px 0 0
            .user-img
                display: inline-block
                width: 30px
                height: 30px
                vertical-align: middle
                margin-right: 8px
                border-radius: 30px
            &.txt
                text-shadow: 2px 0 0px #666
                &::after
                    content: ''
                    display: block
                    position: absolute
                    top: 0
                    right: -12px
                    width: 1px
                    height: 16px
                    background: #fff
            &.sing-out
                margin-left: 12px
                cursor: pointer
                text-shadow: 2px 0 0px #666

.wrapper
    background-color: #e9ebf0
    .content
        overflow: hidden
        position: absolute
        left: 170px
        right: 15px
        top: 15px
        bottom: 15px
        background-color: #fff
        border-radius: 5px
        .el-form,.el-form.contentlist,.obtained
        .el-table,.el-table__header-wrapper,.el-table__body-wrapper
            overflow: visible
</style>
