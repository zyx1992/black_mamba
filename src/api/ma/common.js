import $http from '@/utils/ma/http.js'

export function getUserRsa(params) {
  return $http.get('/common/sign', params)
}
