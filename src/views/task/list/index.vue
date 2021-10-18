<template>
  <div class="ma-task-list">
    <div class="ma-task-search">
      <el-row class="search-item">
        <el-col :span="8">
          <span class="search-title">店铺名称</span>
          <el-input
            v-model="query.storeName"
            size="medium"
            placeholder="请填写店铺名称"
            clearable
            @clear="getTaskList"
            @keyup.enter.native="getTaskList"
          />
        </el-col>
        <el-col :span="8">
          <span class="search-title">产品编号</span>
          <el-input
            v-model="query.itemcode"
            placeholder="请填写产品编号"
            clearable
            @clear="getTaskList"
            @keyup.enter.native="getTaskList"
          />
        </el-col>
        <el-col :span="8">
          <span class="search-title">订单编号</span>
          <el-input
            v-model="query.taskId"
            placeholder="请填订单号"
            clearable
            @clear="getTaskList"
            @keyup.enter.native="getTaskList"
          />
        </el-col>
      </el-row>
      <el-row class="search-item">
        <el-col :span="8">
          <span class="search-title">状态类型</span>
          <el-select
            v-model="query.taskStatus"
            clearable
            @change="getTaskList"
            @clear="getTaskList"
          >
            <el-option
              v-for="item in Object.keys(typeList)"
              :key="item"
              :label="typeList[item]"
              :value="Number(item)"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <span class="search-title">日期时间</span>
          <el-date-picker
            v-model="query.date"
            clearable
            type="daterange"
            range-separator="至"
            value-format="timestamp"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
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
      <el-table
        v-loading="loading.wrapper"
        :data="list"
        border
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="handleViewDetail"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <detail
              :detail="detailData"
              :loading="loading.detail"
              :row="scope"
            ></detail>
          </template>
        </el-table-column>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column prop="taskCount" label="任务数量"></el-table-column>
        <el-table-column prop="storeName" label="店铺名称"></el-table-column>
        <el-table-column
          prop="totalAmount"
          label="任务费用（元)"
        ></el-table-column>
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
  import Detail from './detail'

  export default {
    name: 'List',
    taskOriginRules,
    components: {
      Detail,
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
            this.query.beginTime = minDate
            this.query.endTime = maxDate
          },
        },
        viewDetail: false,
        detailData: {},
        getRowKeys(row) {
          return row.taskId
        },
        expands: [],
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
        this.list = res.data || []
        this.total = res.count
        this.loading.wrapper = false
      },
      async handleViewDetail(row = {}, expandedRows) {
        if (expandedRows.length) {
          this.expands = []
          this.expands.push(row.taskId)
        } else {
          this.expands = []
        }
        let id = row.taskId || ''
        if (!id) return
        await this.handleGetDetail(id, row)
      },
      async handleDelete(row = {}) {
        try {
          this.loading.delete = true
          await deleteTask(row.taskId)
          this.$baseMessage('删除成功', 'success')
          this.getTaskList()
        } finally {
          this.loading.delete = false
        }
      },
      handleSizeChange(val) {
        this.query.limit = val
        this.getTaskList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.getTaskList()
      },
      handleGetDetail(id) {
        this.loading.detail = true
        getTaskDetail(id)
          .then((res) => {
            this.detailData = res.data || {}
          })
          .finally((_) => {
            this.loading.detail = false
          })
      },
      timeChange(val) {
        if (!val) {
          this.query.beginTime = ''
          this.query.endTime = ''
        }
        this.getTaskList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ma-task-list {
    .ma-task-search {
      .search-item {
        margin-top: 10px;

        .search-title {
          margin-right: 8px;
        }

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
