import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy:{
      '/app':{
        target:'http://127.0.0.1:4523/m1/5193937-4859747-e6b46f41',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/app/,''),
      }
    }
  }
})
