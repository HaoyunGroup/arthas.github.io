<template>
  <div>
    <div class="fl clearfix">
      <Menu style="width: 200px; border: 1px solid #eee;" @on-select="routeClick" :active-name="activeName"
            :open-names="['1','2','3','4','5','6','7']">
        <div v-for="item in menuData">
          <Submenu :name="item.name" style="background-color: #F5F5F5;">
            <template slot="title">
              <Icon color="#0587CD" style="vertical-align: middle;" size="20" :type="item.icon"></Icon>
              <span style="vertical-align: middle;">{{ item.value }}</span>
            </template>
            <div style="background-color: #FFF;" v-for="item in item.item">
              <MenuItem class="li" :name="item.key + '&' + item.name">
                {{ item.name }}
              </MenuItem>
            </div>
          </Submenu>
        </div>
      </Menu>
    </div>
    <div class="fl clearfix page-view ml15">
      <div class="breadcrumb pl10">
        <span>{{ breadCrumbs }}</span>
      </div>
      <!--订单中心-->
      <order-list v-if="activeName == 'orderList'"></order-list>
      <ShopPrescription v-if="activeName == 'shopPrescription'"></ShopPrescription>
      <reviews-buyer-list v-if="activeName == 'reviewsBuyerList'">评价晒单</reviews-buyer-list>
      <!--收藏中心-->
      <div v-if="activeName == 'goodsFavIndex'">收藏商品</div>
      <!--资产中心-->
      <div v-if="activeName == 'balance'">余额</div>
      <div v-if="activeName == 'coupons'">优惠券</div>
      <div v-if="activeName == 'myLevel'">我的级别</div>
      <!--客服中心-->
      <div v-if="activeName == 'returnList'">退货记录</div>
      <div v-if="activeName == 'refundList'">退款记录</div>
      <div v-if="activeName == 'myconsult'">我的咨询</div>
      <!--设置-->
      <information v-if="activeName == 'userInfo'"></information>
      <shipping-address v-if="activeName == 'shippingAddress'"></shipping-address>
      <div v-if="activeName == 'queryPass'">修改密码</div>
      <div v-if="activeName == 'security'">账户安全</div>
      <div v-if="activeName == 'queryPaymentPass'">支付密码</div>
      <!--站内信-->
      <div v-if="activeName == 'messageList'">消息列表</div>
      <!--浏览记录-->
      <div v-if="activeName == 'goodsBrowseList'">商品记录</div>

    </div>
  </div>
</template>
<script>
  // 订单中心
  import OrderList from '@/components/user/order/OrderList';
  import ShopPrescription from '@/components/user/order/ShopPrescription';
  import ReviewsBuyerList from '@/components/user/order/ReviewsBuyerList';

  // 设置
  import Information from '@/components/user/setting/Information'; // 个人信息
  import ShippingAddress from '@/components/user/setting/ShippingAddress'; // 收货地址

  let _this = '';
  export default {
    name: "UserMenu",
    data: () => ({
      menuData: [
        {
          name: '1', value: '订单中心', icon: 'document-text',
          item: [
            {key: 'orderList', name: '订单列表'},
            {key: 'shopPrescription', name: '处方单'},
            {key: 'reviewsBuyerList', name: '评价晒单'}
          ]
        },
        {
          name: '2', value: '收藏中心', icon: 'ios-star',
          item: [{key: 'goodsFavIndex', name: '收藏商品'}]
        },
        {
          name: '3', value: '资产中心', icon: 'social-yen',
          item: [
            {key: 'balance', name: '余额'},
            {key: 'coupons', name: '优惠券'},
            {key: 'myLevel', name: '我的级别'}
          ]
        },
        {
          name: '4', value: '客服中心', icon: 'chatbubbles',
          item: [
            {key: 'returnList', name: '退货记录'},
            {key: 'refundList', name: '退款记录'},
            {key: 'myconsult', name: '我的咨询'}
          ]

        },
        {
          name: '5', value: '设置', icon: 'ios-gear',
          item: [
            {key: 'userInfo', name: '个人信息'},
            {key: 'shippingAddress', name: '收货地址'},
            {key: 'queryPass', name: '修改密码'},
            {key: 'security', name: '账户安全'},
            {key: 'queryPaymentPass', name: '支付密码'}
          ]
        },
        {
          name: '6', value: '站内信', icon: 'ios-compose',
          item: [{key: 'messageList', name: '消息列表'}]

        },
        {
          name: '7', value: '浏览记录', icon: 'ios-refresh-outline',
          item: [{key: 'goodsBrowseList', name: '商品记录'}]
        },
      ],
      activeName: '',
      breadCrumbs: ''
    }),
    components: {
      OrderList,
      ShopPrescription,
      Information,
      ShippingAddress
    },
    created() {
      _this = this;
      _this.activeName = _this.$route.params.name;
    },
    watch: {
      $route() {
        _this.activeName = _this.$route.params.name;
        window.scrollTo(0, 230);
      }
    },
    methods: {
      routeClick(active) {
        let k = active.split('&')[0];
        let name = active.split('&')[1];
        _this.breadCrumbs = name;
        _this.$router.push({path: `/user/${k}`})
        window.scrollTo(0, 230);
      }
    }
  }
</script>
<style lang="less" scoped>
  .li:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .page-view {
    width: 980px;
    min-height: 400px;
    .breadcrumb {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #f5f5f5;
      border: #e5e5e5 1px solid;
      font-size: 14px;
    }
  }
</style>
