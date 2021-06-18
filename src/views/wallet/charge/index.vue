<template>
  <div class="ma-bill-list">
    <div class="ma-bill-search">
      <el-row class="search-item">
        <el-col :span="12">
          付款账号
          <el-input
            v-model="query.paymentAccount"
            size="medium"
            placeholder="请填写付款账号"
          ></el-input>
        </el-col>
        <el-col :span="12">
          支付宝订单号
          <el-input
            v-model="query.paymentOrderNo"
            size="medium"
            placeholder="请填写支付宝订单号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="12">
          状态类型
          <el-select v-model="query.isConfirm">
            <el-option
              v-for="item in Object.keys($options.chargeStatus)"
              :key="item"
              :label="$options.chargeStatus[item]"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button class="search-btn" type="primary" @click="getList">
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="ma-bill-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column
          prop="paymentAccount"
          label="付款账号"
        ></el-table-column>
        <el-table-column prop="paymentOrderNo" label="订单号"></el-table-column>
        <el-table-column prop="username" label="充值人"></el-table-column>
        <el-table-column
          prop="paymentAmount"
          label="付款金额"
        ></el-table-column>
        <el-table-column prop="isConfirm" label="充值状态">
          <template slot-scope="scope">
            {{ $options.chargeStatus[scope.row.isConfirm] }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="充值时间">
          <template slot-scope="scope">
            {{scope.row.createdAt | converTime}}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="审核时间">
          <template slot-scope="scope">
            {{scope.row.updatedAt | converTime}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="query.page"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getTaskType, getTaskList, deleteTask } from '@/api/ma/task'
import { chargeStatus } from '../../const'
import { getRechargeList } from '@/api/ma/wallet'

export default {
  name: 'Charge',
  chargeStatus,
  data() {
    return {
      list: [],
      total: 0,
      query: {
        page: 1,
        limit: 10,
        userType: 2,
        isConfirm: '',
        paymentAccount: '',
        paymentOrderNo: '',
      },
      loading: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      getRechargeList(this.query)
        .then((res) => {
          console.log('==res', res)
          this.list = res.data || []
          this.total = res.count || 0
        })
        .finally((_) => {
          this.loading = false
        })
    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
    },
  },
}
</script>

<style lang="scss" scoped>
.ma-bill-list {
  .ma-bill-search {
    .search-item {
      margin-top: 10px;
      .el-input,
      .el-select {
        width: 260px;
        height: 36px;
      }
      .search-btn {
        width: 120px;
        font-size: 14px;
      }
    }
  }
  .ma-bill-table {
    margin-top: 20px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
