import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import basicSsl from '@vitejs/plugin-basic-ssl'
import imageOptimizer from '@venturan/vite-plugin-image-optimizer'
import buildCompress from '@venturan/vite-plugin-build-compress'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}
export default defineConfig({
  envDir: './env',
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
    buildCompress(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'visualizer.html',
      open: false
    })
  ],
  server: {
    host: '0.0.0.0',
    https: false,
    hmr: true,
    port: 8090,
    proxy: {
      '/prod-api': {
        target: `http://192.168.1.222:8000/`,
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/prod-api/, '')
      }
    }
  },
  build: {
    assetsDir: 'assets',
    target: 'es2022',
    polyfillModulePreload: true,
    minify: 'esbuild',
    cssCodeSplit: false,
    cssTarget: '',
    emptyOutDir: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'esm',
        manualChunks: {
          echarts: ['echarts'],
          vendor: ['react', 'react-dom', 'react-router-dom', 'lodash-es', 'dayjs', 'alova', 'zustand'],
          antd: ['antd']
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo?.name
          if (fileName?.endsWith('.css')) return 'css/[name]-[hash].css'
          return 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
