const { exec } = require('pkg');
const { join } = require('path');

class WebpackPkgPlugin {
  constructor({ targets, output }) {
    const isArray = targets instanceof Array;
    if (!isArray) {
      console.log(
        '"targets" option for WebpackPkgPlugin isn\'t specified. Using defaults.'
      )
    }

    const arrayOfTargets = isArray ? targets : ['host'];
    this.options = {
      targets: arrayOfTargets,
      output
    }
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('WebpackPkgPlugin', async (compilation, callback) => {
      const { targets, output } = this.options;
      const outputPath = compilation.compiler.options.output.path;

      const files = Object.keys(compilation.assets).filter((_, i) => i < Object.keys(compilation.compiler.options.entry).length);

      for (const file of files) {
        const entry = join(outputPath, file);
        const distPath = join(outputPath, output);
        await exec([entry, '--targets', targets.join(','), '--out-path', distPath]);
      }

      callback();
    })
  }
}

module.exports.WebpackPkgPlugin = WebpackPkgPlugin;
