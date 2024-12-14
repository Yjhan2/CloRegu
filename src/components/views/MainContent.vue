<template>
  <div class="main-content">
    <div class="gallery left-gallery" ref="leftGallery">
      <div class="gallery-wrapper">
        <div class="gallery-item" v-for="(item, index) in galleryLeftItems" :key="'left-' + index" @click="showImage('left', item.src, index)">
          <img :src="item.src" alt="Gallery Image" />
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="progress-left">
        <el-progress :percentage="leftProgress" style="width:50%" :stroke-width="15" striped color="#F56C6C" :format="formatLeftProgress"/>
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
      <div class="progress-right">
        <el-progress :percentage="RightProgress" style="width:50%" :stroke-width="15" striped :format="formatRightProgress"/>
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
import { ref, onMounted } from 'vue'
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

const leftProgress = ref(0)
const RightProgress = ref(0)

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


const formatLeftProgress = (percentage) => {
  return percentage === 100 ? '分割完毕' : `${percentage}%`
}

const formatRightProgress = (percentage) => {
  return percentage === 100 ? '规范化完毕' : `${percentage}%`
}

const showImage = (gallery, src) => {
  console.log('Show image:', gallery, src);
  if (gallery === 'left') {
    leftImage.value = src
  } else if (gallery === 'right') {
    rightImage.value = src
  }
}

</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
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
  height: 100vh; /* 固定画廊的高度 */
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

.middle {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.progress-left {
  display: flex;
  width: 100%;
  height: 25%;
}

.progress-right {
  display: flex;
  width: 100%;
  height: 25%;
  justify-content: flex-end; /* 第二个进度条靠右 */
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}

.main-area {
  flex: 1;
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: row; /* 水平排列 */
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 3%; /* 设置子元素之间的间隔 */
}

.display-box {
  width: 40%;
  padding-top: 55%;
  background-color: #f0f0f0;
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
  width: 10%; /* 调整箭头图片的宽度 */
  height: auto; /* 保持箭头图片的高度自适应 */
  margin: 0 10px;
}

.left-display-box {
  /*margin-right: 10%;*/
}

.right-display-box {
  /*margin-left: 10%;*/
}
</style>