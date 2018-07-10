<template>
  <div id="HomePage">
    <notable></notable>
    <index-floors></index-floors>
  </div>
</template>
<script>
  import Notable from '@/components/home/Notable'
  import IndexFloors from '@/components/home/IndexFloors'
  export default {
    name: "HomePage",
    data: () => ({}),
    components: {
      Notable,
      IndexFloors
    },
  }
</script>
<style lang="less" scoped>
</style>
