<template>
  <div id="toolsBar">
    <div id="top">
      <div class="Inside_pages">
        <div class="Collection">欢迎进入搜药先锋测试站!!!!</div>
        <div class="hd_top_manu">
          <ul>
            <li v-if="isLogin" class="">
              <div style="display: inline-block" class="cp login" @click="gotoLogin()">
                [请登录]
              </div>
              <router-link to="/signup" class="red ml10">[免费注册]</router-link>
            </li>
            <li v-if="isLogin == false">
              <router-link to="/user" class="hd_menu">
                <span style="color: #666;">欢迎您&nbsp;</span>
                <span style="text-decoration: underline;">{{ memberData.memberTruename }}</span>
              </router-link>
              <span class="ml10 login-out" @click="loginOut">退出</span>
            </li>
            <li class="hd_menu_tit">
              <router-link :to="isLogin == false ? '/user' : '/login'" class="hd_menu">
                <Icon type="android-person"></Icon>
                个人中心
              </router-link>
            </li>
            <li class="hd_menu_tit">
              <router-link to="/myuser/goodsFavIndex">我收藏的商品</router-link>
            </li>
            <li class="hd_menu_tit">
              <router-link to="/">首页</router-link>
            </li>
            <li class="hd_menu_tit">
              <router-link to="#">公司简介</router-link>
            </li>
            <li class="hd_menu_tit">
              <router-link to="#">联系我们</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as common from 'common/common.js';
  import {setStore, getStore, removeStore} from '@/utils/storages.js';
  import * as memberApi from '@/api/memberApi.js';


  let _this = '';
  export default {
    name: "ToolsBar",
    data: () => ({
      isLogin: '',
      memberData: []
    }),
    created() {
      _this = this;
      _this.getMemberData();
      _this.refresh();
    },
    watch: {
      $route() {
        _this.refresh();
      }
    },
    methods: {
      getMemberData() {
        memberApi.memberDetail(false).then(res => {
          if (res.result == 1 && res.data) {
            _this.isLogin == false;
            let data = res.data[0];
            _this.memberData = data;
            setStore('memberData',res.data[0]);
          }
        })
      },
      refresh() {
        if (common.isLogin()) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      },
      loginOut() {
        common.removeToken();
        this.isLogin = true;
        this.$router.push('/')
      },
      gotoLogin() {
        const currentUrl = window.location.href;
        setStore('loginCallback', currentUrl || '/');
        this.$router.push('/login')
      }
    }

  }
</script>
<style lang="less" scoped>
  #top {
    height: 30px;
    line-height: 30px;
    font-family: 新宋体;
    font-size: 12px;
    background: rgb(249, 250, 250);
    border-bottom: 1px solid rgb(215, 215, 215);
    .Inside_pages {
      width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    .Collection {
      float: left;
    }

    .hd_top_manu {
      float: right;
      padding-top: 8px;
      line-height: 21px;
      margin-right: 10px;

      li {
        float: left;
        margin: 0 10px;
      }

      .login {
        color: #2d8cf0;
      }

      .login:hover {
        color: #57a3f3
      }
    }

    .login-out {
      color: #2d8cf0;
      cursor: pointer;
      transition: color .2s ease;
    }

    .login-out:hover {
      color: #57a3f3
    }

    .hd_menu_tit {
      a {
        color: #666;
        transition: all 0.2s;
        position: relative;
        bottom: 0;
      }
      a:hover {
        color: #2d8cf0;
        bottom: 2px;
      }

    }
  }
</style>
