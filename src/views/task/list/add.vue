<template>
  <div class="task-list-add">
    <div class="wrapper-header">
      <el-icon class="el-icon-arrow-left"></el-icon>
      返回任务列表
    </div>
    <div class="wrapper-container">
      <el-form v-model="formData" label-width="100px" label-position="left">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="form-label">任务控制</div>
            <el-form-item label="发布模式">
              <el-select v-model="formData.xssTaskBO.releasePattern">
                <el-option
                  v-for="item in Object.entries($options.publishMode)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务数">
              <el-input-number
                v-model="formData.xssTaskBO.taskCount"
                :min="1"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <div class="form-label">任务控制</div>
            <el-form-item label="任务备注">
              <el-input
                v-model="formData.xssTaskBO.remark"
                type="textarea"
                :rows="2"
              ></el-input>
            </el-form-item>
            <div class="form-label">商品信息</div>
            <el-form-item label="商品链接">
              <el-input
                v-model="formData.xssTaskProductBO.productUrl"
              ></el-input>
            </el-form-item>
            <el-form-item label="敦煌网店铺ID">
              <el-input
                v-model="formData.xssTaskProductBO.storeName"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品数量">
              <el-input-number
                v-model="formData.xssTaskProductBO.productCount"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="订单成交价">
              <el-input v-model="formData.xssTaskProductBO.transactionPrice">
                <template slot="append">美元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>Color:</span>
              <div class="color-list"></div>
              <span>Options:</span>
              <div class="options-list"></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="form-label">下单要求</div>
            <el-form-item label="任务来源">
              <el-select v-model="formData.xssTaskDetailBO.taskTerminal">
                <el-option
                  v-for="item in Object.entries($options.taskOrigins)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来路要求">
              <el-select v-model="formData.xssTaskDetailBO.reviewType">
                <el-option
                  v-for="item in Object.entries($options.taskOriginRules)"
                  :key="item[0]"
                  :label="item[1]"
                  :value="Number(item[0])"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来路详情">
              <!--TODO 不是1的时候要求必填-->
              <el-input
                v-model="formData.xssTaskDetailBO.requirements"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否改价">
              <el-select v-model="formData.xssTaskDetailBO.isChangePrice">
                <el-option
                  v-for="item in Object.entries($options.changePrices)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买手国家">
              <el-select v-model="formData.xssTaskDetailBO.buyerCountry">
                <el-option
                  v-for="item in Object.entries($options.countries)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单留言要求">
              <el-input
                v-model="formData.xssTaskDetailBO.orderMsgReq"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="收藏">
              <el-select v-model="formData.xssTaskDetailBO.collectionRequire">
                <el-option
                  v-for="item in Object.entries($options.collections)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需要物流单号">
              <el-select v-model="formData.xssTaskDetailBO.isNeedLogistic">
                <el-option label="需要" :value="0"></el-option>
                <el-option label="不需要" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <div class="form-label">确认收货与评论要求</div>
            <el-form-item label="确认收货天数">
              <el-select
                v-model="formData.xssTaskDetailBO.confirmDeliveredDays"
              >
                <el-option
                  v-for="item in Object.entries($options.days)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评论方式">
              <el-select v-model="formData.xssTaskDetailBO.routeReq">
                <el-option
                  v-for="item in Object.entries($options.commentRequire)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评论星级">
              <el-select v-model="formData.xssTaskDetailBO.reviewStar">
                <el-option
                  v-for="item in Object.entries($options.stars)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="form-label">费用清单</div>
            <div class="cost-list">
              <div class="cost-item">
                今日汇率：{{ formData.xssTaskCostBO.exchangeRate }}
              </div>
              <div class="cost-item">
                收取本金：{{ formData.xssTaskCostBO.principal }}
              </div>
              <div class="cost-item">
                支付手续费：{{ formData.xssTaskCostBO.payPoundage }}
              </div>
              <div class="cost-item">
                基本佣金：{{ formData.xssTaskCostBO.commission }}
              </div>
              <div class="cost-item">
                评论费用：{{ formData.xssTaskCostBO.reviewFee }}
              </div>
              <div class="cost-item">
                本单共计金额：{{ formData.xssTaskCostBO.totalAmount }}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="handleSubmit"></el-button>
    </div>
  </div>
</template>

<script>
  import {
    publishMode,
    taskOrigins,
    taskOriginRules,
    countries,
    changePrices,
    collections,
    express,
    days,
    commentRequire,
    stars,
  } from '../../const'
  import { getTaskCost } from '@/api/ma/task'
  export default {
    name: 'Add',
    publishMode,
    taskOrigins,
    taskOriginRules,
    countries,
    changePrices,
    collections,
    express,
    days,
    commentRequire,
    stars,
    data() {
      return {
        formData: {
          xssTaskBO: {
            releasePattern: 1,
            remark: '',
            taskCount: 1,
          },
          xssTaskCostBO: {
            commission: 0,
            exchangeRate: 0,
            payPoundage: 0,
            principal: 0,
            reviewFee: 0,
            totalAmount: 0,
          },
          xssTaskDetailBO: {
            buyerCountry: 2,
            collectionRequire: 0,
            confirmDeliveredDays: 7,
            customReview: '', // TODO 处理联动
            isChangePrice: 0,
            isNeedLogistic: 1,
            orderMsgReq: '',
            requirements: '', // TODO 处理联动
            reviewStar: 5,
            reviewType: 1,
            routeReq: 1,
            taskTerminal: 1,
          },
          xssTaskProductBO: {
            itemcode: '',
            productUrl: '',
            storeName: '',
            transactionPrice: '',
            productCount: 1,
            productVariant: '',
          },
        },
        query: {
          currency: 'USD',
          productCount: this?.formData?.xssTaskProductBO?.productCount || 1,
          productPrice: this?.formData?.xssTaskProductBO?.transactionPrice || 1,
          reviewType: this?.formData?.xssTaskDetailBO?.reviewType || 1,
        },
      }
    },
    mounted() {
      this.handleGetCost()
    },
    methods: {
      handleSubmit() {},
      handleGetCost() {
        getTaskCost(this.query).then((res) => {
          this.form.xssTaskCostBO = res
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .task-list-add {
    .wrapper-header {
      margin-bottom: 20px;
    }
    .wrapper-container {
      margin-top: 10px;
      .el-form-item {
        .el-input,
        .el-select,
        .el-textarea,
        .el-input-number {
          width: 90%;
        }
      }
      .form-label {
        font-size: 16px;
        color: #1890ff;
        padding-bottom: 2px;
        border-bottom: 1px dotted;
        margin-bottom: 10px;
      }
    }
  }
</style>
