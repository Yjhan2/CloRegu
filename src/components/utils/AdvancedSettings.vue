<!-- src/components/AdvanceSettingContainer.vue -->
<template>
    <div class="advanced-settings-container">
      <div class="advanced-settings-header">
        <el-icon><Setting /></el-icon>
        <h2>高级设置</h2>
      </div>
      <div class="advanced-settings">
        <el-form :model="form" label-width="120px">
          <el-form-item label="启用日志记录">
            <el-switch v-model="form.enableLogging"></el-switch>
          </el-form-item>
          <el-form-item label="日志级别">
            <el-select v-model="form.logLevel" placeholder="请选择日志级别">
              <el-option label="错误" value="error"></el-option>
              <el-option label="警告" value="warn"></el-option>
              <el-option label="信息" value="info"></el-option>
              <el-option label="调试" value="debug"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大重试次数">
            <el-input-number v-model="form.maxRetries" :min="0" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="超时时间（秒）">
            <el-input-number v-model="form.timeout" :min="0" :max="300"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveSettings">保存设置</el-button>
          </el-form-item>
                      <el-form-item>
          <el-button type="primary" @click="$emit('toggle-advanced-settings')">返回</el-button>
        </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Setting } from '@element-plus/icons-vue'
  
  const form = ref({
    enableLogging: false,
    logLevel: '',
    maxRetries: 3,
    timeout: 60
  })
  
  const saveSettings = () => {
    // 在这里添加保存设置的逻辑
    console.log('设置已保存', form.value)
  }
  </script>
  
  <style scoped>
  .advanced-settings-container {
    width: 100%; /* 设置左侧设置页面的宽度 */
    height: 100vh; /* 设置高度与视口高度匹配 */
    background-color: #ffffff; /* 设置背景颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #e0e0e0; /* 添加右侧边框代替阴影 */
    margin-top: 0; /* 确保没有间隔 */
  }
  .advanced-settings-header {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%;
    padding: 10px;
  }
 
  .advanced-settings-header el-icon {
    display: flex;
    align-items: center;
    /* width: 100%; */
    padding: 10px;
  }
  
  .advanced-settings {
    text-align: center;
    width: 100%;
  }
  
  .custom-input {
    width: 200%;
    border-radius: 16px !important; 
  }
  </style>