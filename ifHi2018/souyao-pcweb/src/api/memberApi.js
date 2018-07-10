import * as request from 'common/request';


/**
 * 会员信息
 */
export const memberDetail = (n) => {
  return request.get('/memberapi/memberDetail',{},n);
}

/**
 * 会员收藏信息
 * @param type
 * @param pageno
 * @param pageSize
 */
export const memberfavotites = ({type, pageno, pageSize}) => {
  return request.get('/memberapi/memberfavotites', {
    type,
    pageno,
    pageSize
  });
}

/**
 * 商品推荐
 */
export const centRecommendList = () => {
  return request.get('/memberapi/centRecommendList');
}

/**
 * 浏览记录
 * @param browseState -- 0为商品  1 店铺
 * @param pageNo
 * @param pageSize
 */
export const goodsBrowseList = ({browseState, pageNo, pageSize}) => {
  return request.get('/memberapi/goodsBrowseList', {
    browseState,
    pageNo,
    pageSize
  });
}

/**
 * 删除浏览记录
 * @param browseId
 */
export const delGoodsBrowse = ({browseId}) => {
  return request.get('/memberapi/delGoodsBrowse', {
    browseId
  });
}

/**
 * 删除全部
 * @param browseState
 */
export const delGoodsBrowseByAll = ({browseState}) => {
  return request.get('/memberapi/delGoodsBrowseByAll', {
    browseState
  });
}


/**
 * 积分
 * @param pageNo
 * @param pageSize
 */
export const shopPointsLogList = ({pageNo, pageSize}) => {
  return request.get('/memberapi/shopPointsLogList', {
    pageNo,
    pageSize
  });
}

/**
 *
 */
export const memberAvailable = () => {
  return request.get('/memberapi/memberAvailable');
}

/**
 * 修改会员信息
 * @param nichen    --昵称
 * @param birthday  --生日
 * @param sex       --性别
 * @param imgUrl    --头像地址
 */
export const updateMemberInfo = ({nichen, birthday, sex, imgUrl}) => {
  return request.get('/memberapi/updateMemberInfo', {
    nichen,
    birthday,
    sex,
    imgUrl,
  });
}

/**
 * 充值订单
 * @param amount
 */
export const recharge = ({amount}) => {
  return request.get('/predepositApi/recharge', {
    amount
  });
}


/**
 * 修改密码
 * @param newpassword
 * @param password
 * @returns {*|AxiosPromise<any>}
 */
export const updatePassword = ({newpassword, password}) => {
  return request.post('/memberapi/updatePassword', {
    newpassword,
    password
  });
}

/**
 * 设置支付密码
 * @param newpassword
 * @returns {*|AxiosPromise<any>}
 */
export const updatePaymentPass = ({newpassword}) => {
  return request.post('/memberapi/updatePaymentPass', {
    newpassword
  });
}

/**
 * 获取短信验证
 * @param mobile
 */
export const verifyCode = ({mobile}) => {
  return request.get('/floor/api/verifyCode', {
    mobile
  });
}

export const getRecord = ({pageNo}) => {
  return request.get('/predepositApi/record', {pageNo});
}

/**
 * 判断用户是否是分销商
 */
export const findDistributor = () => {
  return request.get('/api/distributorQueryApi/findDistributor');
}


/**
 * 二维码
 * @param memberId
 */
export const twoDimensionImage = ({memberId}) => {
  return request.get('/memberapi/twoDimensionImage', {
    memberId
  });
}

/**
 * 推广提现
 * @param money
 * @param type
 * @param accountNumber
 * @param accountDetail
 * @param accountName
 * @returns {*|AxiosPromise<any>}
 */
export const withdrawDeposit = ({money, type, accountNumber, accountDetail, accountName}) => {
  return request.post('/predepositApi/withdrawCash', {
    money,
    type,
    accountNumber,
    accountDetail,
    accountName
  });
}

/**
 * 我的提成
 */
export const myCommission = () => {
  return request.get('/api/distribuCommissionApi/myCommission');
}


/**
 * 提成明细
 * @param pageNo
 * @param pageSize
 */
export const commissionList = ({pageNo, pageSize}) => {
  return request.get('/api//distribuCommissionApi/commissionList', {
    pageNo,
    pageSize
  });
}


/**
 * 推广的产品
 * @param sortOrder
 * @param brandId
 * @param maximumPrice
 * @param minimumPrice
 * @param pageSize
 * @param keyword
 * @param pageNo
 * @param sortField
 */
export const storeGoodslist = ({sortOrder, brandId, maximumPrice, minimumPrice, pageSize, keyword, pageNo, sortField,}) => {
  return request.get('distributiongoods/api/goodslist', {
    sortOrder,
    brandId,
    maximumPrice,
    minimumPrice,
    pageSize,
    keyword,
    pageNo,
    sortField
  });
}

/**
 * 推广中心
 */
export const shopBoutique = () => {
  return request.get('memberapi/spread');
}


/**
 * 查询下级分销商信息
 * @param pageNo
 * @param pageSize
 */
export const subordinateDistribution = ({pageNo, pageSize}) => {
  return request.get('/api/distributionSubordinateApi/subordinateDistribution', {
    pageNo,
    pageSize
  });
}


/**
 * 修改支付信息
 * @param alipayAccountNumber
 * @param aliPayName
 */
export const setPayInfo = ({alipayAccountNumber, aliPayName}) => {
  return request.get('memberapi/bindAliPay', {
    alipayAccountNumber, aliPayName
  });
}

/**
 * 获取支付信息
 */
export const getPayInfo = () => {
  return request.get('/memberapi/bindAlipayMsg');
}

/**
 * 小店订单
 * @param pageNo
 * @param pageSize
 */
export const meimberStoreOrder = ({pageNo, pageSize}) => {
  return request.get('api/distributionorder/distributionorderList', {
    pageNo, pageSize
  });
}

/**
 * 绑定手机号
 * @param phoneNumber
 * @param password
 */
export const bindPhone = ({phoneNumber, password}) => {
  return request.get('/memberapi/weChatBindPhone', {
    phoneNumber, password
  });
}


/**
 * 获取用户是否绑定过手机号
 */
export const getUserPhone = () => {
  return request.get('/memberapi/weChatState');
}

/**
 * 获取用户提供的手机号是否被绑定过
 * @param phoneNumber
 */
export const getPhoneIsBind = ({phoneNumber}) => {
  return request.get('/memberapi/checkWeChatBindPhone', {phoneNumber});
}

/**
 * 是否开启分销接口
 */
export const openDistribution = () => {
  return request.get('api/distributorQueryApi/getDistributorIsOpen');
}
