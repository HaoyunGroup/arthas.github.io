<template>
  <div class="address-list fs12 mt10">
    <div v-for="(item, index) in subToOrderData.addressList" v-if="index < dataLength" class="item ml20 mt10 clearfix">
      <Icon class="fl" size="20" v-if="index == 0" type="location" style="margin-left: -20px;"></Icon>

      <div class="true-name fl">
        {{ item.trueName }}
      </div>
      <div class="address-detail fl ml20">
        {{ item.areaInfo + '&nbsp;&nbsp;&nbsp;' + item.address }}
      </div>
      <div class="phone-num fl ml20">
        <span>电话：</span><span>15688888888</span>
      </div>
      <div class="operation fl ml20">
        <span v-if="index == 0" class="ml10">默认</span>
        <span @click="setDefault(index)" class="set-default btn ml10" v-else>设为默认收货地址</span>
        <!--<span class="edit ml10">编辑</span>-->
        <!--<span class="delete ml10">删除</span>-->
      </div>
    </div>
    <div class="ml20 mt15 cp btn" @click="openMore">{{ moreTxt }}</div>
  </div>
</template>
<script>
  import * as addressApi from '@/api/addressApi.js';

  let _this = '';
  let flag = true;
  export default {
    name: "OrderAddress",
    data: () => ({
      addressList: [],
      dataLength: 1,
      moreTxt: '展开更多 ↓'
    }),
    props: ['subToOrderData', 'subToOrder'],
    created() {
      _this = this;
    },
    methods: {
      // 设为默认收货地址
      setDefault(index) {
        let addressId = this.subToOrderData.addressList[index].addressId;
        addressApi.updateAddressDef({
          addressId,
        }).then(res => {
          if (res.result == 1) {
            _this.$Message.success(res.msg + '!');
            _this.subToOrder();
          } else {
            _this.$Message.error(res.msg + '!');
          }
        })
      },
      // 打开更多
      openMore() {
        if (flag) {
          this.dataLength = 20;
          this.moreTxt = '收起地址 ↑'
        } else {
          this.dataLength = 1;
          this.moreTxt = '展开更多 ↓'
        }
        flag = !flag;
      }
    }
  }
</script>
<style lang="less" scoped>
  .address {
    min-height: 100px;
    width: 100%;
    .address-list {
      .operation {
        span {
          cursor: pointer;
        }
      }
    }
  }

  .true-name.active {
    border: 1px solid #346ed8;
    padding: 0 5px;
  }

  .btn {
    color: #346ed8;
  }

  .btn:hover {
    color: #95acd6;
  }
</style>
