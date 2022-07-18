const utils = require("loader-utils");

module.exports = function (content) {
  // 1.根据文件内容生成带hash值的文件名
  const interpolatedName = utils.interpolateName(this, "[hash].[ext][query]", {
    content,
  });
  console.log(interpolatedName);

  // 2.将文件输出出去
  // 3.返回module.exports = "文件路径（文件名）"
};

// 需要处理图片，字体等文件。它们都是Buffer数据
// 需要raw loader才能处理
module.exports.raw = true;
