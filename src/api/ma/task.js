import $http from '@/utils/ma/http.js'
import { taskStatus } from '../../views/const'

export function getTaskList(params) {
  return $http.post('/task/list', params)
}

export function getTaskDetail(id) {
  return $http.get('/task/detail', { id })
}

export function getTaskType() {
  return taskStatus
}

export function deleteTask(id) {
  return $http.delete('/sender-task/deletion', {id})
}

export function getTaskCost(params) {
  return $http.post('/sender-task/cost', params)
}

export function createTask(params) {
  return $http.post('/sender-task/creator', params)
}
