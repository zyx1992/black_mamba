import Axios from './axios'
import { Message } from 'element-ui'

// create an axios instance
const $http = {}

$http.get = (url = '', params = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, { params: params }, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        Message({
          message: err.errmsg,
          type: 'error',
          duration: 5 * 1000,
        })
        reject(err)
      })
  })
}

$http.post = (url = '', params = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, params, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('==catch err', err)
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000,
        })
        reject(err)
      })
  })
}

export default $http
