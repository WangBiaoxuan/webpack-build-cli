const path = require('path');
export default function resolve(args, webpackConfig) {
  return {
    ...webpackConfig,
    resolve: {
      // modules: [path.join(process.cwd(), 'src'), "node_modules"],
      extensions: ['.js', '.json', '.jsx']
    }
  }
}