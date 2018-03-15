const webpack = require('webpack');
const path = require('path')

import entryFun  from './entry'
import outputFun  from './output'
import loadersFun  from './loaders'
import pluginsFun  from './plugins'

export default function index(args, callback) {
  let webpackConfig = {};
  // 入口函数
  webpackConfig = entryFun(args, webpackConfig);

  webpackConfig = outputFun(args, webpackConfig);

  webpackConfig = loadersFun(args, webpackConfig);

  webpackConfig = pluginsFun(args, webpackConfig);

  // 执行
  const webpackConfigFileName = args.config || 'webpack.config.js';
  const file = require(path.join(args.cwd, webpackConfigFileName));
  // console.log(webpackConfig)

  if (typeof file === 'function') {
    webpackConfig = file(webpackConfig)
  }
  console.log(webpackConfig)

  // 编译
  const compiler = webpack(webpackConfig)
  compiler.run((err, stats) => {
    console.log(stats)
  })
  
}