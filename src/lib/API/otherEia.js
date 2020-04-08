import { fetch, post} from '../http'

// 获环保手续列表
export function procedureList(params) {
  return fetch('home/procedure/list',params);
}

// 获取详情
export function procedureDetail(params) {
  return fetch('home/procedure/detail', params);
}

//新增信息
export function procedureAdd(params) {
  return post( 'home/procedure/add', params);}

// 修改信息
export function procedureUpdate(params) {
  return post('home/procedure/update', params);
}

//删除信息
export function procedureDelete(params) {
  return fetch(
   'home/procedure/delete', params);
}

//获取许可证指标
export function getProcedureEp(params) {
  return fetch('home/procedure/ep_enterprise_index', params)
}



