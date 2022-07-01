const path = require("path"); //node.js的核心模块，专门用来处理路径问题

module.exports = {
  // 入口
  entry: "./src/main.js", //相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname是node.js的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"), //绝对路径
    filename: "mn.js", //文件名
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/i, //判断要检测什么文件
        //执行顺序，从右往左。
        // style-loader 将js中css通过创建style标签添加到html文件中生效
        // css-loader 将css资源编译成commonjs的模块到js中
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
