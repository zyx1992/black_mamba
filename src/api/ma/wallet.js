import $http from '@/utils/ma/http.js'

// 充值明细
export function getRechargeList(params) {
  return $http.post('/account/recharge/details', params)
}

// 消耗明细
export function getExpendList(params) {
  return $http.get('/sender-account/expend/details', params)
}
