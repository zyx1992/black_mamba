import $http from '@/utils/ma/http.js'

export function getRechargeList(params) {
  return $http.post('/account/recharge/details', params)
}
