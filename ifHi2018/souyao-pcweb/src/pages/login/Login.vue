<template>
  <div id="LoginPage">
    <login-header></login-header>
    <login-form></login-form>
    <login-footer></login-footer>
  </div>
</template>
<script>
  import LoginHeader from '@/components/login/LoginHeader'
  import LoginForm from '@/components/login/LoginForm'
  import LoginFooter from '@/components/login/LoginFooter'

  export default {
    name: "LoginPage",
    data: () => ({}),
    components: {
      LoginHeader,
      LoginForm,
      LoginFooter
    }
  }
</script>
<style lang="less" scoped>

</style>
