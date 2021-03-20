<template>
  <div class="ma-task-list">
    <div class="ma-task-search">
      <el-row class="search-item">
        <el-col :span="8">
          店铺名称
          <el-input
            v-model="query.name"
            size="medium"
            placeholder="请填写店铺名称"
          ></el-input>
        </el-col>
        <el-col :span="8">
          产品编号
          <el-input
            v-model="query.code"
            placeholder="请填写产品编号"
          ></el-input>
        </el-col>
        <el-col :span="8">
          订单编号
          <el-input v-model="query.order" placeholder="请填订单号"></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="8">
          状态类型
          <el-select v-model="query.type">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          日期时间
          <el-date-picker v-model="query.date"></el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-button class="search-btn" type="primary" @click="handlerSearch">
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="ma-task-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="id" label="任务ID"></el-table-column>
        <el-table-column prop="count" label="任务数量"></el-table-column>
        <el-table-column prop="name" label="店铺名称"></el-table-column>
        <el-table-column prop="pay" label="任务费用"></el-table-column>
        <el-table-column prop="pay" label="任务要求"></el-table-column>
        <el-table-column prop="pay" label="订单号"></el-table-column>
        <el-table-column prop="pay" label="任务状态"></el-table-column>
        <el-table-column prop="pay" label="发布时间"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <div class="operation" @click="handleViewDetail(scope.row)">
              详情
            </div>
            <div class="operation" @click="handleDelete(scope.row)">删除</div>
          </template>
        </el-table-column>
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
  export default {
    name: 'List',
    data() {
      return {
        list: [],
        total: 10,
        query: {
          page: 1,
          pageSize: 10,
          name: '',
          type: '',
          code: '',
          order: '',
          date: '',
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
  .ma-task-list {
    .ma-task-search {
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
    .ma-task-table {
      margin-top: 20px;
    }
    .el-pagination {
      text-align: right;
    }
  }
</style>
