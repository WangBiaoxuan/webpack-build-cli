export default function entry(args, webpackConfig) {
  return {
    ...webpackConfig,
    entry: {
      index: ['./src/index.js', 'webpack-hot-middleware/client'],
    }
  }
}