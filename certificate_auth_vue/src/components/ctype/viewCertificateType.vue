<template>
  <div class="view">
   <img :src="imgurl" class="imgview" />
  </div>
</template>

<script type="text/ecmascript-6">
import topHeader from '@/components/content-header'
import { Preview   } from '@/api/certificateaxios'
export default {
  data () {
    return {
      nowdate:"",
      titleTxt:"预览证书",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      imgurl:""
    }
  },
  created () {
    this.view(this.$route.query.id)
  },
  filters:{
  },
  components: {
    topHeader
  },
  methods: {
    view(uid){
      Preview(uid).then((res) => {
        if (res.ret === 200) {
          this.imgurl = res.data.original_graph_path
        } else {
          console.log(res.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
.view
  padding: 20px
.imgview
  width: 100%
  height: auto
</style>
