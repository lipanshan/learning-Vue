<template>
  <transition name="move">
  <div class="course-info-wrap">
    <v-scroll :list="info">
      <div class="avatar-wrap">
        <img :src="info.url" alt="图片">
        <div class="back" @click="back"><i class="icon icon-cheveron-left"></i></div>
      </div>
      <h1 class="title">{{info.question}}</h1>
      <div class="time-wrap">
        <div class="time border-bottom-1px"><i class="icon" :class="{'icon-time': info.time.icon}"></i>{{info.time.text}}
        </div>
        <div class="address"><i class="icon" :class="{'icon-location2': info.address.icon}"></i>{{info.address.text}}
        </div>
      </div>
      <div class="onroll-wrap">
        <h2>{{info.abstract.title}}</h2>
        <p>{{info.abstract.info}}</p>
      </div>
      <div class="tag-wrap">
        <div class="title-head border-bottom-1px">
          <div class="title-name" :class="{'active': currentIndex === 0}">
            <h2 @click="selectTag(0)">课程内容</h2>
          </div>
          <div class="title-name" :class="{'active': currentIndex === 1}">
            <h2 @click="selectTag(1)">讲师介绍</h2>
          </div>
        </div>
        <div class="title-content">
          <div v-show="currentIndex === 0" class="title-content-txt">
            <h3>{{info.courseContent.question.title}}</h3>
            <ul class="list">
              <li v-for="item of info.courseContent.question.list" :key="item"><i class="point"></i>{{item}}</li>
            </ul>
            <h3>{{info.courseContent.answer.title}}</h3>
            <h3>{{info.courseContent.answer.subtitle}}</h3>
            <table class="table">
              <tr class="tr">
                <th v-for="item of info.courseContent.answer.list.th" class="th border-1px" :key="item">{{item}}</th>
              </tr>
              <tr v-for="item of info.courseContent.answer.list.td" :key="item.name" class="tr">
                <td class="td border-1px">{{item.time}}</td>
                <td class="td border-1px">{{item.name}}</td>
              </tr>
            </table>
            <div class="enroll-info">
              <h2><i class="icon icon-send"></i>{{info.courseContent.enroll.title}}</h2>
              <p>{{info.courseContent.enroll.subtitle}}</p>
              <ul>
                <li v-for="item of info.courseContent.enroll.list" :key="item"><i class="point"></i>{{item}}</li>
              </ul>
            </div>
            <div class="danger-wrap">
              <h2><i class="icon icon-send"></i>{{info.courseContent.danger.title}}</h2>
              <p>{{info.courseContent.danger.text}}</p>
            </div>
          </div>
          <div v-show="currentIndex === 1" class="title-content-txt">
            <div class="avatar-wrap">
              <a href="javascript:;" class="avatar-box"><img :src="info.teacherContent.avatar" alt=""></a>
              <h1>{{info.teacherContent.name}}</h1>
              <p class="txt">{{info.teacherContent.txt}}</p>
              <div class="info-wrap border-bottom-1px">
                <div class="course-box">课程：<span>{{info.teacherContent.courseNum}}</span></div>
                <div class="student-box">学员：<span>{{info.teacherContent.studentNum}}</span></div>
              </div>
            </div>
            <div class="teacher-info">
              <p>{{info.teacherContent.info}}</p>
            </div>
            <div class="line"></div>
            <div class="teacher-course">
              <h2>全部课程</h2>
              <ul class="course-list">
                <consult-item v-for="item of info.teacherContent.courses" :itemInfo="item" :key="item.id"></consult-item>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </v-scroll>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.course-info-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $color-theme-bg
  transition: all 0.4s
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  &>.scroll-wrap
    height: 100%
    overflow: hidden
  .avatar-wrap
    position: relative
    padding-bottom: 53.6%
    height: 0
    &>img
      position: absolute
      top: 0
      left: 0
      z-index: 10
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      width: 40px
      height: 40px
      text-align: center
      z-index: 100
      &>.icon
        font-size: $font-size-very-large-x
        line-height: $font-size-very-large-x
        color: $color-theme
  .title
    padding: 10px 18px 0
    font-size: $font-size-small-l
    line-height: $font-size-small-l + 22px
    color: $color-text-l
    font-weight: 600
    background-color: $color-theme
  .time-wrap
    background-color: $color-theme
    .time,.address
      position: relative
      padding: 5px
      margin-left: 15px
      margin-right: 15px
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 26px
      color: $color-text
      &>.icon
        margin-left: 4px
        margin-right: 10px
        color: $color-text-red
  .onroll-wrap
    padding-top: 9px
    &>h2
      padding: 8px 20px 0
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 14px
      color: $color-text-l
      background-color: $color-theme
    &>p
      padding: 0 20px 9px
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 14px
      background-color: $color-theme
      color: $color-text
  .tag-wrap
    margin-top: 10px
    background-color: $color-theme
    .title-head
      position: relative
      display: -webkit-flex
      display: flex
      display: -webkit-box
      display: -moz-flex
      display: -ms-flexbox
      .title-name
        -webkit-box-flex: 1
        -webkit-flex: 1
        -moz-box-flex: 1
        -ms-flex: 1
        flex: 1
        font-size: 0
        text-align: center
        &>h2
          display: inline-block
          vertical-align: center
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 29px
          color: $color-text
          border-bottom: 2px solid transparent
        &.active
          &>h2
            color: $color-text-d
            border-bottom-color: $color-text-red
  .title-content
    background-color: $color-theme
    .title-content-txt
      margin-top: 20px
      padding-left: 20px
      padding-right: 20px
      &>h3
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 20px
        color: $color-text
      .list
        margin-top: 25px
        &>li
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 20px
          color: $color-text
          .point
            margin-right: 6px
            display: inline-block
            vertical-align: middle
            width: 5px
            height: 5px
            background-color: $color-text
            border-radius: 50%
      .table
        margin-top: 25px
        padding-left: 15px
        padding-right: 15px
        width: 100%
        .tr
          .td,.th
            position: relative
            font-size: $font-size-small-s
            line-height: $font-size-small-s + 4px
            color: $color-text-d
            &:after
              margin-right: -1px
              margin-top: -1px
          .th
            text-align: center
            font-weight: 600
      .enroll-info
        padding-top: 5px
        background-color: $color-theme
        &>h2
          padding-top: 25px
          font-size: $font-size-small
          line-height: $font-size-small + 11px
          color: $color-text-l
          &>.icon
            margin-right: 12px
            color: $color-text-red
        &>p, &>ul > li
          font-size: $font-size-small
          line-height: $font-size-small + 11px
          color: $color-text
        &>ul > li > .point
          margin-right: 12px
          margin-left: 19px
          display: inline-block
          vertical-align: middle
          width: 5px
          height: 5px
          background-color: $color-text-d
          border-radius: 50%
      .danger-wrap
        @extend .enroll-info
        padding-top: 0
        padding-bottom: 22px
    .avatar-wrap
      .avatar-box
        margin: 16px auto 0
        position: relative
        display: block
        width: 50px
        height: 50px
        border-radius: 50%
        overflow: hidden
        &>img
          position: absolute
          top: 0
          left: 0
          width: 50px
          height: 50px
          border-radius: 50%
          z-index: 10
      &>h1
        padding-top: 8px
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 5px
        text-align: center
        color: $color-text-l
      &>.txt
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 6px
        color: $color-text
        text-align: center
      .info-wrap
        padding-top: 4px
        position: relative
        display: -webkit-box
        display: -moz-box
        display: -ms-flex-box
        display: flex
        .course-box
          -webkit-box-flex: 1
          -moz-box-flex: 1
          -ms-flex: 1
          flex: 1
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 39px
          color: $color-text
          text-align: center
          &>span
            margin-left: 10px
            display: inline-block
            color: $color-text-red
        .student-box
          @extend .course-box
    .teacher-info
      padding-top: 25px
      padding-bottom: 26px
      background-color: $color-theme
      &>p
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 11px
        color: $color-text
        text-indent: 2em
    .line
      margin-left: -20px
      margin-right: -20px
      height: 10px
      background-color: $color-theme-bg
    .teacher-course
      &>h2
        padding: 17px 12px 0
        font-size: $font-size-medium-m
        line-height: $font-size-medium-m + 2px
        color: $color-text-red
        font-weight: bold
