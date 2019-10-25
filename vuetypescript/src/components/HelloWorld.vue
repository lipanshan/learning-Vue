<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h1>{{ message2 }}</h1>
    <h1>{{ messageObj }}</h1>
    <h1>{{ messageArr }}</h1>
    <h2 v-show="msgListLen">{{msgListLen}}</h2>
    <h3>watch:{{watchData}}</h3>
    <h3>watch2:{{watchData2}}</h3>
    <h3>watch3:{{watchData3}}</h3>
    <h4>{{provide11}}----{{provide22}}</h4>
    <input
      type="text"
      v-model="val"
      v-focus
      @input="onChange"
      @keyup.enter="addMessage"
      placeholder="placeHolder"
    />
    <ul class="messge-list">
      <li v-for="item in msgList" :key="item.id" class="message-item">
        {{item.txt}}
        <span class="delete-icon" @click="deleteItem(item)">X</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Model,
  Emit,
  Watch,
  Inject,
  Vue
} from 'vue-property-decorator'
type itemData = { id: number; txt: string }

@Component({
  directives: {
    focus: {
      inserted(el: any, data: {}, vnode: {}): void {
        el.focus()
        console.log(data, vnode)
      }
    }
  }
})
export default class HelloWorld extends Vue {
  private val: string = ''
  private placeHolder: string = '请输入'
  private msgList: itemData[] = []
  private watchData: string = ''
  private watchData2: string = ''
  private watchData3: string = ''
  @Inject('provide11') readonly provide11!: string
  @Inject({ from: 'provide22', default: 'b2222' }) readonly provide22!: object
  @Prop(String) readonly message?: string
  @Prop([Number, String]) readonly message2: number | string | undefined
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly messageObj: object | undefined
  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly messageArr: (number | string)[] | undefined

  @Model('input', { type: String }) value: string | undefined

  get msgListLen(): number {
    return this.msgList.length
  }

  addMessage(): void {
    let id: number = new Date().getTime()
    if (this.val) {
      this.msgList.push({
        id,
        txt: this.val
      })
      this.val = ''
    }
  }
  deleteItem(data: itemData): void {
    for (let i = 0; i < this.msgList.length; i++) {
      if (data.id === this.msgList[i].id) {
        this.msgList.splice(i, 1)
        break
      }
    }
  }
  @Emit('input')
  onChange(e: any): string {
    return e.target.value
  }
  @Watch('val')
  onValChange(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.watchData = val
    }
  }
  @Watch('val', { immediate: true, deep: true })
  onValChange2(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.watchData2 = `${val};`
      this.watchData3 = `${oldVal};`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
