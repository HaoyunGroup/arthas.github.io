<template>
  <div>
    <div v-if="showHeader">
      <public-header></public-header>
    </div>
    <router-view v-wechat-title="$route.meta.title"/>
    <div v-if="showFooter">
      <public-footer></public-footer>
    </div>

  </div>
</template>

<script>

  import PublicHeader from '@/components/container/PublicHeader';
  import PublicFooter from '@/components/container/PublicFooter';

  export default {
    name: 'Index',
    data() {
      return {
        showHeader: true,
        showFooter: true,
      }
    },
    components: {
      PublicHeader,
      PublicFooter
    },
    watch: {
      $route() {
        this.isShowComponents();
        window.scrollTo(0,0);
      }
    },
    created() {
      this.isShowComponents();
    },
    methods: {
      isShowComponents() {
        if (this.$route.matched[0].props.default) {
          const {showHeader, showFooter} = this.$route.matched[0].props.default;
          this.showHeader = showHeader;
          this.showFooter = showFooter;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    }
  }
</script>

<style>
  @import "./index.less";
</style>
