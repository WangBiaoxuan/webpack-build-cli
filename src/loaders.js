
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const path = require('path');

export default function loaders(args, webpackConfig) {
  webpackConfig.module = {
    noParse: '/node_modules/'
  }
  webpackConfig.module.rules = [];
  webpackConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=js'
      /*
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          
        ],
        plugins: [
          
        ],
      }
      */
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
      include: /node_modules/,
      use: 'happypack/loader?id=less_1',
      /*
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }),
       */
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      // include: /src|public/,
      use: 'happypack/loader?id=less_2',
      /*
      use: ExtractTextPlugin.extract({
        use: 'happypack/loader?id=less_2',
        
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ] 
      }),
      */
    },
    {
      test: /\.css$/,
      // include: /node_modules/,
      use: 'happypack/loader?id=css',
      /*
      use: ExtractTextPlugin.extract({
        use: 'happypack/loader?id=css',
        
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions'],
                }),
              ],
            },
          },
        ],   
      }),
      */
    },
  )
  return webpackConfig
}