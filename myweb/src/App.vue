<template>
  <div id="app" class="app">
    <header>
      <nav class="main-menu">
        <router-link :to="{path: 'index'}">首页</router-link>
        <router-link :to="{path:'pc'}">PC</router-link>
        <router-link :to="{path:'mobile'}">手机</router-link>
        <router-link :to="{path:'about'}">关于</router-link>
      </nav>
      <a class="menu-icon"></a>
    </header>
    <div class="wrap">
      <transition name="move">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
  @import './common/scss/variable';
  html,
  body {
    height: 100%;
    .app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
      background-color: $color-background;
      & > header {
          position: fixed;
          right: 0;
          top: 50%;
          width: 310px;
          height: 192px;
          transform: translate3d(0, -50%, 0);
          color: $color-text;
          .main-menu {
            height: 100%;
            margin-right: 70px;
            & > a {
                display: block;
                text-align: right;
                line-height: 48px;
                color: $color-text;
                opacity: .8;
                font-weight: normal;
                &:hover, &.router-link-active {
                   opacity: 1;
                   text-shadow: 1px 1px 4px $color-text, -1px -1px $color-text;
                   font-weight: 200;
                 }
              }
          }
          .menu-icon {
            position: absolute;
            right: 0;
            top: 50%;
            width: 50px;
            height: 1px;
            transform: translate3d(0, -50%, 0);
            background-color: $color-text;
            opacity: .8;
            cursor: pointer;
            &:hover {
               opacity: 1;
             }
          }
        }
      .wrap {
        margin: auto;
        width: 800px;
        height: 500px;
        background-color: $color-text-transparent;
        overflow: hidden;
          & > div {
              height: 100%;
            }
        .move-enter-active, .move-leave-active {
          transition: 600ms;
          transform: translate3d(0, 0, 0);
        }
        .move-enter, .move-leave-to {
          transform: translate3d(0, 100%, 0);
        }
        }
      }
  }
</style>
<script>
export default {
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>
