<template>
  <div class="w">
    <div class="nch-category-all">
      <ul>
        <li v-for="item in classList">
          <div class="title">
            <i></i>
            <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }}</router-link>
          </div>

          <dl v-for="item in item.classList">
            <dt>
              <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }}</router-link>
            </dt>
            <dd>
              <span v-for="item in item.classList">
                <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }}</router-link>
              </span>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import {mapMutations} from 'vuex';
  import {getStore} from '@/utils/storages.js';

  let classListData = JSON.parse(getStore('classList'))
  console.log()
  let _this = '';
  export default {
    name: "AllGoodsClass",
    data: () => ({
      classList: []
    }),
    mounted() {
      _this = this;
      // 获取全部分类
      if (classListData != undefined) {
        this.classList = classListData.data;
      } else {
        goodsApi.classList({
          'parentId': 0
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.classList = res.data[0].classList;
          }
        });
      }
    },
    beforeUpdate() {
    }
  }
</script>
<style lang="less" scoped>
  .nch-category-all {
    width: 1200px;
    overflow: hidden;
    margin: 10px auto 0;
    ul {
      font-size: 0;
      width: 1220px;
      margin-left: -20px;
      li {
        vertical-align: top;
        letter-spacing: normal;
        word-spacing: normal;
        display: inline-block;
        width: 1198px;
        margin: 0 0 15px 20px;
        border: solid 1px #E6E6E6;
        overflow: hidden;
        .title {
          padding-left: 25px;
          font: 600 14px/20px "microsoft yahei";
          background-color: #F5F5F5;
          display: block;
          line-height: 35px;
          height: 35px;
          border-bottom: solid 1px #E6E6E6;
        }
        dl {
          line-height: 30px;
          font-size: 0;
          display: block;
          width: 98%;
          margin: -1px auto 0 auto;
          border-top: dotted 1px #E5E5E5;
          dt {
            font-size: 12px;
            vertical-align: top;
            letter-spacing: normal;
            word-spacing: normal;
            text-align: right;
            display: inline-block;
            width: 14%;
            padding: 0;
            overflow: hidden;
            a {
              font-weight: 600;
              color: #0085cd;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: block;
              padding: 4px;
              overflow: hidden;
            }
          }
          dd {
            font-size: 12px;
            vertical-align: top;
            letter-spacing: normal;
            word-spacing: normal;
            display: inline-block;
            padding: 0;
            overflow: hidden;
            width: 1000px;
            a {
              display: inline-block;
              color: #777;
              height: 20px;
              padding: 2px 4px;
              margin: 2px 2px 0 0;
            }
          }
        }
      }
    }
  }
</style>
