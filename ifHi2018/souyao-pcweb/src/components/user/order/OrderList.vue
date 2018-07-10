<template>
  <div class="order-list">
    <div class="order-search mt10">
      <div style="position: relative;">
        <Form ref="formInline" inline>
          <div>
            <FormItem>
              <span>订 单 号：</span><Input v-model="orderSn" placeholder="请输入订单号" style="width: 100px;"></Input>
            </FormItem>
            <FormItem>
              <span>订单状态：</span>
              <Select @on-change="getOrderSataus" v-model="orderStatus" style="width: 100px">
                <Option v-for="item in orderStatusList" :value="item.value" :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <span class="cp" @click="showAdvancedSearch = !showAdvancedSearch">高级搜索</span>
            </FormItem>
          </div>
          <transition name="slide-fade">
            <div v-if="showAdvancedSearch">
              <FormItem>
                <span>下单时间：</span>
                <DatePicker :value="theOrderTime" format="yyyy年MM月dd日" type="daterange" placement="bottom-start"
                            placeholder="选择下单时间" style="width: 300px"></DatePicker>
              </FormItem>
              <FormItem>
                <Select v-model="theOrderDate" style="width: 130px;">
                  <Option value="所有订单">所有订单</Option>
                  <Option value="近三个月订单">近三个月订单</Option>
                </Select>
              </FormItem>
            </div>
          </transition>
          <FormItem class="ml25" style="position: absolute; right: 0; top: 0;">
            <Button class="ml25" type="primary" shape="circle" icon="ios-search">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <div class="order-list">
      <table class="order ncu-table-style fs12">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>门店名称</th>
            <th>订单总价</th>
            <th>状态与操作</th>
          </tr>
        </thead>
        <tbody v-for="(item,i) in orderListData">
          <tr>
            <td colspan="19" class="sep-row"></td>
          </tr>
          <tr>
            <th colspan="19">
              <span class="fl ml10">订单号：<span class="goods-sn">{{ item.paySn }}</span></span>
              <span class="fl ml20">购买时间：<span class="goods-time">{{ getCreateTime(item.createTime) }}</span></span>
              <!-- 点击图标查看订单详情 -->
              <span class="fr pr20">
                <router-link to="" title="查看订单" target="_blank">
                  <Icon size="20" type="ios-paper-outline"></Icon>
                </router-link>
              </span>
            </th>
          </tr>
          <tr v-for="(listItem,index) in item.orderGoodsList">
            <td class="bdl"></td>
            <!-- 商品图片 -->
            <td>
              <div class="goods-pic-small">
                <span>
                  <i></i>
                  <router-link :to="'/goodsDetail/' + listItem.specId" target="_blank">
                    <pic :_src="listItem.goodsImage"></pic>
                  </router-link>
                </span>
              </div>
            </td>
            <!-- 商品名称及规格 -->
            <td>
              <dl class="">
                <dt class="goods-name">
                  <router-link :to="'/goodsDetail/' + listItem.specId" target="_blank">{{ listItem.goodsName }}</router-link>
                </dt>
                <dd class="spec-info">{{ listItem.specInfo.split('&')[0] || listItem.specInfo}}</dd>
              </dl>
            </td>
            <!-- 商品价格 -->
            <td class="goods-price">
              <dt>
                ￥ {{ listItem.goodsPrice }}
              </dt>
            </td>
            <!-- 商品购买数量 -->
            <td class="goods-num">{{ listItem.goodsNum }}</td>

            <!-- 门店名称 -->
            <td v-if="index < 1" class="bdl" :rowspan="item.orderGoodsList.length">
              <p class="store-name">{{ item.storeName }}</p>
            </td>
            <!-- 商品总价 -->
            <td v-if="index < 1" class="bdl" :rowspan="item.orderGoodsList.length">
              <p class="goods-h">
                <span style="color: red;">{{ item.orderTotalPrice }}</span>
              </p>
              <p class="goods-freight">

                <span v-if="item.shippingFee - 0 == 0">（免运费）</span>
                <span v-else>{{ item.shippingFee }}</span>
              </p>

            </td>
            <!-- 操作 -->
            <td v-if="index < 1" class="bdl bdr" :rowspan="item.orderGoodsList.length">
              <div  v-if="item.orderState == 0">
                <p><span style="color: #666;">订单已取消</span></p>
                <p><span class="cp" style="color: red;">再次购买</span></p>

              </div>
              <div v-else-if="item.orderState == 20">
                <p><span style="color: #666;">买家已付款</span></p>
                <p><span class="cp" style="color: red; text-decoration: underline;">订单退款</span></p>
              </div>
              <div v-else-if="item.orderState == 30">
                <p class="pt10"><Button type="primary">确认收货</Button></p>
              </div>
              <div v-else-if="item.orderState == 40">
                <p><span style="color: #666;">交易完成</span></p>
                <p><span class="cp" style="color: red;">再次购买</span></p>
                <p v-if="item.evaluationStatus == 0"><span class="cp" style="color: #36c;">我要评价</span></p>
                <p v-if="item.evaluationStatus == 1"><span style="color: #333;">已评价</span></p>
              </div>

              <div v-else>
                <p><span class="cp" style="color: #36c;">取消订单</span></p>
                <p class="pt10"><Button type="primary" @click="gotoPay(item.paySn, item.orderTotalPrice, item.orderId)">付款</Button></p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="fr mt25 pt25">
      <Page :total="total" @on-change="pageChange" :page-size="10" show-elevator></Page>
    </div>
  </div>
