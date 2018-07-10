<template>
  <div id="app">
    <index></index>
  </div>
</template>
<script>
  import Index from '@/pages/Index'
  export default {
    name: "app",
    components: {
      Index
    }
  }
</script>
<style lang="less" scoped>
  #app {
    font-size: 16px;
    font-family: "Microsoft Yahei";
  }
</style>
