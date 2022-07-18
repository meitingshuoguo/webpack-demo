const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
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
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  mode: "development",
};
