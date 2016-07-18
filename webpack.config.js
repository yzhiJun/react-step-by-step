var webpack = require('webpack');

var config = {
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://0.0.0.0:3000/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
