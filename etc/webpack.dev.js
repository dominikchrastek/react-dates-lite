const shared = require("./webpack.shared.js");

const config = {
  entry: shared.entry,
  resolve: shared.resolve,
  module: shared.module,
  mode: "development",
  output: {
    filename: "output.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: "static/",
    inline: true,
    historyApiFallback: true
  },
  devtool: "eval-source-map"
};

module.exports = config;
