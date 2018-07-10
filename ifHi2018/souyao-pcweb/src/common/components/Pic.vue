<template>
  <div>
    <img v-if="_lazy" v-lazy="IMAGE_DOMAIN + _lazy" :style="_style" :alt="_alt">
    <img v-else :src="IMAGE_DOMAIN + _src" :style="_style" :alt="_alt">

  </div>
</template>
<script>
  import * as common from 'common/common.js'

  export default {
    name: "Pic",
    data: () => ({
      isLazy: false,
      IMAGE_DOMAIN: common.IMAGE_DOMAIN
    }),
    props: ['_lazy','_src', '_style', '_alt'],
  }
</script>
<style lang="less" scoped>
  img {
    max-height: 100%;
    max-width: 100%;
    display: inline-block;
  }
</style>
