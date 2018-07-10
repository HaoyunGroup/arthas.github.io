<template>
  <div class="w">
    <bread-crumbs></bread-crumbs>
    <div class="sider">
      <class-sider></class-sider>
    </div>
    <div class="goods-search-list">
      <goods-list></goods-list>
    </div>
  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import BreadCrumbs from '@/components/container/BreadCrumbs';
  import GoodsList from '@/components/goodsSearch/GoodsList';
  import ClassSider from '@/components/goodsSearch/ClassSider';

  export default {
    name: "GoodsSearch",
    data: () => ({
      goodsListData: []
    }),
    components: {
      BreadCrumbs,
      ClassSider,
      GoodsList
    }
  }
</script>
<style lang="less" scoped>


  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .sider {
    float: left;
  }

  .goods-search-list {
    float: right;
  }

</style>
