import {mapGetters} from 'vuex'
export const mixinPlayer = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlayingList(this.playList)
  },
  actived () {
    this.handlePlayingList(this.playList)
  },
  watch: {
    playList (n, o) {
      this.handlePlayingList(n)
    }
  },
  methods: {
    handlePlayingList () {
      throw new Error('必须 有一个handlePlayingList函数')
    }
  }
}
