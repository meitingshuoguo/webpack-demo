class BannerWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tap("BannerWebpackPlugin", (compilation) => {
      // 1. 获取即将输出的资源文件，compilation.assets
      // 2. 过滤只保留js和css资源
      const extensions = ["js", "css"];
      const assets = Object.keys(compilation.assets).filter((assetPath) => {
        const splitted = assetPath.split(".");
        const extension = splitted[splitted.length - 1];
        return extensions.includes(extension);
      });
      // 3. 遍历剩下资源，添加注释
      const prefix = `
/*
* Author: ${this.options.author}
*/
`;
      assets.forEach((asset) => {
        // 获取原来的内容
        let content = compilation.assets[asset].source();
        // 拼接注释
        content = prefix + content;

        // 只修改筛选过的资源
        compilation.assets[asset] = {
          // 最终输出时，调用source方法，该方法的返回值就是资源的具体内容
          source() {
            return content;
          },
          size() {
            return content.length;
          },
        };
      });
    });
  }
}

module.exports = BannerWebpackPlugin;
