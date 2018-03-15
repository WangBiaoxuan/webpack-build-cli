const path = require('path');
export default function output(args, webpackConfig) {
  return {
    ...webpackConfig,
    output: {
      path: path.join(process.cwd(), './dist/'),
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
    }
  }
}