</template>
<script>

  import * as orderApi from '@/api/orderApi.js';
  import moment from 'moment';
  import Pic from 'common/components/Pic';

  // 订单状态：0:已取消;3:审核未通过,4:商家取消的订单
  //         10:待付款;20:待发货;30:待收货;40:交易完成;50:已提交;60:已确认
  let _this = '';
  export default {
    name: "OrderList",
    data: () => {
      return {
        total: 10,
        totalRows: 0,
        orderListData: [],
        showAdvancedSearch: false,
        orderStatus: 'all',
        theOrderTime: [],
        theOrderDate: '所有订单',
        orderSn: '',
        orderStatusList: [
          {
            value: 'all',
            label: '所有订单'
          },
          {
            value: '0',
            label: '已取消'
          },
          {
            value: '10',
            label: '待付款'
          },
          {
            value: '20',
            label: '待发货'
          },
          {
            value: '30',
            label: '已发货'
          },
          {
            value: '40',
            label: '已完成'
          },
          {
            value: '50',
            label: '已提交'
          },
          {
            value: '60',
            label: '已确认'
          }
        ],
      };
    },
    components: {
      Pic,
    },
    created() {
      _this = this;
      this.getOrderList({
        status: this.orderType,
        pageNo: 1,
        pageSize: 10,
        orderType: 1
      });

    },
    methods: {
      getOrderSataus(val) {
        this.orderStatus = val;
        console.log(val)
      },
      getOrderList({status, pageNo, pageSize, orderType}) {
        status == 'all' ? status = null : status = status;
        orderApi.orderlist({
          status,
          pageNo,
          pageSize,
          orderType
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.orderListData = res.data;

            // 计算数据条数
            if (_this.stopLoading == true) {
              if(res.data.length >= 10) {
                _this.total += 10;
              }
            }
          }
        })
      },
      getCreateTime(time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss")
      },
      pageChange(n) {
        this.getOrderList({
          status: this.orderType,
          pageNo: n,
          pageSize: 10,
          orderType: 1
        });
        window.scrollTo(0, 240);
      },

      // 付款
      gotoPay(paySn, Amount, orderId) {
        this.$router.push({path:`/pay/${paySn}/${Amount}/${orderId}`});
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./orderList.less";

  /* 过渡 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
