<template>
  <el-dialog
    width="500px"
    title="修改密码"
    :visible.sync="show"
    append-to-body
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model.trim="form.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="form.newPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { changePassword } from '@/api/ma/common'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        form: {
          newPassword: '',
          oldPassword: '',
        },
        rules: {
          newPassword: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入新密码',
            },
          ],
          oldPassword: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入旧密码',
            },
          ],
        },
      }
    },
    methods: {
      save() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.loading = true
            changePassword(this.form)
              .then((res) => {
                this.$message('修改密码成功')
              })
              .catch((err) => {
                this.$message(err.message)
              })
              .finally(() => {
                this.loading = false
              })
          }
        })
      },
      close() {
        this.$emit('close')
      },
    },
  }
</script>
