export default function loaders(args, webpackConfig) {
  return {
    ...webpackConfig,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          /*
          options: {
            cacheDirectory: true,
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0'),
            ],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-transform-decorators-legacy'),
            ],
          }
          */
        },
        {
          test: /\.html$/,
          loader: 'file-loader',
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          loader: 'url-loader', 
          options: {
            limit: 1024,
          }     
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader', 
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
              }
            }
          ]
        }
      ]
    },
  }
}