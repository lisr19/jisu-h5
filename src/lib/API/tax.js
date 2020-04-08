import { fetch, post} from '../http'

//计算税费
export function calTaxData(params) {
  return post('home/tax/calculate_tax', params)
}

//获取税费
export function getTaxData(params) {
  return post('home/tax/tax_detail', params)
}
