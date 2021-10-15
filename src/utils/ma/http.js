import Axios from './axios'
import { Message } from 'element-ui'
import { getAccessToken } from '@/utils/ma/accessToken'

const $http = {}

// 不需要bearer的请求path
const whitePath = ['/common/lander', '/common/sign', '/sender/register']
// 不需要展示错误消息的接口
const noErrorMesg = ['/common/lander']
const errorMessage = (url, err) => {
  if (!noErrorMesg.includes(url)) {
    Message({
      message: err,
      type: 'error',
      duration: 5 * 1000,
    })
  }
}
$http.get = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (!whitePath.includes(url)) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.get(url, { params: params, headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        errorMessage(url, err)
        reject(err)
      })
  })
}

$http.post = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (!whitePath.includes(url)) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.post(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        errorMessage(url, err)
        reject(err)
      })
  })
}

$http.delete = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (!whitePath.includes(url)) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.delete(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        errorMessage(url, err)
        reject(err)
      })
  })
}

$http.put = (url = '', params = {}, config = {}) => {
  let headers = {}
  if (!whitePath.includes(url)) {
    headers['Authorization'] = `Bearer ${getAccessToken('access_token')}`
  }
  return new Promise((resolve, reject) => {
    Axios.put(url, params, { headers })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        errorMessage(url, err)
        reject(err)
      })
  })
}
export default $http
