<template>
  <div class="w">
    <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="handleSel">
      <MenuItem name="1">
        <Icon type=""></Icon>
        全部商品分类
      </MenuItem>
      <MenuItem name="2">
        <Icon type=""></Icon>
        全部品牌
      </MenuItem>
      <MenuItem name="3">
        <Icon type=""></Icon>
        全部商品
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
  export default {
    name: "GoodsClassMenu",
    data: () => ({
      activeName: '1'
    }),
    methods: {
      handleSel(name) {
        switch (name) {
          case '1':
            this.$router.push({path: '/all/class'});
            break;
          case '2':
            this.$router.push({path: '/all/brands'});
            break;
          case '3':
            this.$router.push({path: '/goodsSearch'});
            break;
        }
      }
    },
    created() {
      var routerName = this.$route.path;
      switch (routerName) {
        case '/all/class':
          this.activeName = '1';
          break;
        case '/all/brands':
          this.activeName = '2';
          break;
        case '/goodsSearch':
          this.activeName = '3';
          break;
      }
    }
  }
</script>
<style lang="less" scoped>

</style>

