# Webpack-Plg-Plugin

## [Pkg](https://github.com/zeit/pkg) your scripts into executable
### NOT FINISHED. DON'T USE!

### Install
```bash
  npm i --save-dev webpack-pkg-plugin
```

### Usage

```js
  const WebpackPkgPlugin = require('webpack-pkg-plugin').WebpackPkgPlugin
  // or with the new syntax (if you're sure that your Node supports it):
  // const {WebpackPkgPlugin} = require('webpack-pkg-plugin').WebpackPkgPlugin
  // And if you use modules:
  // import {WebpackPkgPlugin} from 'webpack-pkg-plugin'

  /*
  ...
   */
  // More about pkg configuration: https://github.com/zeit/pkg#config
  // Default params:
  new WebpackPkgPlugin({
    scripts: 'all',
    assets: false,
    targets: ['host'], // array of targets
    debug: false,
    output: '/pkg', // Path for dir with executables inside your output folder
  })
```
