<template>
  <div class="ma-recharge">
    <el-card v-loading="loading" class="recharge-overview">
      <div class="card-item">
        本金余额：
        <span class="point">{{ total }}</span>
        元
      </div>
      <div class="card-item">
        冻结本金：{{ frezze }}元（查看详细说明）
        <span>
          <!--<el-button>提现</el-button>-->
          <el-button @click="$router.push('/wallet/rechargeList')">
            充值明细
          </el-button>
        </span>
      </div>
    </el-card>
    <el-card class="recharge-container">
      <div class="title">本金充值</div>
      <div class="prompt">
        <div class="prompt-title">重要提示：</div>
        <ol>
          <li>
            充值信息需人工审核，正常情况下20分钟内处理，最长不会超过60分钟（非上班时间充值次日早上第一时间处理，上班时间8:30-18:00）
          </li>
          <li>连续超过3次填写错误的充值信息会被冻结账号</li>
          <li>金币无法兑换本金</li>
        </ol>
      </div>
      <div class="main">
        <el-form
          ref="payForm"
          :model="formData"
          :rules="rules"
          label-width="110px"
          label-position="left"
        >
          <el-form-item label="充值金额" prop="topUpAmount">
            <el-input
              v-model="formData.topUpAmount"
              placeholder="请输入充值金额（元）"
            ></el-input>
            <div style="font-size: 12px; color: #999">最少充值金额20元</div>
          </el-form-item>
          <el-form-item label="充值方式">
            <div>图</div>
          </el-form-item>
          <el-form-item label="付款账号" prop="paymentAccount">
            <el-input
              v-model="formData.paymentAccount"
              required
              placeholder="请输入付款账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付宝订单号" prop="paymentOrderNo">
            <el-input
              v-model="formData.paymentOrderNo"
              placeholder="请输入支付宝订单号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="medium"
              type="primary"
              :disabled="btnLoading"
              :loading="btnLoading"
              @click="handleSubmit"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getUserAccount, setPayment } from '@/api/ma/wallet'

  export default {
    name: 'Recharge',
    data() {
      return {
        total: 100,
        frezze: 10,
        formData: {
          topUpAmount: null,
          paymentAccount: '',
          paymentOrderNo: '',
        },
        rate: 6.8,
        loading: false,
        btnLoading: false,
        query: {
          topUpAmount: null,
          paymentAccount: '',
          paymentOrderNo: '',
        },
        rules: {
          topUpAmount: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入金额',
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value < 20) {
                  callback(new Error('最少充值金额20元'))
                } else {
                  callback()
                }
              },
            },
          ],
          paymentAccount: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入付款账号',
            },
          ],
          paymentOrderNo: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入支付宝订单号',
            },
          ],
        },
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.loading = true
        getUserAccount()
          .then((res) => {
            let { data } = res
            this.total = data.balance || 0
            this.frezze = data.freezeAmount || 0
          })
          .finally((_) => {
            this.loading = false
          })
      },
      async handleSubmit() {
        this.$refs.payForm.validate(async (valid) => {
          if (valid) {
            this.btnLoading = true
            setPayment(this.formData)
              .then((res) => {
                this.$message.success('提交成功，请等待充值审核')
                this.getUserInfo()
                this.handleReset()
              })
              .finally((_) => {
                this.btnLoading = false
              })
          }
        })
      },
      handleReset() {
        this.formData = Object.assign({}, this.query)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ma-recharge {
    font-size: 14px;

    .point {
      color: orange;
      font-size: 20px;
      font-weight: bold;
    }

    .prompt {
      padding: 10px;
      margin: 10px 0;
      background: rgba(31, 50, 82, 0.04);
      color: #999;

      li {
        font-size: 12px;
        line-height: 16px;
      }

      .prompt-title {
        color: red;
        font-size: 16px;
      }
    }

    .el-form {
      .el-input {
        width: 400px;
      }
    }

    .recharge-container {
      .title {
        font-size: 20px;
      }
    }
  }
</style>
