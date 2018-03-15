const webpack = require('webpack');

export default function entry(args, webpackConfig) {
  return {
    ...webpackConfig,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: '[name].[chunkhash:8].js',
      }),
    ]
  }
}