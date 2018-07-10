<template>
  <div id="SignPage">
    <login-header msg="欢迎您注册"></login-header>
    <signup-form></signup-form>
    <login-footer></login-footer>
  </div>
</template>
<script>
  import LoginHeader from '@/components/login/LoginHeader'
  import SignupForm from '@/components/login/SignupForm'
  import LoginFooter from '@/components/login/LoginFooter'

  export default {
    name: "SignPage",
    data: () => ({

    }),
    components: {
      LoginHeader,
      SignupForm,
      LoginFooter
    }
  }
</script>
<style lang="less" scoped>


</style>
