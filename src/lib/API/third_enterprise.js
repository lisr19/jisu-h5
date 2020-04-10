import { fetch, post } from '../http'

// 获取第三方列表
export function thirdEnterpriseList(params) {
  return fetch('home/third_enterprise/list', params);
}

// 获取详情
export function thirdEnterpriseDetail(params) {
  return fetch( 'home/third_enterprise/detail', params);
}

//新增信息
export function thirdEnterpriseAdd(params) {
  return post('home/third_enterprise/add', params);
}

// 修改信息
export function thirdEnterpriseUpdate(params) {
  return post( 'home/third_enterprise/update', params);
}

//删除信息
export function thirdEnterpriseDelete(params) {
  return fetch( 'home/third_enterprise/delete', params);
}

//企业账户选择列表
export function accountSelect(params) {
  return fetch('home/user/belong1', params);
}
//上传图片
export function uploadImg(params) {
  return post('home/file/report_upload',params);
}


