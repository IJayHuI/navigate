import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://server.jayhu.site/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false
      }
    },
    host: "0.0.0.0"
  }
})
