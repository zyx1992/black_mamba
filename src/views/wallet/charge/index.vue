<template>
  <div class="ma-bill-list">
    <div class="ma-bill-search">
      <el-row class="search-item">
        <el-col :span="12">
          付款账号
          <el-input
            v-model="query.order"
            size="medium"
            placeholder="请填写付款账号"
          ></el-input>
        </el-col>
        <el-col :span="12">
          支付宝订单号
          <el-input
            v-model="query.code"
            size="medium"
            placeholder="请填写支付宝订单号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="12">
          状态类型
          <el-select v-model="query.status">
            <el-option
              v-for="item in $options.chargeStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button class="search-btn" type="primary" @click="handlerSearch">
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="ma-bill-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="id" label="付款账号"></el-table-column>
        <el-table-column prop="count" label="支付宝订单号"></el-table-column>
        <el-table-column prop="name" label="店铺名称"></el-table-column>
        <el-table-column prop="pay" label="充值人民币"></el-table-column>
        <el-table-column prop="pay" label="到账本金"></el-table-column>
        <el-table-column prop="pay" label="充值状态"></el-table-column>
        <el-table-column prop="pay" label="充值时间"></el-table-column>
        <el-table-column prop="pay" label="审核时间"></el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="query.page"
        :page-size="query.pageSize"
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
  export default {
    name: 'Charge',
    chargeStatus,
    data() {
      return {
        list: [],
        total: 10,
        query: {
          page: 1,
          pageSize: 10,
          order: '',
          code: '',
          status: '',
        },
        typeList: [],
        loading: false,
        btnLoading: false,
      }
    },
    created() {
      this.getTaskTypes()
      this.getTaskList()
    },
    methods: {
      async getTaskTypes() {
        this.typeList = await getTaskType()
      },
      async getTaskList() {
        this.loading = true
        this.list = await getTaskList()
        this.loading = false
      },
      handlerSearch() {
        console.log('===query', this.query)
      },
      handleViewDetail(row) {},
      async handleDelete(row) {
        this.btnLoading = true
        await deleteTask()
        this.btnLoading = false
      },
      handleSizeChange(val) {
        this.query.pageSize = val
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
