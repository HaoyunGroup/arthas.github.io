
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyload from 'vue-lazyload'; // 图片懒加载
import VueWechatTitle from 'vue-wechat-title';
import Iview from 'iview';  // iview UI
import 'iview/dist/styles/iview.css'; // iview UI 依赖样式表
import store from './store/';


Vue.use(VueWechatTitle)

// Vue-Lazyload options
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: '',
  loading: '/static/images/Imgloading.gif',
  // attempt: 1
});

Vue.use(Iview);

Vue.config.productionTip = false;

// 加载进度条
router.beforeEach((to, from, next) => {
  Iview.LoadingBar.start();
  next();
});

router.afterEach(route => {
  Iview.LoadingBar.finish();
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
