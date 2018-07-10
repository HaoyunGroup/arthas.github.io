<template>
  <div class="shop-prescription mt20">
    <div class="shop-prescription-wrap">
      <div class="shop-prescription-title fs14">处方单信息</div>
      <ul class="shop-prescription-ul">
        <li v-for="(item,index) in getData" class="shop-prescription-li mt20">
          <Row>
            <Col class="shop-prescription-info fs14" span="6">
            <div class="mt10">
              <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><span>{{ item.buyName }}</span>
            </div>
            <div class="mt10">
              <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
              <span v-if="item.buySex == 1">男</span>
              <span v-if="item.buySex == 2">女</span>
            </div>
            <div class="mt10">
              <span>联系方式：</span><span>{{ item.buyMobile }}</span>
            </div>
            <div class="mt10">
              <span>提交日期：</span><span>{{ item.createTimeStr }}</span>
            </div>
            </Col>

            <Col class="shop-prescription-images" span="18">
            <ul>
              <li v-for="(item,index) in item.list" @click="showImgLayer(item)">
                <pic :_src="item" _style="vertical-align: middle;"></pic>
              </li>
            </ul>
            </Col>
          </Row>
        </li>
      </ul>
    </div>
    <Modal v-model="imgLayer" width="500">
      <div slot="header" style="text-align:center">&nbsp;</div>
      <div style="text-align:center;">
        <pic :_src="layerImgSrc" _style="vertical-align: middle;"></pic>
      </div>
      <div slot="footer"></div>
    </Modal>

    <div class="fr mt25 pt25">
      <Page :total="total" @on-change="pageChange" :page-size="10" show-elevator></Page>
    </div>
  </div>
</template>
<script>

  import * as prescribedApi from '@/api/prescribedApi.js';
  import Pic from 'common/components/Pic';
  import * as common from 'common/common.js';

  // 未完成： 分页

  let _this = '';
  export default {
    name: "ShopPrescription",
    data: () => ({
      total: 10,
      pageNo: 1,
      getData: [],
      imgLayer: false,
      layerImgSrc: ''
    }),
    components: {
      Pic
    },
    created() {
      _this = this;
      this.getList();
      console.log(this.$layer)
    },
    methods: {
      pageChange() {

      },
      getList() {
        let pageNo = this.pageNo;
        prescribedApi.getPrescriptionList({
          pageNo
        }).then(res => {
          if (res.result == 1 && res.data) {
            console.log(res.data);
            _this.getData = res.data;
          } else if (res.msg.includes('服务器异常')) {
            common.gotoLoginAndBack();
          }
        })
      },
      showImgLayer(src) {
        this.imgLayer = true;
        this.layerImgSrc = src;
      }
    }
  }
</script>
<style lang="less" scoped>
  .shop-prescription-wrap {
    border: #e5e5e5 1px solid;
    .shop-prescription-title {
      border-bottom: #e5e5e5 1px solid;
      padding: 5px 20px;
      background-color: #e6fcff;

    }

    .shop-prescription-ul {
      padding: 10px 20px;
    }
    .shop-prescription-li {
      padding: 5px 20px;
      border: #eee 1px solid;

      .shop-prescription-info {
        height: 130px;
      }

      .shop-prescription-images {
        height: 130px;
        ul {
          height: 100%;
          display: flex;
          li {
            height: 100%;
            width: 20%;
            margin-left: 5px;
            border: 2px dashed #eee;
            overflow: hidden;
            & > div {
              height: 100%;
            }
            & > div:after {
              display: inline-block;
              content: '';
              height: 100%;
              vertical-align: middle;
            }
          }

        }
      }
    }
  }
</style>
