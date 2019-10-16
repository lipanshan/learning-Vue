<template>
  <div class="short-paper">
    <div class="content">
      <div class="left-paper">
        <scroll class="list"
                :listData="list"
                :mode="'native'"
                :bar="scrollBar"
                @scrollhandle="scrollFn"
                @scrollendhandle="scrollEnd"
                ref="longPaperWrap">
          <div v-for="(item, index) in list" :key="item.id" class="list-item list-item-hook" :style="`top: ${index * 100}%`" :id="`item${item.id}`">
            <scroll :listData="item" :mode="'native'">
              <div class="question-title"><span class="order">{{item.ques_num}}/{{list.length}}</span><span class="type">{{item.ques_type_title}}</span>{{item.ques_title}}<span v-show="item.type === 'mulit'" class="mulit-tips">（多选题至少两个选项）</span><span class="score-hide">分值：{{item.score}}</span><span class="score">{{item.score}}</span></div>
              <!-- 单选题，判断题-->
              <ul v-if="item.type === 'single' || item.type === 'judge'" class="option-list">
                <li v-for="(key, i) in item.options" :key="i" @click="selectSingle(item, orderNum(i))" class="option" :class="{'active': orderNum(i) === item.active}">
                  <span class="order">{{orderNum(i)}}</span>
                  <span class="txt">{{key}}</span>
                </li>
              </ul>
              <!-- 多选题-->
              <ul v-if="item.type === 'mulit'" class="option-list">
                <li v-for="(key, i) in item.options" :key="i" @click="selectMulit(item, orderNum(i))" class="option" :class="{'active': orderNumMulit(item.active, orderNum(i))}">
                  <span class="order">{{orderNum(i)}}</span>
                  <span class="txt">{{key}}</span>
                </li>
              </ul>
              <!-- 问答题 -->
              <div v-if="item.type === 'answer'" class="answer-question">
                <textarea class="form-control" placeholder="请简单扼要的回答问题，限于200字。" maxleng="200" v-model="item.model" @change="selectTextarea(item, item.model)"></textarea>
              </div>
              <!-- ctf题 -->
              <div v-if="item.type === 'ctf'"  class="ctf">
                <p class="file-title">文件地址：</p>
                <a href="javascript:;" class="file-address">{{item.answer}}</a>
                <textarea class="form-control" placeholder="请简单扼要的回答问题，限于200字。" maxleng="200" v-model="item.model" @change="selectTextarea(item, item.model)"></textarea>
              </div>
              <!-- 填空题 -->
              <ul v-if="item.type === 'fillblank'" class="fill-blank">
                <li v-for="(key, i) in item.options" :key="key" class="item">
                  <input type="text" :placeholder="key" v-model="item.model[i]" @change="selectFillBlank(item, item.model[i])" class="form-control">
                </li>
              </ul>
              <div class="submit-wrap">
                <div class="pre-btn " @click="prevQues(index)" :class="{'disabled-cls': index === 0}">上一题</div>
                <div v-show="index !== list.length - 1" class="next-btn" @click="nextQues(index)" >下一题</div>
                <div v-show="index === list.length - 1" class="submit-btn" :class="{'disabled-cls': submitStatus.type}" @click="submitFn">我要交卷</div>
              </div>
            </scroll>
          </div>
        </scroll>
      </div>
      <div class="right-card">
        <paper-card :list="list"
                    :title="paperData.title"
                    :testTime="paperData.time"
                    @clickTag="selectTagItem"
        ></paper-card>
      </div>
    </div>
    <modal :show="modalFlag"
           :message="modalData.message"
           :submessage="modalData.subMessage"
           @sureFn="sureFn"
           @closeFn="modalClose">
      <div v-if="submitStatus.type === 0" class="btn-wrap" slot="footer">
        <span @click="submitPaper" class="cancel-btn">确定交卷</span>
        <span @click="modalClose" class="confirm-btn">在检查一下</span>
      </div>
    </modal>
  </div>
</template>

