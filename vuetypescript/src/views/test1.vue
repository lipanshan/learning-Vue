<!-- test1 -->
<template>
  <div class="test1">{{msg}}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Test1 extends Vue {
private name: string = 'Test1'
private msg: string = 'test1'

beforeRouteEnter (to: any, from: any, next: any): void {
  console.log('beforerouterenter', to.path, from.path)
  next()
}
beforeRouteLeave (to: any, from: any, next: any): void {
  console.log('beforeRouterLeave', to.path, from.path)
  next()
}
beforeRouteUpdate (to: any, from: any, next: any): void {
  console.log('beforerouteupdate', to.path, from.path)
  next()
}
}
</script>
<style lang='sass'>
.test1
    border: 1px solid #000;
</style>
