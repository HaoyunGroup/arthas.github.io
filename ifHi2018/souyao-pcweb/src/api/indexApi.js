import * as request from 'common/request';


/**
 * 获取楼层
 */
export const indexListAll = () => {
  return request.get('/floor/api/indexListAll', {
    apKey: 'floor_list'
  });
}

