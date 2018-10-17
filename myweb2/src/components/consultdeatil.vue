<template>
  <transition name="move">
  <div class="consult-deatil-wrap">
    <v-scroll class="consult-deatil">
      <h1>{{detail.title}}</h1>
      <h1>{{detail.title2}}</h1>
      <p>{{detail.time}}</p>
      <div v-for="item of detail.list" :key="item.txt" class="wrap">
        <p class="txt">{{item.txt}}</p>
        <div class="img">
          <img :src="item.url" alt="图片">
        </div>
      </div>
    </v-scroll>
  </div>
  </transition>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../common/sass/variable'
.consult-deatil-wrap
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 0
  transition: all 0.4s
  background-color: $color-theme
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .consult-deatil
    padding-left: 15px
    padding-right: 15px
    height: 100%
    overflow: hidden
    &>.scroll-content
      padding-top: 19px
    h1
      font-size: $font-size-small-l
      line-height: $font-size-small-l + 10px
      color: $color-text-l
      text-align: center
    p
      padding-top: 10px
      font-size: $font-size-small
      line-height: $font-size-small + 16px
      color: $color-text
      text-align: center
    .wrap
      padding-top: 19px
      .txt
        font-size: $font-size-small-l
        line-height: $font-size-small-l + 11px
        color: $color-text-d
        text-indent: 2em
        text-align: left
      .img
        margin: 18px 14px
        position: relative
        height: 0
        padding-top: 50%
        &>img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: 10

</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/scroll'
export default {
  name: 'consultDeatil',
  props: {
    detail: {
      type: Object,
      default () {
        return {
          title: '如何用科学方法精准评估孤独症？',
          title2: '这份协议将填补行业空白',
          time: '2018-12-23',
          list: [
            {
              txt: '2017年7月，爱佑慈善基金会“爱佑和康”项目与北京师范大学认知神经科学与学习国家重点实验室正式签署了“北京师范大学爱佑孤独症儿童脑发育评估项目”合作协议。',
              url: './static/image/detail.jpg'
            },
            {
              txt: '这意味着国内乃至全球最大的孤独症儿童脑电数据库即将被建立，而孤独症脑电检测领域的空白也将被填补。通过不断探索孤独症儿童的脑电特征标记，本项目将应用于临床辅助诊断，为孤独症的精准评估提供客观的科学依据。（左：脑调控与认知增强研究中心副主任 康健楠 右：爱佑慈善基金会助理秘书长 栾贻斌）。本项目由爱佑慈善基金会资助，双方共同搭建孤独症儿童脑电数据库平台。自2012年立项以来，“爱佑和康”已成立4家自建康复中心和2家冠名康复中心，并与15省残联建立了紧密的合作关系，在本次项目中，“爱佑和康”将集合行业影响力，链接各康复中心，协调更多孤独症儿童参与到脑发育评估当中。',
              url: './static/image/detail.jpg'
            }
          ]
        }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
  },
  components: {
    vScroll
  }
}
</script>
