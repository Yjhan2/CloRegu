<template>
  <el-container class="settings-container">
    <el-header class="settings-header">
      <el-icon :size="28"><Setting /></el-icon>
      <h2 class="settings-title">控制台</h2>
  </el-header>
    <el-main class="settings-main">
      <el-form :model="form">
        <el-form-item :error="errors.uploadUrl" class="custom-input">
          <el-row :span="228" justify="start">
            上传地址
          </el-row>
          <input type="file" webkitdirectory @change="handleUploadSuccess" style="display: none;" ref="uploadInput"/>
          <el-input v-model="form.uploadUrl" readonly @click="handleClick('uploadInput')"  class="input-box">
          <template #prefix>
              <el-icon style="font-size: 28px;">
                <UploadFilled />
              </el-icon>
            </template>
          </el-input>
          <span v-if="errors.uploadUrl" class="error-message">{{ errors.uploadUrl }}</span>
        </el-form-item>
        <!-- <el-form-item label="存储地址" :error="errors.storagePath">
          <input type="file" webkitdirectory @change="handleStorageSuccess" style="display: none;" ref="storageInput" />
          <el-input v-model="form.storagePath" readonly @click="handleClick('storageInput')" class="custom-input"></el-input>
          <span v-if="errors.storagePath" class="error-message">{{ errors.storagePath }}</span>
        </el-form-item> -->
        <el-form-item :error="errors.clothingType" class="custom-input">
          <el-row :span="28" justify="start">
             服装选择
          </el-row>
          <el-select v-model="form.clothingType" placeholder="请选择服装类型" size="large" class="clothing-select">
            <el-option
              v-for="item in clothingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span v-if="errors.clothingType" class="error-message">{{ errors.clothingType }}</span>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="$emit('toggle-advanced-settings')">高级设置</el-button>
        </el-form-item> -->
        <el-form-item class="custom-input">
              <el-button class="button-container" type="info" round style="width: 200%;" @click="validateAndStartGeneration">生    成</el-button>
          <!-- <el-button type="danger" @click="stopGeneration" :disabled="!isGenerating">停止</el-button> -->
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer class="settings-advance">
      
      <el-row class="option1" :class="{ 'slide': showAdvancedSettings }">
      <el-row class="advanced-settings-text"><span>高级设置</span> <el-icon class="plus-icon" :class="{ 'rotate': showAdvancedSettings }"><Plus /></el-icon>
      <button class="invisible-button" @click="showAdvancedSettings=!showAdvancedSettings"></button>
      </el-row>
        <transition name="slide-fade">
        <div v-show="showAdvancedSettings" class="advanced-settings-content">
          <!-- 高级设置内容 -->
          <p>这里是高级设置的内容</p>
        </div>
      </transition>
    </el-row>

    <el-row class="option1" :class="{ 'slide': showAdvancedSettings1 }">
      <el-row class="advanced-settings-text"><span>问题反馈</span> <el-icon class="plus-icon" :class="{ 'rotate': showAdvancedSettings1 }"><Plus /></el-icon>
      <button class="invisible-button" @click="showAdvancedSettings1=!showAdvancedSettings1"></button>
      </el-row>
        <transition name="slide-fade">
        <div v-show="showAdvancedSettings1" class="advanced-settings-content">
          <!-- 高级设置内容 -->
          <p>这里是高级设置的内容</p>
        </div>
      </transition>
    </el-row>
    </el-footer>
</el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Setting, Plus, UploadFilled } from '@element-plus/icons-vue'


const form = ref({
  uploadUrl: '',
  storagePath: '',
  clothingType: '',
  advancedSettings: false
})

const errors = ref({
  uploadUrl: '',
  storagePath: '',
  clothingType: ''
})

const clothingOptions = [
  { value: 'shirt', label: '衬衫' },
  { value: 'pants', label: '裤子' },
  { value: 'dress', label: '连衣裙' },
  { value: 'jacket', label: '夹克' }
]

const isGenerating = ref(false)

