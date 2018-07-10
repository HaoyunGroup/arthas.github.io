<template>
  <div id="">
    <div class="text_link">
      <p>
      </p>
      <p>Copyright 2011-
        <span id="year">2017</span>
        北京搜药先锋网络科技有限公司 Inc.All rights reserved.
      </p>
      <p>
        <a href="http://net.china.com.cn/" target="_blank "
           style="margin:0 5px;display:inline-block;width:118px; height:46px; background-position:-180px 0;">
        </a>
        <a href="http://www.cyberpolice.cn/wfjb/" target="_blank"
           style="margin:0 5px;display:inline-block;width:118px; height:46px; background-position: -180px -49px;"></a>
        <a href="http://www.315online.com.cn/" target="_blank"
           style="margin:0 5px;display:inline-block;width:118px; height:46px; background-position: -180px -153px;"></a>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "LoginFooter",
    data: () => ({})
  }
</script>
<style lang="less" scoped>
  /*@import "/static/images/footer_bg.jpg";*/
  .text_link {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
    padding-top: 10px;
    p {
      a {
        background-image: url("/static/images/footer_bg.jpg");
        background-repeat: no-repeat;
      }
    }
  }
</style>
