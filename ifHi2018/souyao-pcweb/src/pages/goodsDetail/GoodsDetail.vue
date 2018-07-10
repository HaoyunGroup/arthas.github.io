<template>
  <div>
    <div v-if="flag">
      <goods-info :goodsData="goodsData"></goods-info>
      <goods-content :goodsData="goodsData"></goods-content>
    </div>
    <Spin v-if="showSpin" fix>
      <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
  import GoodsInfo from '@/components/goodsDetail/GoodsInfo';
  import GoodsContent from '@/components/goodsDetail/GoodsContent';
  import * as goodsApi from '@/api/goodsApi.js';

  // 未完成：
  // 领券
  // 放大镜
  // 走马灯

  let _this = '';
  export default {
    name: "GoodsDetail",
    data: () => ({
      goodsData: [],
      flag: false,
      showSpin: true
    }),
    components: {
      GoodsInfo,
      GoodsContent
    },
    created() {
      _this = this;
      window.scrollTo(0, 0);

      goodsApi.goodsDetail({
        'specId': _this.$route.params.specId
      }).then(res => {
        this.showSpin = false;
        if (res.result == 1 && res.data) {
          _this.goodsData = res.data[0];
          _this.flag = true;
          document.title = res.data[0].goodsName;
        }
      });
    }
  }

</script>
<style lang="less" scoped>

</style>
