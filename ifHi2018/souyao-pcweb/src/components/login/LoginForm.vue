<template>

  <div class="login-form-body">
    <div class="main">
      <div class="login-form">
        <div class="login_top">登录
          <router-link class="reg" style="color: #c40000;" to="/signUp">立即注册</router-link>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <!--<FormItem prop="vcode">-->
          <!--<Input style="width: 40%" type="text" v-model="formInline.vcode" placeholder="验证码"/>-->
          <!--<img style="vertical-align: middle;" :src="vcodeUrl" alt="">-->
          <!--<span style="color: blue; vertical-align: middle; cursor: pointer; float: right;"-->
          <!--@click="vcodeClick">看不清？换一张</span>-->
          <!--</FormItem>-->
          <FormItem>
            <div class="auto_log">
              <Checkbox v-model="single">记住账号</Checkbox>
            </div>
            <div class="forget">
              <router-link to="/forget/index">忘记密码？</router-link>
            </div>
          </FormItem>
          <FormItem>
            <Button :loading="loading" long size="large" type="primary" @click="handleSubmit('formInline')">
              <span v-if="!loading">立即登录</span>
              <span v-else>Loading...</span>
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </div>

</template>
<script>
  import * as common from 'common/common.js';
  import * as loginApi from '@/api/loginApi.js';
  import {setStore, getStore, removeStore} from '@/utils/storages.js';

  let _this = '';
  export default {
    name: "Login",
    data: () => ({
      loading: false,
      formInline: {
        user: '',
        password: '',
        vcode: ''
      },
      ruleInline: {
        user: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
        ],
        vcode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
        ]
      },
      vcodeUrl: common.IMAGE_DOMAIN + '/generateImage?t=' + Math.random(),
      single: false,
    }),
    components: {
      's-img': Image
    },
    created() {
      _this = this;


    },
    methods: {
      handleSubmit(name) {
        this.loading = true;
        this.$refs[name].validate((valid) => {
          let username = this.formInline.user
          let password = this.formInline.password
//          let captcha = this.formInline.vcode
          if (valid) {
            loginApi.login({
              username,
              password,
//              captcha
            }).then((res) => {
              if (res.result == 1) {
                setStore('token', res.data[0].token);
                removeStore('isLogin');
                _this.$Message.info({
                  content: '登录成功！',
                });
                this.loading = false;

                let loginCallback = getStore('loginCallback');

                setStore('memberData',res.data[0]);
                if (loginCallback != undefined) {
                  removeStore('loginCallback');
                  window.location.href = loginCallback;
                } else {
                  window.location.href = '/';
                }
              } else {
                _this.$Message.error({
                  content: res.msg,
                });
                this.loading = false;
              }
            })
          } else {
            _this.$Message.error('登录失败!');
          }
        })

      },
      vcodeClick() {
        this.vcodeUrl = common.IMAGE_DOMAIN + '/generateImage?t=' + Math.random();
      }
    }
  }
</script>
<style lang="less" scoped>
  .login-form-body {
    background: url("/static/images/login_bg.jpg");

    .main {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      height: 500px;

      .login-form {
        position: absolute;
        left: 700px;
        top: 30px;
        width: 328px;
        background: #fff;
        padding: 0 20px;
        .login_top {
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          font-size: 20px;
          .reg {
            float: right;
            width: 80px;
            height: 17px;
            line-height: 17px;
            display: inline-block;
            font-size: 14px;
            color: #c40000;
            margin-top: 12px;
          }
        }
        .auto_log {
          color: #666;
          float: left;
          input {
            margin-right: 5px;
            position: relative;
            top: 2px;
          }
        }
        .forget {
          height: 34px;
          overflow: hidden;
          float: right;
        }
      }
    }
  }
</style>
