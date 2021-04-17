// zhuyuxin
import { asyncRoutes } from '../router/index'
export function getRouterList(data) {
  return new Promise((resolve) => {
    resolve(asyncRoutes)
  })
}
