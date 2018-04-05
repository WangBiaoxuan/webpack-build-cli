import chokidar from 'chokidar';
const webpack = require('webpack');
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const devMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const app = express();


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

  // 执行
  const webpackConfigFileName = args.config || 'webpack.config.js';
  const file = require(path.join(args.cwd, webpackConfigFileName));

  console.log(webpackConfig)
  if (typeof file === 'function') {
    webpackConfig = file(webpackConfig)
  }
  console.log('webpackConfig build cli:', webpackConfig)
  if (args.watch) {
    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler, {
      logTime: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        assets: false,
        cachedAssets: false,
        assets: false,
        // 对资源按指定的字段进行排序
        // 你可以使用 `!field` 来反转排序。
        assetsSort: "field",
        // 添加缓存（但未构建）模块的信息
        cached: false,
        // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        cachedAssets: false,
        // 添加 children 信息
        children: false,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: false,
        // 将构建模块信息添加到 chunk 信息
        chunkModules: false,
        // 添加 chunk 和 chunk merge 来源的信息
        chunkOrigins: false,
        publicPath: false,
        // 添加模块被引入的原因
        reasons: false,
        // 添加模块的源码
        // source: false,
      },
    }));
    app.use(webpackHotMiddleware(compiler, {
      path: "/__webpack_hmr",
    }));
    const watcher = chokidar.watch(path.join(args.cwd, webpackConfigFileName));
    watcher.on('change', function() {
      console.log('文件变化了， 怎么办')
      // process.send('restart')
    });
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
  } else {
    webpack(webpackConfig, () => {
      console.log('编译完成，请查看')
    });
  }  
}