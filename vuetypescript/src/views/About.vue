<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul class="list">
      <li class="item">
        <router-link :to="{path: '/about/test-router1'}">test1</router-link>
      </li>
      <li class="item">
        <router-link :to="{path: '/about/test-router2'}">test2</router-link>
      </li>
      <li class="item">
        <router-link :to="{path: '/about/test-router3'}">test3</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <el-button @click="changRouterHandle">手动切换路由{{routerName}}</el-button>
  </div>
</template>
<script lang="ts">
import axios from '@/fetch/axios'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class About extends Vue {
  private name: string = 'About'
  private componentName?: string = 'test-router1'
  private routerName?: string = ''
  private index: number = 1

  created(): void {
    let numArr: string[] = this.$route.path.split('/about/test-router')
    this.index =
      numArr.length > 1 ? (+numArr[1] === 3 ? 1 : +numArr[1]) : this.index
    this.getData()
  }

  getData(): any {
    const time: number = new Date().getTime()
    const param: any = Object.assign(
      {
        service: 'App.CerSearch.SearchCerInfo',
        tips: time
      },
      {
        Keyword: 'dsfasdfsdf',
        page: 1,
        perpage: 20
      }
    )
    return axios.post('/', param).then((res: any): any => {
      return Promise.resolve(res.data)
    })
  }

  changRouterHandle(e: any): void {
    this.index = this.index + 1
    this.$router.push({ path: `/about/test-router${this.index}` })
    if (this.index === 3) {
      this.index = 0
    }
  }
}
</script>
<style lang="scss">
</style>
