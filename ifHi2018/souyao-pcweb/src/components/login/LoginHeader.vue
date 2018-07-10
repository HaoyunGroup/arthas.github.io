<template>
  <div class="logo-wrap">
    <a href="/" class="logo">
      <img src="/static/logo.png"/>
    </a>

    <span class="v-line"></span>
    <span class="msg">{{ msg }}</span>
  </div>
</template>
<script>
  export default {
    name: "LoginHeader",
    data: () => ({

    }),
    props: ['msg'] || ''
  }
</script>
<style lang="less" scoped>
  .logo-wrap {
    max-width: 1200px;
    margin: 25px auto 30px;
    .logo {
      display: inline-block;
      img {
        max-width: 259px;
        max-height: 66px;
        vertical-align: middle;
      }
    }

    .v-line {
      height: 66px;
      display: inline-block;
      border: 1px solid #ccc;
      margin-left: 50px;
      margin-right: 20px;
      vertical-align: middle;

    }

    .msg {
      vertical-align: middle;
      font-size: 28px;
    }
  }
</style>
