import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}
export default ({ mode }) => {
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': pathResolve('/src/'),
        components: pathResolve('src/components')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${pathResolve('src/global.less')}";`
        }
      },
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, //视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            propList: ['*'],
            unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: true, // 允许在媒体查询中转换`px`
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    plugins: [
      react(),
      svgLoader(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [pathResolve('src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    server: {
      hmr: true,
      host: '0.0.0.0',
      port: 8090,
      proxy: {
        // '/test': { // 测试地址
        //   target: 'http://127.0.0.1:9999',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/test/, '')
        // },
        // '/production': { // 生产地址
        //   target: 'http://127.0.0.1:9999',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/production/, '')
        // },
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
            if (fileName?.endsWith('.ogg')) return 'audio/[name]-[extname]'
            return 'css/[name]-[hash][extname]'
          }
        }
      }
    }
  })
}