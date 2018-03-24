export default function resolve(args, webpackConfig) {
  return {
    ...webpackConfig,
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: [
        'node_modules'
      ]
    }
  }
}