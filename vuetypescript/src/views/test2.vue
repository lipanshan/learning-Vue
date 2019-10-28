<!-- test2 -->
<template>
  <div class="test2">{{msg}}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Test2 extends Vue {
    private name: string = 'Test2'
    private msg: string = 'test2'
}
</script>

<style lang='sass' type="text/sass" rel="stylesheet/sass">
</style>
