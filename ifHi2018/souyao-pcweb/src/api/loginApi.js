import * as request from 'common/request';

export const login = ({username, password}) => {
  return request.post('/loginapi/login', {
    username,
    password
  });
}
// 登录
export const loginCheck = ({username, password, captcha}) => {
  return request.post('/loginCheck', {
    username,
    password,
    captcha
  });
}

// 获取验证码
export const verifyCode = ({ mobile }) => {
  return request.get('/floor/api/verifyCode', {
    mobile
  });
}

// 注册

export const register = ({ name, password, mobile }) => {
  return request.post('/memberapi/register', {
    name,
    password,
    mobile
  });
}
