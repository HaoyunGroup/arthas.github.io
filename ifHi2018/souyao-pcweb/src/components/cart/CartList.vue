<template>
  <div>
    <div v-if="goodsData.length != 0" class="clearfix fs12" style="margin: 30px 30px;">
      <div class="t-goods-info fl" style="width: 800px;">
        <div class="fl">
          <router-link :to="'/goodsDetail/' + goodsData.specId">
            <pic :_src="goodsData.goodsImages" _style="max-width: 60px; max-height: 60px;"></pic>
          </router-link>
        </div>
        <div class="fl mt10 ml20">
          <div class="t-goods-name" style="text-align: left;">
            <router-link :to="'/goodsDetail/' + goodsData.specId">
              {{goodsData.goodsName}}
            </router-link>
          </div>
          <div class="t-specInfo" style="text-align: left;">{{ goodsData.specInfo.split('&')[0] || goodsData.specInfo}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Pic from 'common/components/Pic';

  export default {
    name: "Cart",
    data: () => ({}),
    props: ['goodsData'],
    components: {
      Pic
    },
    created() {
//      console.log('111111111',this.goodsData);
    }
  }
</script>
<style lang="less" scoped>

</style>
