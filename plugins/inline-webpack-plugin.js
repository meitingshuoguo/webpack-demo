const HtmlPlugin = require("safe-require")("html-webpack-plugin");

// 把runtime的内容放在html文件中script内联。
class InlinePlugin {
  constructor(tests) {
    this.tests = tests;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlinePlugin", (compilation) => {
      // 1. 获取插件的hook
      const hooks = HtmlPlugin.getHooks(compilation);
      // 2. 注册hook
      // 3. 从里面将script的runtime文件变成inline script
      hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
        assets.headTags = this.getInlineChunk(
          assets.headTags,
          compilation.assets
        );
        assets.bodyTags = this.getInlineChunk(
          assets.bodyTags,
          compilation.assets
        );
      });
      // 4. 删除runtime文件
      hooks.afterEmit.tap("InlinePlugin", () => {
        Object.keys(compilation.assets).forEach((filepath) => {
          if (this.tests.some((test) => test.test(filepath))) {
            delete compilation.assets[filepath];
          }
        });
      });
    });
  }
  getInlineChunk(tags, assets) {
    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;

      const filepath = tag.attributes.src;
      if (!filepath) return tag;

      if (!this.tests.some((test) => test.test(filepath))) return tag;

      return {
        tagName: "script",
        innerHTML: assets[filepath].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlinePlugin;
