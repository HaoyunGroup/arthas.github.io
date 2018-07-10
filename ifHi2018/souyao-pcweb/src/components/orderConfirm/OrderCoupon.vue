<template>
  <div>
    <Collapse @on-change="getCoupon">
      <Panel name="coupon">
        使用优惠券
        <div style="margin-left: 40px;" slot="content">

          <RadioGroup @on-change="getCouponId" v-model="coupon" v-if="couponData.length > 0">
            <div class="fl">
              <Radio class="mr25" style="border: 2px dashed #eee; padding: 10px;" :label="''">
                <div style="width: 100px; height: 54px; display: inline-block;">
                  不使用优惠券
                </div>
              </Radio>
            </div>
            <div v-for="item in couponData" class="fl">
              <Radio class="mr25" style="border: 2px dashed #eee; padding: 10px;" :label="item.id">
                <div style="display: inline-block;">
                  {{ item.shopActivityPromotionRule.description }}
                </div>
                <div style="padding-left: 20px;">
                  <span>领券时间：</span>{{ item.shopActivityPromotionRule.shopActivity.createTimeStr.split(' ')[0] }}
                  <br>
                  <span>到期时间：</span>{{ item.shopActivityPromotionRule.shopActivity.endTimeStr.split(' ')[0] }}
                </div>
              </Radio>
            </div>
          </RadioGroup>
          <div class="fs12" style="color: #999;" v-else>暂无优惠券...</div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  export default {
    name: "OrderCoupon",
    data: () => ({
      coupon: '',
      couponId: ''
    }),
    props: ['couponData','couponChange', 'refreshPrice'],
    methods: {
      getCoupon() {
        this.couponChange()
      },
      getCouponId(e) {
        this.couponId = e;
        this.refreshPrice(e);
      }
    }
  }
</script>
<style lang="less" scoped>

  .ivu-collapse {
    background-color: #fff;
    border-radius: 3px;
    border: 0 none;
  }
</style>
