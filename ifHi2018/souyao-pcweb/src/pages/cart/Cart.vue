<template>
  <div class="w">
    <div class="mt25">
      优惠信息
    </div>
    <div class="mt10">
      <Table @on-select-all="selectGoods" @on-selection-change="selectGoods" ref="selection" :columns="columns"
             :border="false" :disabled-hover="true" no-data-text="您的购物车空空如也" :data="goodsData">
        <div slot="footer">
          <div class=" clearfix" style="padding: 10px 20px;">
            <div class="fl mt5">
              <Checkbox v-model="isSelectAll" @on-change="handleSelectAll">全选</Checkbox>
              <Button type="text" size="large" @click="deleteAll">删除所选商品</Button>
            </div>
            <div class="fr">
              <div class="fl mr25 mt5">
                <span>商品总价（不含运费）：</span><span class="fs16" style="color: #D93600;">￥ {{ goodsTotalPrice }}</span>
              </div>
              <div class="fl ml25">
                <Button type="primary" size="large" @click="gotoBuy">去结算</Button>
              </div>
            </div>
          </div>
        </div>
      </Table>
    </div>
    <Spin v-if="showSpin" fix>
      <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
  import * as cartApi from '@/api/cartApi.js';
  import CartList from '@/components/cart/CartList';
  import Step from '@/components/cart/Step';


  let _this = '';
  export default {
    name: "Cart",
    data() {
      return {
        showSpin: true,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '商品',
            key: 'goodsInfo',
            width: 600,
            align: 'center',
            render: (h, params) => {
              return h(CartList, {
                props: {
                  goodsData: params.row
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
            key: 'goodsNum',
            render: (h, params) => {
              return h(Step, {
                props: {
                  goodsData: params,
                  decrease: this.decrease,
                  increase: this.increase,
                  getGoodsNum: this.getGoodsNum,
                }
              })
            }
          },
          {
            title: '小计（元）',
            key: 'subtotal'
          },
          {
            title: '操作',
            key: 'operation',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    icon: 'trash-a',
                  },
                  style: 'color: #2d8cf0; font-size: 20px;',
                  on: {
                    click: () => {
                      _this.deleteGoods(params.row.cartId)
                    }
                  }
                },'')
              ]);
            }
          }
        ],
        goodsTotalPrice: 0,
        goodsData: [],
        cartIds: [],
        selectData: [],
        isSelectAll: false
      }
    },
    created() {
      _this = this;
      _this.getCartList();
    },
    watch: {
      selectData: (val, oldVal) => {
        let goodsTotalPrice = 0;
        val.forEach(item => {
          goodsTotalPrice += item.subtotal;
        });
        _this.goodsTotalPrice = goodsTotalPrice;
      }
    },
    methods: {
      // 获取购物车列表
      getCartList() {
        cartApi.cartList().then(res => {
          _this.showSpin = false;
          _this.isSelectAll = false;
          _this.goodsTotalPrice = 0;
          if (res.result == 1 && res.data) {
            let data = res.data[0];
            let goodsData = data.list;
            _this.goodsData = [];
            for (let i = 0; i < goodsData.length; i++) {
              let item = goodsData[i];
              _this.goodsData.push({
                index: i,
                list: item,
                cartId: item.cartId,
                goodsPrice: item.goodsPrice,
                goodsNum: item.goodsNum,
                subtotal: item.goodsPrice * 100 * item.goodsNum / 100,
                specId: item.specId,
                goodsImages: item.goodsImages,
                goodsName: item.goodsName,
                specInfo: item.specInfo
              });
            }
          } else if (res.msg == '无数据') {
            _this.goodsData = [];
          } else {
            _this.$Message.info(res.msg);
          }
        })
      },
      // 购买数量减少
      decrease(i) {
        if (this.goodsData[i].goodsNum <= 1) {
          return;
        }
        this.goodsData[i].goodsNum--;
        this.updateCartCount(i);
      },
      // 修改数量
      getGoodsNum(i, v) {
        if (parseInt(v) == parseInt(this.goodsData[i].goodsNum)) {
          return;
        }
        this.goodsData[i].goodsNum = parseInt(v);
        this.updateCartCount(i);
      },
      // 购买数量增加
      increase(i) {
        this.goodsData[i].goodsNum++;
        this.updateCartCount(i);
      },
      // 更新购物车数量
      updateCartCount(i) {
        let data = _this.goodsData;
        data[i].subtotal = data[i].goodsPrice * 100 * data[i].goodsNum / 100;

        _this.goodsTotalPrice = 0;
        this.$refs.selection.selectAll(false);
        _this.isSelectAll = false;

        cartApi.updateCartCount({
          cartId: _this.goodsData[i].list.cartId,
          count: _this.goodsData[i].goodsNum
        }).then(res => {
          if (res.result != 1) {
            this.$Modal.error({
              title: '',
              content: res.msg
            })
          }
        });
      },
      // 选中商品
      selectGoods(selection) {
        _this.selectData = selection;
        _this.cartIds = [];
        selection.forEach(item => {
          _this.cartIds.push(item.cartId)
        });
        if (_this.cartIds.length == _this.goodsData.length) {
          _this.isSelectAll = true;
        } else {
          _this.isSelectAll = false;
        }
      },
      // 页脚全选
      handleSelectAll(e) {
        this.$refs.selection.selectAll(e);
        _this.isSelectAll = e;
      },
      // 去结算
      gotoBuy() {
        let cartIds = _this.cartIds.join();
        this.$router.push({path: `/orderConfirm/${cartIds}`})
      },
      // 删除购物车商品
      deleteGoods(cartId) {
        cartApi.deleteCart({
          cartId: cartId
        }).then(res => {
          if (res.result == 1) {
            _this.$Message.info(res.msg)
            _this.getCartList();
          }
        })
      },
      deleteAll() {
        this.deleteGoods(this.cartIds.join());
        if (this.cartIds.length == 0) {
          _this.isSelectAll = false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
