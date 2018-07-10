import Vue from 'vue';
import qs from 'qs';
import axios from 'axios';
import Iview from 'iview';  // iview UI
import * as common from './common.js';
import {setStore, getStore, removeStore} from '@/utils/storages.js';


// 验证响应状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// 发送请求
export async function request(options, n) {
  const response = await axios.request(options);
  checkStatus(response);
  const data = await response;
  if (data.data.result == 0) {
    if (data.data.code == '99' || data.data.msg.includes('登录')) {
      setStore('isLogin', false)
      if (n == false) {
        return data.data;
      }
      Iview.Modal.error({
        title: '登录提示',
        content: '您尚未登录或登录时间过长,点击确定重新登录!',
        okText: '去登陆',
        onOk: () => {
          common.gotoLoginAndBack();
          removeStore('token');
          removeStore('memberData');
        },
      });
    } else {
      return data.data;
    }
  }
  return data.data;
}

// get请求
export function get(requestUrl, params, n) {

  const baseParams = {};

  params = {
    ...baseParams,
    ...params
  };

  //token放在请求头
  const token = localStorage.getItem('token') || 'null';

  if (params) {
    requestUrl = requestUrl + "?" + qs.stringify(params) + '&timestringout=' + Math.floor(Math.random() * 100000);
  };
  const url = common.getFullUrl(requestUrl);
  let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
  if (token) {
    headers['token'] = token;
  }
  return request({
    url: url,
    method: 'GET',
    headers
  }, n);
}

// post请求
export function post(url, values, json) {
  const token = localStorage.getItem('token') || '';

  let headers = null;
  if (json) {
    headers = {'Content-Type': 'application/json;charset=UTF-8'};
    if (token) {
      headers['token'] = token;
    }
    return request({
      url,
      method: 'POST',
      headers,
      data: JSON.stringify(values)
    });
  } else {
    headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    if (token) {
      headers['token'] = token;
    }
    return request({
      url,
      method: 'POST',
      headers,
      data: qs.stringify(values)
    });
  }
}
