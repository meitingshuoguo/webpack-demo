class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      // 1. 遍历所有即将输出的文件，得到其大小
      const assets = Object.entries(compilation.assets);
      // 2. 生成一个md文件
      let content = `|资源名称|资源大小(kb)|
| --- | --- |`;
      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${file.size() / 1024} |`;
      });
      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
