<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="nav-tab border-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="rattings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from './components/header/header';
  import {getUrl} from './common/js/geturl';
  const Error_NB = 0;
  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: (() => {
            return getUrl();
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id + '').then((response) => {
        if (response.body.errno === Error_NB) {
          this.seller = Object.assign({}, response.body.data, this.seller);
        }
      });
    },
    components: {
      vHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family:Helvetica;

    .nav-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 13px;
      padding-bottom: 13px;
      background-color: rgb(255, 255, 255);

      .tab-item {
        flex: 1;
        color: rgb(77, 85, 93);
        font-size: 14px;
        line-height: 14px;
        text-align: center;

        &:focus {
          outline: none;
        }
        .router-link-active {
          color: #f01b17;
        }
      }
    }
  }
</style>
