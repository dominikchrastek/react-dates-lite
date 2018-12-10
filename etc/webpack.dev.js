const shared = require('./webpack.shared.js');

const config = Object.assign(shared, {
  mode: 'development',
  output: {
    filename: 'output.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'static/',
    inline: true,
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
});

module.exports = config;
