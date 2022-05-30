const path = require("path");
const Dependency = require("webpack/lib/dependencies/ModuleDependency");
const ConstDependency = require("webpack/lib/dependencies/ConstDependency");

class HelloCompilationPlugin {
  constructor() {
    this.matches = new Map();
    this.factory = null;
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap("MyPlugin", (factory) => {
      this.factory = factory;

      factory.hooks.parser
        .for("javascript/auto")
        .tap("MyPlugin", (parser, options) => {
          parser.hooks.call.for("include").tap("MyPlugin", (expression) => {
            this.matches.set(parser.state.current, expression);
          });
        });
    });

    compiler.hooks.compilation.tap("MyPlugin", (compilation) => {
      compilation.hooks.succeedModule.tap("MyPlugin", (module) => {
        if (this.matches.has(module)) {
          const expression = this.matches.get(module);
          const inlineCodePath = path.resolve(
            module.context,
            expression.arguments[0].value
          );

          console.log(module.contextInfo);
          console.log(Object.keys(Object.getPrototypeOf(compilation)));
          const dep = new Dependency(inlineCodePath);

          this.factory.create(
            {
              contextInfo: {
                issuer: "",
                compiler: compiler
              },
              context: module.context,
              dependencies: [dep]
            },
            (err, res) => {
              compilation.buildModule(res, (err, res2) => {
                console.log(res2);
              });
              console.log(res);
            }
          );
          // console.log(this.factory);
          // console.log(module);

          // console.log(module._source);
          // console.log(this.matches.get(module));
        }
      });
    });
  }
}

module.exports = HelloCompilationPlugin;
