<template>
  <div id="not-found">
    <div>
      <img src="/static/404.jpeg" alt="" class="not-found-img">
    </div>
    <div style="width: 100%; text-align: center;">
      <Button @click="goHome" icon="ios-undo-outline " type="primary">返回首页</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  data: () => ({
    msg: '404 Not Found！'
  }),
  methods: {
    goHome() {
      location.href = '/'
    }
  }
}
</script>
<style lang="less" scoped>
  #not-found {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #7EC3CD;
    .not-found-img {
      display: block;
      margin: 0 auto;
    }
  }
</style>
