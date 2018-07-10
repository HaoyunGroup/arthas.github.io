<template>
  <div>
    <goods-class-menu></goods-class-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  import BreadCrumbs from '@/components/container/BreadCrumbs';
  import GoodsClassMenu from '@/components/goodsClass/GoodsClassMenu';

  export default {
    name: "GoodsClass",
    data: () => ({}),
    components: {
      BreadCrumbs,
      GoodsClassMenu
    }
  }
</script>
<style lang="less" scoped>
</style>
