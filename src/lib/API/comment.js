import { fetch, post, patch, del } from '../http'

// 登录
export function userLogin (params) {
    return post('home/user/login', params)
}


// 上传图片
export function uploadImg (params) {
    return post('api/0.1/upload/img', params)
}

// 用户信息
export function getUserDate (params) {
    return fetch('home/user/list', params)
}

// 企业信息
export function getEnterDate (params) {
    return fetch('home/enterprise/list', params)
}

























