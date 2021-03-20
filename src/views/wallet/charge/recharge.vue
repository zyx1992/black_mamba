<template>
  <div class="ma-recharge">
    <el-card class="recharge-overview">
      <div class="card-item">
        本金余额：
        <span class="point">{{ total }}</span>
        元
        <el-button>充值</el-button>
      </div>
      <div class="card-item">
        冻结本金：{{ frezze }}元（查看详细说明）
        <span>
          <el-button>提现</el-button>
          <el-button>充值明细</el-button>
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
        <el-form v-model="formData" label-width="100px" label-position="left">
          <el-form-item label="充值金额">
            <el-input placeholder="请输入充值金额（元）"></el-input>
            <div>最少充值金额20元</div>
          </el-form-item>
          <el-form-item label="今日汇率">
            <span>{{ rate }}元</span>
          </el-form-item>
          <el-form-item label="所需人民币">
            <span class="point">100元</span>
          </el-form-item>
          <el-form-item label="充值方式">
            <div>图</div>
          </el-form-item>
          <el-form-item label="付款账号">
            <el-input placeholder="请输入付款账号"></el-input>
          </el-form-item>
          <el-form-item label="支付宝订单号">
            <el-input placeholder="请输入支付宝订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium">取消</el-button>
            <el-button size="medium" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Recharge',
    data() {
      return {
        total: 100,
        frezze: 10,
        formData: {},
        rate: 6.8,
      }
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
