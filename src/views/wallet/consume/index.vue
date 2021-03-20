<template>
  <div class="ma-wallet-consume">
    <div class="ma-consume-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="id" label="金额"></el-table-column>
        <el-table-column prop="count" label="操作描述"></el-table-column>
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
  export default {
    name: 'Consume',
    data() {
      return {
        list: [],
        total: 10,
        query: {
          page: 1,
          pageSize: 10,
        },
      }
    },
    created() {
      this.handleGetList()
    },
    methods: {
      async handleGetList() {
        this.list = await []
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

<style lang="scss" scoped></style>
