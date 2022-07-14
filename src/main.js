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
  import("./js/math").then((res) => {
    console.log(res.mul(5, 6));
  });
};
console.log(count(10, 50));
console.log(sum(10, 51));

if (module.hot) {
  module.hot.accept("./js/count.js");
}
