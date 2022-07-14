import "core-js/es/promise";
import "./css/iconfont.css";
import "./css/index.css";
import count from "./js/count.js";
// import { mul } from "./js/math";
import sum from "./js/sum.js";
import "./less/index.less";
import "./scss/index.scss";
import "./stylus/index.styl";

document.getElementById("btn").onclick = function () {
  // eslint默认不支持动态导入语法
  // webpack特殊命名
  import(/* webpackChunkName: "math" */ "./js/math.js").then((res) => {
    console.log(res.mul(5, 6));
  });
};
console.log(count(10, 50));
console.log(sum(10, 51));

if (module.hot) {
  module.hot.accept("./js/count.js");
}

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
