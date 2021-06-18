<template>
  <el-drawer
    class="detail-dialog"
    title="任务详情"
    :visible.sync="value"
    direction="ltr"
  >
    <div class="detail-wrapper">
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="detail-item-label">任务信息</div>
          <div class="detail-item">
            <div class="content">任务名称：{{ xssTaskVO.taskId }}</div>
            <div class="content">任务备注：{{ xssTaskVO.remark }}</div>
            <div class="content">用户昵称：</div>
          </div>
          <div class="detail-item-label">任务信息</div>
          <div class="detail-item">
            <div class="content">任务名称：{{ xssTaskVO.taskId }}</div>
            <div class="content">任务备注：{{ xssTaskVO.remark }}</div>
            <div class="content">用户昵称：</div>
          </div>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
  export default {
    name: 'DetailDialog',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      detail: {
        type: Object,
        default: () => {
          return {
            xssTaskCostVO: {},
            xssTaskDetailVO: {},
            xssTaskProductVO: {},
            xssTaskVO: {},
          }
        },
      },
    },
  }
</script>

<style scoped></style>
