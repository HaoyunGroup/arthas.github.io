<template>
  <div class="class-sider">
    <div class="fl" style="width: 200px;">
      <div class="fl_tit" style="border-top:#e5e5e5 1px solid;">
        <Icon type="navicon-round" style="color: #0084CC;"></Icon>
        <label>全部产品分类</label>
      </div>
      <ul class="fl_ul">
        <li class="show_btn" v-for="(item,i) in classList">
          <div @click="showNext(i, null)" class="class_img_click">
            <Icon type="plus-circled" color="#ccc"></Icon>
          </div>
          <p class="tree_title">
            <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">
              {{ item.gcName }}
            </router-link>
          </p>
          <div v-show="hideIndex[i] == true" style="padding: 10px 0 18px 15px;">
            <ul class="fl_ul">
              <li class="show_btn" v-for="(item,ti) in item.classList">
                <div @click="showNext(i, ti)" class="class_img_click">
                  <Icon type="plus-circled" color="#ccc"></Icon>
                </div>
                <p class="button_show">
                  <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId" style="padding-top: 10px;">
                    {{ item.gcName }}
                  </router-link>
                </p>
                <div v-show="tHideIndex[ti] == true" class="llist_s">
                  <ul>
                    <li v-for="item in item.classList">
                      <Icon type="minus-circled" color="#ccc"></Icon>
                      <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId" style="padding-top: 10px;">
                        {{ item.gcName }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import {mapMutations} from 'vuex';
  import {getStore} from '@/utils/storages.js';

  let classListData = JSON.parse(getStore('classList'));

  let _this = '';
  export default {
    name: "ClassSider",
    data: () => ({
      classList: [],
      hideIndex: [],
      tHideIndex: [],
      index: ''
    }),
    created() {
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
    methods: {
      showNext(i, ti) {
        if (i != this.index) {
          this.$set(this.hideIndex, this.index, false)
          this.tHideIndex = []
        }
        if (ti == null) {
          if (this.hideIndex[i]) {
            this.$set(this.hideIndex, i, false)
          } else {
            this.$set(this.hideIndex, i, true)
          }
        } else {
          if (this.tHideIndex[ti]) {
            this.$set(this.tHideIndex, ti, false)
          } else {
            this.$set(this.tHideIndex, ti, true)
          }
        }
        this.index = i;
      },
    }
  }
</script>
<style lang="less" scoped>
  .class-sider {
    width: 200px;
    border-left: 1px solid #EEEDEB;
    border-right: 1px solid #EEEDEB;
    overflow: hidden;
    a {
      color: #666666;
    }

    a:hover {
      color: #0084CC;
    }

    .fl_tit {
      font-size: 16px;
      border-bottom: 1px solid #EEEDEB;
      height: 42px;
      line-height: 44px;
      padding-left: 28px;
      background-color: #f5f5f5;
    }

    .fl_ul {
      p {
        cursor: pointer;
        font-size: 13px;
        height: 42px;
        line-height: 44px;
        padding-left: 45px;
        border-bottom: 1px solid #e5e5e5;

        a {
          line-height: 43px;
        }
      }
    }

    .class_img_click {
      position: relative;
      top: 10px;
      left: 15px;
      cursor: pointer;
      float: left;
    }

    .llist_s {
      ul {
        li {
          padding-left: 44px;
          font-size: 12px;
          line-height: 26px;
        }
      }
    }
  }
</style>
