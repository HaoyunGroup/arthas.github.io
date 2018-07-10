<template>
  <div class="w">
    <!-- 商品信息 -->
    <div class="section_main">
      <!-- 展示图片 -->
      <div class="section_img fl">
        <div class="detail_img">
          <div class="origin_img">
            <!--<pic class="goods-big-img" :_src="goodsImage" _style="vertical-align: middle;"></pic>-->
            <img-zoom class="goods-big-img" :src="'http://shop.souyaoxf.com' + goodsImage" :bigsrc="'http://shop.souyaoxf.com' + goodsImage" ></img-zoom>
          </div>

          <div class="detail_slide small">
            <div class="arrow fl"><</div>
            <div class="fl" style="overflow: hidden; width: 330px;">
              <ul ref="">
                <li :class="{'active': active == i}" @mouseenter="goodsCallyListHover(i)"
                    v-for="(item,i) in goodsCallyList">
                  <pic :_src="item" style="height: 100%;"></pic>
                </li>
              </ul>
            </div>
            <div @click="rightArrowClick" class="arrow fr">></div>
          </div>
          <div id="jiathis">
            <!-- JiaThis Button BEGIN -->
            <div class="jiathis_style fl">
              <span class="jiathis_txt">分享到：</span>
              <a class="jiathis_button_qzone"></a>
              <a class="jiathis_button_tsina"></a>
              <a class="jiathis_button_tqq"></a>
              <a class="jiathis_button_weixin"></a>
              <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis"
                 target="_blank"></a>
            </div>
            <!-- JiaThis Button END -->
            <div @click="handleCollection" class="collection fr" style="font-size: 12px;">
              <div v-if="isFav == 0">
                <label style="cursor: pointer;">
                  <Icon class="vam" size="16" color="gold" type="android-star-outline"></Icon>
                  <span class="vam">收藏商品</span>
                </label>
              </div>
              <div v-if="isFav == 1">
                <label style="cursor: pointer;">
                  <Icon class="vam" size="16" color="gold" type="android-star"></Icon>
                  <span class="vam">收藏商品</span>
                </label>
              </div>
            </div>
          </div>


        </div>
      </div>
      <!--展示图片 结束-->
      <div class="section_buy fl">
        <!--标题-->
        <p class="bm">{{ goodsData.goodsName }}</p>
        <!--副标题-->
        <p class="bp">{{ goodsData.goodsSubtitle }}</p>
        <!-- 商品规格 -->
        <div class="goods_info">
          <!-- 价格 -->
          <div class="Price clearfix">
            <div class="tip1 fl">
              <div class="summary_price">
                <div class="dt">价<em class="pl25"></em>格：</div>
                <div class="dg" nctype="goods_price">￥{{ goodsData.goodsStorePrice }}</div>
              </div>
              <div class="summary_price">
                <div class="dt">市<em class="pl5"></em>场<em class="pl5"></em>价:</div>
                <div class="dh" nctype="market_price">￥{{ goodsData.goodsMarketPrice }}</div>
              </div>
              <div class="summary_price">
                <div class="dt">运<em class="pl25"></em>费:</div>
                <div v-show="goodsData.goodsTransfeeCharge == 0" class="dh">
                  买家承担运费
                </div>
                <div v-show="goodsData.goodsTransfeeCharge == 1" class="dh">
                  卖家家承担运费
                </div>
              </div>
            </div>
            <div class="tip2 fr">
              <span><label>商品类型</label></span><br>
              <span v-show="goodsData.goodsForm == 2">非处方药</span>
              <span v-show="goodsData.goodsForm == 1">处方药</span>
            </div>
            <div class="tip2 fr">
              <span><label>累计售出</label></span><br>
              <span>{{ goodsData.salenum }}</span>
            </div>
          </div>
          <div style="margin:10px 0;"></div>
          <!-- 优惠 -->
          <div class="buy-list">
            <div v-show="couponlist.length > 0">
              <div class="list_left">领<em class="pl25"></em>券:</div>
              <div class="list_right" style="width: 550px">
                <p class="fl" style="margin-right: 10px;" v-for="item in couponlist">
                  <em class="information"> {{ item.description }}</em>
                </p>
              </div>
            </div>
            <br>
            <div v-show="goodsData.shopActivityList.length > 0">
              <div class="list_left">促销信息:</div>
              <div class="list_right" style="height: 74px;overflow: hidden;">
                <p class="text_a" v-for="item in goodsData.shopActivityList">
                  <em class="information"> {{ item.activityName }}</em>
                  &nbsp;{{ item.activityDescription }}
                </p>
                <div class="cuxiao_show"></div>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <!-- 规格 -->
          <div class="buy-list mt10" v-show="endSpecId != '' || endSpecName != ''">
            <div class="list_left">{{ goodsData.specName[specNameKey] }}:</div>
            <div class="list_right">
              <div class="back_service">
                <!-- 文字类型规格-->
                <span :class="{'hovered': hovered == i}"
                      v-for="(item,i) in goodsData.goodsSpecValueAll[specNameKey]"
                      style="min-width: 20px" @click="hoveredClick(i, item.spValueId, item.spValueName)">
                  <label>{{ item.spValueName }}</label>
                </span>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <!-- 商品规格结束 -->
        <!--处方药不显示购买数量，非处方药才显示购买数量-->
        <div style="margin: 15px 0;">
          <div class="list_left">购买数量：</div>
          <div class="list_right">
            <div class="change_num">
              <span class="decrease" @click="decrease">-</span>
              <input type="text" v-model="buyNum">
              <span class="increase" @click="increase">+</span>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <!-- 提示 -->
        <div class="buy-list" v-show="endSpecName != ''">
          <div class="list_left" style="height: 30px; line-height: 30px; padding-top: 3px">提示:</div>
          <div class="list_right">
            <div class="prompt">您选择了：
              {{ endSpecName }}
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <!-- 操作 -->
        <div v-show="goodsData.goodsForm == 2" class="section_btn fl">
          <Button @click="buyNow" class="btn" type="primary" size="large">立即购买</Button>
          <Button @click="addCart" class="btn btn2" size="large">加入购物车</Button>
        </div>
        <div v-show="goodsData.goodsForm == 1" class="section_btn fl">
          <Button class="btn" type="primary" size="large">上传处方单</Button>
          <Button class="btn btn2" size="large">电话咨询</Button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Pic from 'common/components/Pic';
  import {mapState} from 'vuex';
  import * as goodsApi from '@/api/goodsApi.js';
  import * as cartApi from '@/api/cartApi.js';
  import imgZoom from 'common/components/ImgZoom';

  let temp = [];
  let _this = '';

  // 未完成： 加入购物车、 上传处方单、 电话咨询

  export default {
    name: "GoodsInfo",
    data: () => ({
      goodsImage: '',
      goodsCallyList: [],
      active: 0,
      specNameKey: '',
      hovered: 0,
      endSpecId: '',
      endSpecName: '',
      buyNum: 1,
      couponlist: [],
      isFav: 0,
      configs: {
        width:600,
        height:600,
        maskWidth:100,
        maskHeight:100,
        maskColor:'red',
        maskOpacity:0.2
      }

    }),
    components: {
      Pic,
      imgZoom
    },
    props: ['goodsData'],
    created() {
      temp = this.goodsData;
      _this = this;
      this.goodsImage = temp.goodsImage;
      this.goodsCallyList = temp.goodsCallyList;
      this.isFav = temp.isFav;
      for (let key in temp.specName) {
        this.specNameKey = key
      }
      if (temp.goodsSpecValueAll[this.specNameKey] != undefined) {
        this.endSpecId = temp.goodsSpecValueAll[this.specNameKey][0].spValueId;
        this.endSpecName = temp.goodsSpecValueAll[this.specNameKey][0].spValueName;
      }
      // 获取优惠券
      goodsApi.couponlist({
        storeId: temp.storeId
      }).then(res => {
        if (res.result == 1 && res.data) {
          _this.couponlist = res.data
        }
      })
    },
    mounted() {
      this.init();
    },
    methods: {
      // 商品图片显示
      goodsCallyListHover(i) {
        this.goodsImage = this.goodsCallyList[i];
        this.active = i;
      },
      // 规格选择
      hoveredClick(i, specGoodsSpec, specGoodsName) {
        this.hovered = i;
        let goodsId = temp.goodsId;
        this.endSpecId = specGoodsSpec
        this.endSpecName = specGoodsName
        goodsApi.getGoodsSpec({
          goodsId,
          specGoodsSpec
        }).then(res => {
          // ....
        })
      },
      // 商品数量操作
      decrease() {
        if (this.buyNum <= 1) {
          return;
        }
        this.buyNum--;
      },
      increase() {
        this.buyNum++;
      },
      // 分享设置
      init: function () {
        let url = 'http://v3.jiathis.com/code_mini/jia.js'
        let script = document.createElement('script')
        let configScript = document.createElement('script')
        let configHtml = 'var jiathis_config = {\n' +
          '  siteNum:2,\n' +
          '  sm:"renren,ishare",\n' +
          '  title: "' + this.goodsData.goodsName + '",\n' +
          '  url: " ' + location.href + '",\n' +
          '  pic: "http://shop.souyaoxf.com' + this.goodsImage + '",\n' +
          '  summary:"搜药先锋",\n' +
          '  shortUrl:false,\n' +
          '  hideMore:false\n' +
          '}';
        configScript.innerHTML = configHtml;
        script.setAttribute('src', url)
        document.getElementById('jiathis').appendChild(configScript)
        document.getElementById('jiathis').appendChild(script)
      },
      rightArrowClick() {

      },
      // 处理收藏操作
      handleCollection() {
        goodsApi.storecollection({
          favType: 1,
          goodsId: temp.goodsId
        }).then(res => {
          if (res.result == 1) {
            _this.isFav = res.isfav;
          }
        });
      },
      // 立即购买
      buyNow() {

        cartApi.addCart({
          goodsId:temp.goodsId,
          count: _this.buyNum,
          specId: temp.specId,
          saveType: 1
        }).then(res => {
          if (res.result == 1 && res.data) {
            _this.$router.push({name: 'OrderConfirm', params: {cartIds: res.data[0].cartIds}})

          } else {
            this.$Modal.error({
              title: '提示',
              content: res.msg,
            });
          }
        })
      },
      // 加入购物车
      addCart() {
        cartApi.addCart({
          goodsId: temp.goodsId,
          count: _this.buyNum,
          specId: temp.specId,
          saveType: 0
        }).then(res => {
          if (res.result == 1 && res.data) {
            this.$Modal.success({
              title: '',
              closable: true,
              content: '成功加入到购物车',
            });
          } else {
            this.$Modal.error({
              title: '提示',
              content: res.msg,
            });
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./goodsInfo.less";
</style>
