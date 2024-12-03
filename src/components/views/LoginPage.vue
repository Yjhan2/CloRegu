<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建路由
const router = useRouter()

// 控制注册与登录表单的显示，默认显示登录
const isRegister = ref(false)
const username = ref('')
const password = ref('')
const email = ref('') // 注册表单需要的额外字段

// 登录方法
const login = async () => {
  try {
    const params = {
      account: username.value,
      password: password.value
    }

    const response = await axios.post('http://localhost:8888/user/login', params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.data === '登录成功') {
      // 显示成功消息
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      // 登录成功后跳转到首页
      router.push({ name: 'Home' })
    } else {
      // 显示失败消息
      ElMessage({
        message: '登录失败，用户名不存在或者密码错误',
        type: 'error',
      })
    }
  } catch (error) {
    console.error(error)
    // 显示错误消息
    ElMessage({
      message: '登录失败，请稍后再试',
      type: 'error',
    })
  }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :xs="22" :sm="18" :md="12" :lg="8" :xl="6" class="form-container">
            <el-form ref="form" size="large" autocomplete="off">
                <el-form-item>
                    <h1>{{ isRegister ? '注册' : '登录' }}</h1>
                </el-form-item>
                <el-form-item v-if="isRegister">
                    <el-input v-model="email" :prefix-icon="Message" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item v-if="!isRegister" class="flex">
                    <el-checkbox class="left">记住我</el-checkbox>
                    <el-link class="right" type="primary" :underline="false">忘记密码？</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">{{ isRegister ? '注册' : '登录' }}</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = !isRegister">
                        {{ isRegister ? '已有账号？登录' : '没有账号？注册' }}
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5; /* 修改背景颜色 */

    .form-container {
        aspect-ratio: 3 / 4; /* 设置宽高比为3:4 */
        width: 100%; /* 宽度自适应 */
        max-width: 400px; /* 最大宽度 */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px; /* 设置圆角 */
        box-shadow: 0 2px 12px rgba(15, 167, 194, 0.1);
        background-color: white; /* 设置背景颜色为白色 */

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .left {
            margin-right: auto;
        }

        .right {
            margin-left: auto;
        }
    }
}
</style>