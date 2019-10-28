<!-- test3 -->
<template>
  <div class="test3">
      {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Test3 extends Vue {
  private name: string = 'Test3'
  private msg: string = 'test3'
}
</script>
<style lang='sass' type="text/sass" rel="stylesheet/sass">
</style>
