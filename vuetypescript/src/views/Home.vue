<template>
  <div class="home">
    <h1>{{value}}</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld
      v-model="value"
      :message="message"
      :message2="message2"
      :messageObj="messageobj"
      :messageArr="messagearr"
      ref="helloWorldWrap"
    />
    <!-- <input type="text" v-focus> -->
  </div>
</template>

<script lang="ts">
import { Component, Ref, Provide, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'
import HelloWorld from '../components/HelloWorld.vue'
// @ is an alias to /src
@Component({
  components: {
    HelloWorld
  },
  directives: {
    focus: {
      inserted(el: { focus: () => void }): void {
        el.focus()
      }
    }
  }
})
export default class Home extends Vue {
  private name: string = 'home'
  private message: string = 'Prop 字符串'
  private message2: number | string = 'Prop 数字'
  private messageobj: {} = { a: 'Prop 对象' }
  private messagearr: (number | string)[] = [1, 'Prop 数组']
  private value: string = '123333'

  @State('a') stateA: any
  @State('b') stateB: any
  @State(state => state.d.e) stateC: any
  @State('d') stateD: any
  @Getter('a') getterA: any
  @Getter('b') getterB: any
  @Getter('de') getterDE: any
  @Getter('d') getterD: any
  @Mutation('addM') mustationAddM: any
  @Action('addA') actionAddA: any
  @Action('addAA') actionAddAA: any

  @Ref('helloWorldWrap') readonly helloWorldWrap!: HelloWorld
  mounted(): void {
    // console.log(this.helloWorldWrap.$el)
    console.log(this.stateA, this.stateB, this.stateC, this.stateD)
    console.log(this.getterA, this.getterB, this.getterDE, this.getterD)

    this.mustationAddM('1111111111111111111')
    this.actionAddA('3333333333333333')
    this.actionAddAA('ssssssss')
    console.log(this.stateA, this.stateB, this.stateC, this.stateD)
    console.log(this.getterA, this.getterB, this.getterDE, this.getterD)
    setTimeout((): void => {
      console.log(this.stateA, this.stateB, this.stateC, this.stateD)
      console.log(this.getterA, this.getterB, this.getterDE, this.getterD)
    }, 2000)
  }
  @Provide('provide11') provide11: string = 'myProvide'
  @Provide('provide22') provide22: object = { default: 'abc' }
}
</script>
