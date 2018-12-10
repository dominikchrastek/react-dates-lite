const path = require("path");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "../example/")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: "babel-loader",
        options: {
          babelrc: true
        },
        exclude: /node_modules/
      }
    ]
  }
};
