import { fetch, post} from '../http'
// 获取列表
export function reportList(params) {
  return fetch('home/report/list', params);
}

// 获取企业列表
export function enterpriseSelect(params) {
    return fetch('home/report/enterpriselist', params);
}

//保存第一步信息
export function save1(params) {
    return post('home/report/save1', params);
}

//获取第一步信息
export function getsave1(params) {
    return fetch('home/report/getsave1', params);
}

//获取第二协议信息
export function getprotocol(params) {
  return fetch('home/report/getprotocol', params);
}

//保存第二步协议信息
export function saveprotocol(params) {
  return post('home/report/saveprotocol', params);
}

//获取第三步信息
export function getsave3(params) {
  return fetch('home/report/getsave3', params);
}

//保存第三步信息
export function save3(params) {
  return post('home/report/save3', params);
}

//获取第四步信息
export function getsave4(params) {
  return fetch('home/report/getsave4', params);
}

//保存第四步信息
export function save4(params) {
  return post('home/report/save4', params);
}

//第五步提交审核
export function sub_verity(params) {
  return fetch('home/report/sub_verity', params);
}

//获取选择列表
export function select(params) {
  return fetch('home/report/select', params);
}

//获取第三方企业选择列表
export function third_enterpriseSelect(params) {
  return fetch('home/report/third_enterprise', params
  );
}

//删除申报
export function reportDelete(params) {
  return fetch('home/report/delete', params);
}

//审核申报
export function reportVerity(params) {
  return post('home/report/verity', params);
}

//获取危险物种类代码
export function dangerousCode(params) {
  return fetch('home/report/get_dangerous_code', params);
}

//获取排污许可证指标信息
export function limitValue(params) {
  return fetch('home/report/find_limit_value', params)
}




