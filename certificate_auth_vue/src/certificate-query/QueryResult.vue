<template>
  <div class="query-result">
    <header class="header">
      <img :src="logoUrl" class="login" alt="图标">
      <h1>瑞星证书认证公共查询</h1>
    </header>
    <div class="wrap">
      <h2 class="main-title">查询结果:</h2>
      <h2 class="main-subtitle">证书详细信息</h2>
      <div v-for="(item, index) in StuCer.items" :key="`StuCer${index}`" class="info-0">
        <div class="row-title">
          <div class="left">姓名：{{item.stu_name}}</div>
          <div class="right">性别：{{item.stu_sex}}</div>
        </div>
        <div
          v-for="(key, keyI) in item.info"
          :key="`${index}-${keyI}`"
          :class="{'split-line': keyI % 2}"
        >
          <div class="row-item">
            <div class="left">
              证书类型：
              <strong>{{key.certificate_name}}</strong>
            </div>
            <h3 class="right">证书编号: {{key.certificate_num}}</h3>
          </div>
          <div class="single-row">有效期：{{key.ValidityPeriod}}</div>
        </div>
      </div>
      <div v-show="CompanyCer.manufacturer_name" class="info-1">
        <div class="row-title">
          <div class="left">厂商名称:{{CompanyCer.manufacturer_name}}</div>
          <div class="right"></div>
        </div>
        <div
          v-for="(itm, itmIndex) in CompanyCer.info"
          :key="`${itmIndex}`"
          :class="{'split-line': itmIndex % 2}"
        >
          <div class="row-item">
            <div class="left">单位技术认证：{{itm.technology}}</div>
            <div class="right">
              单位认证星级：
              <span class="star">{{itm.star_level | filterStar}}</span>
            </div>
          </div>
          <div class="row-item">
            <div class="left">
              证书类型：
              <strong>{{itm.certificate_name}}</strong>
            </div>
            <div class="right">有效期：{{itm.ValidityPeriod}}</div>
          </div>
        </div>
      </div>
      <div v-show="!(CompanyCer.info && CompanyCer.info.length) && !StuCer.items.length" class="info-2">
        <div class="nothing">抱歉，没有查询到相应的证书信息。</div>
      </div>
      <div 
      v-show="loading"
       v-loading="loading"
      element-loading-text="加载中"
      element-loading-background="rgba(255, 255, 255, 1)"
      class="loading"></div>
    </div>
    <pagination
      v-show="pageShow"
      @pagenumchange="pageChange"
      :pageNumber="StuCer.currentpage"
      :pageSize="StuCer.perpage"
      :totalNumber="StuCer.totalitems"
    ></pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { queryCer } from "@/api/query";
import pagination from "@/components/custompagination";

const PAGE_SIZE = 5;
export default {
  name: "QueryResult",
  data() {
    return {
      CompanyCer: {
        manufacturer_name: "",
        info: [
          // {
          //   technology: "",
          //   star_level: "",
          //   certificate_num: "",
          //   ValidityPeriod: "",
          //   certificate_name: ""
          // }
        ]
      },
      StuCer: {
        perpage: PAGE_SIZE,
        totalitems: 0,
        totalpages: 1,
        currentpage: 1,
        items: [
          // {
          //   info: [
          //     {
          //       ValidityPeriod: "",
          //       certificate_name: "",
          //       certificate_num: ""
          //     }
          //   ],
          //   stu_name: "",
          //   stu_sex: ""
          // }
        ]
      },
      logoUrl: require("../assets/images/logo.png"),
      loading: true
    };
  },
  created() {
    this.getInfo({
      Keyword: this.$route.query.keyword,
      page: 1,
      perpage: PAGE_SIZE
    });
  },
  computed: {
    pageShow() {
      return this.StuCer && this.StuCer.totalitems > PAGE_SIZE;
    }
  },
  methods: {
    getInfo(args) {
      queryCer(args)
        .then(res => {
          if (res.ret === 200) {
            this.StuCer = res.data.StuCer;
            this.CompanyCer = res.data.CompanyCer;
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err);
          this.loading = false
        });
    },
    pageChange(index) {
      this.getInfo({
        Keyword: this.$route.query.keyword,
        page: index,
        perpage: PAGE_SIZE
      });
    }
  },
  filters: {
    filterStar(num) {
      return ["★", "★", "★", "★", "★"].slice(0, num).join("");
    }
  },
  components: {
    pagination
  }
};
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable'
.query-result
    min-width: 1000px
    margin-bottom: -9999px
    padding-bottom: 9999px
    overflow: hidden
    background-color: $bg-color-query-body
    .header
        min-width: 1000px
        display: flex
        .login
            margin-left: 18px
            margin-top: 15px
            flex: 0 0 132px
            display: block
            width: 132px
            height: 18px
        & > h1
            position: relative
            margin-left: 9px
            flex: 1
            font-size: $font-size-normal
            line-height: 48px
            color: $font-color-normal
            padding-left: 9px
            font-weight: bold
            &::after
                content: ""
                position: absolute
                top: 0px
                left: 0
                margin-top: 15px
                width: 1px
                height: 18px
                background-color: $border-color-base
    .wrap
        position: relative
        margin: 21px auto 0
        width: 608px
        padding: 0 112px 44px 112px
        border: 1px solid $border-color-query-wrap
        border-radius: 5px
        background-color: $bg-color-white
        .main-title
            padding: 19px 0 0 7px
            font-size: $font-size-smer
            line-height: 42px
            color: $font-color-info
            text-align: left
        .main-subtitle
            font-size: $font-size-normal
            line-height: 42px
            color: $font-color-white
            text-align: center
            background-color: $bg-color-query-title
        .info-2
            margin-top: 16px
            .nothing
                font-size: $font-size-smer
                line-height: 36px
                text-align: center
                color: $font-color-info
        .info-0, .info-1
            margin-top: 16px
            border: 1px solid $border-color-query-item
            &>div
                padding-left: 12px
                padding-right: 12px
            .split-line
                background-color: $bg-color-split-item
            .row-title
                display: flex
                .left, .right
                    flex: 1
                    padding-left: 25px
                    padding-top: 5px
                    padding-bottom: 5px
                    font-size: $font-size-base
                    line-height: 24px
                    color: $font-color-info
            .row-item
                @extend .row-title
                .left, .right
                    font-size: $font-size-smer
                    line-height: 30px
                    padding-top: 9px
                    padding-bottom: 9px
                    &>strong
                        font-size: 14px
                        font-weight: bold
            .single-row
                padding-left: 25px
                padding-top: 9px
                padding-bottom: 9px
                font-size: $font-size-smer
                line-height: 30px
                color: $font-color-info
        .loading 
            position: absolute
            top: 0 
            right: 0 
            bottom: 0 
            left: 0 
            background: $bg-color-white
            z-index: 20

    .star
        font-size: $font-size-lg
        font-weight: bold
</style>