const schema = require("./schema.json");

module.exports = function (content) {
  // schema 对options的验证规则。
  const options = this.getOptions(schema);
  const prefix = `
  /* 
  * Author: ${options.author}
  */
  `;
  return prefix + content;
};
