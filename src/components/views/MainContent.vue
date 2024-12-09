<template>
  <div class="main-content">
    <div class="progress-bar" v-if="showProgressBar">
      <el-progress :percentage="progress"></el-progress>
    </div>
    <div class="gallery left-gallery" ref="leftGallery">
      <div class="gallery-wrapper">
        <div class="gallery-item" v-for="(item, index) in galleryLeftItems" :key="'left-' + index" @click="showImage('left', item.src, index)">
          <img :src="item.src" alt="Gallery Image" />
        </div>
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
        <div class="gallery-item" v-for="(item, index) in galleryRightItems" :key="'right-' + index" @click="showImage('right', item.src, index)">
          <img :src="item.src" alt="Gallery Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import BScroll from '@better-scroll/core'
import { ElProgress } from 'element-plus'
import { ArrowRightBold } from '@element-plus/icons-vue'

const galleryLeftItems = ref([
{ src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  { src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  { src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  { src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  { src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  { src: require('@/assets/images/image_gallary1.jpg') },
  { src: require('@/assets/images/image_gallary2.jpg') },
  { src: require('@/assets/images/image_gallary3.jpg') },
  { src: require('@/assets/images/image_gallary4.jpg') },
  { src: require('@/assets/images/image_gallary5.jpg') },
  // 添加更多预设图片
])

const galleryRightItems = ref([
{ src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  { src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  { src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  { src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  { src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  { src: require('@/assets/images/image_gallary11.jpg') },
  { src: require('@/assets/images/image_gallary12.jpg') },
  { src: require('@/assets/images/image_gallary13.jpg') },
  { src: require('@/assets/images/image_gallary14.jpg') },
  { src: require('@/assets/images/image_gallary15.jpg') },
  // 添加更多预设图片
])

// const galleryItems = Array.from({ length: 25 }, (_, i) => i + 1)
const leftGallery = ref(null)
const rightGallery = ref(null)

const showProgressBar = ref(false)
const progress = ref(0)
const leftImage = ref(null)
const rightImage = ref(null)

let leftScroll = null
let rightScroll = null

onMounted(() => {
  console.log('Component mounted');
  leftScroll = new BScroll(leftGallery.value, {
    scrollY: true,
    click: true
  })
  rightScroll = new BScroll(rightGallery.value, {
    scrollY: true,
    click: true
  })

  leftScroll.on('scroll', (pos) => {
    console.log('Left scroll position:', pos);
    if (rightScroll) {
      rightScroll.scrollTo(pos.x, pos.y)
    }
  })

  rightScroll.on('scroll', (pos) => {
    console.log('Right scroll position:', pos);
    if (leftScroll) { 
      leftScroll.scrollTo(pos.x, pos.y)
    }
  })
})

watch(progress, (newProgress) => {
  if (newProgress >= 100) {
    setTimeout(() => {
      showProgressBar.value = false
    }, 500)
  }
})

const showImage = (gallery, src) => {
  console.log('Show image:', gallery, src);
  if (gallery === 'left') {
    leftImage.value = src
  } else if (gallery === 'right') {
    rightImage.value = src
  }
}

// defineExpose({
//   startProgress
// })
// </script>

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
  height: 800px; /* 固定画廊的高度 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: center; /* 水平居中 */
}

.gallery-wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  justify-content: center; /* 水平居中 */
  position: relative; /* 确保 BetterScroll 正常工作 */
}

/* 隐藏滚动条 */
.gallery-wrapper::-webkit-scrollbar {
  display: none;
}

.gallery-item {
  width: 100%;
  padding-top: 150%;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative; /* 绝对定位 */
}

.gallery-item img {
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片的长宽比，缩放图片以适应容器 */
}

.main-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.display-box {
  width: 50%;
  padding-top: 65%;
  background-color: #f0f0f0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* 绝对定位 */
  overflow: hidden; /* 确保图片不会超出圆形框 */
}

.display-box img {
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片的长宽比，缩放图片以适应容器 */
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