import { fetch, post, patch, del } from '../http'


// 获取企业列表
export function enterpriseList(params) {
    return fetch('home/enterprise/list',params);
}


// 获取详情
export function enterpriseDetail(params) {
    return fetch('home/enterprise/detail',params);
}

//新增信息
export function enterpriseAdd(params) {
    return post( 'home/enterprise/add',params);
}

// 修改信息
export function enterpriseUpdate(params) {
    return post('home/enterprise/update',params);
}

//删除信息
export function enterpriseDelete(params) {
    return fetch('home/enterprise/delete',params);
}

//行业选择列表
export function industrySelect(params) {
    return fetch('home/enterprise/industryids',params);
}

//规模选择列表
export function scaleSelect(params) {
    return fetch('home/enterprise/scaleids',params);
}

//注册类型选择列表
export function registertypeSelect(params) {
    return fetch('home/enterprise/register_type',params);
}






















