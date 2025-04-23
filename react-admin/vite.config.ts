import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import basicSsl from '@vitejs/plugin-basic-ssl'
import imageOptimizer from '@venturan/vite-plugin-image-optimizer'
import buildCompress from '@venturan/vite-plugin-build-compress'
import { resolve } from 'path'
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': pathResolve('src/')
      // components: pathResolve('src/components')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "@/style/mixin.scss";@import "@/style/global.scss";`
      }
    }
  },
  plugins: [
    imageOptimizer({ quality: 5 }),
    basicSsl(),
    react(),
    svgLoader(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve('src/assets/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    buildCompress()
  ],
  server: {
    host: '0.0.0.0',
    https: false,
    hmr: true,
    port: 8090,
    proxy: {
      '/prod-api': {
        // target: `http://192.168.1.34:8081`,
        target: `http://192.168.1.222:8000/`,
        //target: `http://192.168.1.15:8899`,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/prod-api/, '')
      }
    },
    build: {
      // 静态资源处理
      assetsDir: 'assets',
      // 最终构建的浏览器兼容目标
      target: 'es2015',
      // 是否自动注入module preload的polyfill
      polyfillModulePreload: true,
      // 指定混淆器
      minify: 'esbuild',
      // 启用css代码拆分
      cssCodeSplit: true,
      // 允许用户为css的压缩设置一个不同的浏览器target, 与build esbuild一致
      cssTarget: '',
      // 清空输入文件夹
      emptyOutDir: false,
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      // 启用压缩大小报告,
      // brotliSize: false,
      // chunk大小警告的限制
      chunkSizeWarningLimit: 500,
      // 取消sourceMap， 加快打包速度,
      sourcemap: false,
      rollupOptions: {
        output: {
          format: 'esm',
          manualChunks: (id) => {
            // if (id.includes('node_modules/vant')) return 'vant'
            // 对views目录中的文件进行单独打包
            // if (id.includes('src/views')) return 'views'
            if (id.includes('node_modules')) return id.toString().split('node_modules')[1].split('/')[0].toString()
          },
          entryFileNames: 'js/[name].hash.js',
          chunkFileNames: 'js/[name].hash.js',
          // assetFileNames: 'css/[name]-[hash][extname]'
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name
            if (fileName?.endsWith('.svg')) return 'img/svg/[name]-[hash][extname]'
            if (fileName?.endsWith('.ogg')) return 'audio/[name][extname]'
            return 'css/[name]-[hash][extname]'
          }
        }
      }
    }
  }
})
