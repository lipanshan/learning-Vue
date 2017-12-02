<template>
    <div class="ratting-select">
      <ul class="tag-wrap border-1px">
        <li class="tag">
          <span class="tag-txt">全部</span>
          <span class="tag-num">57</span>
        </li>
        <li class="tag">
          <span class="tag-txt">推荐</span>
          <span class="tag-num">57</span>
        </li>
        <li class="tag">
          <span class="tag-txt">吐槽</span>
          <span class="tag-num">57</span>
        </li>
      </ul>

    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .ratting-select {
    margin-top: 6px;

    .tag-wrap {
      padding-top: 12px;
      padding-bottom: 18px;

      .tag {
        padding: 8px 12px;
        margin-right: 8px;

        .tag-txt {
          font-size: 12px;
          line-height: 32px;
          color: rgb(255, 255, 255);
        }
        .tag-num {
          font-size: 8px;
          line-height: 32px;
          color: rgb(255, 255, 255);
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
    };
  },
  components: {}
};
</script>
