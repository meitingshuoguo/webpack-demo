// raw loader接收到的是Buffer数据（二进制）

module.exports = function (content) {
  console.log(content);
  return content;
};

module.exports.raw = true;
// 另一种写法
// function rawLoader(content){
//   return content
// }

// rawLoader.raw = true;
// module.exports = rawLoader
