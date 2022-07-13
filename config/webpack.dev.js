const os = require("os");
const path = require("path"); //node.js的核心模块，专门用来处理路径问题
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const threads = os.cpus.length;
module.exports = {
  // 入口
  entry: "./src/main.js", //相对路径
  // 输出
  output: {
    // 所有文件的输出路径
    path: undefined, //绝对路径,开发模式不需要指定
    // 入口文件打包输出文件名
    filename: "static/js/mn.js", //文件名
  },
  // 加载器
  module: {
    rules: [
      {
        // 每个文件只能被其中一个loader配置处理
        oneOf: [
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
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource",
            generator: {
              // 输出图片名称
              filename: "static/media/[hash:10][ext][query]",
            },
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/, //排除该文件夹下的文件
            // include:path.resolve(__dirname,"../src") // 只处理该文件夹下的文件，只能同时用一种
            use: [
              {
                loader: "thread-loader", //开启多进程
                options: {
                  works: threads, //进程数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  cacheDirectory: true, //开启缓存
                  cacheCompression: false, //关闭缓存文件压缩
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint"),
      threads,
    }),
    new HtmlWebpackPlugin({
      // 模版，以public/idnex.html文件创建新的html文件
      // 新的文件特点：1.结构和原来一致。2.会自动引入打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器：不会输出资源，在内存中编译打包。
  devServer: {
    host: "localhost",
    port: "3000",
    open: true, //开启自动打开浏览器
    hot: true, //HMR,默认是开启的。
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
};
