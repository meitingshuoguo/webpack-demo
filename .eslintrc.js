module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 11, //ES语法版本
    sourceType: "module", //ES模块化
    ecmaFeatures: {
      jsx: true, //如果是React项目，就需要开启jsx语法
    },
  },
  // 可以继承某一种风格的规则
  extends: ["eslint:recommended"],
  env: {
    node: true, //启用node中全局变量
    browser: true, //启用浏览器中全局变量
  },
  // 具体的检查规则
  rules: {
    "no-var": 2,
  },
};
