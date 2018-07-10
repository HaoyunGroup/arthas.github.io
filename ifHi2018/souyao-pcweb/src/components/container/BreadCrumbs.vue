<template>
  <div class="w bread-crumbs">
    <Breadcrumb separator=">">
      <BreadcrumbItem to="/">
        <Icon type="ios-home-outline"></Icon>
        首页
      </BreadcrumbItem>
      <div style="display: inline-block;" v-if="searchType == 'gcIdSearch'">
        <BreadcrumbItem to="/all/class">
          <Icon type="social-buffer-outline"></Icon>
          商品分类
        </BreadcrumbItem>
      </div>

      <div style="display: inline-block;" v-else-if="searchType == 'BrandIdSearch'">
        <BreadcrumbItem to="/all/brands">
          <Icon type="social-buffer-outline"></Icon>
          商品品牌
        </BreadcrumbItem>
      </div>

      <div style="display: inline-block;" v-else-if="searchType == 'keywordSearch'">
        <BreadcrumbItem to="/all/class">
          <Icon type="ios-search"></Icon>
          商品搜索
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Icon type="pound"></Icon>
          {{keyword}}
        </BreadcrumbItem>
      </div>
    </Breadcrumb>

  </div>
</template>
<script>

  export default {
    name: "BreadCrumbs",
    data: () => ({
      searchType: '',
      keyword: ''
    }),
    components: {},
    methods: {},
    watch: {
      $route() {
        this.searchType = this.$route.params.searchType;
        this.keyword = this.$route.params.keyword;
      }
    },
    created() {
      this.searchType = this.$route.params.searchType;
      this.keyword = this.$route.params.keyword;
    }
  }
</script>
<style lang="less" scoped>

  .bread-crumbs {
    padding: 15px 0;
  }
</style>
