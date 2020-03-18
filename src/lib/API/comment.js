import { fetch, post, patch, del } from '../http'

// 上传图片
export function uploadImg (params) {
    return post('api/0.1/upload/img', params)
}

// 用户信息
export function getUserDate (params) {
    return fetch('api/0.1/user/list', params)
}

// 修改用户信息
export function userUptate (params) {
    return patch('api/0.1/user/update', params)
}





















