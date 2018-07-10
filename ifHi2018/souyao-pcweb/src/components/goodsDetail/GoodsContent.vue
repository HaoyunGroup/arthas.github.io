<template>
  <div class="w" style="margin-top: 20px;">
    <div class="sider fl">
      <class-sider></class-sider>
    </div>
    <div class="section_right fl">
      <Tabs @on-click="tabChange" type="card" :animated="false">
        <!-- 商品介绍 -->
        <TabPane class="goodsBody" label="商品详情">
          <div v-if="v == 0" class="tab-pane">
            <table cellspacing="0">
              <tbody>
              <tr v-for="(item,key) in goodsAttr">
                <th style="text-align: right"> {{key}}：</th>
                <td align="left">{{ item }} </td>
              </tr>
              </tbody>
            </table>
            <div class="mt10" v-for="item in goodsData.mobileBody">
              <div class="show-image"  v-if="item.type == 'text'">
                <p class="ml10" style="font-size: 14px;">{{ item.value }}</p>
              </div>
              <div class="show-image"  v-if="item.type == 'image'">
                <div v-if="item.value.substring(0,4)=='<img'" v-html="item.value">
                  {{ item.value }}
                </div>
                <pic v-else :_src="item.value"></pic>
              </div>
            </div>
          </div>
        </TabPane>
        <!-- 商品评价 -->
        <TabPane class="goods-evaluation" label="商品评价">
          <div v-if="v == 1" class="tab-pane">
            <evaluation :goodsData="goodsData"></evaluation>
          </div>
        </TabPane>
        <!-- 销售记录 -->
        <TabPane label="销售记录">
          <div v-if="v == 2" style="padding: 20px;" class="tab-pane">
            暂无销售记录
          </div>
        </TabPane>
        <!-- 商品咨询 -->
        <TabPane class="goods-consult" label="商品咨询">
          <div v-if="v == 3" class="tab-pane">
            <consult :goodsData="goodsData"></consult>
          </div>
        </TabPane>
        <!-- 包装售后 -->
        <TabPane label="包装售后">
          <div v-if="v == 4" style="padding: 20px;" class="tab-pane afterSale">
            {{ goodsData.afterSale }}
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import ClassSider from '@/components/goodsSearch/ClassSider';
  import Evaluation from '@/components/goodsDetail/Evaluation';
  import Consult from '@/components/goodsDetail/Consult';
  import Pic from 'common/components/Pic';

  export default {
    name: "GoodsContent",
    data: () => ({
      v: 0, // tab栏显示索引
      goodsAttr: [],
    }),
    props: ['goodsData'],
    components: {
      ClassSider, // 侧边分类
      Evaluation, // 商品评价
      Consult,  // 商品咨询
      Pic,
    },
    created() {
      if (this.goodsData.goodsAttr && this.goodsData.goodsAttr != '') {
        this.goodsAttr = this.goodsData.goodsAttr[0]
      }
    },
    methods: {
      // 按需加载tab栏内容
      tabChange(v) {
        this.v = v - 0;
      }
    }
  }
</script>
<style lang="less" scoped>
  .section_right {
    width: 990px;
    min-height: 200px;
    margin-left: 10px;
    .tab-pane {
      margin-top: -16px;
      border: 1px solid #dddee1;
      border-top: 0 none;
      min-height: 300px;
      font-size: 12px;
    }
    .goodsBody {
      &>div {
        padding: 20px;

      }
      table {
        margin-left: 10px;
        border: 1px solid #bbb;
        border-bottom: 0 none;
      }
      th {
        font-style: inherit;
        font-weight: normal;
        width: 90px;
        background-color: #F7F7F7;
        width: 100px;
        border-bottom: 1px solid #bbb;
        border-right: 1px solid #bbb;
      }
      td {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        padding: 4px;
        border-bottom: 1px solid #bbb;
        max-width: 500px;
      }
    }
  }

</style>
