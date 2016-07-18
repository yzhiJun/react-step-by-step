var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var config = {
  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],
  postcss: () => [
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    cssnano({
      autoprefixer: false
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};

module.exports = config;
