<template>
  <div class="comment-wrap">
    <v-scroll class="form" ref="commentScrollWrap">
      <div class="box">
        <consult-item :itemInfo="list[0]"></consult-item>
      </div>
      <div class="title-header border-bottom-1px">
        <div @click="selectTag(0)" class="title-wrap" :class="{'active': currentIndex === 0}">
          <h2>课程评价</h2>
        </div>
        <div  @click="selectTag(1)"  class="title-wrap" :class="{'active': currentIndex === 1}">
          <h2>课程作业</h2>
        </div>
      </div>
      <div v-show="currentIndex === 0" class="comment-box">
        <ul class="star-wrap">
          <li v-for="item of starList" :key="item.title" class="star-item border-bottom-1px">
            <p class="txt">{{item.title}}</p>
            <star :star="item" @setStar="setStar"></star>
          </li>
        </ul>
        <h3>对您最有帮助:</h3>
        <div class="textarea-wrap">
          <textarea v-model="textarea1" placeholder="请输入您要评价的信息"></textarea>
        </div>
        <h3>意见/建议:</h3>
        <div class="textarea-wrap">
          <textarea v-model="textarea2" placeholder="请输入您要评价的信息"></textarea>
        </div>
      </div>
      <div v-show="currentIndex === 1" class="comment-box">
        <div class="course-work">
          <div class="file-wrap">
            <h2 class="title">学习心得</h2>
            <div class="file-box">
              <cube-upload
                ref="upload"
                v-model="files"
                :action="action"
                @files-added="addedHandler"
                @file-error="errHandler">
                <div class="clear-fix">
                  <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                  <cube-upload-btn :multiple="false">
                    <div>
                      <i class="icon icon-folder-plus"></i>
                      <p>上传文件</p>
                    </div>
                  </cube-upload-btn>
                </div>
              </cube-upload>
            </div>
          </div>
          <div class="picture-wrap">
            <h2 class="title">分享截图</h2>
            <div class="picture-box">
              <cube-upload
                ref="upload2"
                v-model="files2"
                :action="action"
                @files-added="addedHandler2"
                @file-error="errHandler2">
                <div class="clear-fix">
                  <cube-upload-file v-for="(file, i) in files2" :file="file" :key="i"></cube-upload-file>
                  <cube-upload-btn :multiple="false">
                    <div>
                      <i class="icon icon-photo"></i>
                      <p>上传图片</p>
                    </div>
                  </cube-upload-btn>
                </div>
              </cube-upload>
            </div>
          </div>
        </div>
      </div>
    </v-scroll>
    <div @click="submit" class="submit">保存</div>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.comment-wrap
  position: absolute
  top: 0
  right: 0
  bottom: 48px
  left: 0
  z-index: 10
  .form
    position: absolute
    top: 0
    right: 0
    bottom: 48px
    left: 0
    overflow: hidden
    .box
      padding: 0 15px
      background-color: $color-theme
    .title-header
      position: relative
      margin-top: 10px
      background-color: $color-theme
      display: flex
      .title-wrap
        flex: 1
        font-size: 0
        text-align: center
        &.active
          &>h2
            color: $color-text-l
            border-color: $color-text-red
        &>h2
          display: inline-block
          vertical-align: center
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 30px
          border-bottom: 2px solid transparent
          color: $color-text
    .comment-box
      padding-bottom: 17px
      .star-wrap
        padding-left: 15px
        padding-right: 15px
        background-color: $color-theme
        .star-item
          position: relative
          display: flex
          &>.txt
            padding-top: 1px
            flex: 1
            font-size: $font-size-small-l
            line-height: $font-size-small-l + 34px
            color: $color-text-l
          &>.star-list
            flex: 1
      &>h3
        padding-left: 15px
        padding-right: 15px
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 30px
        color: $color-text-l
      .textarea-wrap
        display: flex
        padding: 0 15px
        border-radius: 4px
        &>textarea
          flex: 1
          display: block
          padding: 11px 18px
          resize: none
          border-radius: 4px
          border: none
          color: $color-text
          font-size: $font-size-small-l
          line-height: $font-size-small-l + 10px
          background-color: $color-theme
    .course-work
      display: flex
      padding-left: 15px
      padding-right: 15px
      .picture-wrap,.file-wrap
        flex: 1
        .title
          padding-top: 14px
          padding-bottom: 14px
          font-size: $font-size-small
          line-height: $font-size-small + 10px
          text-align: center
          color: $color-text-d
        .title:nth-child(1)
          padding-right: 6px
        .title:nth-child(2)
          padding-left: 6px
        .picture-box,.file-box
          background-color: $color-theme
          border-radius: 4px
          .cube-upload
            .cube-upload-file, .cube-upload-btn
              margin: 0
              height: 77px
            .cube-upload-file
              margin: 0
              + .cube-upload-btn
                margin-top: -77px
                opacity: 0
            .cube-upload-file-def
              width: 100%
              height: 100%
              background-size: 100% 77px
              .cubeic-wrong
                display: none
            .cube-upload-btn
              display: flex
              align-items: center
              justify-content: center
              &> div
                text-align: center
                color: $color-text
              i
                display: inline-flex
                align-items: center
                justify-content: center
                width: 50px
                height: 50px
                font-size: 32px
                line-height: 1
                font-style: normal
                border-radius: 50%
                color: $color-text
        .file-box
          margin-right: 6px
        .picture-box
          margin-left: 6px
  .submit
    position: fixed
    right: 0
    bottom: 0
    left: 0
    z-index: 20
    font-size: $font-size-small-l
    line-height: $font-size-small-l + 34px
    color: $color-theme
    background-color: $color-text-red
    text-align: center
</style>
<script type="text/ecmascript-6">
import consultItem from '@/components/consultitem'
import vScroll from '@/components/scroll'
import star from '@/components/star'
import cube from 'cube-ui'
export default {
  data () {
    return {
      list: [
        {
          id: '1',
          url: './static/image/img1.jpg',
          title: '如何用科学方法精准评估孤独症？这份协议将填补行业空白',
          see: '24310',
          time: '40分钟前',
          address: '北京 朝阳',
          date: '9月28日 12:00-14:00',
          idAddress: true
        }
      ],
      starList: [
        {
          title: '内容评价',
          star: 0
        },
        {
          title: '授课水平',
          star: 0
        },
        {
          title: '场地及设施安排',
          star: 0
        },
        {
          title: '培训的进程安排',
          star: 0
        },
        {
          title: '日后工作的帮助',
          star: 0
        },
        {
          title: '总体评价',
          star: 0
        }
      ],
      currentIndex: 0,
      action: '',
      files: [],
      files2: [],
      textarea1: '',
      textarea2: '',
      info: {}
    }
  },
  methods: {
    selectTag (num) {
      this.currentIndex = num
    },
    setStar (data) {
      this.starList.forEach((item) => {
        if (data.title === item.title) {
          item.star = data.starNum
        }
      })
    },
    addedHandler () {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    addedHandler2 () {
      const file = this.files2[0]
      file && this.$refs.upload2.removeFile(file)
    },
    errHandler (file) {
      // const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    },
    errHandler2 (file) {
      // const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    },
    submit () {
      this.info = Object.assign({}, {
        star: this.starList,
        file1: this.files,
        file2: this.files2,
        textarea1: this.textarea1,
        textarea2: this.textarea1
      })
      this.$createDialog({
        type: 'warn',
        content: `<span class="word-break">${JSON.stringify(this.info)}</span>`,
        icon: 'cubeic-alert'
      }).show()
    }
  },
  components: {
    vScroll,
    consultItem,
    star,
    cube
  }
}
</script>
