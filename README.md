# Webpack-Pkg-Plugin-v4

## Updated to be compatible with webpack v4

## [Pkg](https://github.com/zeit/pkg) your scripts into executable

### Install
```bash
  npm i --save-dev webpack-pkg-plugin-v4
```

### Usage

```js
  const WebpackPkgPlugin = require('webpack-pkg-plugin-v4').WebpackPkgPlugin
  // or with the new syntax (if your Node supports it):
  // const {WebpackPkgPlugin} = require('webpack-pkg-plugin-v4')
  // And if you use modules:
  // import {WebpackPkgPlugin} from 'webpack-pkg-plugin-v4'
  /*
  ...
   */
  // More about pkg configuration: https://github.com/zeit/pkg#config
  new WebpackPkgPlugin({
    // Default params:
    targets: ['host'], // array of targets (--targets option)
    output: '/pkg', // Path for dir with executables inside your output folder (--out-path)
  })
```

### Development
Any contribution, issue or pull request are highly appreciated.

### License
MIT

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>
Thanks to @BryanSummers14 for Webpack v4 support!
