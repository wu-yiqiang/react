module.exports = {
  root: true,   // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  env: { browser: true, es2020: true },   // env 表示启用 ESLint 检测的环境 // 在浏览器环境下启动 ESLint 检测
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
  }
}
