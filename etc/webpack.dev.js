// const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const shared = require('./webpack.shared.js');

const config = {
  entry: shared.entry,
  resolve: shared.resolve,
  output: {
    filename: 'output.js',
    publicPath: '/'
  },
  module: {
    rules: [shared.jsClient, shared.cssShared]
  },
  devServer: {
    contentBase: 'static/',
    inline: true,
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
  plugins: [new ExtractText({ disable: true })]
};

module.exports = config;
