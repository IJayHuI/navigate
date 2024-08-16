import { ref, createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'

export const screenWidth = ref(window.innerWidth)
window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

createApp(App).use(createPinia()).use(ElementPlus).mount('#app')
