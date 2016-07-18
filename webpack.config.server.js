var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExternalsPlugin = require('webpack-externals-plugin');

const config = {

  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015'
          ]
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT': JSON.stringify(false),
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
  ],
};

module.exports = config;
