<template>
  <div style="width: 980px;">
    <nav class="sort-bar">
      <div class="nch-sortbar-array">
        排序方式：
        <ul class="array">
          <li class="bb" v-for="(item,index) in sortData">
            <a href="javascript:void(0)" @click="sortClick(item,index)">{{item.txt}}<i
              :class="{'down': item.sortOrder == 'desc'}"></i></a>
          </li>
        </ul>
      </div>
    </nav>
    <Row>
      <div class="list" v-for="(item,index) in goodsListData" :key="index">
        <div class="box">
          <div class="goods-images">
            <router-link :to="'/goodsDetail/' + item.specId" target="_blank">
              <Pic class="images-wrap" :_lazy="item.goodsImage" _style="vertical-align: middle;"></Pic>
            </router-link>
          </div>
          <div class="goods-info">
            <div class="goods-pic-scroll-show">
              <ul></ul>
            </div>

            <div class="goods-name">
              <router-link :to="'/goodsDetail/' + item.specId" target="_blank">{{ item.goodsName }}<br>
                <span style="color:#f30;">{{ item.goodsSubtitle }}</span>
              </router-link>
            </div>
            <div class="goods-price">
              <!-- S 促销价格显示 -->
              <div class="sale-price" title="">¥ {{ item.goodsPrice }}</div>
              <!-- E 促销价格显示 -->
              <span class="raty" data-score="0"></span>
            </div>
            <div class="sell-stat">
              <ul>
                <li>
                  <router-link to="" class="status">{{ item.salenum || 0 }}</router-link>
                  <p>商品销量</p></li>
                <li>
                  <router-link to="">{{ item.commentnum || 0 }}</router-link>
                  <p>用户评论</p></li>
                <li>
                  <router-link to="">{{ item.goodsClick || 0 }}</router-link>
                  <p>点击量</p></li>
              </ul>
            </div>
            <div class="add-cart">
              <router-link :to="'/goodsDetail/' + item.specId" target="_blank">立即购买</router-link>
            </div>
          </div>
        </div>
      </div>
    </Row>
    <div style="margin-top: 20px; float: right;">
      <Page :total="totalRows || total" @on-change="pageChange" :page-size="20" show-elevator></Page>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import Pic from 'common/components/Pic';

  let _this = '';

  export default {
    name: "GoodsList",
    data: () => ({
      goodsListData: [],
      sortData: [
        {txt: '上架时间', sortField: 'createTime', sortOrder: 'asc'},
        {txt: '销量', sortField: 'salenum', sortOrder: 'asc'},
        {txt: '人气', sortField: 'goodsClick', sortOrder: 'asc'},
        {txt: '价格', sortField: 'goodsStorePrice', sortOrder: 'asc'}
      ],
      totalRows: 0,
      total: 20,
      stopLoading: true
    }),
    watch: {
      $route() {
        this.getSearchData(this.$route.params)
      }
    },
    components: {
      Pic
    },
    created() {
      _this = this;
      this.getSearchData(this.$route.params)
    },
    methods: {
      getSearchData(params, pageNo, pageSize = 20) {
        goodsApi.goodslist({
          ...params,
          pageNo,
          pageSize
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.goodsListData = res.data;
            _this.totalRows = res.totalRows;

            // 计算数据条数
            if (_this.stopLoading == true) {
              if(res.data.length < 20) {
                _this.stopLoading = false;
              } else {
                _this.total += 20;
              }
            }

          }
        })
      },
      sortClick(item, index) {
        let params = this.$route.params;
        params.sortField = item.sortField;
        params.sortOrder = item.sortOrder == 'asc' ? 'desc' : 'asc';
        this.getSearchData(params)
        this.sortData[index].sortOrder = params.sortOrder;
      },
      pageChange(n) {
        let params = this.$route.params;
        this.getSearchData(params, n);
        window.scrollTo(0, 240);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./goodsList.less";
</style>
