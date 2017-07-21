// const mm = require('micromatch');
const {exec} = require('pkg')
const path = require('path')

class WebpackPkgPlugin {
  constructor ({targets, output}) {
    const isArray = targets instanceof Array
    if (!isArray) {
      console.log(
        '"targets" option for WebpackPkgPlugin isn\'t specified. Using defaults.'
      )
    }

    const arrayOfTargets = isArray ? targets : ['host']
    this.options = {
      targets: arrayOfTargets,
      output
    }
  }

  apply (compiler) {
    compiler.plugin('after-emit', async (compilation, callback) => {
      const {targets, output} = this.options
      const {outputPath} = compilation.compiler

      // NOTE: get only first file from compiled assets
      const IAssumeThatYouConcatenatedYourApp = Object.keys(
        compilation.assets
      )[0]
      const entry = path.join(outputPath, IAssumeThatYouConcatenatedYourApp)
      const distPath = path.join(outputPath, output)

      await exec([entry, '--targets', targets.join(','), '--out-path', distPath])
      callback()
    })
  }
}

module.exports.WebpackPkgPlugin = WebpackPkgPlugin
