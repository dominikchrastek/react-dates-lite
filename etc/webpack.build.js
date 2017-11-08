const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const shared = require('./webpack.shared.js');

const plugins = [
  new ExtractText({ filename: 'styles.css', allChunks: true }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, './src/static'),
      to: path.resolve(__dirname, './dist/static'),
    },
  ]),
];

module.exports = {
  entry: shared.entry,
  output: {
    path: path.resolve(__dirname, './dist/static/'),
    filename: 'output.js',
    publicPath: '/',
  },
  resolve: shared.resolve,
  module: {
    rules: [shared.jsClient, shared.cssShared],
  },
  plugins,
};