</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
import consultItem from '@/components/consultitem'
export default {
  name: 'courseInfo',
  props: {
    info: {
      type: Object,
      default () {
        return {
          url: './static/image/img1.jpg',
          question: '如何用科学方法精准评估孤独症？',
          time: {
            icon: 'icon-time',
            text: '9月28日 12:00-14:00'
          },
          address: {
            icon: 'icon-location2',
            text: '北京 朝阳 育华南路 蓝岛中心A座502'
          },
          abstract: {
            title: '课程摘要',
            info: '爱佑慈善基金会“爱佑和康”项目与北京师范大学认知神经科学与学习国家重点实验室正式签署了“北京师范大学爱佑孤独症儿童脑发育评估项目”合作协议。这意味着国内乃至全球最大的孤独症儿童脑电数据库将被建立。'
          },
          courseContent: {
            question: {
              title: '如果你身边有孤独症患者，是否也有以下这些疑问或困扰：',
              list: [
                '孤独症的表现是什么？',
                '我有没有孤独症倾向？',
                '如何与孤独症患者相处？',
                '怎么用科学方法精准评估孤独症？',
                '怎样才是一名合格的管理者？'
              ]
            },
            answer: {
              title: '如果你有以上一个或几个问题，那么一定要来参加此次课程',
              subtitle: '具体课程内容和时间安排如下：',
              list: {
                th: [
                  '时间',
                  '内容'
                ],
                td: [
                  {
                    time: '第一次：9月21-23日',
                    name: '《创业管理者角色认知与转变》'
                  },
                  {
                    time: '第二次：10月-21日',
                    name: '《高效执行的金钥匙》'
                  },
                  {
                    time: '第三次：11月9-11日',
                    name: '《打造高绩效团队》'
                  },
                  {
                    time: '第四次：12月7-9日',
                    name: '《梳理关键动作，提升工作效能》'
                  }
                ]
              }
            },
            enroll: {
              title: '报名条件',
              subtitle: '重要的事情说三遍，需要同时符合以上条件才能报名哦！真的要同时符合以下条件才能报名哦！必须要同时符合以下条件才能报名哦！',
              list: [
                '1年（含）以上管理经验，并且下属人数超过2人',
                '未参加过第一期初阶班课程',
                '公益相关机构的全职员工',
                '要保证持续上完4次课程方能参加哦!'
              ]
            },
            danger: {
              title: '请注意',
              text: '本次报名为预报名，最终报名成功与否请等待通知！本次初阶班第四期培训地点在北京。'
            }

          },
          teacherContent: {
            avatar: './static/image/teacher.jpg',
            name: '李丹',
            txt: '评估专家组',
            courseNum: 12,
            studentNum: 268,
            info: '“十一.五”中残联“智力残疾儿童康复养护试点中心”评估专家组成员，“十二.五”中残联孤独症、智力障碍项目专家组成员。近期出版物有《特殊儿童应用行为分析（合著）》（北京大学出版社。2011），《孤独症干预的关键性技能训练法》（北京大学出版社.2014）.',
            courses: [
              {
                id: '1',
                url: './static/image/img1.jpg',
                title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
                see: '24310',
                time: '40分钟前',
                address: '北京 朝阳',
                date: '9月28日 12:00-14:00',
                idAddress: true
              },
              {
                id: '2',
                url: './static/image/img1.jpg',
                title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
                see: '24310',
                time: '40分钟前',
                address: '北京 朝阳',
                date: '9月28日 12:00-14:00',
                idAddress: true
              },
              {
                id: '3',
                url: './static/image/img1.jpg',
                title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
                see: '24310',
                time: '40分钟前',
                address: '北京 朝阳',
                date: '9月28日 12:00-14:00',
                idAddress: true
              }
            ]
          }
        }
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    selectTag (index) {
      this.currentIndex = index
    },
    back () {
      this.$emit('goBack')
    }
  },
  components: {
    vScroll,
    consultItem
  }
}
</script>
