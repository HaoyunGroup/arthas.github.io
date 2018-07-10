<template>
  <div>
    <!-- 选择配送方式 -->
    <div class="distribution bb1 p10">
      <h4>选择配送方式</h4>
      <div class="fs12 mt10">
        <span @click="onClickSetExType(1)" :class="orderData.deliverType == 1 ? 'span cp ml20 active': 'span cp ml20'">商家配送</span>
        <span @click="onClickSetExType(2)" :class="orderData.deliverType == 2 ? 'span cp ml20 active': 'span cp ml20'">上门自提</span>
      </div>
      <div v-if="orderData.deliverType == 2" class="ml20 fs12 mt10" style="padding-left: 20px;">
        <Icon size="16" type="ios-paperplane-outline"></Icon>
        <span>自提地点：</span>
        <Select
          @on-change="storeSelectChange"
          size="small"
          :disabled="!(storeList.length > 0)"
          v-model="getStoreName" style="width:200px"
          :placeholder="storeList.length > 0 ? '选择自提地点' : '附近店面不足！'">
          <Option v-for="(item,index) in storeList" :key="index" :value="index">{{ item.storeName }}</Option>
        </Select>
        <div class="mt20">
          <Icon size="16" type="ios-time-outline"></Icon>
          <span>自提时间：</span>
          <DatePicker
            @on-change="getDate"
            :disabled="!(storeList.length > 0)" :value="date" size="small" type="date" placeholder="选择自提日期"
            style="width: 120px"></DatePicker>
          <TimePicker
            @on-change="getTime"
            :disabled="!(storeList.length > 0)" :value="time" size="small" format="HH:mm" type="time"
            placeholder="选择自提时间" style="width: 120px"></TimePicker>
        </div>
      </div>
    </div>
    <!-- 选择付款方式-->
    <div class="payment bb1 p10">
      <h4>选择付款方式</h4>
      <div class="fs12 mt10">
        <span @click="onClickSetPayType(1)"
              :class="orderData.paytype == 1 ? 'span cp ml20 active': 'span cp ml20'">在线支付</span>
        <span @click="onClickSetPayType(2)"
              :class="orderData.paytype == 2 ? 'span cp ml20 active': 'span cp ml20'">货到付款</span>
      </div>
    </div>
  </div>
</template>
<script>
  import * as cartApi from '@/api/cartApi.js';
  import * as orderApi from '@/api/orderApi.js';
  import moment from 'moment';


  let _this = '';
  export default {
    name: "ExpressMsg",
    data: () => ({
      getStoreName: '',
      date: '',
      time: '',
      storeList: '',
      orderData: {
        pickupDate: '',
        deliverType: 1,
        paytype: 1,
        storeId: '',
        storeName: ''
      }
    }),
    props: ['subToOrderData', 'subToOrder'],
    created() {
      _this = this;
      // 获取当前时间并增加30分钟
      let pickupDate = moment().add('30', 'minutes').format("YYYY-MM-DD_HH:mm");

      this.date = pickupDate.split('_')[0];
      this.time = pickupDate.split('_')[1];
      this.setPickupDate();
      this.saveOrderData();
    },
    watch: {
      subToOrderData: function (val, oldVal) {
        this.orderData.deliverType = 1;
        this.getStoreName = '';
      }
    },
    methods: {
      // 获取配送方式
      onClickSetExType(deliverType) {
        this.orderData.deliverType = deliverType;
        let selectAddress = (this.subToOrderData.addressList[0].areaInfo + this.subToOrderData.addressList[0].address).toString().replace(/ /g, '')
        let goodsIdsString = "";
        let storeLongitude = '116.411665';
        let storeAtitude = '39.911323';
        let subToOrderData = this.subToOrderData;
        let list = subToOrderData.cartVoList[0].list;

        this.saveOrderData();
        list.map(function (item) {
          goodsIdsString = item.goodsId + ',';
        });
        goodsIdsString = goodsIdsString.slice(0, -1);

        if (deliverType == 2) {
          orderApi.getLongitude({addr: selectAddress}).then(res => {
            storeLongitude = res.lng;
            storeAtitude = res.lat;

            if (goodsIdsString.length > 0) {
              orderApi.getStroeList({
                storeLongitude,
                storeAtitude,
                goodsIdsString
              }).then(res => {

                if (res.result == 1) {
                  if (res.data.length > 0) {
                    _this.storeList = res.data;
                  }
                }
              });
            } else {
              _this.$Message.error("附近店面不足！");
            }
          });
        }
      },
      // 获取支付方式
      onClickSetPayType(paytype) {
        this.orderData.paytype = paytype;
        this.saveOrderData();
      },
      // 获取自提地点
      storeSelectChange(index) {
        _this.orderData.storeName = _this.storeList[index].storeName;
        _this.orderData.storeId = _this.storeList[index].storeId;
        this.saveOrderData();
      },
      // 获取日期
      getDate(date) {
        this.date = date;
        this.setPickupDate();
        this.saveOrderData();
      },
      // 获取时间
      getTime(time) {
        this.time = time;
        this.setPickupDate();
        this.saveOrderData();
      },
      // 拼接日期和时间
      setPickupDate() {
        this.orderData.pickupDate = this.date + '_' + this.time;
      },
      // 把数据存入store
      saveOrderData() {
        _this.$store.commit('DELIVERY_AND_PAYMENT_DATA', _this.orderData);
      },
    }
  }
</script>
<style lang="less" scoped>

  .bb1 {
    border-bottom: 1px solid #ccc;
  }

  .p10 {
    padding: 10px;
  }

  .btn {
    color: #346ed8;
  }

  .btn:hover {
    color: #95acd6;
  }

  .span {
    display: inline-block;
    padding: 5px;
    border: 1px solid #fff;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .span:hover {
    border: 1px solid #346ed8;
  }

  .span.active {
    border: 1px solid #346ed8;
  }

</style>
