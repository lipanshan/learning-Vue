<template>
  <div class="content">
    <div class="tag-wrap">
      <div class="tag-item" @click="switchTag('untest')" :class="{'active': tagCurrent === 'untest'}">未考试卷(<span class="num">{{untestNum}}</span>)</div>
      <div class="tag-item" @click="switchTag('tested')" :class="{'active': tagCurrent === 'tested'}">已考试卷(<span class="num">{{testedNum}}</span>)</div>
    </div>
    <scroll :probetype="3" :listData="list" class="test-wrap" ref="scrollWrap">
      <ul class="test-list">
        <li v-show="tagCurrent === item.category" v-for="item in list" :key="item.id" class="test-item">
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
      <div v-show="tagCurrent === 'untest' && untestNum <= 0 || tagCurrent === 'tested' && testedNum <= 0" slot="nothing" class="nothing-wrap">
        <img src="../assets/images/nothing-icon.png" alt="">
        <div class="message">考生您好，暂时没有您要答的试卷</div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
export default {
  name: 'paper-list',
  data () {
    return {
      tagCurrent: 'untest',
      list: null
    }
  },
  computed: {
    untestNum () {
      let num = 0
      this.list.forEach((value) => {
        if (value.category === 'untest') {
          num++
        }
      })
      return num
    },
    testedNum () {
      let num = 0
      this.list.forEach((value) => {
        if (value.category === 'tested') {
          num++
        }
      })
      return num
    }
  },
  created () {
    this.getListData()
  },
  methods: {
    switchTag (str) {
      this.tagCurrent = str
      this.$refs.scrollWrap.scrollRefresh()
    },
    getListData () {
      let list = [
        {
          id: '0',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        },
        {
          id: '1',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 0,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 1
        },
        {
          id: '2',
          category: 'tested',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 1
        },
        {
          id: '3',
          category: 'tested',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 1
        },
        {
          id: '4',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 1
        },
        {
          id: '5',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        },
        {
          id: '6',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        },
        {
          id: '7',
          category: 'tested',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        },
        {
          id: '8',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        },
        {
          id: '9',
          category: 'untest',
          poster: require('../assets/images/test-item.png'),
          name: '瑞星网络安全基础课程水平考试瑞星网络安全基础课程水平考试考试',
          paperScore: '100分',
          testTime: '45分钟',
          qualifield: '60分',
          rule: '未交卷允许修改答案',
          cutoffTime: '2018-09-20（未按时交卷按0分交卷）',
          cutoffType: 1,
          shadowTitle: '开始考试前请仔细阅读试卷的相关事项',
          paperHref: '/pageList',
          paperType: 0
        }
      ]
      this.list = JSON.parse(JSON.stringify(list))
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
  .tag-wrap
    padding: 12px 10px 10px
    display: flex
    flex: 0 0 28px
    justify-content: center
    border-bottom: 1px solid $border-color-s
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
