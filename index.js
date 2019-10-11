const { exec } = require('pkg');
const { join } = require('path');
const { writeFileSync, unlinkSync } = require('fs');

class WebpackPkgPlugin {
  constructor({ targets = ['host'], output, assets = [], scripts = [] }) {
    const isArray = targets instanceof Array;
    if (!isArray) {
      console.log(
        '"targets" option for WebpackPkgPlugin has the wrong format. Using defaults (["host"]).'
      )
    }

    this.options = {
      targets,
      output,
      scripts,
      assets
    }
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('WebpackPkgPlugin', async (compilation, callback) => {
      const { targets, output, scripts, assets } = this.options;
      const outputPath = compilation.compiler.options.output.path;

      const files = Object.keys(compilation.assets).filter((_, i) => i < Object.keys(compilation.compiler.options.entry).length);

      for (const file of files) {
        const entry = join(outputPath, file);
        const distPath = join(outputPath, output);

        if (assets.length || scripts.length) {
          const configJsonPath = `${ outputPath }/pkg-config.json`;
          writeFileSync(configJsonPath, JSON.stringify({
            targets,
            assets,
            scripts
          }));

          try {
            await exec([entry, '--config', configJsonPath, '--out-path', distPath]);
          } catch {
            unlinkSync(configJsonPath);
          }

          unlinkSync(configJsonPath);
        } else await exec([entry, '--targets', targets.join(','), '--out-path', distPath]);
      }

      callback();
    })
  }
}

module.exports.WebpackPkgPlugin = WebpackPkgPlugin;
