import { fetch, post, patch, del } from '../http'


// 获取企业列表
export function enterpriseList(params) {
    return fetch({url: 'home/enterprise/list',});
}

// 获取详情
export function enterpriseDetail(params) {
    return fetch({url: 'home/enterprise/detail',});
}

//新增信息
export function enterpriseAdd(params) {
    return post({url: 'home/enterprise/add',});
}

// 修改信息
export function enterpriseUpdate(params) {
    return post({url: 'home/enterprise/update',});
}

//删除信息
export function enterpriseDelete(params) {
    return fetch({url: 'enterprise/delete',});
}

//企业账户选择列表
export function accountSelect(params) {
    return fetch({url: 'enterprise/belong1',});
}

//行业选择列表
export function industrySelect(params) {
    return fetch({url: 'enterprise/industryids',});
}

//规模选择列表
export function scaleSelect(params) {
    return fetch({url: 'enterprise/scaleids',});
}

//注册类型选择列表
export function registertypeSelect(params) {
    return fetch({url: 'enterprise/register_type',});
}






















