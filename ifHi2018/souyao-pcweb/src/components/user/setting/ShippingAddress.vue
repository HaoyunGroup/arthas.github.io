<template>
  <div class="mt20 clearfix">
    <div class="clearfix">
      <div class="fr">
        <div class="fs12 dib">
          您已创建 <span class="highlighted">{{ addressListData.length }}</span> 个收货地址，最多可创建 <span
          class="highlighted">20</span>
          个
        </div>
        <div class="dib ml10">
          <Button @click="showLayer(null)" type="primary">
            <Icon type="location"></Icon>
            新建地址
          </Button>
        </div>
      </div>
    </div>
    <div class="address-layer">
      <Modal
        title="新建地址"
        v-model="layer"
        :mask-closable="false"
        :closable="false"
      >
        <p slot="header" style="color:#0587cd;">
          <Icon type="location"></Icon>
          <span>新建地址</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="收货人" prop="trueName">
            <Input style="width: 200px;" v-model="formValidate.trueName" placeholder="请填写收货人"></Input>
          </FormItem>
          <FormItem label="所在地区" prop="areaInfo">
            <address-select v-if="layer" style="width: 200px;" :regionData="regionData" @on-change="addressChange"></address-select>
          </FormItem>
          <FormItem label="街道地址" prop="detailedAddress">
            <Input style="width: 300px;" v-model="formValidate.detailedAddress" placeholder="请填写详细地址"></Input>
          </FormItem>
          <FormItem label="邮编" prop="zipCode">
            <Input style="width: 200px;" v-model="formValidate.zipCode" placeholder="请填写邮编"></Input>
          </FormItem>
          <FormItem label="手机号码" prop="mobPhone">
            <Input style="width: 200px;" v-model="formValidate.mobPhone" placeholder="请填写手机号"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="addAddressCancel('formValidate')">取消</Button>
          <Button type="primary" size="large" @click="addAddressOk('formValidate')">确定</Button>
        </div>
      </Modal>
    </div>
    <div class="address-table mt25">
      <Table border :columns="columns" :data="addressListData"></Table>
    </div>

    <Spin size="large" fix style="z-index: 999;" v-if="spinShow"></Spin>
  </div>
</template>
<script>
  import AddressSelect from 'common/components/AddressSelect';
  import * as addressApi from '@/api/addressApi.js';

  let _this = '';
  export default {
    name: "Address",
    components: {
      AddressSelect
    },
    data: () => {
      const addressReg = (rule, value, callback) => {
        let addressData = {
          provinceId: _this.formValidate.provinceId,
          cityId: _this.formValidate.cityId,
          areaId: _this.formValidate.areaId,
          areaInfo: _this.formValidate.areaInfo
        }

        let flag = '';
        for (let key in addressData) {
          if (addressData[key] == '') {
            flag = false;
          } else {
            flag = true;
          }
        }
        if (flag === false) {
          callback(new Error('请选择收货地区'));
        } else {
          callback();
        }
      }
      return {
        layer: false,
        spinShow: false,
        addressId: null,
        columns: [
          {
            title: '收货人',
            key: 'trueName',
          },
          {
            title: '所在地区',
            key: 'areaInfo',
          },
          {
            title: '街道地址',
            key: 'address',
          },
          {
            title: '手机号码',
            key: 'mobPhone',
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              let text = '设为默认';
              let isdisabled = false;
              let btnType = 'primary';
              if (params.index == 0) {
                text = '默认';
                isdisabled = true;
                btnType = 'text';
              }
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: btnType,
                    disabled: isdisabled
                  },
                  on: {
                    click: () => _this.setDefault(params)
                  }
                }, text),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => _this.addressEdit(params)
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        addressListData: [
          {
            trueName: '',
            areaInfo: '',
            address: '',
            mobPhone: ''
          }
        ],
        formValidate: {
          trueName: '',
          areaInfo: '',
          detailedAddress: '',
          zipCode: '',
          mobPhone: '',
          provinceId: '',
          cityId: '',
          areaId: '',
        },
        ruleValidate: {
          trueName: [
            {required: true, message: '请填写收货人', trigger: 'blur'}
          ],
          areaInfo: [{
            required: true,
            validator: addressReg
          }],
          detailedAddress: [
            {required: true, message: '请填写街道地址', trigger: 'blur'}
          ],
          zipCode: [
            {required: true, message: '请填写邮编', trigger: 'blur'},
            {min: 6, message: '请填写正确的邮编', trigger: 'blur'}
          ],
          mobPhone: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {min: 11, message: '请填写正确的手机号', trigger: 'blur'}
          ]
        },
        regionData: []
      }
    },
    created() {
      _this = this;
      _this.getAddressList();
    },
    methods: {
      showLayer(index) {
        this.layer = true;
        if (typeof index === 'number') {
          let data = _this.addressListData[index];
          let formValidate = {
            trueName: data.trueName,
            areaInfo: data.areaInfo,
            detailedAddress: data.address,
            zipCode: data.zipCode,
            mobPhone: data.mobPhone,
            provinceId: data.provinceId,
            cityId: data.cityId,
            areaId: data.areaId,
          }
          _this.formValidate = formValidate
        }
      },
      // 地址选择
      addressChange(sel) {
        if (sel.length >= 3) {
          this.formValidate.provinceId = sel[0].value;
          this.formValidate.cityId = sel[1].value;
          this.formValidate.areaId = sel[2].value;
          this.formValidate.areaInfo = [sel[0].label, sel[1].label, sel[2].label].join(',');
        }
      },
      // 新建地址点击确定
      addAddressOk(name) {
        let formData = this.formValidate;

        this.$refs[name].validate((valid) => {
          if (valid) {
            addressApi.saveAddress({
              address: formData.detailedAddress,
              trueName: formData.trueName,
              mobPhone: formData.mobPhone,
              areaInfo: formData.areaInfo,
              zipCode: formData.zipCode,
              areaId: formData.areaId,
              provinceId: formData.provinceId,
              cityId: formData.cityId,
              addressId: _this.addressId
            }).then(res => {
              if (res.result == 1) {
                _this.getAddressList();
                _this.$Message.success(res.msg + '!');
                _this.layer = false;

              }
            })
          }
        })
      },
      // 点击取消
      addAddressCancel() {
        _this.layer = false;
        _this.formValidate = {}
      },
      // 获取地址列表
      getAddressList() {
        addressApi.addressList().then(res => {
          if (_this.addressListData.length >= 20) {
            return;
          }
          if (res.result == 1 && res.data) {
            _this.addressListData = res.data
          }
        })
      }
      ,
      // 设为默认
      setDefault(params) {
        _this.spinShow = true;
        let index = params.index;
        let addressId = _this.addressListData[index].addressId;
        addressApi.updateAddressDef({
          addressId,
        }).then(res => {
          if (res.result == 1) {
            _this.$Message.success(res.msg + '!');
            _this.getAddressList();
            _this.spinShow = false;
          } else {
            _this.$Message.error(res.msg + '!');
          }
        })
      }
      ,
      // 编辑
      addressEdit(params) {
        let index = params.index;
        let provinceId = this.addressListData[index].provinceId;  // 1
        let cityId = this.addressListData[index].cityId; // 2
        let areaId = this.addressListData[index].areaId; // 3
//        let areaInfo = this.formValidate.areaInfo.split(',');
        let data = [provinceId,cityId,areaId];
        _this.showLayer(index);

        _this.addressId = _this.addressListData[index].addressId;
        _this.regionData = data;
        console.log(_this.regionData)

      }
    }
  }
</script>
<style lang="less" scoped>
  .highlighted {
    color: #fe8415;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
</style>
