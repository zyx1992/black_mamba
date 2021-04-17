//发布模式
export const publishMode = {
  立即发布: 1,
}
//来源
export const taskOrigins = {
  PC: 1,
  M: 2,
}
//任务需求

export const taskOriginRules = {
  1: '直接访问',
  2: '站内搜索列表搜索',
  3: '店铺内搜索',
  4: '活动URL',
}
//改价
export const changePrices = {
  不改价: 0,
  改价后下单: 1,
  下单后改价: 2,
}
//国家
export const countries = {
  美国: 1,
  中国: 2,
}
//收藏类型
export const collections = {
  不收藏: 0,
  收藏商品: 1,
  收藏店铺: 2,
  收藏店铺和商品: 3,
}
//快递
export const express = {
  ePacket: 0,
  EMS: 1,
  DHL: 2,
}

// 收货天数
export const days = {
  '7天': 7,
  '10天': 10,
  '15天': 15,
  '20天': 20,
  '30天': 30,
}

// 评论要求
export const commentRequire = {
  只收货不评价: 1,
  刷单平台随机提供好评: 2,
  自定义评语: 3,
  //  自定义晒图: 4,
}

// 评论星级
export const stars = {
  五星: 5,
  四星: 4,
  三星: 3,
  二星: 2,
  一星: 1,
}

// 充值状态
export const chargeStatus = {
  0: '待审核',
  1: '审核通过',
  2: '审核拒绝',
}

// 任务列表
export const taskStatus = {
  2101: '待领取',
  2102: '已领取',
  2201: '待改价',
  2202: '待付款',
  2203: '已付款',
  2204: '待收货',
  2205: '待评价',
  2301: '已完成',
  2401: '已取消',
}
