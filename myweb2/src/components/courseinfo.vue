<template>
  <div class="course-info-wrap">
    <v-scroll :list="info">

    </v-scroll>
  </div>
</template>
<style lang="sass" type="text/css" rel="stylesheet/sass">

</style>
<script type="text/ecmascript-6">
import vScroll from '@/components/courseinfo'
export default {
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

        }
      }
    }
  },
  data () {
    return {}
  },
  components: {
    vScroll
  }
}
</script>
