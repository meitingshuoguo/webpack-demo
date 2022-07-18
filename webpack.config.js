const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
// const TestPlugin = require("./plugins/test-plugin");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    // clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   // use: ["./loaders/demo/sync.js", "./loaders/demo/async.js"],
      //   // use: ["./loaders/demo/raw.js"],
      //   // use: [
      //   //   "./loaders/demo/pitch.js",
      //   //   "./loaders/demo/pitch2.js",
      //   //   "./loaders/demo/pitch3.js",
      //   // ]
      //   /*
      //   执行顺序是 pitch loader1
      //   pitch loader2
      //   pitch loader3
      //   normal loader3
      //   normal loader2
      //   normal loader1
      //   熔断机制，可以提前终止。在pitch方法（默认不return）return后。
      //   */
      //   loader: "./loaders/clean-log-loader.js",
      // },
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/banner-loader/index.js",
      //   options: {
      //     author: "hehe",
      //     // dd: "dd", //schema.json中会约束options的配置
      //   },
      // },
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader/index.js",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "./loaders/file-loader/index.js",
        type: "javascript/auto", //阻止webpack对图片资源的默认处理。只使用当前loader来处理。否则会有重复。
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: ["./loaders/style-loader/index.js", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // new TestPlugin(),
    // new BannerWebpackPlugin({
    //   author: "dadada",
    // }),
    new CleanWebpackPlugin(),
  ],
  mode: "production",
};
