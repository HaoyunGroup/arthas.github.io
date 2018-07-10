<template>
  <div class="consult">
    <p style="font-size: 14px;">
      <Icon size="20" color="#0084cc" type="ios-information"></Icon>&nbsp;&nbsp;购买之前，如有问题，请先咨询。
    </p>
    <div class="mt15">
      <Button @click="showConsult = !showConsult; ConsultTxt = '';" style="font-size: 14px;" type="primary"
              icon="social-whatsapp-outline">我要咨询
      </Button>
    </div>
    <div v-show="showConsult" class="text-area mt15">
      <Input v-model="ConsultTxt" :maxlength="150" type="textarea" :rows="4" placeholder="请您输入要咨询的内容..."></Input>
      <p>※ 请输入不要超过 150 个字</p>
      <div class="mt10">
        <Button @click="consultSubmit" :disabled="ConsultTxt == ''">提交</Button>
      </div>
    </div>
    <div class="mt15" style="border-bottom: dashed 2px #ccc;"></div>
    <!-- 咨询列表展示 -->
    <div>
      <div class="c_comment" v-for="(item,i) in consultList">
        <ul>
          <li class="comment_one">
            <div class="advisory_left">网<i class="pl25"></i>友：</div>
            <div style="display: inline-block; width: 100px;"> {{ NameHiding(item.cmemberName) }}</div>
            <i class="pl25"></i>
            <span>{{ item.consultAddtimeStr }}</span>
          </li>
          <li class="comment_two">
            <div class="advisory_left">咨询内容：</div>
            <div class="advisory_center">
              {{ item.consultContent }}
            </div>
          </li>
          <li class="comment_three" v-show="item.consultReply && item.consultReply != ''">
            <div class="advisory_left">咨询回复：</div>
            <div class="advisory_center">
              {{ item.consultReply }}
            </div>
          </li>
        </ul>
        <div class="mt15" style="border-bottom: dotted 1px #ccc;"></div>
      </div>
      <div style="padding-top: 40px; float: right;">
        <Page :total="total" @on-change="pageChange" :page-size="10" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';

  let _this = '';
  export default {
    name: "Consult", // 商品咨询
    data: () => ({
      ConsultTxt: '',
      showConsult: false,
      consultList: [],
      total: 10,
      stopLoading: true
    }),
    props: ['goodsData'],
    created() {
      _this = this;
      _this.getConsultList(1);
    },
    methods: {
      consultSubmit() {
        goodsApi.saveConsult({
          goodsId: _this.goodsData.goodsId,
          cgoodsName: _this.goodsData.goodsName,
          consultContent: _this.ConsultTxt
        }).then(res => {
          if (res.result == 1) {
            _this.ConsultTxt = '';
            _this.showConsult = false;
            _this.$Message.success(res.msg);
            _this.getConsultList(1);
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 咨询列表
      getConsultList(pageNo) {
        goodsApi.goodsConsultList({
          goodsId: _this.goodsData.goodsId,
          pageNo: pageNo,
          pageSize: 10
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.consultList = res.data;

            // 计算数据条数
            if (_this.stopLoading == true) {
              if (res.data.length < 10) {
                _this.stopLoading = false;
              } else {
                _this.total += 10;
              }
            }
          }
        })
      },
      // 保存咨询

      // 用户名处理
      NameHiding(item) {
        if (item.substring(0, 2) == '匿名') {
          return item;
        } else {
          return item.substring(0, 3) + '****' + item.substring(7, 11);
        }
      },
      pageChange(n) {

        this.getConsultList(n);
        window.scrollTo(0, 800);
      },
    },

  }
</script>
<style lang="less" scoped>
  .consult {
    padding: 20px;

    .text-area {
      width: 400px;

    }
    .c_comment {
      margin: 15px 0;
      .comment_one {
        font-size: 12px;
        color: #666;
      }
      .comment_two {
        font-size: 12px;
        color: #666;

      }
      .advisory_left {
        width: 62px;
        line-height: 25px;
        height: auto;
        display: inline-block;
      }
      .advisory_center {
        width: 800px;
        height: auto;
        line-height: 26px;
        display: inline-block;
      }

    }
  }
</style>
