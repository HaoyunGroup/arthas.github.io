<template>
  <div>
    <slogen></slogen>
    <div class="footerbox clearfix w">
      <div class="foot_list1 clearfix">
        <ul>
          <li class="foot_logo">
            <img src="/static/logo.png"/>
          </li>
          <li class="foot_item">
            <div class="foot_list2 clearfix">
              <dl>
                <dt>店主之家</dt>
                <dd><a href="/front/help/index?acId=1" title="改变网店命运" target="_blank">改变网店命运</a></dd>
                <dd><a href="/front/help/index?acId=1" title="店铺入驻" target="_blank">店铺入驻</a></dd>
                <dd><a href="/front/help/index?acId=1" title="广告合作" target="_blank">广告合作</a></dd>
                <dd><a href="/front/help/index?acId=1" title="团购业务范围" target="_blank">团购业务范围</a></dd>
              </dl>
              <dl>
                <dt>新手上路</dt>
                <dd><a href="/front/help/index?acId=2" title="购物车常见问题和购物技巧" target="_blank">购物车常见问题和购物技巧</a></dd>
                <dd><a href="/front/help/index?acId=2" title="联系我们" target="_blank">联系我们</a></dd>
                <dd><a href="/front/help/index?acId=2" title="如何网购而不受骗" target="_blank">如何网购而不受骗</a></dd>
                <dd><a href="/front/help/index?acId=2" title="正确网购" target="_blank">正确网购</a></dd>
              </dl>
              <dl>
                <dt>支付方式</dt>
                <dd><a href="/front/help/index?acId=3" title="其他支付方式" target="_blank">其他支付方式</a></dd>
                <dd><a href="/front/help/index?acId=3" title="货到付款" target="_blank">货到付款</a></dd>
                <dd><a href="/front/help/index?acId=3" title="余额支付" target="_blank">余额支付</a></dd>
                <dd><a href="/front/help/index?acId=3" title="目前的支付方式" target="_blank">目前的支付方式</a></dd>
              </dl>
              <dl>
                <dt>配送方式</dt>
                <dd><a href="/front/help/index?acId=4" title="机构当日达服务说明" target="_blank">机构当日达服务说明</a></dd>
                <dd><a href="/front/help/index?acId=4" title="邯郸烟台威海增加“次日达”服务" target="_blank">邯郸烟台威海增加“次日达”服务</a></dd>
                <dd><a href="/front/help/index?acId=4" title="关于配送" target="_blank">关于配送</a></dd>
                <dd><a href="/front/help/index?acId=4" title="运费计算" target="_blank">运费计算</a></dd>
              </dl>
            </div>

          </li>
          <li class="foot_erwm">
            <img src="http://shop.souyaoxf.com//upload/logo/1506411336146.png">
            <p>&nbsp;&nbsp;微信官方商城</p>
          </li>
        </ul>
      </div>
      <div class="text_link">
        <p>搜药－国家药监局认证的合法网上药店，致力于打造优质、低价、便捷的网上药店和最值得信赖的健康服务平台
          版权所有 Copyright©2006-2017 www.souyao.cn All rights reserved</p>
        <p>
          <a href="#">互联网药品交易服务资格证书</a>｜ <a href="#">企业营业执照</a>｜ <a href="#">互联网药品信息服务资格证书</a>
        </p>
      </div>
      <!--底部文章结束-->
    </div>
  </div>
</template>
<script>
  import Slogen from '@/components/container/Slogen'

  export default {
    name: "FooterView",
    data: () => ({}),
    components: {
      Slogen
    }
  }
</script>
<style lang="less" scoped>
  .footerbox {
    margin-top: 40px;

    .foot_list1 {
      margin: 50px 0;

      ul {
        li {
          float: left;
        }
        li.foot_logo {
          width: 20%;
          margin-top: 40px;
          img {
            display: block;
            max-height: 80px;
          }
        }
        li.foot_item {
          width: 60%;
          .foot_list2 {
            width: 90%;
            margin: 0 auto;
            dl {
              width: 20%;
              padding: 0 15px;
              margin: 20px 0 0 0;
              float: left;
              line-height: 24px;
              -webkit-box-sizing: content-box;
              -moz-box-sizing: content-box;
              box-sizing: content-box;
              dt {
                font-size: 18px;
                color: #888888;
                padding-bottom: 15px;
                text-align: left;
                font-weight: bold;
              }
              dd {
                font-size: 18px;
                color: #888888;
                padding-top: 5px;
                text-align: left;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                a {
                  font-size: 14px;
                }
              }
            }
          }
        }
        li.foot_erwm {
          width: 20%;
          margin-top: 40px;
          img {
            display: block;
            max-width: 130px;
            max-height: 130px;
          }
          p {
            margin-left: 10px;
          }
        }
      }
    }

    .text_link {
      margin-top: 10px;
      padding: 10px 0px;
      line-height: 24px;
      color: #666666;
      text-align: center;
      width: 600px;
      margin: 0 auto;
      font-size: 12px;
      p {
        padding-top: 10px;
      }
    }
    a {
      color: #666;
    }
    a:hover {
      color: #0085cd;
    }
  }
</style>
