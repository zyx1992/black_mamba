<template>
  <div class="task-list-add">
    <div class="wrapper-header">
      <router-link to="/task/list" style="color: #2c3e50">
        <el-icon class="el-icon-arrow-left"></el-icon>
        返回任务列表
      </router-link>
    </div>
    <div class="wrapper-container">
      <el-form
        ref="addForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
        label-position="left"
      >
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
            <el-form-item label="商品链接" prop="xssTaskProductBO.productUrl">
              <el-input
                v-model="formData.xssTaskProductBO.productUrl"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="敦煌网店铺ID"
              prop="xssTaskProductBO.storeName"
            >
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
            <el-form-item
              label="订单成交价"
              prop="xssTaskProductBO.transactionPrice"
            >
              <el-input v-model="formData.xssTaskProductBO.transactionPrice">
                <template slot="append">美元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品规格">
              <div>Color:</div>
              <el-input v-model="formData.color"></el-input>
              <div class="color-list"></div>
              <div>Options:</div>
              <el-input v-model="formData.options"></el-input>
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
              <el-select v-model="formData.xssTaskDetailBO.routeReq">
                <el-option
                  v-for="item in Object.entries($options.taskOriginRules)"
                  :key="item[0]"
                  :label="item[1]"
                  :value="Number(item[0])"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来路详情" prop="xssTaskDetailBO.requirements">
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
            <el-form-item label="买手国家" prop="xssTaskDetailBO.buyerCountry">
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
              <el-select v-model="formData.xssTaskDetailBO.reviewType">
                <el-option
                  v-for="item in Object.entries($options.commentRequire)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="自定义订单评语"
              prop="xssTaskDetailBO.customReview"
            >
              <el-input
                v-model="formData.xssTaskDetailBO.customReview"
                type="textarea"
              ></el-input>
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
          </el-col>
        </el-row>
      </el-form>
      <div class="form-label"></div>
      <el-button
        :loading="loading.submit"
        :disabled="loading.submit"
        type="primary"
        @click="handleSubmit"
      >
        发布任务
      </el-button>
    </div>
    <el-dialog
      width="500px"
      class="cost-dialog"
      title="温馨提示"
      :modal-append-to-body="false"
      :visible.sync="costDialog"
    >
      <div class="prompt">
        请确认本次发单的费用信息，确认无误点击"立即创建"即可发布您的任务
      </div>
      <div class="cost-list">
        <div class="cost-item">
          今日汇率：{{ formData.xssTaskCostBO.exchangeRate && formData.xssTaskCostBO.exchangeRate.toFixed(2) }}
        </div>
        <div class="cost-item">
          收取本金：{{ formData.xssTaskCostBO.principal && formData.xssTaskCostBO.principal.toFixed(2) }}
        </div>
        <div class="cost-item">
          支付手续费：{{ formData.xssTaskCostBO.payPoundage && formData.xssTaskCostBO.payPoundage.toFixed(2) }}
        </div>
        <div class="cost-item">
          基本佣金：{{ formData.xssTaskCostBO.commission && formData.xssTaskCostBO.commission.toFixed(2)}}
        </div>
        <div class="cost-item">
          评论费用：{{ formData.xssTaskCostBO.reviewFee && formData.xssTaskCostBO.reviewFee.toFixed(2)}}
        </div>
        <div class="cost-item">
          本单共计金额：{{ formData.xssTaskCostBO.totalAmount && formData.xssTaskCostBO.totalAmount.toFixed(2) }}
        </div>
      </div>
      <div class="operations">
        <el-button
          type="primary"
          :loading="loading.create"
          :disabled="loading.create"
          @click="handleCreate"
        >
          立即发布
        </el-button>
        <el-button @click="costDialog = false">我再想想</el-button>
      </div>
    </el-dialog>
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
  import { getTaskCost, createTask, getTaskDetail } from '@/api/ma/task'

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
      // 来路详情为2，3，4类型时必填
      const requirementsValidator = (rule, value, callback) => {
        let type = this.formData.xssTaskDetailBO.routeReq || null
        let list = [2, 3, 4]
        if (list.includes(type) && !value) {
          callback(new Error('请填写来路详情'))
        } else {
          callback()
        }
      }
      // 评论方式为3时必填
      const customReviewValidator = (rule, value, callback) => {
        let type = this.formData.xssTaskDetailBO.reviewType || null
        let list = [3]
        if (list.includes(type) && !value) {
          callback(new Error('请填写自定义订单评语'))
        } else {
          callback()
        }
      }
      return {
        formData: {
          xssTaskBO: {
            // 本期默为'1'
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
            customReview: '',
            isChangePrice: 0,
            isNeedLogistic: 1,
            orderMsgReq: '',
            requirements: '',
            reviewStar: 5,
            reviewType: 1,
            routeReq: 1,
            taskTerminal: 1,
          },
          xssTaskProductBO: {
            itemcode: 123123, // TODO: 产品编号是什么？在哪里取？怎么填充？是个必填！！！
            productUrl: '',
            storeName: '',
            transactionPrice: null,
            productCount: 1,
            productVariant: '',
          },
          color: '',
          options: '',
        },
        rules: {
          'xssTaskDetailBO.buyerCountry': [
            {
              required: true,
              trigger: 'blur',
              message: '请选择买手国家',
            },
          ],
          'xssTaskProductBO.itemcode': [
            {
              required: true,
              trigger: 'blur',
              message: '请填写产品编号',
            },
          ],
          'xssTaskProductBO.productUrl': [
            {
              required: true,
              trigger: 'blur',
              message: '请填写产品页最终页链接',
            },
          ],
          'xssTaskProductBO.storeName': [
            {
              required: true,
              trigger: 'blur',
              message: '请填写产品所属店铺名称',
            },
          ],
          'xssTaskProductBO.transactionPrice': [
            {
              required: true,
              trigger: 'blur',
              message: '请填写产品成交价',
            },
          ],
          'xssTaskDetailBO.requirements': [
            {
              trigger: 'blur',
              validator: requirementsValidator,
            },
          ],
          'xssTaskDetailBO.customReview': [
            {
              trigger: 'blur',
              validator: customReviewValidator,
            },
          ],
        },
        query: {},
        costDialog: false,
        loading: {
          submit: false,
          create: false,
          wrapper: false,
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.addForm.validate(async (valid) => {
          this.loading.submit = true

          console.log('formData', this.formData)
          // 处理参数
          this.formData.xssTaskProductBO.productVariant =
            this.formData.color + '_' + this.formData.options
          delete this.formData.color
          delete this.formData.options
          // 查询费用
          this.handleGetCost()
        })
      },
      handleCreate() {
        this.loading.create = true
        createTask(this.formData).then((res) => {
          this.$message('任务发布成功')
          this.costDialog = false
          this.$route.push('/task/list')
        }).finally(_ => {
          this.loading.create = false
        })
      },
      handleGetCost() {
        this.query = {
          currency: 'USD',
          productCount: this?.formData?.xssTaskProductBO?.productCount || 1,
          productPrice: Number(
            this?.formData?.xssTaskProductBO?.transactionPrice || 0
          ),
          reviewType: this?.formData?.xssTaskDetailBO?.reviewType || 1,
        }

        if (!this.query.productPrice) return

        getTaskCost(this.query)
          .then((res) => {
            this.formData.xssTaskCostBO = res
            this.costDialog = true
          })
          .catch((err) => {
            console.log('==err', err)
          })
          .finally((_) => {
            // 提交按钮loading
            this.loading.submit = false
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

  .el-dialog {
    .prompt {
      font-size: 12px;
      color: #999;
      background: rgba(31, 50, 82, 0.04);
      padding: 10px;
    }
    .cost-list {
      margin: 20px 0;
      .cost-item {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
</style>
