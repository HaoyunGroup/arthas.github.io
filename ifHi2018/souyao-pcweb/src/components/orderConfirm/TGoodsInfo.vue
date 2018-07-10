<template>
  <div>
    <div v-if="subToOrderData.length != 0" class="clearfix fs12" style="margin: 10px 30px;">
      <div class="t-goods-info fl" style="width: 800px;">
        <div class="fl">
          <router-link :to="'/goodsDetail/' + subToOrderData.specId">
            <pic :_src="subToOrderData.goodsImages" _style="max-width: 60px; max-height: 60px;"></pic>
          </router-link>
        </div>
        <div class="fl mt10 ml20">
          <div class="t-goods-name" style="text-align: left;">
            <router-link :to="'/goodsDetail/' + subToOrderData.specId">
              {{subToOrderData.goodsName}}
            </router-link>
          </div>
          <div class="t-specInfo" style="text-align: left;">{{ subToOrderData.specInfo.split('&')[0] || subToOrderData.specInfo}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Pic from 'common/components/Pic';

  export default {
    name: "TGoodsInfo",
    data: () => ({}),
    props: ['subToOrderData'],
    components: {
      Pic
    },
  }
</script>
<style lang="less" scoped>

</style>
