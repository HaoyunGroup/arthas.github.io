<template>
  <div class="header_nav">
    <div class="w">
      <div class="all_class" @mouseenter="showClassBox" @mouseleave="hideClassBox">
        <div class="classTitle">
          <router-link to="/all/class" class="button_show">全部商品分类</router-link>
        </div>
        <div v-show="isShowClassBox" class="hd_allsort_out_box_new">
          <ul class="Menu_list">
            <li @mouseenter="showMenvDetail" @mouseleave="hideMenvDetail" ref="menvDetail" class="name"
                v-for="(item, index) in classList">
              <div class="Menu_name">
                <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }}</router-link>
                <div class="menv_Detail">
                  <div class="cat_pannel">
                    <div class="hd_sort_list" style="height: 100%; overflow-y: auto;">
                      <dl v-for="item in item.classList">
                        <dt>
                          <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }} <i>></i>
                          </router-link>
                        </dt>
                        <dd v-for="item in item.classList">
                          <router-link :to="'/goodsSearch/gcIdSearch/' + item.gcId">{{ item.gcName }}</router-link>
                        </dd>
                      </dl>
                    </div>
                    <div class="brands" style="height: 100%; overflow-y: auto;">
                      <ul>
                        <li v-for="item in item.classList">
                          <div v-for="item in item.brandList">
                            <router-link :to="'/goodsSearch/BrandIdSearch/' + item.brandId">
                              <Pic _style="border: 1px solid #eee; margin-bottom: 5px;" :_src="item.brandPic"
                                   :_alt="item.brandName"></Pic>
                            </router-link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="navigation">
        <ul class="navigation_name">
          <li class="on">
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/all/brands">品牌</router-link>
          </li>
          <li>
            <router-link to="/goodsSearch">最新商品</router-link>
          </li>
          <!--<li>-->
            <!--<router-link to="">团购特惠</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="">专题</router-link>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import * as goodsApi from '@/api/goodsApi.js';
  import Pic from 'common/components/Pic';

  export default {
    name: "HeaderNav",
    data: () => ({
      classList: [],
      isShowClassBox: false
    }),
    components: {
      Pic
    },
    created() {
      let _this = this;
      // 获取全部分类
      goodsApi.classList({
        'parentId': 0
      }).then(res => {
        if (res.result == 1 && res.data) {
          _this.classList = res.data[0].classList;
          _this.$store.commit('SET_CLASS_LIST', {data: res.data[0].classList})
        }
      });
    },
    watch: {
      $route() {
        if (this.$route.path != '/') {
          this.isShowClassBox = false;
        }
      }
    },
    methods: {
      showMenvDetail(e) {
        e.target.children[0].children[1].style = 'display: block'
      },
      hideMenvDetail(e) {
        e.target.children[0].children[1].style = 'display: none'
      },
      showClassBox() {
        if (this.$route.path == '/') {
          this.isShowClassBox = true;
        }
      },
      hideClassBox() {
        this.isShowClassBox = false;
      }
    }
  }
</script>
<style lang="less" scoped>
  .header_nav {
    height: 40px;
    line-height: 40px;
    background-color: #0085cd;

    .all_class {
      float: left;
      padding: 0 20px;
      position: relative;
      a {
        color: #fff;
      }

      .button_show {
        font-weight: 700;
      }
    }

    .navigation {
      float: left;
      height: 40px;

      ul {
        li {
          float: left;
          padding: 0px 30px;
          line-height: 40px;
          position: relative;
          color: #fff;
        }

        a {
          font-size: 16px;
          color: #ffffff;
          font-weight: 700;
        }
      }
    }

    .hd_allsort_out_box_new {
      position: absolute;
      top: 40px;
      left: -25px;
      height: 420px;
      background: #0085cd;
      clear: left;
      width: 200px;
      overflow: visible;
      z-index: 999;
      /*display: none;*/
      .Menu_list {

        .name {
          padding-left: 2px;
          border-bottom: 1px solid #0372af;
          text-decoration: none;
        }

        .Menu_name {
          padding: 0px 10px;
          line-height: 43.5px;
        }

        li {
          .menv_Detail {
            width: 630px;
            height: 420px;
            overflow: hidden;
            left: 200px;
            top: 0px;
            padding: 10px;
            background: #FFFFFF;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            position: absolute;
            z-index: 20;
            display: none;
            .cat_pannel {
              text-align: left;
              height: 400px;
              .hd_sort_list {
                float: left;
                padding-left: 20px;
                margin-left: -1px;
                width: 350px;
                height: 380px;
                margin-right: 10px;
                overflow: hidden;
                border-right: 1px solid rgb(221, 221, 221);
                dl {
                  width: 100%;
                  overflow: hidden;
                  line-height: 2em;
                  margin: 5px 0px;
                }

                dt {
                  position: relative;
                  float: left;
                  width: 75px;
                  padding: 0 20px 0 0;
                  text-align: right;
                  background: #0085cd;
                  border-radius: 5px;
                  margin-right: 10px;
                  a {
                    display: block;
                    font-size: 12px;
                    /*color: #ec124a;*/
                    color: #fff;
                    position: relative;
                  }

                  i {
                    position: absolute;
                    top: 0px;
                    right: -10px;
                    width: 4px;
                    height: 14px;
                  }
                }

                dd {
                  float: left;
                  line-height: 18px;
                  /*width: 245px;*/
                  padding-bottom: 10px;
                  border-bottom: 1px dotted #ddd;
                  a {
                    font-size: 12px;
                    border-right: 1px dotted #ddd;
                    display: block;
                    float: left;
                    padding: 0px 5px;
                    margin: 3px 0px;
                    color: #666666;
                  }

                  a:hover {
                    color: #0085cd;
                  }
                }
              }
            }
          }

          .brands {
            width: 240px;
            float: left;
            margin-left: 10px;
            img {
              height: 100%;
            }
          }
        }

        li.name:hover {
          background-color: #fff;
          border-left: 5px solid #0085cd;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          a {
            color: #0085cd;
          }
        }
      }
    }
  }
</style>
