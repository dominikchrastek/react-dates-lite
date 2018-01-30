const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const shared = require('./webpack.shared.js');

const plugins = [
  new ExtractText({ filename: 'styles.css', allChunks: true }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib/'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: shared.resolve,
  module: {
    rules: [shared.jsClient, shared.cssShared]
  },
  plugins
};
