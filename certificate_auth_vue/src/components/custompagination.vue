<template>
    <div v-show="Math.ceil(this.totalNumber / this.pageSize)" class="pagination" :class="{'disabled-home': homePageStatus, 'disabled-end': endPageStatus}">
        <button @click="goStart" :class="{'disabled-cls': homePageStatus}" :disabled="homePageStatus" class="page">首页
        </button>
        <el-pagination
                background
                :current-page="pageNumber"
                @current-change="currentChange"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalNumber">
        </el-pagination>
        <button :disabled="endPageStatus" :class="{'disabled-cls': endPageStatus}" @click="goEnd" class="page">尾页
        </button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "custompagination",
  props: {
    pageNumber: {
      type: [String, Number],
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalNumber: {
      type: Number,
      default: 1
    }
  },
  computed: {
    homePageStatus() {
      return this.pageNumber === 1
    },
    endPageStatus() {
      return this.pageNumber === Math.ceil(this.totalNumber / this.pageSize)
    }
  },
  methods: {
    currentChange(index) {
      this.$emit('pagenumchange', index)
    },
    goStart() {
      if (this.pageNumber === 1) {
        return
      }
      this.$emit('pagenumchange', 1)
    },
    goEnd() {
      const maxPageNum = Math.ceil(this.totalNumber / this.pageSize)
      if (this.pageNumber === maxPageNum) {
        return
      }
      this.$emit('pagenumchange', maxPageNum)
    }
  }
}
</script>

<style lang="sass" type="text/sass" rel="stylesheet/sass">
@import '../assets/sass/variable.sass'
.pagination
    display: flex
    justify-content: center
    padding-top: 24px
    padding-bottom: 24px
    & > .page
        width: 52px
        height: 32px
        padding: 0
        font-size: $font-size-smer
        line-height: 32px
        border: 1px solid $border-color-page
        border-radius: 32px
        background-color: $bg-color-white
        cursor: pointer
        &:focus
          outline: none
        &:hover
            background-color: $font-color-primary-hover
            color: $font-color-white
            border-color: $font-color-primary-hover
        &:active
            background-color: $font-color-primary-active
            color: $font-color-white
            border-color: $font-color-primary-active
        &.disabled-cls
            cursor: not-allowed
            &:hover
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
            &:active
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
    & > .el-pagination.is-background
        padding: 0 !important
        .btn-prev, .btn-next
            height: 32px
            width: 42px
            font-size: $font-size-smer
            line-height: 32px
            text-align: center
            border-radius: 32px !important
            &:hover
                background-color: $font-color-primary-hover
                color: $font-color-white
                border-color: $font-color-primary-hover
            &:active
                background-color: $font-color-primary-active
                color: $font-color-white
                border-color: $font-color-primary-active
    &.disabled-home > .el-pagination.is-background
        .btn-prev
            cursor: not-allowed
            &:hover
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
            &:active
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
    &.disabled-end > .el-pagination.is-background
        .btn-next
            cursor: not-allowed
            &:hover
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
            &:active
                background-color: $bg-color-white
                color: $font-color-default
                border-color: $border-color-page
    .el-pager
        & > li
            min-width: 32px !important
            height: 32px
            line-height: 30px
            &:hover
                background-color: $font-color-primary-hover !important
                color: $font-color-white !important
                border-color: $font-color-primary-hover !important
            &:active
                background-color: $font-color-primary-active !important
                color: $font-color-white !important
                border-color: $font-color-primary-active !important
</style>