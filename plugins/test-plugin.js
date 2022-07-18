/* 
  1. webpack加载webpack.config.js中所有配置，此时就会new TestPlugin，执行插件的constructor
  2. webpack创建compiler对象
  3. 遍历所有plugins中的插件，调用插件的apply方法
  4. 执行剩下的编译流程(触发各个hook事件) 
*/

class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor");
  }
  apply(compiler) {
    debugger;
    console.log("TestPlugin apply");
    // 由文档可知，environment是同步hook，所有需要使用tap注册
    compiler.hooks.environment.tap("TestPlugin", (compilation) => {
      console.log("TestPlugin environment");
    });

    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log("TestPlugin emit");
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin emit async");
        callback();
      }, 1000);
    });

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin emit promise");
          resolve();
        }, 1000);
      });
    });

    // 文档可知：make是异步并行钩子AsyncParallelHook
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      // 需要在compilation hooks触发前注册才能使用
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("TestPlugin seal");
      });

      setTimeout(() => {
        console.log("TestPlugin make async3");
        callback();
      }, 3000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make async2");
        callback();
      }, 2000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make async1");
        callback();
      }, 1000);
    });
  }
}

module.exports = TestPlugin;
