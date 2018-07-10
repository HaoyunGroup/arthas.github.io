<template>
  <div class="information clearfix">
    <div class="avatar clearfix pl15">
      <span class="fl">当前头像：</span>
      <div class="avatar-wrap fl ml15">
        <pic :_src="userAvatar"></pic>
      </div>
      <Upload
        :headers="headers"
        name="images"
        accept="images"
        :before-upload="uploadBeforeUpload"
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :format="['jpg','jpeg','png']"
        action="/memberapi/filesUpload"
        :show-upload-list="false"
        :max-size="500"
      >
        <Button class="fl ml15" size="small" icon="ios-cloud-upload-outline" style="margin-top:70px;">上传头像</Button>
      </Upload>
    </div>
    <div class="mt25 form-box">
      <Form ref="formCustom" :model="formValidate" :label-width="80">
        <FormItem label="用户名：" prop="memberNameCode">
          <span>{{ formValidate.memberNameCode }}</span>

        </FormItem>
        <FormItem label="手机号：" prop="memberMobile">
          <span>{{ formValidate.memberMobile }}</span>
        </FormItem>
        <FormItem label="昵称：" prop="realName">
          <Input style="width: 300px;" v-model="formValidate.memberTruename" type="text"></Input>
        </FormItem>
        <!--<FormItem label="真实姓名：" prop="realName">-->
          <!--<Input style="width: 300px;" v-model="formValidate.realName" type="text"></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="邀请码：" prop="inviteCode">-->
          <!--<span>{{ formValidate.inviteCode }}</span>-->
        <!--</FormItem>-->
        <!--<FormItem label="邀请人：" prop="theInvitation">-->
          <!--<span>{{ formValidate.theInvitation }}</span>-->
        <!--</FormItem>-->
        <FormItem label="性别：" prop="gender">
          <RadioGroup v-model="formValidate.memberSex">
            <Radio label="3">保密</Radio>
            <Radio label="2">女</Radio>
            <Radio label="1">男</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="出生日期：" prop="birthday">
          <DatePicker @on-change="getdate" type="date" :value="formValidate.birthday"></DatePicker>
        </FormItem>
        <FormItem label="所在地区：" prop="inTheArea">
          <address-select @on-change="addressChange"></address-select>
        </FormItem>
        <FormItem label="详细地区：" prop="detailedRegion">
          <Input style="width: 400px;" v-model="formValidate.detailedRegion" type="text"></Input>
        </FormItem>


        <FormItem>
          <Button type="primary" @click="handleSubmit">保存修改</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import AddressSelect from 'common/components/AddressSelect';
  import {setStore, getStore, removeStore} from '@/utils/storages.js';
  import Pic from 'common/components/Pic';
  import * as memberApi from '@/api/memberApi.js';


  let _this = '';
  export default {
    name: "Information",
    data: () => ({
      userAvatar: '',
      headers: {"token": getStore('token')},
      formValidate: {
        memberNameCode: '',
        memberMobile: '',
        memberTruename: '',
        realName: '',
        inviteCode: 'ES5GA1BA',
        theInvitation: '张三',
        memberSex: '',
        birthday: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        areaInfo: '',
        inTheArea: {},
        detailedRegion: ''
      },

    }),
    components: {
      AddressSelect,
      Pic
    },
    created() {
      _this = this;
      _this.getMemberDetail()
    },
    methods: {
      // 上传图片钩子函数
      uploadBeforeUpload(e) {
        console.log(e)
        if (e.size > 500000) {
          _this.$Message.error('图片大小超过500kb！')
        }
      },
      uploadProgress(event, file, fileList) {
      },
      uploadSuccess(event, file, fileList) {
        if (event.result == 1) {
          _this.userAvatar = event.data;
          _this.updateMemberInfo()
          _this.$Message.success('上传成功！');
        }
      },
      uploadError(event, file, fileList) {
        _this.$Message.error('上传失败！')
      },
      // 地址选择
      addressChange(sel) {
        if (sel.length >= 3) {
          this.formValidate.provinceId = sel[0].value;
          this.formValidate.cityId = sel[1].value;
          this.formValidate.areaId = sel[2].value;
          this.formValidate.areaInfo = [sel[0].label,sel[1].label,sel[2].label].join(',');
          this.formValidate.detailedRegion = sel[0].label + sel[1].label + sel[2].label;
        }
      },

      getdate(e) {
        _this.formValidate.birthday = e;
      },
      handleSubmit() {
        _this.updateMemberInfo()
      },
      getMemberDetail() {
        memberApi.memberDetail({

        }).then(res => {
          if (res.result == 1 && res.data) {
            let data = res.data[0]
            this.userAvatar = data.memberAvatar;
            this.formValidate.memberMobile = data.memberMobile;
            this.formValidate.memberNameCode = data.memberNameCode;
            this.formValidate.memberTruename = data.memberTruename;
            this.formValidate.memberSex = data.memberSex;
            this.formValidate.birthday = data.memberBirthdaystr;
          }
        })
      },
      updateMemberInfo() {
        memberApi.updateMemberInfo({
          nichen: _this.formValidate.memberTruename,
          birthday: _this.formValidate.birthday,
          sex: _this.formValidate.gender,
          imgUrl: _this.userAvatar
        }).then(res => {
          if(res.result == 1) {
            _this.$Message.success(res.msg);
            _this.getMemberDetail();
          } else {
            _this.$Message.success(res.msg);
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .information {
    padding: 40px 60px;
    font-size: 12px;

    .avatar-wrap {
      width: 100px;
      height: 100px;
    }

    .form-box {
    }
  }
</style>
