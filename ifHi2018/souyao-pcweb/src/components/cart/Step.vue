<template>
  <div class="change_num">
    <span class="decrease" @click="decrease(goodsData.index)">-</span>
    <input type="number" @keyup="getGoodsNum(goodsData.index,goodsData.row.goodsNum)"
           v-model="goodsData.row.goodsNum">
    <span class="increase" @click="increase(goodsData.index)">+</span>
  </div>
</template>
<script>
  export default {
    name: "Step",
    data: () => ({
      chageNum: ''
    }),
    props: ['goodsData', 'increase', 'decrease', 'getGoodsNum'],
    created() {}
  }
</script>
<style lang="less" scoped>
  .change_num {
    span {
      height: 20px;
      width: 25px;
      line-height: 18px;
      border: 1px solid #ADACAC;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      vertical-align: middle;
      cursor: pointer;
    }

    input {
      width: 40px;
      height: 20px;
      padding: 0 5px;
      text-align: center;
      vertical-align: middle;
      margin-top: 2px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
</style>
