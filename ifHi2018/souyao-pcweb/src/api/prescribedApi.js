import * as request from 'common/request';

/**
 *
 */
export const cartList = () => {
  return request.get('/prescriptionApi/savePrescription');
}


/**
 * 上传处方单
 * @param buyName
 * @param buySex
 * @param buyMobile
 * @param imgsPath
 * @param goodsId
 * @returns {AxiosPromise<any> | *}
 */
export const upload = ({buyName, buySex, buyMobile, imgsPath, goodsId}) => {
  return request.post('/prescriptionApi/savePrescription', {
    buyName,
    buySex,
    buyMobile,
    imgsPath,
    goodsId
  });
}

/**
 * 处方单列表
 * @param pageNo
 * @returns {AxiosPromise<any> | *}
 */
export const getPrescriptionList = ({pageNo}) => {
  return request.post('prescriptionApi/list',{pageNo});
}
