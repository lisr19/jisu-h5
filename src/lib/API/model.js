import { fetch, post, patch, del } from '../http'

//环评企业列表
export function epList(params) {
  return fetch('home/pe_model/eplist',params)
}

//删除环评
export function epDelete(params) {
  return fetch('home/pe_model/delete', params);}

// 获取企业选择列表
export function enterpriseSelect(params) {
    return fetch('home/pe_model/enterpriselist', params);
}

//获取模板信息
export function getmodel(params) {
  return fetch( 'home/pe_model/getmodel', params,);
}

//保存模板信息
export function savemodel(params) {
  return fetch('home/pe_model/savemodel',params);
}

//获取选择列表
export function select(params) {
  return fetch('home/pe_model/select', params);
}

//获取第三方企业选择列表
export function third_enterpriseSelect(params) {
  return fetch('home/pe_model/third_enterprise', params);
}

//获取危险物种类代码
export function dangerousCode(params) {
  return fetch('home/pe_model/get_dangerous_code', params);
}

//获取排污许可证指标信息
export function limitValue(params) {
  return fetch(
   'home/pe_model/find_limit_value', params);
}



