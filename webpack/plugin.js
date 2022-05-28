class HelloCompilationPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("HelloCompilationPlugin", (compilation) => {
      compilation.hooks.buildModule.tap("HelloCompilationPlugin", (module) => {
        console.log(module);
      });
    });
  }
}

module.exports = HelloCompilationPlugin;
