import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Signup from '@/pages/login/Signup';
import NotFound from '@/pages/error/404';
import GoodsClass from '@/pages/goodsClass/GoodsClass';
import AllGoodsClass from '@/pages/goodsClass/AllGoodsClass';
import AllBrandsClass from '@/pages/goodsClass/AllBrandsClass';
import GoodsSearch from '@/pages/goodsSearch/GoodsSearch';
import GoodsDetail from '@/pages/goodsDetail/GoodsDetail';
import Cart from '@/pages/cart/Cart';
import User from '@/pages/user/User';
import OrderConfirm from '@/pages/orderConfirm/OrderConfirm';
import PayConfig from '@/pages/payConfig/PayConfig';


// const Home = resolve => require(['@/pages/home/Home'], resolve)


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/', name: 'Home', component: Home,
      meta: {title: '首页'}
    },
    {
      path: '/all', name: 'GoodsClass', component: GoodsClass, redirect: '/all/class',
      children: [
        {
          path: 'class', name: '全部商品分类', component: AllGoodsClass,
          meta: {title: '全部商品分类'}
        },
        {
          path: 'brands', name: '全部品牌', component: AllBrandsClass,
          meta: {title: '全部品牌'}
        }
      ]
    },
    {
      path: '/goodsSearch/:searchType?/:keyword?/:sortField?/:sortOrder?',
      name: 'GoodsSearch', component: GoodsSearch,
      meta: {title: '商品搜索'},
    },
    {
      path: '/goodsDetail/:specId', name: 'GoodsDetail', component: GoodsDetail,
    },
    {
      path: '/cart', name: 'Cart', component: Cart,
      meta: {title: '购物车'}
    },
    {
      path: '/orderConfirm/:cartIds', name: 'OrderConfirm', component: OrderConfirm,
      meta: {title: '订单提交'}
    },
    {
      path: '/pay/:paySn/:orderAmount/:orderId', name: 'PayConfig', component: PayConfig,
      meta: {title: '订单提交'}
    },
    {
      path: '/user/:name', name: 'User', component: User,
      meta: {title: '个人中心'},
    },
    {
      path: '/user', redirect: '/user/userInfo',
      meta: {title: '个人中心'},
    },
    {
      path: '/login/:callBack?', name: 'Login', component: Login,
      meta: {title: '登录'},
      props: {showHeader: false, showFooter: false} // 是否显示头部和底部  默认显示
    },
    {
      path: '/signup', name: 'Signup', component: Signup,
      meta: {title: '注册'},
      props: {showHeader: false, showFooter: false} // 是否显示头部和底部  默认显,
    },
    {
      path: '/NotFound', name: 'NotFound', component: NotFound,
      meta: {title: '404 NotFound'},
      props: {showHeader: false, showFooter: false} // 是否显示头部和底部  默认显示
    },
    {
      path: '*', redirect: '/NotFound',
      meta: {title: '404 NotFound'},
      props: {showHeader: false, showFooter: false} // 是否显示头部和底部  默认显示
    }
  ]
})
