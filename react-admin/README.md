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

1.使用发布订阅者 单例模式封装消息中心，降低系统各个部分间的耦合关系，使后期功能维护更加方便快捷。
2.权限平台使用

1.避免chunk碎片化，合理设置chunk包体积，减少网络请求将chunk包数量减少20% （experimentalMinChunkSize）
2.通过引入带有tree-sharking功能的第三方包，减少第三方包的打包体积。
3.通过打包优化，去除conosle ， debugger 等
4.通过压缩代码减少打包体积，通过代码混淆提升代码安全性
5.通过优化，项目启动时间从850ms优化到510ms左右


54 -> 55 ->
HTTP2 87~97
DeleteDictItem


分包(打包treeshake)
12MB -> 6MB
