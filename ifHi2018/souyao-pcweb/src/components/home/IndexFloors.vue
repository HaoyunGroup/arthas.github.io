<template>
  <div class="w mt20">
    <div v-for="item in floorData" class="p_Section clearfix">
      <div class="Section_title" name="floor_1">
        <!--展示8个楼层-->
        <div class="logo_bts">
          <img src="/static/images/souyao_imgs/floor-bg.png">
          <span class="y_img"></span>
          <span class="y_name">{{ item.floorName }}</span>
        </div>
      </div>
      <div class="Section_info clearfix">
        <!--产品列表-->
        <div class="pro_list">
          <ul class="goods_list">
            <li v-for="(item,index) in item.goodsList" v-if="index <= 5">
              <router-link :to="'/goodsDetail/' + item.specId" target="_blank">
                <pic :_src="item.goodsImage" _style="width: 180px; height: 150px;"></pic>
              </router-link>
              <div class="text_btt">
                <dl class="cl">
                  <dt>
                    <p>{{ item.goodsName }}</p>
                  </dt>
                  <dd>
                    <span><i style="font-size: 12px;">￥</i>0.01</span>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <!--楼层中品牌显示，即分类下的品牌-->
          <!--<div class="logo_img">-->
            <!--<ul>-->
              <!--&lt;!&ndash;显示4张&ndash;&gt;-->
              <!--<li><a href="/search/goodsSearch?searchType=BrandIdSearch&amp;keyword=15"><img-->
                <!--src="http://shop.souyaoxf.com/upload/img/brand/1507878853163.jpg" alt="北京同仁堂药业"></a></li>-->
            <!--</ul>-->
          <!--</div>-->
        </div>
        <!-- 右侧广告-->
        <div class="pro_ad_slide">
          <div class="bd">
            <ul>
              <!--显示1张-->
              <li v-if="item.bannerImg != '' && item.bannerImg != null">
                <router-link to="">
                  <pic :_src="item.bannerImg" _style="width: 380px;"></pic>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as indexApi from '@/api/indexApi.js';
  import Pic from 'common/components/Pic';

  let _this = this;
  export default {
    name: "IndexFloors",
    data: () => ({
      floorData: []
    }),
    components: {
      Pic
    },
    created() {
      _this = this;
      this.getFloorData();
    },
    methods: {
      getFloorData() {
        indexApi.indexListAll().then(res => {
          let data = res.map(item => {
            return JSON.parse(item)
          })
          this.floorData = data;
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .p_Section {
    margin-bottom: 20px;

    .Section_title {
      height: 40px;
      line-height: 40px;
      border-bottom: 3px solid #a3e2ff;
      .logo_bts {
        position: relative;
        .y_img {
          position: absolute;
          left: 10px;
          top: 9px;
          color: #fff;
          font-size: 20px;
        }

        .y_name {
          position: absolute;
          left: 42px;
          top: -1px;
          color: #fff;
          font-size: 20px;
        }
      }
    }

    .Section_info {
      .pro_list {
        float: left;
        width: 820px;
        padding-top: 10px;
        .goods_list {
          height: 454px;
          li {
            float: left;
            border: 1px solid #ddd;
            margin-right: -1px;
            margin-top: -1px;
            padding: 6px;
            height: 214px;
            width: 260px;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
            -webkit-box-sizing: content-box;
            -moz-box-sizing: content-box;
            box-sizing: content-box;
            .text_btt {
              dl {
                dt {
                  float: left;
                  width: 180px;
                  padding-left: 10px;
                  width: 120px;
                  p {
                    height: 40px;
                    font-size: 14px;
                    color: rgb(153, 153, 153);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    word-break: break-all;
                    overflow: hidden;
                  }
                }
                dd {
                  float: right;
                  width: 100px;
                  span {
                    color: red;
                    font-size: 24px;
                    font-weight: 600;
                    font-family: 微软雅黑;
                  }
                }
              }
            }
          }
        }
        .logo_img {
          ul {
            li {
              width: 192px;
              float: left;
              height: 70px;
              border: 1px solid #ddd;
              margin-right: -1px;
              margin-top: -1px;
              padding: 6px;
              text-align: center;
              vertical-align: middle;
              display: table-cell;
              -webkit-box-sizing: content-box;
              -moz-box-sizing: content-box;
              box-sizing: content-box;
            }
          }
        }
      }
      .p_Section .Section_info .pro_ad_slide {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        width: 330px;
        height: 530px;
        float: right;
        position: relative;
        margin-right: 48px;
        margin-top: 10px;
      }
    }
  }
</style>
