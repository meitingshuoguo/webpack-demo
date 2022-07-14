const os = require("os");
const path = require("path"); //node.js的核心模块，专门用来处理路径问题
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadPlugin = require("preload-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const threads = os.cpus.length;

function getStyleLoader(preset) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    preset,
  ].filter(Boolean);
}

module.exports = {
  // 入口
  entry: "./src/main.js", //相对路径
  // 输出
  output: {
    // 所有文件的输出路径
    // __dirname是node.js的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"), //绝对路径
    // 入口文件打包输出文件名
    filename: "static/js/[name].[contenthash:10].js", //文件名
    // 给打包输出的其他文件命名
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    // 图片、字体等通过type：asset处理资源命名方式
    assetModuleFilename: "static/media/[name].[hash:10][ext][query]",
    // 自动清空上次打包的内容
    // 原理：在打包前，将path整个目录内容清空，再进行打包
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [
          // loader的配置
          {
            test: /\.css$/i, //判断要检测什么文件
            //执行顺序，从右往左。
            // style-loader 将js中css通过创建style标签添加到html文件中生效
            // css-loader 将css资源编译成commonjs的模块到js中
            use: getStyleLoader(),
          },
          {
            test: /\.less$/,
            use: getStyleLoader("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoader("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                // 小于10kb的图片转base64
                // 转换后体积会变大
                maxSize: 20 * 1024,
              },
            },
            // generator: {
            //   // 输出图片名称
            //   filename: "static/images/[hash:10][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource",
            // generator: {
            //   // 输出图片名称
            //   filename: "static/media/[hash:10][ext][query]",
            // },
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
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
                  plugins: ["@babel/plugin-transform-runtime"],
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
      threads, //开启多进程和设置数量
    }),
    new HtmlWebpackPlugin({
      // 模版，以public/idnex.html文件创建新的html文件
      // 新的文件特点：1.结构和原来一致。2.会自动引入打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    new PreloadPlugin({
      rel: "preload",
      as: "script",
      // rel: "prefetch",
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    // 压缩的操作
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        parallel: threads,
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
  // 模式
  mode: "production",
  devtool: "source-map",
};
