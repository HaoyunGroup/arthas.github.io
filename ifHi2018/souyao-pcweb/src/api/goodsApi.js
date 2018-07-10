import * as request from 'common/request';

// 获取全部分类
export const classList = ({parentId}) => {
  return request.get('/goods/api/classList',{
    parentId
  })
}

// 商品列表
/**
 * 商品列表api接口
 *
 * @param searchType   搜索商品的类型,比如:搜索商品的名字,分类,类型,店铺
 *                     1. keywordSearch 关键词搜索
 *                     2. gcIdSearch 分类查找,在keyword设置对应的id
 *                     3. typeIdSearch 类型查找,在keyword设置对应的id
 *                     排序字段
 *                     sortField,sortOrder
 *                     解释:sortField:需要排序的字段 sortOrder:asc,desc 顺序,逆序
 *                     比如 sortField:salenum  sortOder:asc 则是销售量的排序
 *                     排序字段根据 goods的实体类的属性名称而定
 *                     <p>
 *                     规格过滤器
 *                     specFilter:过滤规格
 *                     解释:传入规格值id,多个过滤以逗号分隔 比如:2,3则会过滤出 商品中 规格值id包含有2和3的
 * @param brandId      品牌id
 * @param areaId       地区id
 * @param keyword      关键词
 * @param pageNo       分页的页码
 * @param sortOrder    排序类型,desc,asc
 * @param sortField    排序的字段
 * @param specFilter
 * @param pageSize
 * @param maximumPrice 最大价格
 * @param minimumPrice 最小价格
 * @return
 */
export const goodslist = ({
  brandId,
  sortOrder,
  areaId,
  maximumPrice,
  minimumPrice,
  pageSize,
  keyword,
  pageNo,
  searchType,
  sortField,
  specFilter
}) => {
  return request.get('/goods/api/goodslist', {
    brandId,
    sortOrder,
    areaId,
    maximumPrice,
    minimumPrice,
    pageSize,
    keyword,
    pageNo,
    searchType,
    sortField,
    specFilter
  })
}

// 商品详情
export const goodsDetail = ({ specId }) => {
  return request.get('goods/api/goodsdetail', { specId });
}

// 获取商品规格
export const getGoodsSpec = ({ goodsId,specGoodsSpec }) => {
  return request.get('/goods/api/getGoodsSpec', { goodsId,specGoodsSpec });
}

// 领取优惠券
export const couponlist = ({ storeId }) => {
  return request.get('/storeapi/couponlist', { storeId });
}

// 收藏
export const storecollection = ({ favType, goodsId, storeId }) => {
  return request.get('/storeapi/storecollection', { favType, goodsId, storeId });
}


// 商品评价
export function goodsEvaluteList({
  goodsId,
  gevalScore,
  gevalImg,
  pageSize,
  pageNo
 }) {
  return request.get('/goods/api/goodsEvaluteList', {
    goodsId,
    gevalScore,
    gevalImg,
    pageSize,
    pageNo
  });
}


// 购买咨询
export const goodsConsultList = ({
   goodsId,
   pageNo,
   pageSize
  }) => {
  return request.get('/goods/api/goodsConsultList', {
    goodsId,
    pageNo,
    pageSize
  });
}

// 保存咨询
export const saveConsult = ({
    goodsId,
    cgoodsName,
    consultContent
  }) => {
  return request.get('/goods/api/saveConsult', {
    goodsId,
    cgoodsName,
    consultContent
  });
}
