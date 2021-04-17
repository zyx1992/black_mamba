import $http from '@/utils/ma/http.js'

// 充值明细
export function getRechargeList(params) {
  return $http.post('/account/recharge/details', params)
}

// 消耗明细
export function getExpendList(params) {
  return $http.get('/sender-account/expend/details', params)
}

// 账户余额
export function getUserAccount() {
  return $http.post('/sender-account/info')
}

// 账户充值
export function setPayment(params) {
  return $http.post('/sender-account/payment', params)
}
