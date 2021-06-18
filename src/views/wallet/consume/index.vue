<template>
  <div class="ma-wallet-consume">
    <div class="ma-consume-table">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column
          prop="expendTypeDescribe"
          label="操作描述"
        ></el-table-column>
        <el-table-column prop="createdAt" label="时间">
          <template slot-scope="scope">
            {{scope.row.createdAt | converTime}}
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
  import { getExpendList } from '@/api/ma/wallet'
  export default {
    name: 'Consume',
    data() {
      return {
        list: [],
        total: 0,
        query: {
          page: 1,
          limit: 10,
        },
        loading: false,
      }
    },
    async created() {
      await this.handleGetList()
    },
    methods: {
      async handleGetList() {
        this.loading = true
        getExpendList(this.query)
          .then((res) => {
            console.log('===res', res)
            // TODO 替换res[0]
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

<style lang="scss" scoped></style>
