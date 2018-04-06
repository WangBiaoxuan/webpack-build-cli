const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true,
    cache: true,
  });
}

export default function plugins(args, webpackConfig) {
  let isDev = false;
  if (args.watch) {
    isDev = true;
  }
  webpackConfig.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: `[name].${isDev ? '' : '[chunkhash:8]'}.js`,
    }),
    new ExtractTextPlugin({
      filename: `[name]-${isDev ? '' : '[chunkhash:8]'}.css`
    }), 
    new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`);
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: 'src/favicon.ico',
      template: 'src/entry.html',
      filename: 'index.htm',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name]_[hash].js',
      entry: {
        vendor: [
          'echarts',
          'lodash',
          'bluebird',
          'jsbarcode',
          'antd',
          'react-router',
          'redux-saga',
          'isomorphic-fetch',
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'dva',
          'history',
          'core-js',
          'redux-logger'
        ]
      }
    }),
    createHappyPlugin('less_1', ['css-loader!less-loader']),
    createHappyPlugin('less_2', ['css-loader?modules=true!less-loader']),
    createHappyPlugin('css', ['css-loader?modules=true']),
    createHappyPlugin('js', ['babel-loader?cacheDirectory=true']),
  ]
  if (args.watch) {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  return webpackConfig;
}