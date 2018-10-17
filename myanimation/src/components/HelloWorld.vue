<template>
  <div class="hello">
    <div class="wrap">
      <button @click="shuffle">shuffle-action</button>
      <button @click="add">add-action</button>
      <button @click="remove">remove-action</button>
      <button @click="shuffleC">shuffle-commit</button>
      <button @click="addC">add-commit</button>
      <button @click="removeC">remove-commit</button>
    </div>
    <transition-group name="flip-list" mode="out-in" tag="ul">
      <li v-for="item in list" :key="item">{{item}}</li>
    </transition-group>
    <h2>计数器（vuex）commit</h2>
    <div class="count-wrap">
      <button @click="reduceCountBtn" class="left">
        减
      </button>
      <span>{{count}}</span>
      <button @click="addCountBtn" class="right">加</button>
    </div>
    <h2>计数器（vuex）action</h2>
    <div class="count-wrap">
      <button @click="reduceCountBtn2" class="left">
        减
      </button>
      <span>{{count}}</span>
      <button @click="addCountBtn2" class="right">加</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'list',
      'count'
    ])
  },
  methods: {
    shuffle () {
      let list = JSON.parse(JSON.stringify(this.list))
      if (!this.list.length) return false
      list.sort((a, b) => {
        return Math.random() - 0.5
      })
      this.shuffleList({list: list})
    },
    add () {
      let list = JSON.parse(JSON.stringify(this.list))
      let max = 0
      list.forEach((item) => {
        if (item > max) {
          max = item
        }
      })
      list.unshift(max + 1)
      this.addItem({list: list})
    },
    remove () {
      let MaxNum = 0
      this.list.forEach((item) => {
        if (MaxNum <= item) {
          MaxNum = item
        }
      })
      this.removeItem({index: Math.floor(Math.random() * MaxNum)})
    },
    shuffleC () {
      let list = JSON.parse(JSON.stringify(this.list))
      list.sort((a, b) => Math.random() - 0.5)
      this.setTodoList(list)
    },
    addC () {
      let list = JSON.parse(JSON.stringify(this.list))
      let max = 0
      list.forEach((item) => {
        if (item > max) {
          max = item
        }
      })
      list.unshift(max + 1)
      this.setTodoList(list)
    },
    removeC () {
      let list = JSON.parse(JSON.stringify(this.list))
      list.splice(Math.floor(Math.random() * list.length), 1)
      this.setTodoList(list)
    },
    reduceCountBtn () {
      let num = this.count - 1
      this.reduceCount(num)
    },
    addCountBtn () {
      let num = this.count + 1
      this.addCount(num)
    },
    reduceCountBtn2 () {
      let num = this.count - 1
      this.reduceCountA({count: num})
    },
    addCountBtn2 () {
      let num = this.count + 1
      this.addCountA({count: num})
    },
    ...mapMutations({
      setTodoList: 'SET_LIST',
      addCount: 'ADD_COUNT',
      reduceCount: 'REDUCE_COUNT'
    }),
    ...mapActions([
      'removeItem',
      'addItem',
      'shuffleList',
      'addCountA',
      'reduceCountA'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  h1, h2 {
    font-weight: normal;
  }

  ul {
    position: relative;
    list-style-type: none;
    padding: 0;
    margin: 10px auto 0;
    width: 500px;
    min-height: 400px;
  }
  button, input {
    margin: 5px 10px;
    font-size: 14px;
    line-height: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  li {
    display: block;
    margin: 5px 10px;
    font-size: 20px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
