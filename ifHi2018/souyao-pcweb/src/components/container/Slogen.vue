<template>
  <div class="slogen">
    <div class="w">
      <ul class="wrap">
        <li>
          <a href="#">
            <img src="/static/images/zhengpin.png" data-bd-imgshare-binded="1">
            <b>正品保障</b>
          </a>
        </li>
        <li><a href="#">
          <img src="/static/images/shandian.png" data-bd-imgshare-binded="2">
          <b>闪电送货</b>
        </a>
        </li>
        <li>
          <a href="#">
            <img src="/static/images/hdfk.png" data-bd-imgshare-binded="3">
            <b>7货到付款</b>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/static/images/danbao.png" data-bd-imgshare-binded="4">
            <b>质量保障</b>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/static/images/tuihuo.png" data-bd-imgshare-binded="4">
            <b>无忧退货</b>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Slogen",
    data: () => ({})
  }
</script>
<style lang="less" scoped>
  .slogen {
    border-top: 1px solid #ddd;
    padding: 20px 0px;
    margin-top: 20px;
    background: #0094d8;
    width: 100%;
    clear: both;
    overflow: hidden;
    .wrap {
      li {
        float: left;
        color: #666;
        line-height: 30px;
        width: 240px;
        font-size: 18px;
        margin-top: 10px;
        text-align: left;
        a {
          display: block;
          float: left;
          margin-right: 10px;
          img {
            vertical-align: middle;
          }
        }
        b {
          display: inline-block;
          font-size: 18px;
          color: #fff;
          font-weight: normal;
          vertical-align: middle;
        }
      }
    }
  }
</style>
