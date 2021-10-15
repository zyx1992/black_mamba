<template>
  <div class="register-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="registerForm"
          :model="form"
          class="register-form"
          :rules="registerRules"
          size="mini"
        >
          <div class="title">免费注册</div>
          <div class="title-tips">
            已有账户，
            <router-link to="/login">我要登录 ></router-link>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model.trim="form.username"
              v-focus
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              show-word-limit
              autocomplete="off"
            >
              <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              type="password"
              minlength="6"
              placeholder="输入密码（必填）"
              autocomplete="new-password"
            >
              <vab-icon slot="prefix" :icon="['fas', 'unlock']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="rPassword">
            <el-input
              v-model.trim="form.rPassword"
              type="password"
              placeholder="确认密码（必填）"
              autocomplete="new-password"
            >
              <vab-icon slot="prefix" :icon="['fas', 'unlock']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="register-btn"
              type="primary"
              @click.native.prevent="handleReister"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { isPassword, isPhone } from '@/utils/ma/validate'
  import { getUserRsa, signup } from '@/api/ma/common'
  import { handleRsaPassword } from '@/utils/ma/utils'
  import { title } from '@/config'

  export default {
    username: 'Register',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!value) return callback()
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      const validateRPassword = (rule, value, callback) => {
        const { password } = this.form
        if (!password) {
          return callback(new Error('请输入密码'))
        }
        if (password !== value) {
          return callback(new Error('两次密码输入不一致'))
        }
        callback()
      }
      return {
        getPhoneIntval: null,
        showRegister: false,
        title: this.$baseTitle,
        form: {
          username: '',
          password: '',
          rPassword: '',
        },
        registerRules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
            { validator: validatePhone, trigger: 'blur' },
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { validator: validatePassword, trigger: ' ' },
          ],
          rPassword: [
            { required: true, trigger: ' ', message: '请输入确认密码' },
            { validator: validateRPassword, trigger: ' ' },
          ],
        },
        loading: false,
      }
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
      this.getPhoneIntval = null
      clearInterval(this.getPhoneIntval)
    },
    methods: {
      handleReister() {
        this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            this.loading = true
            let res = await getUserRsa({ username: this.form.username })
            let { signKey } = res.data
            let password = encodeURIComponent(
              handleRsaPassword(signKey, this.form.password)
            )
            const param = {
              username: this.form.username,
              mobile: this.form.phone,
              password: password,
              userType: '2',
            }
            signup(param)
              .then((data) => {
                this.$baseNotify(`欢迎登录${title}`)
                this.$store.dispatch(
                  'common/getAccessToken',
                  data['access_token']
                )
                this.$router.push(`/`)
              })
              .finally((_) => {
                this.loading = false
              })
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      font-size: 24px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #626f85;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .register-btn {
      display: inherit;
      width: 100%;
      height: 40px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .register-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 499px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-password {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }

      .per-code {
        width: 100px;
        height: 36px;
        font-size: 20px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #bbc1ce;
      }

      .phone-code {
        width: 120px;
        height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-pwd {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        .el-input__count {
          .el-input__count-inner {
            background: transparent;
          }
        }

        .el-input__prefix {
          left: 15px;
          line-height: 40px;

          .svg-inline--fa {
            width: 20px;
          }
        }

        input {
          height: 40px;
          padding-left: 45px;
          font-size: 14px;
          line-height: 40px;
          color: $base-font-color;
          background: #fff;
          border-color: #dbdee3;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
