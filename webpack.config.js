const path = require("path");

module.exports = {
  // 入口
  entry: "./src/main.js", //相对路径
  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), //绝对路径
    filename: "mn.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
