<template>
  <div class="task-list-add">
    <div class="wrapper-header">
      <el-icon class="el-icon-arrow-left"></el-icon>
      返回任务列表
    </div>
    <div class="wrapper-container">
      <el-form v-model="formData" label-width="100px" label-position="left">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="form-label">任务控制</div>
            <el-form-item label="发布模式">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.publishMode)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务数">
              <el-input-number
                min="1"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <div class="form-label">任务控制</div>
            <el-form-item label="任务备注">
              <el-input type="textarea" :rows="2"></el-input>
            </el-form-item>
            <div class="form-label">商品信息</div>
            <el-form-item label="商品链接">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="敦煌网店铺ID">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="产品数量">
              <el-input-number
                controls-position="right"
                min="1"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="订单成交价">
              <el-input>
                <template slot="append">美元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>Color:</span>
              <div class="color-list"></div>
              <span>Options:</span>
              <div class="options-list"></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="form-label">下单要求</div>
            <el-form-item label="任务来源">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.taskOrigins)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来路要求">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.taskOriginRules)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否改价">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.changePrices)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买手国家">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.countries)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单留言要求">
              <el-checkbox></el-checkbox>
            </el-form-item>
            <el-form-item label="收藏">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.collections)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需要物流单号">
              <el-checkbox></el-checkbox>
            </el-form-item>
            <el-form-item label="快递物流">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.express)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="form-label">确认收货与评论要求</div>
            <el-form-item label="确认收货天数">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.days)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评论要求">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.commentRequire)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评论要求">
              <el-select>
                <el-option
                  v-for="item in Object.entries($options.stars)"
                  :key="item[0]"
                  :label="item[0]"
                  :value="item[1]"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="form-label">费用清单</div>
            <div class="cost-list">
              <div class="cost-item">今日汇率：</div>
              <div class="cost-item">收取本金：</div>
              <div class="cost-item">支付手续费：</div>
              <div class="cost-item">基本佣金：</div>
              <div class="cost-item">评论要求：</div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    publishMode,
    taskOrigins,
    taskOriginRules,
    countries,
    changePrices,
    collections,
    express,
    days,
    commentRequire,
    stars,
  } from '../../const'
  export default {
    name: 'Add',
    publishMode,
    taskOrigins,
    taskOriginRules,
    countries,
    changePrices,
    collections,
    express,
    days,
    commentRequire,
    stars,
    data() {
      return {
        formData: {},
      }
    },
  }
</script>

<style scoped lang="scss">
  .task-list-add {
    .wrapper-header {
      margin-bottom: 20px;
    }
    .wrapper-container {
      margin-top: 10px;
      .el-form-item {
        .el-input,
        .el-select,
        .el-textarea,
        .el-input-number {
          width: 90%;
        }
      }
      .form-label {
        font-size: 16px;
        color: #1890ff;
        padding-bottom: 2px;
        border-bottom: 1px dotted;
        margin-bottom: 10px;
      }
    }
  }
</style>
