<template>
  <div class="w">
    <div class="header clearfix">
      <!--<div class="logo fl">-->
      <!--<router-link to="/">-->
      <!--<img src="/static/logo.png"/>-->
      <!--</router-link>-->
      <!--</div>-->
      <div class="steps fr mt25">
        <Steps :current="1" class="mt20">
          <Step title="已完成" content="确认购物清单"></Step>
          <Step title="进行中" content="填写核对购物信息"></Step>
          <Step title="待进行" content="购买完成"></Step>
        </Steps>
      </div>
    </div>
    <div class="content mt20">
      <!-- 收货人地址 -->
      <div class="address bb1 p10">
        <h4 class="title">收货地址</h4>
        <order-address :subToOrderData="subToOrderData" :subToOrder="subToOrder"></order-address>
      </div>
      <!-- 发票信息 -->
      <div class="invoice-info bb1 p10">
        <h4>发票信息</h4>
        <div class="ml20 fs12 mt10">
          <span>{{ invoiceShow }}</span>
          <span class="cp ml20 btn" style="">修改</span>
        </div>
      </div>

      <express-msg :subToOrderData="subToOrderData"></express-msg>
      <!-- 确认购物清单 -->
      <div class="payment bb1 p10">
        <h4>确认购物清单</h4>
        <div
          style="text-align: right;
          background-color: #f8f8f9;
          border: 1px solid #dddee1;
          border-bottom: none;
          height: 40px;
          line-height: 40px;">
          <span>优惠信息：</span>
          <span>无</span>
          &nbsp;&nbsp;&nbsp;
        </div>
        <div class="goods-info">
          <Table :columns="columns" :data="data"></Table>
        </div>
      </div>
      <!-- 其他信息 -->
      <div class="ml10 mt20 clearfix">
        <div class="fl">
          <span class="fs14">给卖家留言：</span>
          <Input v-model="orderMessage" placeholder="给卖家留言..." style="width: 300px"></Input>
        </div>
        <div class="fr">
          {{priceData.totalFreight - 0 == 0 ? '免运费' : '运费：￥ ' + priceData.totalFreight}}
        </div>
      </div>

      <!-- 优惠 -->
      <div class="fs14 mt20">
        <order-coupon :couponData="couponData" :refreshPrice="getCouponId" :couponChange="getCoupon"></order-coupon>
      </div>

      <!-- 选择余额支付 -->
      <div class="fs14 mt20">
        <Collapse value="pd">
          <Panel name="pd">
            余额支付
            <div class="pl25" slot="content">
              <span class="fs12">使用余额支付：</span>
              <i-switch class="ml15" v-model="isPdSwitch" @on-change="isPdChange">
                <Icon type="android-done" slot="open"></Icon>
                <Icon type="android-close" slot="close"></Icon>
              </i-switch>
              <span class="fs12">(当余额：{{memberData.availablePredeposit}})</span>

              <div class="pay-psd mt20 fs12" v-if="isPdSwitch">
                <span>支付密码：</span>
                <Input type="password" v-model="payPsd" @on-blur="chkPasswdReg" size="small" :clearable="true"
                       style="width: 100px;"></Input>
                <span class="cp ml20" style="text-decoration: underline; color: blue;">忘记支付密码？</span>
              </div>
            </div>
          </Panel>
        </Collapse>

      </div>

      <!-- 金额信息 -->
      <div v-if="priceData" style="text-align: right;" class="price-info mt20 fs14">
        <span>商品总金额：<span class="price">￥{{priceData.totalGoodsPrice}}</span></span><br>
        <span>运费：<span class="price">￥{{priceData.totalFreight}}</span></span><br>
        <span>优惠券金额：<span class="price">￥{{priceData.couponPrice}}</span></span><br>
        <span>促销金额：<span class="price">￥{{priceData.conditionPrice}}</span></span><br>
        <span class="fs18" style="color: #fe8415;">应付金额：
          <span style="font-size: 26px; color: red;">￥{{priceData.totalPrice}}</span>
        </span><br>
      </div>

      <div class="submit mt20" style="text-align: right;">
        <Button @click="backCart">返回购物车</Button>
        <Button type="primary" @click="gotoPay">提交订单</Button>
      </div>
    </div>
    <Spin v-if="showSpin" fix>
      <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
  import * as cartApi from '@/api/cartApi.js';
  import * as orderApi from '@/api/orderApi.js';
  import Pic from 'common/components/Pic';
  import TGoodsInfo from '@/components/orderConfirm/TGoodsInfo';
  import ExpressMsg from '@/components/orderConfirm/ExpressMsg';
  import OrderAddress from '@/components/orderConfirm/OrderAddress';
  import OrderCoupon from '@/components/orderConfirm/OrderCoupon';
  import {setStore, getStore, removeStore} from '@/utils/storages.js';

  let _this = '';

  // 未完成：

  // 发票信息
  // 收货地址 新建 删除 编辑

  export default {
    name: "OrderComfirm",
    data: () => {
      return {
        showSpin: true,
        subToOrderData: [],
        priceData: [],
        shipData: [],
        invoiceShow: '不开发票',
        couponData: [],
        columns: [
          {
            title: '商品',
            key: 'goodsInfo',
            width: 800,
            align: 'center',
            render: (h, params) => {
              return h(TGoodsInfo, {
                props: {
                  subToOrderData: params.row
                }
              })
            }
          },
          {
            title: '单价（元）',
            key: 'goodsPrice'
          },
          {
            title: '数量',
            key: 'goodsNum'
          },
          {
            title: '小计（元）',
            key: 'goodsPrice',
            render: (h, params) => {
              return h('div', {
                style: {
                  color: '#fe8415',
                  fontSize: '18px'
                }
              }, (params.row.goodsPrice * params.row.goodsNum).toString().substring(0, 4))
            }
          }
        ],
        data: [],
        cityId: [],
        isPdSwitch: false,
        isPd: 0,
        payPsd: '',
        memberData: '',
        freight: '',
        couponId: '',
        orderMessage: ''
      }
    },
    created() {
      _this = this;
      this.subToOrder();
      this.memberData = JSON.parse(getStore('memberData'));
    },
    components: {
      Pic,
      OrderAddress,
      OrderCoupon,
      ExpressMsg
    },
    methods: {
      // 获取订单信息
      subToOrder() {
        let cartId = this.$route.params.cartIds;
        cartApi.subToOrder({
          cartId
        }).then(res => {
          _this.showSpin = false;
          if (res.result == 1 && res.data) {
            let data = res.data[0];
            _this.subToOrderData = res.data[0];
            _this.data = res.data[0].cartVoList[0].list;

            if (data.addressList && data.addressList.length > 0) {
              let currentSelectedAddress = data.addressList[0];
              // 计算运费
              cartApi.addShipping({
                cartIds: cartId,
                cityId: currentSelectedAddress.cityId
              }).then(r => {
                if (res.result == 1) {
                  _this.shipData = res.data[0];
                  let freight = [];
                  if (r.data && r.data[0]) {
                    let keys = Object.keys(r.data[0]);

                    keys.map(storeId => {
                      let shipObj = r.data[0][storeId];
                      if (Object.keys(shipObj)[0] != undefined) {
                        let freightItem = Object.keys(shipObj)[0] + "|" + storeId;
                        freight.push(freightItem)
                      }
                    })
                  }
                  // TDOO: 获取默认物流信息,是否使用余额
                  _this.cityId = currentSelectedAddress.cityId;
                  _this.getPrice({
                    cartIds: cartId,
                    cityId: currentSelectedAddress.cityId,
                    isPd: _this.isPd,
                    freight: freight.join(),
                    couponId: ''
                  });
                } else {
                  _this.$Modal.error(res.msg)
                }
              });
            } else {
              _this.getPrice({
                cartIds: cartId,
                isPd: _this.isPd,
                freight: '',
                couponId: ''
              })
            }

          } else {
            _this.$Modal.error({
              title: '',
              content: res.msg,
              onOk: () => {
                _this.$router.push('/');
                window.scrollTo(0, 0);
              }
            })
          }
        })
      },
      // 获取金额
      getPrice({isPd, freight, cartIds, couponId, cityId}) {
        this.freight = freight;
        this.couponId = couponId;
        cartApi.getPrice({isPd, freight, cartIds, couponId, cityId})
          .then(r => {
            if (r.result == 1 && r.data) {
              _this.priceData = r.data[0];
            }
          });
      },
      // 获取优惠券
      getCoupon() {
        let cartIds = this.$route.params.cartIds;

        cartApi.addCouponMember({
          cartIds
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.couponData = res.data[0][0];
          }
        });
      },
      getCouponId(couponId) {
        let cartIds = this.$route.params.cartIds;
        this.couponId = couponId;

        this.getPrice({
          isPd: _this.isPd,
          cartIds,
          couponId: couponId,
          cityId: _this.cityId,
        })
      },

      // 余额支付
      isPdChange(status) {
        let cartIds = this.$route.params.cartIds;
        status == true ? this.isPd = 1 : this.isPd = 0;
        this.getPrice({
          isPd: _this.isPd,
          cartIds,
          couponId: _this.couponId,
          cityId: _this.cityId,
        })
      },
      // 余额支付密码
      chkPasswdReg() {
        let passwd = _this.payPsd;
        if (this.isPd == 1) {
          if (this.payPsd == '') {
            this.$Modal.error({
              title: '',
              content: '请输入支付密码'
            });
            return;
          }
        }
        orderApi.chkPasswd({
          passwd
        }).then(res => {
          if (res.result == 0) {
            this.$Modal.error({
              title: '',
              content: res.msg
            });
            return;
          }
        })
      },
      // 返回购物车
      backCart() {
        this.$router.push({path: '/cart'})
      },
      gotoPay() {
        if (this.isPd == 1) {
          if (this.payPsd == '') {
            this.$Modal.error({
              title: '',
              content: '请输入支付密码'
            })
            return;
          }
        }
        let orderData = this.$store.state.orderData;

        if (orderData && orderData.deliverType == 2 && orderData.storeName == '') {
          this.$Modal.error({
            title: '',
            content: '请选择自提地点！'
          });
          return;
        }
        this.submitOrder();
      },
      submitOrder() {
        let orderData = this.$store.state.orderData;
        let cartId = this.$route.params.cartIds;
        let addressId = this.subToOrderData.addressList[0].addressId;
        let freight = this.freight;
        let couponId = this.couponId;
        let isPd = this.isPd;
        let orderMessage = this.orderMessage;
        let paytype = orderData ? orderData.paytype : 1;
        let deliverType = orderData ? orderData.deliverType : 1;


        orderApi.saveorder({
          cartIds: cartId,
          addressId,
          paytype,
          freight,
          couponId,
          invoiceId: null,
          isPd,
          activityIds: null,
          storeId: deliverType == 1 ? "" : orderData.storeId,
          storeName: deliverType == 1 ? "" : orderData.storeName,
          orderMessage,
          pickupDate: deliverType == 1 ? "" : orderData.pickupDate,
          deliverType
        }).then(res => {
          if (res.result == 1) {
            if (paytype == 2) {
              // 货到付款，成功后跳转到货到付款提示页面

            } else {
              let orderId = res.data[0].orderList[0].orderId;
              _this.$router.push({path:`/pay/${res.data[0].paySn}/${_this.priceData.totalPrice}/${orderId}`});
              window.scrollTo(0,0);
            }
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .header {
    .logo {
      width: 230px;
      height: 80px;
      float: left;
      margin-top: 20px;
      overflow: hidden;
      img {
        max-height: 80px;
        width: auto;
        display: block;
      }
    }
    .steps {
      width: 600px;
      height: 80px;
    }
  }

  .content {
    min-height: 800px;
    border: 1px solid #ccc;
    padding: 20px;
  }

  .price-info .price {
    display: inline-block;
    min-width: 80px;
    text-align: left;
  }

  .btn {
    color: #346ed8;
  }

  .btn:hover {
    color: #95acd6;
  }

  .bb1 {
    border-bottom: 1px solid #ccc;
  }

  .p10 {
    padding: 10px;
  }

  .subtotal {
    color: #fe8415;
  }

  .ivu-collapse {
    background-color: #fff;
    border-radius: 3px;
    border: 0 none;
  }
</style>
