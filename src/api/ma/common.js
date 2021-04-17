import $http from '@/utils/ma/http.js'

export function getUserRsa(params) {
  return $http.get('/common/sign', params)
}

export function signup(params) {
  return $http.post('/sender/register', params)
}

export function singin(params) {
  return $http.post('/common/lander', params)
}

export function userInfo() {
  return $http.get('/sender-handle/info')
}
