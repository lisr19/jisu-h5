import { fetch, post} from '../http'

//获取许可证指标
export function getWarnList(params) {
    return post('home/warn/list',params)
  }