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
      // assetsDir: 'assets',
      target: 'es2015',
      polyfillModulePreload: true,
      minify: 'esbuild',
      cssCodeSplit: true,
      cssTarget: '',
      emptyOutDir: true,
      reportCompressedSize: false,
      // 启用压缩大小报告,
       brotliSize: false,
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      outDir: 'dist', // 构建输出目录
      rollupOptions: {
        output: {
          format: 'esm',
          manualChunks: (id) => {
            if (id.includes('node_modules')) return id.toString().split('node_modules')[1].split('/')[0].toString()
          },
          treeshake: true,
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
//           assetFileNames: (assetInfo) => {
//             const fileName = assetInfo.name
//             if (fileName?.endsWith('.svg')) return '/assets/img/svg/[name]-[hash][extname]'
//             if (fileName?.endsWith('.ogg')) return '/assets/audio/[name][extname]'
//             return 'css/[name]-[hash][extname]'
//           }
        }
      }
    }
  }
})
