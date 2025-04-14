# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


数据分析需求
1.接口报错数据分析
2.接口响应数据分析
3.垃圾体积重量日期等维度分析
4.

使用发布订阅者 单例模式 策略模式
zustand // https://juejin.cn/post/7321049446443384870
antd Theme // https://ant-design.antgroup.com/theme-editor-cn#Color
antd Components // https://ant-design.antgroup.com/components/overview-cn/

1.使用发布订阅者、单例模式封装各类组件，降低系统各个部分间的耦合关系，减少功能冗余，增强扩展性提升简洁性。
2.使用策略模式优化代码分支，使代码更加清晰。
3.使用zustand封装全局状态，使各个组件之间的数据共享更加方便。
4.使用antd Theme封装主题，使各个组件的样式更加统一。
5.使用antd Components封装常用组件，使开发更加方便快捷。
6.使用axios封装请求，使请求更加方便。
7.使用echarts封装图表，使图表更加方便。
8.使用AI模型，完成人脸识别登陆系统

1.避免chunk碎片化，合理设置chunk包体积，减少网络请求将chunk包数量减少20% （experimentalMinChunkSize）
2.通过引入带有tree-sharking功能的第三方包，减少第三方包的打包体积。
3.通过打包优化，去除conosle ， debugger 等
4.通过压缩代码减少打包体积，通过代码混淆提升代码安全性
5.通过优化，项目启动时间从850ms优化到510ms左右
6.自动化国际翻译，减少人工翻译成本


54 -> 55 ->
HTTP2 87~97
DeleteDictItem


分包(打包treeshake)
12MB -> 6MB


ts:
https://segmentfault.com/a/1190000041910773
https://zhuanlan.zhihu.com/p/149965449
https://typescript.p6p.net/typescript-tutorial/mapping.html
https://segmentfault.com/a/1190000043273946
https://www.tslang.cn/docs/handbook/generics.html
echarts: https://www.isqqw.com/?t=tree