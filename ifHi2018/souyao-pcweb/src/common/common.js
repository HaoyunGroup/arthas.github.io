import {setStore, getStore, removeStore} from '@/utils/storages.js';

//开发环境获取url
const domain = location.host;

export const SERVER_DOMAIN = 'http://' + location.host; // 线上

//图片服务url
export const IMAGE_DOMAIN = 'http://' + 'shop.souyaoxf.com' + '/';


export const getFullUrl = (requestUrl) => {
  //let url = location.protocol +'//'+ domain;
  let url = SERVER_DOMAIN;
  if (requestUrl.startsWith('/')) {
    url = url + requestUrl;
  } else {
    url = url + '/' + requestUrl;
  }
  return url;
}


export const isLogin = () => {
  const token = getToken();
  if (!!getStore('isLogin') || !token || token == '') {
    return false;
  }
  return true;
}

/**
 * 去登录
 * @param {登录成功后返回的页面} callBack
 */
export const gotoLogin = (callBack) => {
  setStore('loginCallback', callBack || '/');
  window.location.href = '/#/login';
}

/**
 * 去登录回调
 */
export const gotoLoginAndBack = () => {
  // 获取当前URL,作为登录回调
  const currentUrl = window.location.href;
  gotoLogin(currentUrl);
}

/**
 * 获取token
 */
export const getToken = () => {
  return getStore('token');
}

/**
 * 删除token
 */
export const removeToken = () => {
  removeStore('token');
  document.cookie = 'TOKEN=;path=/;';
  removeStore('isLogin')
}
