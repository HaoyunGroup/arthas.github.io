import * as request from 'common/request';

/**
 * 保存订单
 * @param cartIds   需要购买的购物车的id
 * @param addressId 收货地址id
 * @param paytype   支付方式
 * @param freight   运费
 * @param couponId  优惠券id
 * @param invoiceId 发票id
 * @param isPd      是否使用余额
 * @param activityIds 活动id  满减 满送
 * @param ispoint
 * @param useoiu
 * @param deliverType 配送方式
 * @param storeId   店铺id
 * @param storeName  店铺名称
 * @param orderMessage  留言
 * @return
 */
export const saveorder = ({
  paytype,
  invoiceId,
  isPd,
  addressId,
  freight,
  cartIds,
  couponId,
  storeId,
  storeName,
  orderMessage,
  pickupDate,
  deliverType
}) => {
  return request.get('/orderapi/saveorder', {
    paytype,
    invoiceId,
    isPd,
    addressId,
    freight,
    cartIds,
    couponId,
    storeId,
    storeName,
    orderMessage,
    pickupDate,
    deliverType
  });
}

/**
 * 发票信息
 * @param invState
 * @param invTitle
 * @param invContent
 */
export const addInvoice = ({ invState, invTitle, invContent }) => {
  return request.get('/invoiceapi/addInvoice', { invState, invTitle, invContent });
}

/**
 * 余额支付密码
 * @param passwd
 * @returns {AxiosPromise<any> | *}
 */
export const chkPasswd = ({ passwd }) => {
  return request.post('/memberapi/chkPasswd', {
    passwd
  });
}

/**
 *
 * @param storeLongitude
 * @param storeAtitude
 * @param goodsIds
 */
export const getStroeList = ({ storeLongitude,storeAtitude,goodsIds }) => {
  return request.get('/orderapi/nearList',{
    storeLongitude,
    storeAtitude,
    goodsIds
  });
}


export const getLongitude = ({addr}) => {
  return request.get('/longitude',{
    addr
  })
}

/**
 * 订单列表
 * @param status    状态
 * @param orderType 订单列表类型,1:订单列表,2:售后申请列表,默认为1
 * @param pageNo    页码
 * @param pageSize  页数
 */
export const orderlist = ({status, pageNo, pageSize, orderType}) => {
  return request.get('/orderapi/orderlist', {
    status,
    pageNo,
    pageSize,
    orderType
  });
}

/**
 * 订单详情
 * @param orderid
 */
export const orderdetail = ({orderid}) => {
  return request.get('/orderapi/orderdetail', {
    orderid
  });
}

/**
 *
 * @param pageNo
 * @param pageSize
 */
export const prescription = ({pageNo, pageSize}) => {
  return request.get('/prescription/list', {
    pageNo,
    pageSize
  })
}
