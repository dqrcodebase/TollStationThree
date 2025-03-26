/*
 * @Author: dqr
 * @Date: 2025-03-20 10:28:24
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-03-24 15:36:54
 * @FilePath: /收费站-three/vite.config.js
 * @Description: 
 * 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入函数/API
import AutoImport from 'unplugin-auto-import/vite'
// 自动注册 Vue 组件
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
