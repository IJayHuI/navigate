import { defineStore } from 'pinia'
import { ref } from 'vue'

// 使用组合式 API 定义一个 store
export const group = defineStore('group', () => {
  const index = ref(0)
  return {
    index
  }
})

export const theme = defineStore('theme', () => {
  const theme = ref('withSystem')
  return {
    theme
  }
})
