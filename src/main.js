import "./css/iconfont.css";
import "./css/index.css";
import count from "./js/count.js";
import sum from "./js/sum.js";
import "./less/index.less";
import "./scss/index.scss";
import "./stylus/index.styl";

console.log(count(10, 50));
console.log(sum(10, 51));

if (module.hot) {
  module.hot.accept("./js/count.js");
}
