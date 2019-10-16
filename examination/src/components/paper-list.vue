<template>
  <div class="content">
    <div class="tag-wrapper">
      <div class="tag-wrap">
        <div class="tag-item" @click="switchTag('untest')" :class="{'active': tagCurrent === 'untest'}">未考试卷(<span class="num">{{untestNum}}</span>)</div>
        <div class="tag-item" @click="switchTag('tested')" :class="{'active': tagCurrent === 'tested'}">已考试卷(<span class="num">{{testedNum}}</span>)</div>
      </div>
      <div v-show="tagCurrent === 'tested'" class="tag2-wrap">
        <div class="tag2-item" @click="switchTag2('unknow')" :class="{'active': tagCurrent2 === 'unknow'}">待批阅</div>
        <div class="tag2-item" @click="switchTag2('unqualified')" :class="{'active': tagCurrent2 === 'unqualified'}">未及格</div>
        <div class="tag2-item" @click="switchTag2('untest')" :class="{'active': tagCurrent2 === 'untest'}">未考试</div>
        <div class="tag2-item" @click="switchTag2('all')" :class="{'active': tagCurrent2 === 'all'}">全部试题</div>
      </div>
    </div>
    <scroll :probetype="3" :listData="list" class="test-wrap" ref="scrollWrap">
      <ul v-show="tagCurrent === 'untest'" class="test-list">
        <li v-for="item in list" :key="item.id" class="test-item">
          <div class="image-wrap">
            <img :src="item.poster" alt="">
          </div>
          <div class="paper-info">
            <div class="row">
              <span class="title">试卷名称</span>
              <span class="txt">{{item.name}}</span>
            </div>
            <div class="row">
              <span class="title">卷面分数</span>
              <span class="txt">{{item.paperScore}}</span>
            </div>
            <div class="row">
              <span class="title">考试限时</span>
              <span class="txt">{{item.testTime}}</span>
            </div>
            <div class="row">
              <span class="title">及格分数</span>
              <span class="txt">{{item.qualifield}}</span>
            </div>
            <div class="row">
              <span class="title">考试规则</span>
              <span class="txt">{{item.rule}}</span>
            </div>
            <div class="row">
              <span class="title">截止时间</span>
              <span class="txt" :class="{'danger': item.cutoffType}">{{item.cutoffTime}}</span>
            </div>
          </div>
          <div class="mask"></div>
          <div class="shadow-wrap">
            <p class="tip-message">{{item.shadowTitle}}</p>
            <router-link v-if="item.paperType === 0" :to="{path: '/paperHome/longPaper/' + item.id}" class="start-test">开始考试</router-link>
            <router-link v-else-if="item.paperType === 1" :to="{path: '/paperHome/shortPaper/' + item.id}" class="start-test">开始考试</router-link>
          </div>
        </li>
      </ul>
      <ul v-show="tagCurrent === 'tested'" v-for="item in list" :key="item.id" class="tested-list">
        <li class="tested-item">
          <div class="poster">
            <img :src="item.poster" alt="图片">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="score">
            <div class="score-txt">得分</div>
            <div class="score-num">{{item.score}}</div>
          </div>
          <div class="test-time">
            <div class="test-time-txt">考试时间</div>
            <div class="test-time-num">{{item.testTime}}</div>
          </div>
          <div class="use-time">
            <div class="use-time-txt">用时</div>
            <div class="use-time-num">{{item.useTime}}</div>
          </div>
          <div class="submit-paper-time">
            <div class="submit-paper-time-txt">交卷方式</div>
            <div class="submit-paper-time-type" :class="{'untest': item.submitFormType === '未考试'}">{{item.submitFormType}}</div>
          </div>
          <div class="btn-group">
            <span class="right-paper"></span>
            <span class="error-paper"></span>
          </div>
        </li>
      </ul>
      <div v-show="tagCurrent === 'untest' && untestNum <= 0 || tagCurrent === 'tested' && testedNum <= 0" slot="nothing" class="nothing-wrap">
        <img src="../assets/images/nothing-icon.png" alt="">
        <div class="message">考生您好，暂时没有您要答的试卷</div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
