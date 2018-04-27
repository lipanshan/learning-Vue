<template>
  <div class="svg">
    <svg :width="size" :height="size">
      <circle :cx="size / 2" :cy="size / 2" :r="size / 2 - 2" :stroke="color1" :stroke-width="2" fill="none"/>
      <circle :cx="size / 2" :cy="size / 2" :r="size / 2 - 2" :stroke="color2" :stroke-width="2" fill="none" :stroke-dasharray="progressNum"/>
    </svg>
  </div>
</template>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .svg {
    text-align: center;
    -webkit-transform: rotateZ(180deg);
    -moz-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }
</style>
<script type="text/ecmascript-6">
export default {
  props: {
    size: {
      type: Number,
      default: 120
    },
    color1: {
      type: String,
      defautl: '#000000'
    },
    color2: {
      type: String,
      defautl: 'blue'
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressNum () {
      let percent = this.progress / 100;
      let perimeter = Math.PI * this.size;
      return `${perimeter * percent} ${perimeter * (1 - percent)}`;
    }
  },
  data () {
    return {};
  }
};
</script>
