// 同步loader
// module.exports=function(content){
//   return content
// }

module.exports = function (content, map, meta) {
  /* 
    四个参数
    1.是否有错误
    2.处理后的内容
    3.source-map继续传递（保证其传递不中断，相比上面的写法有优势）
    4.meta给下一个loader传递参数
  */
  console.log("sync loader");
  this.callback(null, content, map, meta);
};
