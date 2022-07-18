class CleanWebpackPlugin {
  apply(compiler) {
    // 1. 获取打包输出的目录
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    // 2. 注册钩子，在打包输出之前emit
    compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {});
    // 3. 通过fs删除打包输出的目录下的所有文件
    this.removeFiles(fs, outputPath);
  }
  removeFiles(fs, filepath) {
    // 要先删文件，才能删文件夹
    // 1. 读取当前目录下所有资源
    const files = fs.readdirSync(filepath);
    // 2. 遍历，删除
    files.forEach((file) => {
      // file是资源名称
      // 该资源的路径。默认是在根目录下找（会找不到），所以要加前面的路径（dist）
      const path = `${filepath}/${file}`;
      // 获取当前资源对象
      const fileStat = fs.statSync(path);
      // 判断是不是文件夹
      if (fileStat.isDirectory()) {
        // 2.2 是文件夹，就得先删里面的文件
        this.removeFiles(fs, path);
      } else {
        // 2.3 是文件，直接删除
        fs.unlinkSync(path);
      }
    });
  }
}

module.exports = CleanWebpackPlugin;
