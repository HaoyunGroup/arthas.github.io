<template>
  <div class="pay-config w mt25">
    <div class="title bb1 clearfix">
      <div class="goods-name ml25 fl">
        {{ payData.orderGoodsList[0].goodsName }}
      </div>
      <div class="goods-detail-text fl">
        订单详情
      </div>
      <div class="goods-preace fr mr20">
        ￥ {{ payData.orderTotalPrice }}
      </div>
    </div>
    <div class="goods-info bb1 clearfix">
      <div class="goods-image fl ml25">
        <!--<pic :_src="payData.orderGoodsList[0].goodsImage"></pic>-->
      </div>
      <div class="goods-detail-item fl fs12">
        <div class="mt5"><span style="font-weight: 700;">配送门店：</span>{{ payData.storeName }}</div>
        <div class="mt5"><span style="font-weight: 700;">下单时间：</span>{{ getCreateTime(payData.createTime) }}</div>

        <div class="mt5">
          <div class="fl" style="font-weight: 700;">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：</div>
          <div class="fl">
            <div v-for="(item,index) in payData.orderGoodsList">
              {{ item.goodsName }}&nbsp;&nbsp;&nbsp;{{ item.specInfo.split('&')[0] || item.specInfo }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay ml25 mb25">
      <h4 class="mt15">在线支付</h4>
      <div class="item">
        <RadioGroup v-model="pay" @on-change="paymentMode">
          <Radio label="zhifubao" class="ml25">
            <img style="" src="/static/images/zhifubao.png" alt="支付宝支付">
          </Radio>
          <Radio label="zaixianzhifu" class="ml25">
            <img src="/static/images/zaixianzhifu.jpg" alt="在线支付">
          </Radio>
          <Radio label="weixinzhifu" class="ml25">
            <img src="/static/images/weixinzhifu.png" alt="微信支付">
          </Radio>
        </RadioGroup>
        <div class="mt25 mr25" style="text-align: right;">
          <Button type="primary" @click="payNow" size="large" style="width: 100px;">立即支付</Button>
        </div>
      </div>
    </div>

    <Spin v-if="showSpin" fix>
      <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
  import Pic from 'common/components/Pic';
  import {setStore, getStore, removeStore} from '@/utils/storages.js';
  import * as orderApi from '@/api/orderApi.js';
  import moment from 'moment';


  // 未完成： 支付方式
  let _this = '';
  export default {
    name: "PayConfig",
    data: () => ({
      pay: 'zhifubao',
      payData: null,
      showSpin: true
    }),
    components: {
      Pic
    },
    created() {
      _this = this;
      this.getOrderDetail();
    },
    methods: {
      paymentMode(e) {
        console.log(e)
      },
      payNow() {
        this.$Modal.success({
          title: '',
          content: '支付成功！',
          onOk: () => {
            _this.$router.push({path: '/'});
          }
        })
      },
      getCreateTime(time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss")
      },
      getOrderDetail() {
        let orderid = this.$route.params.orderId;
        orderApi.orderdetail({
          orderid
        }).then(res => {
          _this.showSpin = false;
          if (res.result == 1 && res.data) {
            console.log(res.data);
            _this.payData = res.data[0]
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .pay-config {
    border: 1px solid #eee;
    .title {
      height: 60px;
      line-height: 60px;
      background-color: #f5f5f5;
      font-size: 24px;
      font-weight: 900;
      .goods-name {
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .goods-detail-text {
        color: #0085cd;
        margin-left: 40px;
      }

      .goods-preace {
        color: red;
      }
    }
    .goods-info {
      padding: 20px 0;
      .goods-image {
        width: 100px;
        height: 100px;
      }
      .goods-detail-item {
        margin-left: 50px;
      }
    }
    .pay {
      .item {
        img {
          max-height: 60px;
          vertical-align: top;
        }
      }
    }
  }

  .bb1 {
    border-bottom: 1px solid #eee;
  }
</style>
