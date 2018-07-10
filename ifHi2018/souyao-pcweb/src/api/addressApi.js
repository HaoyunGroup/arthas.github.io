import * as request from 'common/request';


// 地址列表
export const addressList = () => {
  return request.get('/address/api/addressList');
}

// 保存地址
export const saveAddress = ({
    address,
    trueName,
    mobPhone,
    areaInfo,
    zipCode,
    areaId,
    provinceId,
    addressId = null,
    telPhone,
    cityId,
  }) => {
  return request.get('/address/api/saveAddress', {
    address,
    trueName,
    mobPhone,
    areaInfo,
    zipCode,
    areaId,
    provinceId,
    addressId,
    telPhone,
    cityId,
  });
}


// 设置默认地址
export const updateAddressDef = ({addressId}) => {
  return request.get('/address/api/updateAddressDef', { addressId });
}
