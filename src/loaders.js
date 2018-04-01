
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

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
              
            ],
            plugins: [
              
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
          include: /node_modules/,
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
        },
        {
          test: /\.less$/,
          include: /src|public/,
          use: ExtractTextPlugin.extract({
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
        },
        {
          test: /\.css$/,
          include: /node_modules|src|public/,
          use: ExtractTextPlugin.extract({
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
        },
      ]
    },
  }
}