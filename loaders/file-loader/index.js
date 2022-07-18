const utils = require("loader-utils");

module.exports = function (content) {
  // 1.根据文件内容生成带hash值的文件名
  let interpolatedName = utils.interpolateName(this, "[hash].[ext][query]", {
    content,
  });
  interpolatedName = `images/${interpolatedName}`;
  // 2.将文件输出出去
  this.emitFile(interpolatedName, content);

  // 3.返回module.exports = "文件路径（文件名）"
  return `module.exports = "${interpolatedName}"`;
};

// 需要处理图片，字体等文件。它们都是Buffer数据
// 需要raw loader才能处理
module.exports.raw = true;
