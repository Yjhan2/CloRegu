<template>
  <div class="main-content">
    <div class="progress-bar" v-if="showProgressBar">
      <el-progress :percentage="progress"></el-progress>
    </div>
    <div class="gallery left-gallery" ref="leftGallery">
      <div class="gallery-wrapper">
        <div class="gallery-item" v-for="n in galleryItems" :key="'left-' + n" @click="showImage('left', n)"></div>
      </div>
    </div>
    <div class="main-area">
      <div class="display-box left-display-box">
        <img v-if="leftImage" :src="leftImage"/>
      </div>
      <el-icon size="32"><ArrowRightBold /></el-icon>
      <div class="display-box right-display-box">
        <img v-if="rightImage" :src="rightImage"/>
      </div>
    </div>
    <div class="gallery right-gallery" ref="rightGallery">
      <div class="gallery-wrapper">
        <div class="gallery-item" v-for="n in galleryItems" :key="'right-' + n" @click="showImage('right', n)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import BScroll from '@better-scroll/core'
import { ElProgress } from 'element-plus'
import { ArrowRightBold } from '@element-plus/icons-vue'

const galleryItems = Array.from({ length: 10 }, (_, i) => i + 1)
const leftGallery = ref(null)
const rightGallery = ref(null)

const showProgressBar = ref(false)
const progress = ref(0)
const leftImage = ref(null)
const rightImage = ref(null)

onMounted(() => {
  new BScroll(leftGallery.value, {
    scrollY: true,
    click: true
  })
  new BScroll(rightGallery.value, {
    scrollY: true,
    click: true
  })
})

watch(progress, (newProgress) => {
  if (newProgress >= 100) {
    setTimeout(() => {
      showProgressBar.value = false
    }, 500)
  }
})

const startProgress = () => {
  showProgressBar.value = true
  progress.value = 0
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 10
    } else {
      clearInterval(interval)
    }
  }, 500)
}

const showImage = (gallery, image) => {
  if (gallery === 'left') {
    leftImage.value = `图片 ${image}`
  } else if (gallery === 'right') {
    rightImage.value = `图片 ${image}`
  }
}

defineExpose({
  startProgress
})
</script>

<style scoped>
.main-content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  z-index: 1000;
}

.gallery {
  width: 10%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.gallery-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gallery-item {
  width: 80%;
  height: 100px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  cursor: pointer;
}

.main-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.display-box {
  width: 30%;
  height: 50%;
  background-color: #f0f0f0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.arrow {
  width: 30px; /* 调整箭头图片的宽度 */
  height: auto; /* 保持箭头图片的高度自适应 */
  margin: 0 10px;
}

.left-display-box {
  margin-right: 10px;
}

.right-display-box {
  margin-left: 10px;
}
</style>