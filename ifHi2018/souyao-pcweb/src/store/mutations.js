import {
  SET_CLASS_LIST,
  GET_CLASS_LIST,
  DELIVERY_AND_PAYMENT_DATA
} from './type.js';
import {setStore, getStore} from '../utils/storages.js'


export default {
  // 记录分类列表
  [SET_CLASS_LIST](state, data) {
    state.classList = data
    setStore('classList', data)
  },
  // 获取分类列表
  [GET_CLASS_LIST]() {
    let classList = getStore('classList')
    if (classList) {
      return JSON.parse(classList)
    }
  },
  // 配送和付款数据
  [DELIVERY_AND_PAYMENT_DATA](state, data) {}
}
