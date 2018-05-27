# musicplayer

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

本人在闲暇之余根据

项目技术栈

框架：Vue.js （版本2.x）

状态管理：Vuex

前端路由：Vue Router

SASS(SCSS)：css预处理语言

服务端通讯：axios、jsonp

移动端滚动库：better-scroll

localStorage(HTML5):本地存储，保存用户喜欢的歌曲

构建工具：webpack

源码：es6

遇到的问题
1. vuex 使用的时机，需要根据项目大小和实际需求，解决了兄弟组件、多个组件之间状态的共享
2.第一次使用promise 
3.mock接口数据
4.transition-group/transition 使用
5.animate-stat-pause 在移动端不起作用，采用状态叠加解决啦（引用一下别人的demo: https://codepen.io/HaoyCn/pen/BZZrLd）
6.audio 在ios下不能自动播放，给document添加touchstart事件解决
7.获取某网站歌曲地址需要验证referer,使用axios可以修改请求头来解决，这一块不太明白原理
