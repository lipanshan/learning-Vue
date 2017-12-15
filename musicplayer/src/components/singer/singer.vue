<template>
    <div class="singer">
      <ul class="singer-list">
        <li v-for="sing in singList" class="sing">
          {{sing.title}}
        </li>
      </ul>
    </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
  .singer
    position: fixed
    left: 0
    top: 88px
    bottom: 0
    right: 0
</style>
<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  const ERROR_OK = 0
  const HOT_NAME = '热门'
  const HOT_NUM = 10

  export default {
    data () {
      return {
        singList: null
      }
    },
    mounted () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERROR_OK) {
            this.singList = this._initSingData(res.data.list)
          }
        })
      },
      _initSingData (list) {
        let result = []
        let hotGroup = {
          title: HOT_NAME,
          item: []
        }
        let serialGroup = {}
        list.forEach((value, index) => {
          if (value.Fsort < HOT_NUM) {
            hotGroup.item.push({
              title: value.Findex,
              id: value.Fsinger_id,
              name: value.Fsinger_name,
              avatar: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${value.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          if (!serialGroup[value.Findex]) {
            serialGroup[value.Findex] = {
              title: value.Findex,
              item: []
            }
          } else {
            serialGroup[value.Findex].item.push({
              title: value.Findex,
              id: value.Fsinger_id,
              name: value.Fsinger_name,
              avatar: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${value.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
        })
        for (var key in serialGroup) {
          if (/[a-zA-Z]/g.test(key)) {
            result.push(serialGroup[key])
          }
        }
        result.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        result.unshift(hotGroup)
        return result
      }
    }
  }
</script>
