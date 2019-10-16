<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ElementUi />
  </div>
</template>

<script>
// @ is an alias to /src
import ElementUi from '@/views/ElementUi.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  created () {
  },
  components: {
    ElementUi
  }
}
</script>
