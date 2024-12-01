// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createWebHistory, createRouter } from 'vue-router'
import './assets/styles/fonts.css'; // 引入字体样式

import LoginViews from './components/views/Login.vue'
import HomeView from './components/views/Home.vue'

const routes = [
    { path: '/', name: 'Login', component: LoginViews },
    { path: '/home', name: 'Home', component: HomeView }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')