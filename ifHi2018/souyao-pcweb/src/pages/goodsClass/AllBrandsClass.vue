<template>
  <div class="w all_brands_class">
    <div class="brand-list">
      <ul class="brand-listUl">
        <li class="brand-list-item boxc" v-for="item in 24">
          <div class="brand-lPannel">
            <router-link to="/goodsSearch/BrandIdSearch/15" class="link">
              <Pic _src="/upload/img/brand/1507878853163.jpg" _style="vertical-align: middle;" class="brand-logo"></Pic>
              <h4 class="brand-name">北京同仁堂药业</h4>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Pic from 'common/components/Pic';

  export default {
    name: "AllBrandsClass",
    data: () => ({}),
    components: {
      Pic
    }
  }
</script>
<style lang="less" scoped>
  .brand-list {
    width: 1185px;
    margin: 5px auto 20px;
    overflow: hidden;
    border-top: 1px solid #e5e5e5;
    .brand-listUl {
      width: 100%;

      .brand-list-item {
        float: left;
        padding: 4px 12px 12px;
        width: 170px;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        a.link {
          display: block;
          margin-top: 8px;
          border: 1px solid #fff;
        }

        .brand-name {
          font-size: 14px;
          margin-top: 8px;
          height: 28px;
          line-height: 28px;
          background: #f8f7f8;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .brand-list-item:nth-child(6n+1) {
        padding-left: 10px;
        border-left: #e5e5e5 1px solid;
      }

      .brand-list-item:hover a.link {
        border: 1px solid #0085cd;
      }

      .brand-list-item:hover {
        a.link .brand-name {
          background: #0085cd;
          color: #fff;
        }
      }

      .brand-logo {
        display: block;
        margin: 0 auto;
        max-width: 150px;
        height: 60px;
        vertical-align: middle;
        /*display: table-cell;*/
        text-align: center;
        img {
          vertical-align: middle;
        }
      }
      .brand-logo:after {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }
  }

</style>
