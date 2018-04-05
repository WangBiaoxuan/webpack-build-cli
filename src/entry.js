export default function entry(args, webpackConfig) {
  webpackConfig.entry = {
    index: ['./src/index.js']
  }
  if (args.watch) {
    webpackConfig.entry.index.push('webpack-hot-middleware/client?path=/__webpack_hmr&reload=true')
  }
  return webpackConfig
  /*
  return {
    ...webpackConfig,
    entry: {
      index: ['./src/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true],
    }
  }
  */
}