const validateAndStartGeneration = () => {
  // 重置错误状态
  errors.value.uploadUrl = ''
  errors.value.storagePath = ''
  errors.value.clothingType = ''

   // 验证表单字段
   if (!form.value.uploadUrl) {
    errors.value.uploadUrl = '上传地址不能为空'
    clearError('uploadUrl')
  }
  if (!form.value.storagePath) {
    errors.value.storagePath = '存储地址不能为空'
    clearError('storagePath')
  }
  if (!form.value.clothingType) {
    errors.value.clothingType = '服装选择不能为空'
    clearError('clothingType')
  }

  // 如果没有错误，则开始生成
  if (!errors.value.uploadUrl && !errors.value.storagePath && !errors.value.clothingType) {
    startGeneration()
  }
}

const clearError = (field) => {
  setTimeout(() => {
    errors.value[field] = ''
  }, 1500) // 3秒后清除错误消息
}

const startGeneration = () => {
  isGenerating.value = true
  // 在这里添加生成逻辑
  const mainContent = document.querySelector('.main-content')
  mainContent.dispatchEvent(new CustomEvent('start-progress'))
}

// const stopGeneration = () => {
//   isGenerating.value = false
//   // 在这里添加停止逻辑
// }

const handleUploadSuccess = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    form.value.uploadUrl = files[0].webkitRelativePath.split('/')[0]
  }
}

// const handleStorageSuccess = (event) => {
//   const files = event.target.files
//   if (files.length > 0) {
//     form.value.storagePath = files[0].webkitRelativePath.split('/')[0]
//   }
// }

const handleClick = (refName) => {
  const inputRef = refName === 'uploadInput' ? uploadInput.value : storageInput.value
  if (inputRef) {
    inputRef.click()
  }
}

const uploadInput = ref(null)
const storageInput = ref(null)
const showAdvancedSettings = ref(false)
const showAdvancedSettings1 = ref(false)
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap'); */
.settings-container {
    width: 100%; /* 设置左侧设置页面的宽度 */
    height: 100%; /* 设置高度与视口高度匹配 */
    background-color: #ffffff; /* 设置背景颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #e0e0e0; /* 添加右侧边框代替阴影 */
    margin-top: 0; /* 确保没有间隔 */
    font-family: 'PingFangSC-Semibold';
}

.input-box {
  width: 100%;
  height: 42px;
}

.settings-header {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%;
    height: 20%;
    padding: 10px;
}

.settings-header el-icon {
  margin-right: 10px;
  align-items: center;
}

.settings-title {
  font-size: 200%; /* 设置标题字体大小 */
}

.custom-input {
  width: 100%;
  height: 75px;
  border-radius: 16px !important; 
}

.settings-main {
    text-align: center;
    width: 80%;
    flex: 1;
    position: relative; /* 确保子元素可以使用绝对定位 */
}

.button-container {
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  background-color: #0c0c0c;
  border: none !important; /* 移除按钮边框 */
}

.clothing-select {
  width: 100%;
  height: 100%;
  .el-input__inner {
    height: 100%;
  }
}


.settings-advance {
    width: 80%;
    height: 40%;
    display: flex;
    /* justify-content: center; */
    flex-direction: column; /* 垂直排列 */
    align-items: flex-start;
    cursor: pointer;
}

.option1 {
    top: 0; /* 距离顶部0 */
    width: 100%;
    height: 15%;
    align-items: center;
    border-top: 1px solid #0c0c0c; /* 添加顶部边框 */
    border-bottom: 1px solid #0c0c0c; /* 添加底部边框 */
    cursor: pointer;
    font-size: 120%;
    transition: height 0.5s ease; /* 添加高度过渡效果 */
    /* position: relative; */
}

.option1.slide {
    height: 80%;
}

.invisible-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  background: none;
}

.plus-icon {
  transition: transform 0.3s ease; /* 添加过渡动画 */
  right:10px;
}

.plus-icon.rotate {
  transform: rotate(45deg); /* 旋转45度 */
  right:10px;
}

.advanced-settings-text {
  position: absolute; 
  left: 10px; /* 根据需要调整 */
  top: 8px; /* 根据需要调整 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 水平分布 */
  width: calc(100% - 20px); /* 根据需要调整 */
  letter-spacing: 0.1em; /* 设置字母间距 */
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.error-message {
  color: red;
  font-size: 12px;
}

</style>