import untestExam from '@/api/api'
export default {
  name: 'paper-list',
  data () {
    return {
      tagCurrent: 'untest',
      tagCurrent2: 'all',
      list: [],
      alreadyPaper: null
    }
  },
  computed: {
    untestNum () {
      let num = 0
      this.list && this.list.forEach((value) => {
        if (value.category === 'untest') {
          num++
        }
      })
      return num
    },
    testedNum () {
      let num = 0
      this.list && this.list.forEach((value) => {
        if (value.category === 'tested') {
          num++
        }
      })
      return num
    }
  },
  created () {
    this.getListDataUntest()
  },
  mounted () {
  },
  methods: {
    switchTag (str) {
      this.tagCurrent = str
      if (str === 'untest') {
        this.getListDataUntest()
      }
      if (str === 'tested') {
        this.getListDataTested()
      }
      this.$refs.scrollWrap.scrollRefresh()
    },
    switchTag2 (str) {
      this.tagCurrent2 = str
      if (str === 'all') {
      }
    },
    getListDataUntest () {
      untestExam().then((res) => {
        this.list = res.data
      })
    },
    getListDataTested () {
      this.list = this.list.filter((item) => {
        return item.category === 'tested'
      })
    }
  },
  components: {
    scroll
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
@import '../assets/css/variable.sass';
@import '../assets/css/mixin.sass';
.content
  margin: 0 auto
  display: flex
  flex-direction: column
  width: 760px
  height: 100%
  background-color: $bg-color-n
  border-radius: 6px
  overflow: hidden
  .tag-wrapper
    flex: 0 0 28px
    border-bottom: 1px solid $border-color-s
    .tag-wrap
      padding: 12px 10px 10px
      display: flex
      justify-content: center
      .tag-item
        margin: 0 10px
        padding: 0 24px
        font-size: 12px
        line-height: 26px
        text-align: center
        border-radius: 28px
        border: 1px solid $border-color-n
        cursor: pointer
        &:hover, &.active
          color: $bg-line
          border-color: $bg-line
    .tag2-wrap
      padding-bottom: 8px
      display: flex
      justify-content: center
      .tag2-item
        margin-left: 25px
        margin-right: 25px
        padding-left: 5px
        padding-right: 5px
        display: block
        font-size: 12px
        line-height: 20px
        color: $color-m
        border-bottom: 1px solid transparent
        cursor: pointer
        &:hover
          color: $font-color-user
        &.active
          color: $font-color-user
          border-color: $font-color-user
  .test-list
    margin: 0 auto
    padding-top: 4px
    width: 668px
    flex: 1
    height: auto
    .test-item
      position: relative
      margin-top: 10px
      display: flex
      align-items: center
      border: 1px solid $border-color-s
      border-radius: 5px
      .image-wrap
        padding-bottom: 15px
        position: relative
        flex: 0 0 214px
        &>img
          margin-left: 14px
          margin-top: 14px
          display: block
          width: 200px
          height: 134px
      .paper-info
        padding: 10px 20px 10px 10px
        .row
          font-size: 0
          white-space: nowrap
          &>.title
            display: inline-block
            vertical-align: top
            padding-right: 10px
            font-size: 12px
            line-height: 24px
            color: $font-color-title
          &>.txt
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 24px
            color: $font-color-n
            white-space: pre-wrap
            word-break: break-all
            &.danger
              color: $color-error
      .mask
        display: none
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        background-color: $bg-mask
        opacity: 0.65
        filter: alpha(opacity=65)
        border-radius: 5px
      .shadow-wrap
        display: none
        position: absolute
        top: 50%
        left: 50%
        transform: translate3d(-50%, -50% , 0)
        .tip-message
          margin: 0
          font-size: 12px
          line-height: 20px
          text-align: center
          color: $color-n
        .start-test
          margin: 20px auto 0
          display: block
          width: 100px
          text-align: center
          font-size: 12px
          line-height: 32px
          color: $color-n
          border-radius: 4px
          background-color: $bg-mask-btn-active
          &:hover
            background-color: $bg-mask-btn-hover
      &:hover
        .mask ,.shadow-wrap
          display: block
  .tested-list
    .tested-item
      padding-top: 9px
      padding-bottom: 9px
      display: flex
      border-bottom: 1px solid $border-color-m
      justify-content: space-around
      align-items: center
      .poster
        &>img
          display: block
          width: 100px
          height: 66px
      .name
        padding-left: 20px
        padding-right: 10px
        max-width: 122px
        font-size: 12px
        line-height: 20px
        color: $font-color-n
        white-space: pre-wrap
        word-break: break-all
      .score
        padding-left: 10px
        padding-right: 10px
        .score-txt
          font-size: 12px
          line-height: 18px
          color: $color-m
        .score-num
          font-size: 12px
          line-height: 18px
          color: $font-color-user
          &.untest
            color: $color-error
          &.unknow
            color: $font-color-tel
      .test-time
        .test-time-txt,.test-time-num
          font-size: 12px
          line-height: 18px
          color: $color-m
      .use-time
        .use-time-txt ,.use-time-num
          font-size: 12px
          line-height: 18px
          color: $color-m
      .submit-paper-time
        .submit-paper-time-txt, .submit-paper-time-type
          font-size: 12px
          line-height: 18px
          color: $color-m
        .submit-paper-time-type
          text-align: center
          &.untest
            color: $color-error
      .btn-group
        font-size: 0
        white-space: nowrap
        .right-paper, .error-paper
          margin-left: 10px
          margin-right: 10px
          display: inline-block
          vertical-align: middle
          width: 24px
          height: 24px
          background: url(../assets/images/paper-icons.png) no-repeat 0 0
          cursor: pointer
        .right-paper
          background-position: 0 0
          &:hover
            background-position: 0 -34px
          &:active, &.active
            background-position: 0 -68px
          &.disabled-cls
            background-position: 0 -102px
            cursor: default
        .error-paper
          background-position: -45px 0
          &:hover
            background-position: -45px -34px
          &:active, &.active
            background-position: -45px -68px
          &.disabled-cls
            background-position: -45px -102px
            cursor: default
  .nothing-wrap
    margin-top: 100px
    &>img
      margin: 0 auto
      display: block
      width: 90px
      height: 77px
    &>.message
      margin-top: 25px
      font-size: 12px
      line-height: 30px
      color: $color-m
      text-align: center
</style>
