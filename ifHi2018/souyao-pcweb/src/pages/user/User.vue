<template>
  <div class="w mt20">
    <user-menu></user-menu>
  </div>
</template>
<script>
  import UserMenu from '@/components/user/UserMenu'
  export default {
    name: "User",
    data: () => ({}),
    components: {
      UserMenu
    }
  }
</script>
<style lang="less" scoped>

</style>
