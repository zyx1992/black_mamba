//发布模式
export const publishMode = {
  立即发布: 1,
}
//来源
export const taskOrigins = {
  移动APP: 'mobile',
  电脑: 'web',
}
//来源需求
export const taskOriginRules = {
  直接访问: 1,
  站内搜索列表搜索: 2,
  店铺内部搜索: 3,
  活动URL: 4,
}
//改价
export const changePrices = {
  不改价: 1,
  改价后下单: 2,
  下单后改价: 3,
}
//国家
export const countries = {
  美国: 1,
  中国: 2,
}
//收藏类型
export const collections = {
  不收藏: 1,
  收藏商品: 2,
  收藏店铺: 3,
  收藏商品和店铺: 4,
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
  刷单平台提供好评: 2,
  自定义晒图: 3,
  自定义评语: 4,
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
  充值中: 1,
}
