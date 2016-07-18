var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssReporter = require('postcss-reporter');

var config = {
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?importLoaders=1&sourceMap!postcss-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],
  postcss: () => [
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};

module.exports = config;
