<template>
  <div class="ma-task-list">
    <div class="ma-task-search">
      <el-row class="search-item">
        <el-col :span="8">
          店铺名称
          <el-input
            v-model="query.storeName"
            size="medium"
            placeholder="请填写店铺名称"
          ></el-input>
        </el-col>
        <el-col :span="8">
          产品编号
          <el-input
            v-model="query.itemcode"
            placeholder="请填写产品编号"
          ></el-input>
        </el-col>
        <el-col :span="8">
          订单编号
          <el-input v-model="query.taskId" placeholder="请填订单号"></el-input>
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="8">
          状态类型
          <el-select v-model="query.taskStatus">
            <el-option
              v-for="item in Object.keys(typeList)"
              :key="item"
              :label="typeList[item]"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          日期时间
          <el-date-picker
            v-model="query.date"
            type="daterange"
            range-separator="至"
            value-format="timestamp"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button class="search-btn" type="primary" @click="getTaskList">
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="ma-task-table">
      <el-table v-loading="loading.wrapper" :data="list" border>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column prop="taskCount" label="任务数量"></el-table-column>
        <el-table-column prop="storeName" label="店铺名称"></el-table-column>
        <el-table-column prop="totalAmount" label="任务费用"></el-table-column>
        <el-table-column prop="routeReq" label="任务要求">
          <template slot-scope="scope">
            {{ $options.taskOriginRules[scope.row.routeReq] }}
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态">
          <template slot-scope="scope">
            {{ typeList[scope.row.taskStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="handleViewDetail(scope.row)">详情</a>
            <el-popconfirm
              title="确定删除本条任务吗？"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
              <a class="delete-btn">删除</a>
              </template>
            </el-popconfirm>
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
    <detail-dialog
      v-if="viewDetail"
      v-model="viewDetail"
      :detail="detailData"
    />
  </div>
</template>

<script>
  import {
    getTaskType,
    getTaskList,
    deleteTask,
    getTaskDetail,
  } from '@/api/ma/task'
  import { taskOriginRules } from '../../const'
  import DetailDialog from '../components/detailDialog'

  export default {
    name: 'List',
    taskOriginRules,
    components: {
      DetailDialog,
    },
    data() {
      return {
        list: [],
        total: 0,
        query: {
          beginTime: '',
          endTime: '',
          itemcode: null,
          limit: 10,
          storeName: '',
          taskId: '',
          taskStatus: null,
          userType: '2',
          page: 1,
          date: '',
        },
        typeList: {},
        loading: {
          wrapper: false,
          detail: false,
          delete: false,
        },
        pickerOptions: {
          onPick: ({ maxDate, minDate }) => {
            this.query.beginTime = new Date(minDate).getTime()
            this.query.endTime = new Date(maxDate).getTime()
          },
        },
        viewDetail: true,
        detailData: {},
      }
    },
    created() {
      this.getTaskTypes()
      this.getTaskList()
    },
    methods: {
      async getTaskTypes() {
        this.typeList = getTaskType()
      },
      async getTaskList() {
        this.loading.wrapper = true
        let res = await getTaskList(this.query)
        this.list = res.list || [{ taskId: 2 }]
        this.total = res.count
        this.loading.wrapper = false
      },
      handleViewDetail(row = {}) {
        let id = row.taskId || ''
        if (!id) return
        this.handleGetDetail(id)
      },
      async handleDelete(row = {}) {
        this.loading.delete = true
        await deleteTask(row.taskId)
        this.$baseMessage('删除成功', 'success')
        this.loading.delete = false
        this.getTaskList()
      },
      handleSizeChange(val) {
        this.query.limit = val
      },
      handleCurrentChange(val) {
        this.query.page = val
      },
      handleGetDetail(id) {
        this.loading.detail = true
        getTaskDetail(id)
          .then((res) => {
            this.detailData = res.data || {}
            this.viewDetail = true
          })
          .finally((_) => {
            this.loading.detail = false
          })
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
      .delete-btn {
        margin-left: 5px;
        color: red;
      }
    }
    .el-pagination {
      text-align: right;
    }
  }
</style>
