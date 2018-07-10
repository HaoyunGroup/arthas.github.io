import * as request from 'common/request';

/**
 * 购物车列表
 * @return
 */
export const cartList = () => {
  return request.get('/cartapi/cartList');
}

/**
 * 删除购物车
 * @param cartId
 * @return
 */
export const deleteCart = ({cartId}) => {
  return request.get('/cartapi/deleteCart', {
    cartId
  });
}

/**
 * 修改购物车数量
 * @param cartId
 * @param count
 * @return
 */
export const updateCartCount =({cartId, count}) => {
  return request.get('/cartapi/updateCartCount', {
    cartId,
    count
  });
}

/**
 * 添加到购物车
 * @param goodsId
 * @param count
 * @param specId
 * @param saveType 加入类型(加入购物车:0/立即购买:1)
 */
export const addCart = ({ goodsId, count, specId, saveType }) => {
  return request.get('/cartapi/addCart', {
    goodsId,
    count,
    specId,
    saveType
  });
}

/**
 * 商品批量添加购物车
 * @param goodsId 商品id
 * @param specStr "specId1:count1,specId2:count2,specId3:count3"
 * @return
 */
export const addCartBach = ({ goodsId, specStr }) => {
  return request.get('/cartapi/addCartBach', {
    goodsId,
    specStr,
  });
}

/**
 * 确认订单
 * @param cartId
 */
export const subToOrder = ({ cartId }) => {
  return request.get('/cartapi/subToOrder', {
    cartId
  });
}

/**
 * 获取价格
 * @param isPd
 * @param freight
 * @param cartIds
 * @param couponId
 * @param cityId
 */
export const getPrice = ({
 isPd,
 freight,
 cartIds,
 couponId,
 cityId,
}) => {
  return request.get('/cartapi/getPrice', {
    isPd,
    freight,
    cartIds,
    couponId,
    cityId,
  });
}

/**
 * 获取运费
 * @param cartIds 购物车id
 * @param cityId  城市id
 */

export const addShipping = ({ cartIds, cityId }) => {
  return request.get('/cartapi/addShipping', {
    cartIds,
    cityId
  });
}

/**
 * 获取优惠券
 * @param cartIds
 * @returns {AxiosPromise<any> | *}
 */
export const addCouponMember = ({ cartIds }) => {
  return request.post('/cartapi/addCouponMember', {
    cartIds
  });
}
