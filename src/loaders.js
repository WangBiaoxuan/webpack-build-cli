
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default function loaders(args, webpackConfig) {
  return {
    ...webpackConfig,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
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
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  include: /node_modules/
                }
              },
              {
                loader: 'less-loader',
                options: {
                  modules: true,
                  include: /node_modules/
                }
              }
            ]
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: {
              loader: 'css-loader',
              options: {
                modules: true,
                include: /node_modules/
              }
            }
          })
        }
      ]
    },
  }
}