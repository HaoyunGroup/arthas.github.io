<template>

  <div class="login-form-body">
    <div class="main">
      <div class="login-form">
        <div class="login_top">注册<router-link  class="reg" to="/login">已有账号？立即登录</router-link></div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="username">
            <Input type="text" v-model="formInline.username" placeholder="手机号">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="ConfirmPwd">
            <Input type="password" v-model="formInline.ConfirmPwd" placeholder="确认密码">
            <Icon type="locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Input type="text" v-model="formInline.invitationCode" placeholder="邀请码">
            <Icon type="person-stalker" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="vcode">
            <Input style="width: 40%" type="text" v-model="formInline.vcode" placeholder="验证码"/>
            <img style="vertical-align: middle;" :src="vcodeUrl" alt="">
            <span style="color: blue; vertical-align: middle; cursor: pointer; float: right;"
                  @click="vcodeClick">看不清？换一张</span>
          </FormItem>
          <FormItem prop="phoneVcode">
            <Input style="width: 40%" type="text" v-model="formInline.phoneVcode" placeholder="验证码"/>
            <Button @click="getPhoneVcode">获取手机验证码</Button>
          </FormItem>
          <div>
            <Checkbox v-model="protocol">
              我已看过并接受《<router-link  to="" style="color: red;">用户协议</router-link >》
              <em v-show='!protocol' style="color: red;">请同意协议并勾选</em>
            </Checkbox>
          </div>
          <div style="padding: 10px 0">
            <Button long size="large" type="primary" @click="handleSubmit('formInline')">立即注册</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>

</template>
<script>
  import * as common from 'common/common.js';
  import * as loginApi from '@/api/loginApi.js';
  let _this = '';
  export default {
    name: "Login",
    data() {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入您的密码'));
        } else if (value !== this.formInline.password) {
          callback(new Error('两次输入的密码不匹配！'));
        } else {
          callback();
        }
      };

      return {
        formInline: {
          username: '',
          password: '',
          ConfirmPwd: '',
          invitationCode: '',
          vcode: '',
          phoneVcode: ''
        },
        ruleInline: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          ConfirmPwd: [
            {validator: validatePassCheck},
          ],
          vcode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
          phoneVcode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
          ]
        },
        vcodeUrl: common.IMAGE_DOMAIN + '/generateImage?t=' + Math.random(),
        single: false,
        protocol: true
      }
    },
    components: {
      's-img': Image
    },
    created() {
      _this = this;
    },
    methods: {
      handleSubmit(name) {

        this.$refs[name].validate((valid) => {
          let username = this.formInline.username;
          let password = this.formInline.password;
          let ConfirmPwd = this.formInline.ConfirmPwd;
          let invitationCode = this.formInline.invitationCode;
          let captcha = this.formInline.vcode;
          let phoneVcode = this.formInline.phoneVcode;

          if (valid) {
            if (this.protocol == false) {
              this.$Message.error('请同意协议并勾选《用户协议》');
              return;
            }
            if (this.mobileCode != phoneVcode) {
              this.$Message.error('手机验证码输入错误');
//              return;
            }
            loginApi.register({
              name: username,
              password: password,
              mobile: username
            }).then(res => {
              if (res.result == 1) {
                this.$Modal.success({
                  title: '注册成功',
                  content: '恭喜您！注册成功！',
                  okText: '去登陆',
                  icon: '',
                  onOk: () => {
                    _this.$router.push('/login')
                  }
                });
              } else {
                _this.$Message.error(res.msg);
              }
            })
            console.log('去注册')
          }
        })

      },
      vcodeClick() {
        this.vcodeUrl = common.IMAGE_DOMAIN + '/generateImage?t=' + Math.random();
      },
      getPhoneVcode() {
        loginApi.verifyCode({
          mobile: _this.formInline.username
        }).then(res => {
          if (res.result == 1) {
            _this.mobileCode = res.data.verifyCode;
            _this.$Message.success(res.msg);
          } else {
            _this.$Message.error(res.msg);
          }
        })
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
