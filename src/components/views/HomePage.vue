<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SettingsContainer from '@/components/utils/SettingsContainer.vue'
import AdvancedSettings from '@/components/utils/AdvancedSettings.vue' // 导入高级设置组件
import MainContent from '@/components/views/MainContent.vue' // 导入MainContent组件

// 定义表单数据
// const form = ref({
//   uploadUrl: '',
//   storagePath: '',
//   clothingType: '',
//   advancedSettings: false
// })

// const isGenerating = ref(false)
const showAdvancedSettings = ref(false) // 添加状态来控制显示哪个组件
const router = useRouter()
const showUserMenu = ref(false)

// const startGeneration = () => {
//   isGenerating.value = true
//   // 在这里添加生成逻辑
// }

// const stopGeneration = () => {
//   isGenerating.value = false
//   // 在这里添加停止逻辑
// }

// const handleUploadSuccess = (event) => {
//   const files = event.target.files
//   if (files.length > 0) {
//     form.value.uploadUrl = files[0].webkitRelativePath.split('/')[0]
//   }
// }

// const handleStorageSuccess = (event) => {
//   const files = event.target.files
//   if (files.length > 0) {
//     form.value.storagePath = files[0].webkitRelativePath.split('/')[0]
//   }
// }

// const handleClick = (refName) => {
//   const inputRef = refName === 'uploadInput' ? uploadInput.value : storageInput.value
//   if (inputRef) {
//     inputRef.click()
//   }
// }

// const uploadInput = ref(null)
// const storageInput = ref(null)
const userAvatar = ref(require('@/assets/logo2.png'))

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  console.log('用户已登出')
  router.push({ name: 'Login' })
}

const toggleAdvancedSettings = () => {
  showAdvancedSettings.value = !showAdvancedSettings.value
}
</script>

<template>
  <div class="home-page">
    <h1 class="title">
      服装规范化平台
      <!-- <el-button class="logout-button" type="primary" @click="logout">登出</el-button> -->
      <div class="user-avatar" :class="{ enlarged: showUserMenu }" @click="toggleUserMenu">
      <img :src="userAvatar" alt="User Avatar"/>
    </div>
    </h1>
    <div class="content">
      <div class="left-panel">
        <template v-if="!showAdvancedSettings">
          <SettingsContainer @toggle-advanced-settings="toggleAdvancedSettings" />
        </template>
        <template v-else>
          <AdvancedSettings @toggle-advanced-settings="toggleAdvancedSettings" />
        </template>
      </div>
      <div class="right-panel">
        <MainContent />
      </div>
    </div>
    <div v-if="showUserMenu" class="user-menu">
      <p>数据库</p>
      <p @click="logout">登出</p>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'PingFangSC-Semibold';
}

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}

.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0; /* 确保没有外边距 */
  padding: 0; /* 确保没有内边距 */
}

.title {
  color: #0a0a0a;
  padding: 20px;
  background-color: rgb(246, 248, 250);
  width: 100%;
  text-align: left;
  margin: 0; /* 确保没有外边距 */
  border-bottom: 1px solid #e0e0e0; /* 添加底部边框代替阴影 */
  box-sizing: border-box; /* 确保内边距和边框包含在元素的总宽度和高度内 */
  position: fixed; /* 固定位置 */
  top: 0; /* 距离顶部0 */
  left: 0; /* 距离左侧0 */
  z-index: 1000; /* 确保在最上层 */
}

.user-avatar {
  position: absolute;
  top: 10px;
  right: 30px;
  width: 60px; /* 设置圆形框的宽度 */
  height: 60px; /* 设置圆形框的高度 */
  border-radius: 50%; /* 设置为圆形 */
  border: 1px solid #0c0c0c; /* 设置边框颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保图片不会超出圆形框 */
}

.user-avatar.enlarged {
  width: 70px; /* 放大后的宽度 */
  height: 70px; /* 放大后的高度 */
}


.user-menu {
  position: absolute;
  top: 80px; /* 根据需要调整 */
  right: 30px; /* 根据需要调整 */
  width: 150px;
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1001; /* 确保在最上层 */
  border-radius: 10px; /* 添加圆角 */
  transition: all 0.3s ease; /* 添加过渡动画 */
}

.user-avatar img {
  width: 100%; /* 确保图片填满圆形框 */
  height: 100%; /* 确保图片填满圆形框 */
  border-radius: 50%; /* 确保图片本身也是圆形 */
}

.logout-button {
  position: absolute;
  top: 30%;
  right: 10px;
  border: none;
  background: none;
  color: #42b983;
  font-size: 16px;
  cursor: pointer;
}

.content {
  display: flex;
  flex: 1;
  width: 100%;
}

.left-panel {
  width: 20%;
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto; /* 确保内容不会外溢 */
}

.right-panel {
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
  overflow: auto; /* 确保内容在面板内部滚动 */
}
</style>