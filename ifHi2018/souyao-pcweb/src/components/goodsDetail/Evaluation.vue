<template>
  <div>
    <div class="com-table-main">
      <div class="comments-item" style="border-top:0px" v-for="(item,i) in evaluationData.beanList">
        <table class="com-item-main clearfix" style="width:100%">
          <tbody>
          <tr>
            <td style="width:18%">
              <div class="user-item" style="text-align:left;margin-top:15px;">
                <Rate disabled :value="item.gevalScore" :allow-half="true"></Rate>
                <p>{{ getMoment(item.gevalAddTime,"YYYY-MM-DD HH:mm:ss") }}</p>
              </div>
            </td>
            <td style="width:57%">
              <div class="p-comment mt10">
                <span>{{ item.gevalContent }}</span>
                <div class="slide_show">
                  <ul>
                  </ul>
                </div>
              </div>
            </td>
            <td style="width:15%">
              <div class="type-item">
                <span class="label">{{ item.specInfo }}</span>
              </div>
              <div class="type-item">
                <span class="label"></span>
              </div>
            </td>
            <td style="width:10%">
              <div class="user-item">
                <label class="labels" id="lab1">{{ NameHiding(item.gevalFrommembername) }}</label>
                <p></p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px; float: right;">
        <Page :total="evaluationData.total || total" @on-change="pageChange" :page-size="10" show-elevator></Page>
      </div>
    </div>

  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import moment from 'moment';

  let _this = '';
  export default {
    name: "Evaluation",  // 商品评价
    data: () => ({
      evaluationData: [],
      createTime: '',
      total: 10,
      stopLoading: true
    }),
    props: ['goodsData'],
    created() {
      _this = this;
      this.getGoodsEvaluteList();
    },
    methods: {
      getGoodsEvaluteList(pageNo) {
        goodsApi.goodsEvaluteList({
          goodsId: _this.goodsData.goodsId,
          pageSize: 10,
          pageNo:pageNo
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.evaluationData = res.data[0];
            // 计算数据条数
            if (_this.stopLoading == true) {
              if(res.data[0].beanList.length < 10) {
                _this.stopLoading = false;
              } else {
                _this.total += 10;
              }
            }
          }
        });
      },
      pageChange(n) {
        this.getGoodsEvaluteList(n);
        window.scrollTo(0, 800);
      },
      getMoment(time, format) {
        return moment(time).format(format);
      },
      // 用户名处理
      NameHiding(item) {
        if (item.substring(0,4) == '匿名用户') {
          return item;
        } else {
          return item.substring(0,3) + '****' +item.substring(7,11);
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .com-table-main {
    width: 100%;
    .comments-item {
      padding: 17px 30px;
      border-bottom: dotted 1px #ccc;
      table {
        border-collapse: collapse;
        display: table;
        td, th {
          padding: 5px 10px;
          -webkit-box-sizing: content-box;
          -moz-box-sizing: content-box;
          box-sizing: content-box;
          border: 1px solid #DDD;
        }

        .p-comment {
          width: 500px;
          word-break: break-all;
          word-wrap: break-word;
          margin-left: 15px;

          .slide_show {
            margin-top: 4px;
          }
        }
      }
    }
  }
</style>
