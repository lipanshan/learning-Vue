<template>
    <div class="recommend">
      <scroll ref="scrollwrap"  :data="hotRecommendList" class="recommend-content">
          <div v-if="sliderList.length" class="slider-wrapper">
            <slider>
              <div v-for="item in sliderList">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="图片">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <div class="loading-wrap" v-show="!hotRecommendList.length">
              <loading></loading>
            </div>
            <ul class="hot-song-list">
              <li v-for="item in hotRecommendList" class="item">
                <div class="img-wrap">
                  <img v-lazy="item.imgurl" @load="imgLoaded" alt="图片">
                </div>
                <div class="img-desc">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname
"></p>
                </div>
              </li>
            </ul>
          </div>
      </scroll>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  @import "../../common/sass/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      position: absolute
      width: 100%
      top: 0
      bottom: 0
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .loading-wrap
        .hot-song-list
          .item
            display: flex
            box-sizing: border-box
            align-items: center
            padding: 0 20px 20px 20px
            .img-wrap
              flex: 0 0 60px
              width: 60px
              padding-right: 20px
              &>img
                display: block
                width: 60px
                height: 60px
            .img-desc
              display: flex
              flex-direction: column
              justify-content: center
              flex: 1
              line-height: 20px
              overflow: hidden
              font-size: $font-size-medium
              .name
                margin-bottom: 10px
                color: $color-text
              .desc
                color: $color-text-d
          .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
<script type="text/ecmascript-6">
  import {recommend, hotRecommend, testApi} from 'api/recommend'
  import slider from 'base/slider'
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import {mixinPlayer} from 'common/js/mixin'
  const ERROR_OK = 0

  export default {
    mixins: [mixinPlayer],
    data () {
      return {
        sliderList: [],
        hotRecommendList: [],
        imgHeightFlag: true
      }
    },
    mounted () {
      this._getRecommondData()
      this._getHotRecommend()
      this._testApi()
    },
    methods: {
      _testApi () {
        testApi()
      },
      handlePlayingList (playList) {
        if (this.$refs.scrollwrap) {
          let bottom = playList.length ? '60px' : ''
          this.$refs.scrollwrap.$el.style.bottom = bottom
          this.$refs.scrollwrap.refresh()
        }
      },
      _getRecommondData () {
        recommend().then((res) => {
          if (res.code === ERROR_OK) {
            this.sliderList = res.data.slider
          }
        })
      },
      _getHotRecommend () {
        hotRecommend().then((res) => {
          if (res.code === ERROR_OK) {
            this.hotRecommendList = res.data.list
          }
        })
      },
      imgLoaded () {
        if (!this.imgHeightFlag) {
          return false
        }
        this.$refs.scrollwrap.refresh()
      }
    },
    components: {
      slider,
      scroll,
      loading
    }
  }
</script>
