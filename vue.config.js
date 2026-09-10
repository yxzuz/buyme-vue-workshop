const { defineConfig } = require('@vue/cli-service');

class RemoveVueStyleExportWarningsPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      'RemoveVueStyleExportWarningsPlugin',
      (compilation) => {
        compilation.warnings = compilation.warnings.filter(
          (warning) =>
            !warning.message.includes("export 'default' (imported as 'style") ||
            !warning.message.includes('vue&type=style')
        );
      }
    );
  }
}

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [new RemoveVueStyleExportWarningsPlugin()],
  },
});
