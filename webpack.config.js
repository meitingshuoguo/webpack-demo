const path = require("path"); //node.js的核心模块，专门用来处理路径问题

module.exports = {
  // 入口
  entry: "./src/main.js", //相对路径
  // 输出
  output: {
    // 所有文件的输出路径
    // __dirname是node.js的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"), //绝对路径
    // 入口文件打包输出文件名
    filename: "static/js/mn.js", //文件名
    // 自动清空上次打包的内容
    // 原理：在打包前，将path整个目录内容清空，再进行打包
    clean: true,
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
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 转换后体积会变大
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 输出图片名称
          filename: "static/images/[hash:10][ext][query]",
        },
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};