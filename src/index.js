const webpack = require('webpack');
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')

import entryFun  from './entry'
import outputFun  from './output'
import loadersFun  from './loaders'
import pluginsFun  from './plugins'
import resolveFun  from './resolve'
// import memoryFS  from './devServer'

export default function index(args, callback) {
  let webpackConfig = {};
  // 入口函数
  webpackConfig = entryFun(args, webpackConfig);

  webpackConfig = outputFun(args, webpackConfig);

  webpackConfig = loadersFun(args, webpackConfig);

  webpackConfig = pluginsFun(args, webpackConfig);

  webpackConfig = resolveFun(args, webpackConfig);

  // console.log('webpackDevServer:', webpackDevServer)

  // 执行
  const webpackConfigFileName = args.config || 'webpack.config.js';
  const file = require(path.join(args.cwd, webpackConfigFileName));

  console.log(webpackConfig)
  if (typeof file === 'function') {
    webpackConfig = file(webpackConfig)
  }
  console.log(webpackConfig)

  // 编译
  const compiler = webpack(webpackConfig)

  /*
  compiler.run((err, stats) => {
    console.log('err', err)
    // console.log(stats)
  }) 
  */

  
  const devServerOptions = Object.assign({}, {
    contentBase: path.join(args.cwd, "dist"),
  });
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
  
}