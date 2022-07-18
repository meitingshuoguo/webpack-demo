module.exports = function (content) {
  console.log("normal loader2");
  return content;
};
module.exports.pitch = function () {
  console.log("pitch loader2");
};
