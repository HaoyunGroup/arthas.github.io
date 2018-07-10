<!-- 公共头部 -->
<template>
  <div>
    <tools-bar></tools-bar>

    <div class="header">
      <div class="logo fl">
        <router-link to="/">
          <img src="/static/logo.png"/>
        </router-link>
      </div>

      <div class="erweim fr">
        <img src="http://shop.souyaoxf.com/upload/logo/1506411336146.png" style="width: 120px;height: 120px">
      </div>

      <div class="hd_Shopping_list fr">
        <Button @click="gotoCart">
          <Badge count="0">
            <icon style="vertical-align: middle;" size="20" type="ios-cart-outline"></icon>
          </Badge>
          &nbsp;购物车&nbsp;
          <Icon style="vertical-align: middle;" size="12" type="ios-arrow-right"></Icon>
        </Button>
      </div>

      <div class="lanren-search-form fr">
        <div class="search-hd">
          <Input @on-enter="searchResult" class="search" v-model="searchVal" placeholder="请输入搜索商品">
          <!--<Select v-model="selVal" slot="prepend" style="width: 80px">-->
          <!--<Option value="day">Day</Option>-->
          <!--<Option value="month">Month</Option>-->
          <!--</Select>-->
          <Button @click="searchResult" class="button" slot="append" icon="search">搜索</Button>
          </Input>
        </div>
        <div class="fs12 mt5">
          <ul style="display: flex;">
            <li>热门搜索：</li>
            <li class="mr10 cp" style="color: #999;">白加黑</li>
            <li class="mr10 cp" style="color: #999;">保健食品</li>
          </ul>
        </div>
      </div>


    </div>
    <header-nav></header-nav>
  </div>
</template>
<script>
  import ToolsBar from '@/components/container/ToolsBar';
  import HeaderNav from '@/components/container/HeaderNav';

  export default {
    name: "HeaderView",
    data: () => ({
      searchVal: '',
      selVal: ''
    }),
    components: {
      HeaderNav,
      ToolsBar
    },
    methods: {
      searchResult() {
        console.log(this.searchVal)
        if (this.searchVal == '') {
          return;
        }
        this.$router.push({path: `/goodsSearch/${'keywordSearch'}/${this.searchVal}`})
      },
      gotoCart() {
        this.$router.push({path: `/cart`})
      }
    }
  }
</script>
<style lang="less" scoped>
  .header {
    font-family: 新宋体;
    height: 120px;
    width: 1200px;
    margin: 20px auto;
    position: relative;
    .logo {
      width: 230px;
      height: 80px;
      margin-top: 20px;
      overflow: hidden;
      img {
        max-height: 80px;
        width: auto;
        display: block;
      }
    }

    .lanren-search-form {
      width: 575px;
      margin-left: 70px;
      margin-top: 11px;
      .search-hd {
        margin-top: 30px;
        padding: 3px;
        .ivu-input-group-append {
          background-color: #0084CC !important;
          border-color: #0084CC !important;
        }
      }
    }

    .hd_Shopping_list {
      margin: 45px 40px 0 40px;
    }
  }
</style>
