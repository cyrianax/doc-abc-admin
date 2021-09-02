import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import icon from 'vite-plugin-svg-icons'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  plugins: [
    vue(),
    jsx(),
    icon({
      iconDirs: [path.resolve(process.cwd(), '/src/assets/icons')],
      symbolId: 'icon-[name]',
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/define.scss";'
      }
    }
  },
  envDir: './config',
  server: {
    open: true,
    port: 3333,
  },
})
