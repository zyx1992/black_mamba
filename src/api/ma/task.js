import request from '@/utils/request'

export function getTaskList(query) {
  return [{ id: '1', count: 2, name: 'aaa', pay: 120, request: 'ssss' }]
}

export function getTaskType() {
  return [
    { label: 'a', value: 1 },
    { label: 'b', value: 1 },
  ]
}

export function deleteTask(id) {
  return true
}
