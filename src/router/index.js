/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },

  {
    path: '/task',
    component: Layout,
    redirect: 'noRedirect',
    name: 'task',
    meta: {
      title: '任务管理',
      icon: 'shopping-cart',
      permissions: ['admin'],
    },

    children: [
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/task/list/add'),
        meta: {
          title: '任务发布',
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/task/list/index'),
        meta: {
          title: '任务列表',
        },
      },
    ],
  },
  {
    path: '/wallet',
    component: Layout,
    redirect: 'noRedirect',
    name: 'wallet',
    meta: {
      title: '钱包管理',
      icon: 'shopping-cart',
      permissions: ['admin'],
    },

    children: [
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/views/wallet/charge/recharge'),
        meta: {
          title: '充值中心',
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: 'rechargeList',
        name: 'rechargeList',
        component: () => import('@/views/wallet/charge/index'),
        meta: {
          title: '充值明细',
        },
      },
      {
        path: 'consumeList',
        name: 'consumeList',
        component: () => import('@/views/wallet/consume/index'),
        meta: {
          title: '消耗明细',
        },
      },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    hidden: true,
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
