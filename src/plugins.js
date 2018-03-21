const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


export default function entry(args, webpackConfig) {
  return {
    ...webpackConfig,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: '[name].[chunkhash:8].js',
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
        },
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
      new ExtractTextPlugin({
        filename: '[name]-[chunkhash].css'
      }),
      new Visualizer(),
    ]
  }
}