<script type="text/ecmascript-6">
import paperCard from '@/components/paper-card'
import scroll from '@/components/scroll'
import modal from '@/components/modal'
const MULIT_LIMIT_NUM = 2
const PAPER_LIMIT_TIME = Math.pow(10, 3) * 60 * 15
const STAR_TIME = 1544146163407
const END_TIME = 1544147123407
export default {
  name: 'shortPaper',
  data () {
    return {
      paperData: null,
      list: [
        {
          id: 0,
          type: 'single',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 1,
          ques_all: 16,
          ques_type_title: '单选题',
          score: '10分',
          answer: 'B',
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 1,
          type: 'mulit',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '多选题',
          score: '10分',
          answer: ['B', 'C', 'D'],
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 2,
          type: 'mulit',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '多选题',
          score: '10分',
          answer: ['B', 'C', 'D'],
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 3,
          type: 'judge',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '判断题',
          score: '10分',
          answer: 'C',
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 4,
          type: 'answer',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '问答题',
          score: '10分',
          answer: '发送邮件和接收邮件通常都使用AMTP协议',
          options: '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
        },
        {
          id: 5,
          type: 'ctf',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: 'CTF题',
          score: '10分',
          answer: 'AI_CTF.RAR',
          options: ''
        },
        {
          id: 6,
          type: 'fillblank',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '填空题',
          score: '10分',
          answer: ['在电子邮件系统中', '在电子邮件系统中', '在电子邮件系统中', '在电子邮件系统中'],
          options: ['填空1', '填空2', '填空3', '填空4']
        },
        {
          id: 7,
          type: 'single',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 1,
          ques_all: 16,
          ques_type_title: '单选题',
          score: '10分',
          answer: 'B',
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 8,
          type: 'mulit',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '多选题',
          score: '10分',
          answer: ['B', 'C', 'D'],
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 9,
          type: 'judge',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '判断题',
          score: '10分',
          answer: 'C',
          options: [
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使',
            '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
          ]
        },
        {
          id: 10,
          type: 'answer',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '问答题',
          score: '10分',
          answer: '发送邮件和接收邮件通常都使用AMTP协议',
          options: '发送邮件和接收邮件通常都使用AMTP协议 发送邮件通常使用 SMTP 协议，而接收邮件通常使用 POP3 协议 发送邮件通常使'
        },
        {
          id: 11,
          type: 'answer',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: 'CTF题',
          score: '10分',
          answer: 'AI_CTF.RAR',
          options: ''
        },
        {
          id: 12,
          type: 'fillblank',
          ques_title: '在电子邮件系统中，客户端代理是发送邮件和接收邮件通常都使用AMTP',
          ques_num: 2,
          ques_all: 16,
          ques_type_title: '填空题',
          score: '10分',
          answer: ['在电子邮件系统中', '在电子邮件系统中', '在电子邮件系统中', '在电子邮件系统中'],
          options: ['填空1', '填空2', '填空3', '填空4']
        }
      ],
      scrollFlag: true,
      modalFlag: false,
      modalData: {
        message: {
          danger: '',
          title: '确定退出该系统？请慎重操作！',
          danger2: ''
        },
        subMessage: ''
      },
      modalData1: null,
      modalData2: null,
      modalData3: null,
      modalData4: null,
      scrollBar: {
        keepShow: false,
        background: 'transparent',
        size: 1
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    submitStatus () {
      // 0: success, 1: unFill, 2: mulit length error, 3: min submit paper time 4: is sure submit
      let result = {
        type: 0,
        unFillQues: [],
        mulitQues: []
      }
      for (let i = 0; i < this.list.length; i++) {
        if (Array.isArray(this.list[i].model)) {
          if (this.list[i].model.join('') === '') {
            result.type = 1
            result.unFillQues.push(i)
          } else {
            if (this.list[i].type === 'mulit' && this.mulitSome(this.list[i].model)) {
              result.type = 2
              result.mulitQues.push(i)
            }
          }
        } else {
          if (this.list[i].model === '') {
            result.type = 1
            result.unFillQues.push(i)
          }
        }
      }
      if (result.type === 0) {
        result.type = new Date().getTime() - STAR_TIME < PAPER_LIMIT_TIME ? 3 : 0
      }
      return result
    }
  },
  methods: {
    getData () {
      this.paperData = {
        title: '瑞星网络安全基础课程水平考试',
        time: END_TIME - new Date().getTime()
      }
      const formData = JSON.parse(JSON.stringify(this.list))
      formData.forEach((item, i) => {
        if (item.type === 'single' || item.type === 'judge' || item.type === 'answer') {
          formData[i] = Object.assign({}, item, {
            model: '',
            active: '',
            current: ''
          })
        } else if (item.type === 'mulit') {
          formData[i] = Object.assign({}, item, {
            model: [],
            active: [],
            current: ''
          })
        } else if (item.type === 'fillblank') {
          formData[i] = Object.assign({}, item, {
            model: [],
            active: '',
            current: ''
          })
        }
      })
      this.list = formData
    },
    orderNum (num) {
      let order = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      return order[num]
    },
    padZero (num) {
      return '00'.substring((num + '').length) + num
    },
    formatterTime (time) {
      let h = this.padZero(parseInt(time / (Math.pow(60, 2) * Math.pow(10, 3))))
      let s = this.padZero(parseInt((time % (Math.pow(60, 2) * Math.pow(10, 3))) / (Math.pow(60, 1) * Math.pow(10, 3))))
      let m = this.padZero(parseInt((time % (Math.pow(60, 1) * Math.pow(10, 3))) / Math.pow(10, 3)))
      return h + ':' + s + ':' + m
    },
    mulitSome (list) {
      let num = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== '') {
          num++
        }
      }
      return num < MULIT_LIMIT_NUM
    },
    orderNumMulit (list, current) {
      if (!list) {
        return false
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i] === current) {
          return true
        }
      }
      return false
    },
    selectTagItem (data) {
      let index = null
      this.list.forEach((item, i) => {
        if (item.id === data.id) {
          index = i
        }
        this.$set(this.list, i, Object.assign({}, item, {'current': data.id}))
      })
      this.scrollFlag = false
      this.$refs.longPaperWrap.scrollToPos(`item${index}`)
    },
    nextQues (index) {
      let num = index
      if (index >= this.list.length - 1) {
        num = this.list.length - 1
      } else {
        num++
      }
      this.list.forEach((item, i) => {
        this.$set(this.list, i, Object.assign({}, item, {'current': this.list[num].id}))
      })
      this.$refs.longPaperWrap.scrollToPos(`item${num}`)
    },
    prevQues (index) {
      let num = index
      if (index <= 0) {
        num = 0
      } else {
        num--
      }
      this.list.forEach((item, i) => {
        this.$set(this.list, i, Object.assign({}, item, {'current': this.list[num].id}))
      })
      this.$refs.longPaperWrap.scrollToPos(`item${num}`)
    },
    scrollUp (data) {
      if (!this.scrollFlag) { return false }
      this.scrollFlag = false
      let list = []
      let h = 0
      this.$refs.longPaperWrap.$el.querySelectorAll('.list-item-hook').forEach((elem) => {
        list.unshift(h)
        h += elem.getBoundingClientRect().height
      })
      for (let i = 0; i < list.length; i++) {
        if (list[i] <= data.scrollTop) {
          this.list.forEach((item, index) => {
            this.$set(this.list, index, Object.assign({}, item, {'current': this.list[list.length - 1 - i].id}))
          })
          this.$refs.longPaperWrap.scrollTo({
            x: 0,
            y: list[i]
          })
          return false
        }
      }
    },
    scrollDown (data) {
      if (!this.scrollFlag) { return false }
      this.scrollFlag = false
      let list = []
      let h = 0
      this.$refs.longPaperWrap.$el.querySelectorAll('.list-item-hook').forEach((elem) => {
        list.push(h)
        h += elem.getBoundingClientRect().height
      })
      for (let i = 0; i < list.length; i++) {
        if (list[i] >= data.scrollTop) {
          this.list.forEach((item, index) => {
            this.$set(this.list, index, Object.assign({}, item, {'current': this.list[i].id}))
          })
          this.$refs.longPaperWrap.scrollTo({
            x: 0,
            y: list[i]
          })
          return false
        }
      }
    },
    scrollFn (data) {
      if (data.directionY === 'down') {
        this.scrollDown(data)
      } else if (data.directionY === 'up') {
        this.scrollUp(data)
      }
    },
    scrollEnd (data) {
      this.scrollFlag = true
    },
    selectSingle (item, orderTxt) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === item.id) {
          item.model = orderTxt
          item.active = orderTxt
          this.$set(this.list, i, item)
          return false
        }
      }
    },
    selectMulit (item, orderTxt) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === item.id) {
          if (item.active) {
            let flag = item.active.findIndex((item) => {
              return orderTxt === item
            })
            if (flag > -1) {
              item.active.splice(flag, 1)
              item.model.splice(flag, 1)
            } else {
              item.active.push(orderTxt)
              item.model.push(orderTxt)
              item.active.sort()
              item.model.sort()
            }
          } else {
            item.active = [orderTxt]
            item.model = [orderTxt]
          }
          this.$set(this.list, i, item)
          return false
        }
      }
    },
    selectTextarea (item, value) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === item.id) {
          item.active = value
          this.$set(this.list, i, item)
          return false
        }
      }
    },
    selectFillBlank (item, value) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === item.id) {
          item.active = item.model.join('') === '' ? '' : value
          this.$set(this.list, i, item)
          return false
        }
      }
    },
    submitFn () {
      this.modalFlag = true
      if (this.submitStatus.type === 1) {
        this.modalData = Object.assign({}, {
          message: {
            danger: `您有${this.submitStatus.unFillQues.length}道题未答`,
            title: '，请答完所有题再交卷。'
          },
          subMessage: '（多选题至少选择2项）'
        })
      } else if (this.submitStatus.type === 2) {
        this.modalData = Object.assign({}, {
          message: {
            danger: `第${this.submitStatus.mulitQues[0] + 1}题为多选题`,
            title: '，请至少选择两个选项。'
          }
        })
      } else if (this.submitStatus.type === 3) {
        this.modalData = Object.assign({}, {
          message: {
            title: '抱歉，该试卷设置了',
            danger2: `开卷${this.formatterTime(PAPER_LIMIT_TIME)}内不可交卷。`
          }
        })
      } else {
        this.modalData = Object.assign({}, {
          message: {
            title: `离考试结束还有${this.formatterTime(END_TIME - new Date().getTime())}，确定现在交卷吗？`
          }
        })
      }
    },
    submitPaper () {
      alert('交卷了')
    },
    sureFn () {
      this.modalFlag = false
      if (this.submitStatus.type === 3) {
        this.submitPaper()
      }
    },
    modalClose () {
      this.modalFlag = false
    }
  },
  components: {
    paperCard,
    scroll,
    modal
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
  @import '../assets/css/variable.sass';
  @import '../assets/css/mixin.sass';
  .short-paper
    padding: 0 10px
    height: 100%
    .content
      display: flex
      height: 100%
      .left-paper
        position: relative
        margin-right: 10px
        display: flex
        flex-direction: column
        flex: 1
        background-color: $color-n
        height: 100%
        overflow: hidden
        border-radius: 5px
        .list-item
          position: absolute
          top: 0
          bottom: 0
          left: 0
          right: 0
          height: 100%
          overflow: hidden
          .question-title
            position: relative
            padding-top: 10px
            padding-left: 20px
            padding-right: 20px
            font-size: 12px
            line-height: 30px
            color: $font-color-n
            &::before
              content: ""
              display: block
              position: absolute
              top: 18px
              left: 0
              width: 0
              border: 7px solid $font-color-user
              border-left: none
              border-top-right-radius: 7px
              border-bottom-right-radius: 7px
            &>.order
              margin-right: 10px
              display: inline-block
              vertical-align: top
              font-size: 12px
              line-height: 30px
              color: $font-color-user
            &>.type
              margin-top: 3px
              margin-right: 10px
              padding-left: 10px
              padding-right: 10px
              display: inline-block
              vertical-align: top
              font-size: 12px
              line-height: 22px
              text-align: center
              color: $font-color-user
              border: 1px solid $font-color-user
              border-radius: 24px
            .mulit-tips
              color: $color-xxl
            .score-hide
              visibility: hidden
            .score
              margin-right: 20px
              position: absolute
              right: 0
              bottom: 0
              font-size: 12px
              line-heihgt: 30px
              color: $font-color-user
          .option-list
            padding: 8px 22px 10px
            .option
              padding-top: 6px
              padding-bottom: 6px
              display: flex
              align-items: flex-start
              cursor: pointer
              &>.order
                display: block
                flex: 0 0 24px
                width: 24px
                height: 24px
                font-size: 12px
                line-height: 24px
                text-align: center
                border-radius: 24px
                color: $font-color-n
                background-color: $color-xxxxl
              &>.txt
                margin-left: 10px
                flex: 1
                font-size: 12px
                line-height: 24px
                color: $color-m
                white-space: pre-wrap
                word-break: break-all
              &:hover
                &>.txt
                  color: $font-color-n
              &.active
                &>.order
                  background-color: $color-xxl
                  color: $color-n
                &>.txt
                  color: $color-xxl
        .answer-question
          padding: 8px 20px
          .form-control
            padding: 4px 8px
            display: block
            box-sizing: border-box
            width: 100%
            height: 54px
            border: 1px solid $border-color-textarea
            border-radius: 8px
            background-color: $bg-color-textarea
            font-size: 12px
            line-height: 20px
            color: $border-color-n
            resize: none
        .ctf
          padding: 8px 20px
          @extend .answer-question
          .file-title
            margin: 0
            font-size: 12px
            line-height: 24px
            color: $font-color-n
          .file-address
            margin: 0
            font-size: 12px
            line-height: 24px
            color: $color-xxl
            white-space: pre-wrap
            word-break: break-all
        .fill-blank
          padding: 8px 20px
          &>.item
            padding-top: 5px
            padding-bottom: 5px
            &>input
              box-sizing: border-box
              display: block
              width: 100%
              padding: 4px 10px
              font-size: 12px
              line-height: 20px
              color: $font-color-n
              background-color: $bg-color-textarea
              border-radius: 5px
              border: 1px solid $border-color-textarea
          @at-root .submit-wrap
            padding-top: 27px
            padding-bottom: 13px
            font-size: 0
            text-align: center
            .pre-btn, .next-btn
              margin-left: 20px
              margin-right: 20px
              display: inline-block
              vertical-align: top
              width: 100px
              background-color: $bg-color-n
              font-size: 14px
              line-height: 30px
              color: $color-m
              border-radius: 4px
              cursor: pointer
              border: 1px solid  $font-color-tel
              &:hover
                background-color: $color-xxl
                border-color: $color-xxl
                color: $color-n
              &:active
                background-color: $font-color-tel
                border-color: $font-color-tel
              &.disabled-cls
                background-color: $bg-color-n
                color: $color-m
                cursor: default
            .submit-btn
              @extend .pre-btn
              background-color: $font-color-tel
              border-color: $font-color-tel
              color: $color-n
              &:hover
                background-color: $color-xxl
                border-color: $color-xxl
                color: $color-n
              &.disabled-cls
                background-color: $font-color-tel
                border-color: $font-color-tel
                color: $color-n
      .right-card
        flex: 0 0 220px
        width: 220px
        background-color: $color-n
        height: 100%
        overflow: hidden
        border-radius: 5px
    .title-wrap
      padding:
      display: flex
</style>
