<template>
    <div class="certificate-query">
      <div class="bg-logo">
        <div class="search-wrap" @keyup.enter="searchFn">
            <div class="form-group">
                <el-input class="search" autofocus v-model="search" maxlength="200" placeholder="请输入姓名/厂商名称/证书编号"></el-input>
                <router-link class="search-btn" v-show="search" target="_blank" :to="url" ref="searchBtn">查询</router-link>
                <div v-show="!search" class="search-btn" @click="searchFn">查询</div>
            </div>
            <p v-show="!search && errorMsg" class="error-msg">内容不能为空，请重新输入！</p>
        </div>
      </div>
      <h1>{{info}}</h1>
      <p class="bottom-title">Powered by Copyright by Rising V1.0.0.31 ©2014-2019</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "query",
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      errorMsg: false,
      search: '',
      timer: null
    }
  },
  computed: {
    url () {
      return {
        path: '/queryrResult',
        query: {
          keyword: this.search
        }
      }
    }
  },
  methods: {
    searchFn () {
      if (!this.search) {
        this.errorMsg = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.errorMsg = false
        }, 3000)
        return false
      }
      this.$refs.searchBtn.$el.click()
    }
  }
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable'
body
    background-color: $bg-color-query
.certificate-query
    position: relative
    min-width: 1000px
    min-height: 500px
    height: 100%
    display: flex 
    flex-direction: column
    justify-content: space-between
    .bg-logo
        width: 100%
        height: 0 
        padding-top: 25.8%
        background: url(../assets/images/search_bg.png) no-repeat center bottom
        background-size: cover
        .search-wrap
            margin: 0 auto
            width: 435px
            padding-top: 20px
            .form-group
                display: flex
                justify-content: center
                border: 1px solid $border-color-split
                border-radius: 4px
                background-color: $bg-color-white
                .search
                    flex: 0 0 332px
                    width: 332px
                    padding: 3px 0
                    font-size: 0
                    .el-input__inner
                        border: none !important
                        height: 24px !important
                        font-size: $font-size-base
                        line-height: 24px
                        color: $font-color-normal 
                .search-btn
                    margin-right: -2px
                    margin-top: -1px
                    margin-bottom: -1px
                    flex: 0 0 100px
                    width: 100px
                    font-size: $font-size-normal
                    line-height: 32px
                    text-align: center
                    background: $bg-color-query-normal
                    color: $font-color-white
                    border-radius: 4px
                    text-decoration: none
                    cursor: pointer
                    &:hover
                        background: $bg-color-query-hover
                    &:active,&.active
                        background: $bg-color-query-active

            .error-msg
                position: relative
                padding-left: 24px
                font-size: $font-size-smer
                line-height: 34px
                color: $font-color-error
                text-align: left
                &::before
                    content: ""
                    margin-top: 10px
                    position: absolute
                    left: 0
                    top: 0
                    width: 15px
                    height: 15px
                    background: url(../assets/images/fail_min_icon.png) no-repeat 0 0
    .bottom-title
        font-size: $font-size-base
        line-height: 46px
        text-align: center
        color: $font-color-bottom-tip
</style>