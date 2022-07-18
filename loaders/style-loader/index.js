module.exports = function (content) {
  /* 
    1. 只使用当前loader只能处理样式。不能处理样式中引入的其他资源
    2. 配合css-loader可以解决样式中引入其他资源的问题
       但是css-loader暴露了一段js代码，当前loader需要执行js代码，得到返回值后
       再动态创建style标签，插入到页面上。不好操作
    3. 使用pitch loader的用法
  */
  // const script = `
  //   const styleEle = document.createElement('style');
  //   styleEle.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEle);
  // `;
  // return script;
};

module.exports.pitch = function (remainingRequest) {
  // remainingRequest代表剩下的还没处理的loader
  // remainingRequest = /Users/hefkang/Desktop/life/programing/test/webpack-demo/node_modules/css-loader/dist/cjs.js!/Users/hefkang/Desktop/life/programing/test/webpack-demo/src/css/index.css

  // 1. 将remainingRequest中的绝对路径变为相对路径
  const relativePath = remainingRequest
    .split("!")
    .map((absolutePath) => {
      return this.utils.contextify(this.context, absolutePath);
    })
    .join("!"); // relativePath = ../../node_modules/css-loader/dist/cjs.js!./index.css
  // 2. 引入css-loader处理后的资源

  // 3. 创建style，将内容插入页面中生效。!!跳过 pre、 normal 和 post loader。inline-loader的执行·
  const script = `
    import style from "!!${relativePath}";
    const styleEle = document.createElement('style');
    styleEle.innerHTML = style;
    document.head.appendChild(styleEle);
  `;
  return script; //会终止后面的loader执行
};
