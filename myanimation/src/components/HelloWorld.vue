<template>
  <div class="hello">
    <div class="wrap">
      <button @click="shuffle">shuffle</button>
      <button @click="add">add</button>
      <button @click="remove">remove</button>
    </div>
    <transition-group name="flip-list" mode="out-in" tag="ul">
      <li v-for="item in list" :key="item">{{item}}</li>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    shuffle () {
      this.list = _.shuffle(this.list)
    },
    add () {
      this.list.splice(Math.floor(Math.random() * this.list.length), 0, Math.floor(Math.random() * 40) + 20)
    },
    remove () {
      this.list.splice(Math.floor(Math.random() * this.list.length), 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: block;
    margin: 0 10px;
    font-size: 20px;
    line-height: 30px;
    border: 1px solid blue;
  }
  a {
    color: #42b983;
  }
  .flip-list-move {
    transition: transform 1s;
  }
  .flip-list-enter,.flip-list-leave-to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .flip-list-enter-active, .flip-list-leave-active {
    transition: all 1s;
  }
  .flip-list-leave-active  {
    position: absolute;
    width: 100%;
  }
</style>
