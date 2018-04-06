const path = require('path');
export default function output(args, webpackConfig) {
  const isDev = !args.isProd;
  return {
    ...webpackConfig,
    output: {
      path: path.join(process.cwd(), './dist/'),
      filename: `[name].${isDev ? '' : '[chunkhash:8]'}.js`,
      chunkFilename: `[name].${isDev ? '' : '[chunkhash:8]'}.js`,
      publicPath: args.publicPath || '/'
    }
  }
}